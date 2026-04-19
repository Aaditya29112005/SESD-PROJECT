from fastapi import FastAPI, Depends, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI(title="CampusOS ∞ - Dashboard Aggregation Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def get_dashboard(role: str = Header(default="student")):
    # In a real app, role is extracted from the JWT token
    
    if role == "student":
        return {
            "type": "student",
            "risk": "HIGH",
            "ai_message": "You are falling behind ⚠️",
            "metrics": [
                {"label": "Current GPA", "value": "2.8", "color": "text-rose-400"},
                {"label": "Attendance", "value": "72%", "color": "text-rose-400"},
            ],
            "today_plan": [
                {"time": "10:00 AM", "task": "Complete Assignment 2 (30 min)"},
                {"time": "02:00 PM", "task": "Attend Lecture: Distributed Systems"},
                {"time": "10:00 PM", "task": "Best time for you to study based on Digital Twin"}
            ],
            "ai_cards": [
                {"title": "Risk Alert", "content": "Probability of failing CS-301 is 82% without intervention.", "type": "danger"},
                {"title": "Recommendation", "content": "Complete the 'Raft Consensus' task to improve score by 15%.", "type": "action"}
            ]
        }
        
    elif role == "instructor":
        return {
            "type": "instructor",
            "ai_message": "Your teaching assistant is active.",
            "metrics": [
                {"label": "Avg Attendance", "value": "88%", "color": "text-emerald-400"},
                {"label": "Assignments to Grade", "value": "42", "color": "text-indigo-400"},
            ],
            "at_risk_students": [
                {"name": "Alex Mercer (std_101)", "issue": "Missed 3 classes", "action": "Notify"}
            ],
            "ai_cards": [
                {"title": "Anomaly Detected", "content": "This assignment is too hard (drop rate 70%). Suggest reducing difficulty.", "type": "warning", "action": "Extend Deadline"},
                {"title": "Action Needed", "content": "3 students are likely to fail. Schedule 1-on-1s today.", "type": "action", "action": "Schedule Session"}
            ]
        }
        
    elif role == "superadmin":
        return {
            "type": "superadmin",
            "ai_message": "Global SaaS Control is Nominal.",
            "metrics": [
                {"label": "Active Tenants", "value": "42", "color": "text-white"},
                {"label": "Total MRR", "value": "$840k", "color": "text-emerald-400"},
            ],
            "ai_cards": [
                {"title": "System-wide Alert", "content": "University X (Local Tech College) has rising dropout risk.", "type": "warning"},
                {"title": "Simulation Ready", "content": "Engagement dropping in 3 campuses. Run What-If Simulation?", "type": "action", "action": "Run Simulation"}
            ]
        }
        
    else:
        raise HTTPException(status_code=400, detail="Invalid role")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4011)
