from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import random

app = FastAPI(title="CampusOS X - Timetable Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/optimize")
async def optimize_timetable():
    # Simulate Genetic Algorithm / Constraint Satisfaction processing
    await asyncio.sleep(1.5)
    
    # In production, this runs a real Genetic Algorithm against Postgres constraints
    rooms = ["Hall A", "Room 402", "Lab 1", "Room 305", "Hall C"]
    schedule = [
        {"time": "09:00 AM", "course": "CS-301 Distributed Systems", "room": random.choice(rooms), "conflict": False},
        {"time": "11:30 AM", "course": "ENG-201 Ethics", "room": random.choice(rooms), "conflict": False},
        {"time": "02:00 PM", "course": "AI-404 Neural Networks", "room": random.choice(rooms), "conflict": False}
    ]
    return {"schedule": schedule}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4005)
