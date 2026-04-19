from fastapi import FastAPI, BackgroundTasks, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import uuid
import time
from aiokafka import AIOKafkaProducer

# CampusOS X - Attendance Intelligence Service
# This service tracks attendance and emits events for AI analysis.

app = FastAPI(title="CampusOS X Attendance Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to dashboard domain
    allow_methods=["*"],
    allow_headers=["*"],
)

KAFKA_BOOTSTRAP_SERVERS = "localhost:9092"
KAFKA_TOPIC = "campus.attendance.events"

class AttendanceCheckIn(BaseModel):
    student_id: str
    course_id: str
    latitude: float
    longitude: float
    device_id: str

async def send_event(event: dict):
    producer = AIOKafkaProducer(bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS)
    await producer.start()
    try:
        await producer.send_and_wait(KAFKA_TOPIC, json.dumps(event).encode("utf-8"))
        print(f"✅ Event sent to Kafka: {event['event_type']}")
    except Exception as e:
        print(f"❌ Failed to send event: {e}")
    finally:
        await producer.stop()

# Mock Databases for Edge Case Handling
processed_idempotency_keys = set()
student_devices = {
    "std_101": "iphone_15_PRO_MAX_XYZ"  # Known trusted device fingerprint
}
CLASS_COORDINATES = {"latitude": 37.7749, "longitude": -122.4194}
GEO_FENCE_RADIUS_DEGREES = 0.001 # Roughly 100 meters

@app.post("/check-in")
async def check_in(
    data: AttendanceCheckIn, 
    background_tasks: BackgroundTasks,
    request: Request
):
    """
    Records a student check-in with fraud detection and idempotency.
    """
    idempotency_key = request.headers.get("Idempotency-Key")
    
    # 1. Idempotency Check (Duplicate Entries & Network Retries)
    if idempotency_key:
        if idempotency_key in processed_idempotency_keys:
            raise HTTPException(status_code=409, detail="Duplicate request detected. Already processed.")
        processed_idempotency_keys.add(idempotency_key)

    # 2. Fraud Detection: Device Fingerprint Mismatch
    expected_device = student_devices.get(data.student_id)
    if expected_device and expected_device != data.device_id:
        raise HTTPException(
            status_code=403, 
            detail=f"FRAUD ALERT: Proxy attendance detected. Device mismatch."
        )

    # 3. Fraud Detection: Geofencing Anomaly
    lat_diff = abs(data.latitude - CLASS_COORDINATES["latitude"])
    lon_diff = abs(data.longitude - CLASS_COORDINATES["longitude"])
    if lat_diff > GEO_FENCE_RADIUS_DEGREES or lon_diff > GEO_FENCE_RADIUS_DEGREES:
        raise HTTPException(
            status_code=403, 
            detail="FRAUD ALERT: Student is not physically present in the classroom."
        )

    event = {
        "event_id": str(uuid.uuid4()),
        "event_type": "STUDENT_CHECK_IN",
        "data": data.dict(),
        "timestamp": time.time(),
        "idempotency_key": idempotency_key
    }
    
    # Emit event to Kafka
    background_tasks.add_task(send_event, event)
    
    return {
        "status": "Check-in verified securely",
        "event_id": event["event_id"]
    }

@app.get("/health")
def health():
    return {"status": "healthy"}
