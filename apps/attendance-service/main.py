from fastapi import FastAPI, BackgroundTasks, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import uuid
import time
from aiokafka import AIOKafkaProducer

# CampusOS X - Attendance Intelligence Service
# Refactored using Object-Oriented Programming (OOP) Principles

# ==========================================
# Domain Models (Encapsulation)
# ==========================================
class AttendanceCheckIn(BaseModel):
    student_id: str
    course_id: str
    latitude: float
    longitude: float
    device_id: str

# ==========================================
# Services & Repositories (Abstraction)
# ==========================================
class KafkaProducerService:
    """Handles event streaming to Kafka."""
    def __init__(self, bootstrap_servers: str, topic: str):
        self.bootstrap_servers = bootstrap_servers
        self.topic = topic

    async def send_event(self, event: dict):
        producer = AIOKafkaProducer(bootstrap_servers=self.bootstrap_servers)
        await producer.start()
        try:
            await producer.send_and_wait(self.topic, json.dumps(event).encode("utf-8"))
            print(f"✅ Event sent to Kafka: {event.get('event_type')}")
        except Exception as e:
            print(f"❌ Failed to send event: {e}")
        finally:
            await producer.stop()


class AttendanceRepository:
    """Encapsulates data access and storage."""
    def __init__(self):
        self._processed_idempotency_keys = set()
        self._student_devices = {
            "std_101": "iphone_15_PRO_MAX_XYZ"  # Known trusted device fingerprint
        }
        self._class_coordinates = {"latitude": 37.7749, "longitude": -122.4194}
        self._geo_fence_radius_degrees = 0.001

    def is_request_processed(self, idempotency_key: str) -> bool:
        return idempotency_key in self._processed_idempotency_keys

    def mark_request_processed(self, idempotency_key: str):
        self._processed_idempotency_keys.add(idempotency_key)

    def get_expected_device(self, student_id: str) -> str:
        return self._student_devices.get(student_id)

    def get_class_coordinates(self) -> dict:
        return self._class_coordinates

    def get_geofence_radius(self) -> float:
        return self._geo_fence_radius_degrees


class FraudDetectionService:
    """Contains business rules for fraud detection."""
    def __init__(self, repository: AttendanceRepository):
        self.repository = repository

    def verify_device(self, student_id: str, device_id: str):
        expected_device = self.repository.get_expected_device(student_id)
        if expected_device and expected_device != device_id:
            raise HTTPException(
                status_code=403, 
                detail="FRAUD ALERT: Proxy attendance detected. Device mismatch."
            )

    def verify_location(self, latitude: float, longitude: float):
        coords = self.repository.get_class_coordinates()
        radius = self.repository.get_geofence_radius()
        
        lat_diff = abs(latitude - coords["latitude"])
        lon_diff = abs(longitude - coords["longitude"])
        
        if lat_diff > radius or lon_diff > radius:
            raise HTTPException(
                status_code=403, 
                detail="FRAUD ALERT: Student is not physically present in the classroom."
            )

# ==========================================
# Main Controller & Dependency Injection
# ==========================================
class AttendanceController:
    """Orchestrates the check-in process by combining services."""
    def __init__(self):
        self.repository = AttendanceRepository()
        self.fraud_service = FraudDetectionService(self.repository)
        self.kafka_service = KafkaProducerService("localhost:9092", "campus.attendance.events")

    async def process_check_in(self, data: AttendanceCheckIn, idempotency_key: str, background_tasks: BackgroundTasks):
        # 1. Idempotency Check
        if idempotency_key:
            if self.repository.is_request_processed(idempotency_key):
                raise HTTPException(status_code=409, detail="Duplicate request detected. Already processed.")
            self.repository.mark_request_processed(idempotency_key)

        # 2. Verify Fraud Rules
        self.fraud_service.verify_device(data.student_id, data.device_id)
        self.fraud_service.verify_location(data.latitude, data.longitude)

        # 3. Create and Emit Event
        event = {
            "event_id": str(uuid.uuid4()),
            "event_type": "STUDENT_CHECK_IN",
            "data": data.dict(),
            "timestamp": time.time(),
            "idempotency_key": idempotency_key
        }
        
        background_tasks.add_task(self.kafka_service.send_event, event)
        
        return {
            "status": "Check-in verified securely",
            "event_id": event["event_id"]
        }

# ==========================================
# FastAPI Application Setup
# ==========================================
app = FastAPI(title="CampusOS X Attendance Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate the controller
controller = AttendanceController()

@app.post("/check-in")
async def check_in(
    data: AttendanceCheckIn, 
    background_tasks: BackgroundTasks,
    request: Request
):
    """
    Endpoint for student check-ins.
    Delegates to the OOP controller.
    """
    idempotency_key = request.headers.get("Idempotency-Key")
    return await controller.process_check_in(data, idempotency_key, background_tasks)

@app.get("/health")
def health():
    return {"status": "healthy"}
