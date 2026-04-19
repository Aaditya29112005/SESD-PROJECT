# Sequence Diagram — CampusOS

## Main Flow: End-to-End Course Enrollment & Real-Time Presence Verification

This sequence diagram illustrates the complete lifecycle of a student's entry into a course—from registration and section assignment to their first attendance mark and the resulting AI-driven notification system.

```mermaid
sequenceDiagram
    autonumber
    
    actor S as Student
    actor T as Teacher
    participant G as API Gateway (Nginx)
    participant AS as Auth Service (JWT)
    participant UCS as User/Course Service
    participant ATS as Attendance Service
    participant K as Kafka (Message Broker)
    participant NS as Notification Service
    participant DB as PostgreSQL / Redis

    Note over S, DB: Phase 1: Authentication & Course Discovery
    
    S->>G: POST /login (credentials)
    G->>AS: Validate Credentials
    AS->>DB: Query User Profile
    DB-->>AS: User Data (Role: Student)
    AS-->>G: JWT Token (Access + Refresh)
    G-->>S: Auth Success (Token)

    S->>G: GET /sections/available
    G->>UCS: Fetch Available Sections
    UCS->>DB: Query Courses where Capacity > 0
    DB-->>UCS: List of Sections
    UCS-->>S: Display Sections Portfolio

    Note over S, DB: Phase 2: Enrollment & DB Locking
    
    S->>G: POST /enroll (sectionId)
    G->>AS: Verify JWT
    AS-->>G: Valid
    G->>UCS: Register Student
    UCS->>DB: Begin Transaction: Create Enrollment
    DB-->>UCS: COMMIT
    UCS->>K: Publish event "student_enrolled"
    UCS-->>S: Enrollment Successful

    Note over T, DB: Phase 3: Real-Time Attendance Flow
    
    T->>G: POST /attendance/mark-bulk
    G->>AS: Verify Teacher Role
    AS-->>G: Role Authorized
    G->>ATS: Record Attendance
    ATS->>DB: Bulk Insert Attendance Records
    DB-->>ATS: Success
    
    loop For Every Student Marked ABSENT
        ATS->>K: Publish "attendance_marked_absent"
        K->>NS: Consume Absent Event
        NS->>DB: Check Parent/Student Channel Prefs
        NS->>S: Push Alert: "Absence Recorded"
    end

    ATS-->>T: Attendance Sheet Finalized
```

## System Interconnectivity Breakdown

| Step | Action | Service Responsibility |
| :--- | :--- | :--- |
| **Auth** | JWT Validation | `Auth Service` ensures that only registered users can access the Gateway. |
| **Transaction** | Database Locking | `User/Course Service` uses ACID transactions to prevent section over-enrollment. |
| **Event Bus** | Kafka Pub/Sub | `Attendance Service` remains non-blocking by offloading notifications to Kafka. |
| **Worker** | Consumer Logic | `Notification Service` operates asynchronously, optimizing throughput. |
| **Caching** | Redis Hits | `Auth Service` caches session tokens in Redis to minimize PostgreSQL hits. |
