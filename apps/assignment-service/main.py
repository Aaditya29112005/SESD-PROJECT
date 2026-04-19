from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import random

app = FastAPI(title="CampusOS X - Assignment Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/grade")
async def grade_assignments():
    # Simulate NLP / Code execution sandbox time
    await asyncio.sleep(2)
    
    # In production, this would read from S3, run isolated Docker containers for code, and NLP models for text
    results = [
        {"id": "CS301-A1", "name": "Distributed Consensus", "score": random.randint(85, 98), "plagiarism": random.randint(1, 5), "status": "Graded"},
        {"id": "CS301-A2", "name": "Raft Implementation", "score": random.randint(60, 80), "plagiarism": random.randint(10, 25), "status": "Review Needed"},
        {"id": "CS301-A3", "name": "Kafka Integration", "score": random.randint(90, 100), "plagiarism": random.randint(0, 2), "status": "Graded"}
    ]
    return {"results": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4003)
