from neo4j import GraphDatabase

# CampusOS X - Graph Intelligence Setup
# Initializes the Neo4j schema for Student Digital Twins and Relationships.

URI = "bolt://localhost:7687"
AUTH = ("neo4j", "password")

def initialize_graph():
    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        with driver.session() as session:
            # 1. Create Constraints
            session.run("CREATE CONSTRAINT student_id IF NOT EXISTS FOR (s:Student) REQUIRE s.id IS UNIQUE")
            session.run("CREATE CONSTRAINT course_id IF NOT EXISTS FOR (c:Course) REQUIRE c.id IS UNIQUE")
            
            # 2. Seed Initial Relationships (Sample Data)
            session.run("""
                MERGE (s:Student {id: 'std_101', name: 'Alice Smith', risk_level: 'low'})
                MERGE (c1:Course {id: 'cs_301', name: 'Distributed Systems'})
                MERGE (c2:Course {id: 'cs_302', name: 'AI Orchestration'})
                MERGE (f:Faculty {id: 'fac_99', name: 'Dr. Arrakis'})
                
                MERGE (s)-[:ENROLLED_IN {grade: 'A'}]->(c1)
                MERGE (s)-[:ENROLLED_IN]->(c2)
                MERGE (f)-[:TEACHES]->(c1)
                MERGE (c2)-[:PREREQUISITE_FOR]->(c1)
            """)
            
            print("🕸️ Graph Intelligence Layer initialized successfully.")

if __name__ == "__main__":
    try:
        initialize_graph()
    except Exception as e:
        print(f"❌ Failed to connect to Neo4j: {e}. Ensure docker-compose is running.")
