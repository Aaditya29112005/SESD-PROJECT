from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import time

app = FastAPI(title="CampusOS ∞ - Autonomous Campus Engine (ACE)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory "Digital Twin" state tracking for demo purposes
# In production, this sits in Redis/Feast feature store
student_state = {
    "std_101": {
        "name": "Alex Mercer",
        "attendance_pct": 85.0,
        "missed_consecutive": 0,
        "last_login": time.time(),
        "risk_level": "Low"
    }
}

class Event(BaseModel):
    event_type: str
    student_id: str
    data: dict

# We use a simple list to simulate an outgoing action queue/websocket feed
action_log = []

def process_event(event: Event):
    student = student_state.get(event.student_id)
    if not student:
        return

    print(f"📡 Brain consumed event: {event.event_type} for {event.student_id}")

    if event.event_type == "CLASS_MISSED":
        student["missed_consecutive"] += 1
        student["attendance_pct"] -= 5.0
        
        print(f"🧠 Pattern Engine: {student['name']} missed {student['missed_consecutive']} classes. Attendance: {student['attendance_pct']}%")

        # Rules Engine: If missed 3 consecutive or attendance < 75% -> HIGH RISK
        if student["missed_consecutive"] >= 3 or student["attendance_pct"] < 75.0:
            student["risk_level"] = "Critical"
            
            # Action Engine Execution
            decision = {
                "timestamp": time.time(),
                "student_id": event.student_id,
                "student_name": student["name"],
                "trigger": "Consecutive absences pattern detected",
                "prediction": "Probability of disengagement in 48 hours is 82%",
                "actions_taken": [
                    "SMS sent to student asking if they need support",
                    "Alerted Course Admin (Prof. Smith) to check in",
                    "Dynamic timetable suggested to reduce load next week"
                ]
            }
            action_log.append(decision)
            print(f"🚨 DECISION TRIGGERED: {decision['prediction']}")

@app.post("/ingest")
async def ingest_event(event: Event, background_tasks: BackgroundTasks):
    background_tasks.add_task(process_event, event)
    return {"status": "event_received"}

@app.get("/live-actions")
async def get_live_actions():
    # Returns the latest actions taken by the brain to show on the UI
    actions = list(action_log)
    action_log.clear() # clear after reading for polling
    return {"actions": actions}

@app.get("/state")
async def get_state():
    return student_state

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4009)
