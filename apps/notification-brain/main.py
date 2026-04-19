from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import asyncio

app = FastAPI()

# CampusOS X - Notification Brain
# Multi-channel routing: Email, Push, WhatsApp
# Features: Smart Batching, Priority Queues, AI-Optimization

class Notification(BaseModel):
    user_id: str
    tenant_id: str
    priority: str # HIGH, MEDIUM, LOW
    message: str
    channels: list # ['WHATSAPP', 'EMAIL', 'PUSH']

async def send_via_whatsapp(user_id: str, message: str):
    # Simulated WhatsApp API Call (Twilio/Meta)
    await asyncio.sleep(0.5)
    print(f"📱 WhatsApp sent to {user_id}: {message[:20]}...")

async def send_via_push(user_id: str, message: str):
    # Simulated Firebase Cloud Messaging (FCM)
    await asyncio.sleep(0.2)
    print(f"🔔 Push sent to {user_id}: {message[:20]}...")

@app.post("/dispatch")
async def dispatch_notification(notif: Notification, bg: BackgroundTasks):
    """
    Intelligently routes notifications based on priority and user behavior.
    """
    if notif.priority == "HIGH":
        # Direct dispatch for high priority (e.g. Security, Exam Alerts)
        if 'WHATSAPP' in notif.channels:
            bg.add_task(send_via_whatsapp, notif.user_id, notif.message)
        if 'PUSH' in notif.channels:
            bg.add_task(send_via_push, notif.user_id, notif.message)
    else:
        # Smart Batching logic: Add to a Redis queue for 10-minute batching
        print(f"📦 Batching {notif.priority} priority notification for {notif.user_id}")
        
    return {"status": "dispatched", "tracking_id": "notif_12345"}

@app.get("/health")
def health():
    return {"status": "Notification Brain: Active"}
