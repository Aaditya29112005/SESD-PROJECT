import asyncio
import json
from aiokafka import AOKafkaConsumer

# CampusOS X - Autonomous Campus Brain
# This service listens to the entire campus event mesh and makes predictive decisions.

KAFKA_BOOTSTRAP_SERVERS = "localhost:9092"
KAFKA_TOPIC = "campus.attendance.events"

async def consume_events():
    """
    Consumes events and runs predictive models (Digital Twin, Dropout Risk).
    """
    consumer = AOKafkaConsumer(
        KAFKA_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        group_id="campus-brain-group",
        auto_offset_reset='earliest'
    )
    
    await consumer.start()
    print("🧠 Campus Brain is online. Listening to the digital nervous system...")
    
    try:
        async for msg in consumer:
            event = json.loads(msg.value.decode("utf-8"))
            event_type = event.get("event_type")
            
            print(f"📡 Event Captured: {event_type}")
            
            if event_type == "STUDENT_CHECK_IN":
                data = event["data"]
                print(f"🤖 AI Processing: Analyzing attendance for Student {data['student_id']}")
                
                # SIMULATED AI LOGIC:
                # 1. Update Student Digital Twin in Neo4j
                # 2. Run Dropout Risk Model
                # 3. If risk > 0.8, trigger Notification Service
                
                print(f"✨ AI Decision: Updated Digital Twin trajectory for {data['student_id']}")

    finally:
        await consumer.stop()

if __name__ == "__main__":
    asyncio.run(consume_events())
