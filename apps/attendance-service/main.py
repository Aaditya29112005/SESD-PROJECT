from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import uuid
import time
from aiokafka import AOKafkaProducer

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
    producer = AOKafkaProducer(bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS)
    await producer.start()
    try:
        await producer.send_and_wait(KAFKA_TOPIC, json.dumps(event).encode("utf-8"))
        print(f"✅ Event sent to Kafka: {event['event_type']}")
    except Exception as e:
        print(f"❌ Failed to send event: {e}")
    finally:
        await producer.stop()

@app.post("/check-in")
async def check_in(data: AttendanceCheckIn, background_tasks: BackgroundTasks):
    """
    Records a student check-in and triggers downstream AI analysis.
    """
    event = {
        "event_id": str(uuid.uuid4()),
        "event_type": "STUDENT_CHECK_IN",
        "data": data.dict(),
        "timestamp": time.time()
    }
    
    # In a real app, save to PostgreSQL here
    
    # Emit event to Kafka for the AI Orchestrator
    background_tasks.add_task(send_event, event)
    
    return {
        "status": "Check-in received",
        "event_id": event["event_id"],
        "message": "AI analysis triggered"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}
