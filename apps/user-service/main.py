from fastapi import FastAPI
from neo4j import GraphDatabase
import os

app = FastAPI()

# CampusOS X - User Intelligence Service
# Manages the Dynamic User Graph and Role Evolution (Student -> Alum -> Recruiter)

NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
NEO4J_AUTH = ("neo4j", "password")

class UserGraphManager:
    def __init__(self):
        self.driver = GraphDatabase.driver(NEO4J_URI, auth=NEO4J_AUTH)

    def evolve_role(self, user_id: str, new_role: str):
        with self.driver.session() as session:
            # Atomic graph update for role transition
            session.run("""
                MATCH (u:User {id: $uid})
                SET u.role = $role, u.evolution_timestamp = timestamp()
                MERGE (u)-[:TRANSITIONED_TO]->(r:Role {name: $role})
            """, uid=user_id, role=new_role)

    def get_social_context(self, user_id: str):
        with self.driver.session() as session:
            # Fetch academic network for AI Digital Twin
            result = session.run("""
                MATCH (u:User {id: $uid})-[r:COLLABORATED_WITH|ENROLLED_IN]-(related)
                RETURN related.name as name, type(r) as relationship
            """, uid=user_id)
            return [record.data() for record in result]

graph = UserGraphManager()

@app.post("/evolve/{user_id}")
async def transition_user(user_id: str, role: str):
    graph.evolve_role(user_id, role)
    return {"status": "Transitioned", "user_id": user_id, "new_role": role}

@app.get("/context/{user_id}")
async def user_context(user_id: str):
    return graph.get_social_context(user_id)

@app.get("/health")
def health():
    return {"status": "User Intelligence: Connected to Neo4j"}
