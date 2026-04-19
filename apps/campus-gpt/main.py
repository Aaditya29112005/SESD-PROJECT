from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import random

app = FastAPI(title="CampusOS X - CampusGPT")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    user_id: str
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    # Simulate processing time for LLM
    await asyncio.sleep(1)
    
    responses = [
        "Analyzing your trajectory... Based on your Digital Twin, I recommend focusing on 'Distributed Systems' this week.",
        "Your attendance is optimal. I noticed a potential conflict in your timetable tomorrow; shall I invoke the Hyper-Scheduler?",
        "I have reviewed your recent assignments. Your structural integrity is excellent, but consider deepening your analysis on graph algorithms.",
        "The Autonomous Brain predicts a 94% success rate for your current path. Keep up the momentum!"
    ]
    
    # Simple keyword matching
    if "attendance" in request.message.lower():
        reply = "Your current engagement velocity is strong. The Mesh shows you checked in successfully to your last 5 sessions."
    elif "risk" in request.message.lower() or "dropout" in request.message.lower():
        reply = "Your risk score is extremely low (2.4%). The Neural Engine confirms your trajectory is stable."
    else:
        reply = random.choice(responses)
        
    return {"response": reply}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4007)
