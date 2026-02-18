# ER Diagram — CampusOS

## Overview
This Entity-Relationship diagram shows the comprehensive database schema for the CampusOS platform. It covers all core university operations, including user management, academic structuring, attendance tracking, and financial transactions. All tables, columns, types, and relationships are defined below to ensure a scalable and robust data model.

```mermaid
erDiagram
    %% --- USER MANAGEMENT ---
    USERS ||--o{ USER_ROLES : has
    ROLES ||--o{ USER_ROLES : assigned_to

    %% --- ACADEMIC STRUCTURE ---
    DEPARTMENTS ||--o{ COURSES : offers
    COURSES ||--o{ SECTIONS : divided_into
    FACULTY ||--o{ SECTIONS : teaches
    STUDENTS ||--o{ ENROLLMENTS : registers
    SECTIONS ||--o{ ENROLLMENTS : contains

    %% --- ATTENDANCE & ACADEMICS ---
    ENROLLMENTS ||--o{ ATTENDANCE : records
    SECTIONS ||--o{ ASSIGNMENTS : issues
    ASSIGNMENTS ||--o{ SUBMISSIONS : receives
    STUDENTS ||--o{ SUBMISSIONS : "submits / receives grades"

    %% --- FINANCE & ADMIN ---
    STUDENTS ||--o{ FEE_PAYMENTS : pays
    DEPARTMENTS ||--o{ INVENTORY : manages

    %% --- NOTIFICATIONS & LOGS ---
    USERS ||--o{ NOTIFICATIONS : receives
    USERS ||--o{ AUDIT_LOGS : performs

    USERS {
        uuid id PK
        string email UK
        string password_hash
        string full_name
        timestamp created_at
        timestamp last_login
    }

    ROLES {
        uuid id PK
        string name "ADMIN, STUDENT, TEACHER"
        jsonb permissions
    }

    USER_ROLES {
        uuid user_id FK
        uuid role_id FK
    }

    DEPARTMENTS {
        uuid id PK
        string name
        string code UK
        uuid head_id FK "Faculty ID"
    }

    COURSES {
        uuid id PK
        string title
        string course_code UK
        uuid department_id FK
        int credits
    }

    SECTIONS {
        uuid id PK
        uuid course_id FK
        string section_name "e.g., A, B, C"
        uuid instructor_id FK
        string classroom_id
    }

    STUDENTS {
        uuid id PK "Links to USERS"
        string roll_number UK
        uuid department_id FK
        int current_semester
    }

    FACULTY {
        uuid id PK "Links to USERS"
        string employee_id UK
        uuid department_id FK
        string designation
    }

    ENROLLMENTS {
        uuid id PK
        uuid student_id FK
        uuid section_id FK
        string academic_year
        float final_grade
    }

    ATTENDANCE {
        uuid id PK
        uuid enrollment_id FK
        date date
        enum status "PRESENT, ABSENT, LATE, EXCUSED"
        timestamp marked_at
    }

    ASSIGNMENTS {
        uuid id PK
        uuid section_id FK
        string title
        text description
        timestamp due_date
        float max_points
    }

    SUBMISSIONS {
        uuid id PK
        uuid assignment_id FK
        uuid student_id FK
        string file_link
        float obtained_points
        timestamp submitted_at
        enum status "PENDING, GRADED, LATE"
    }

    FEE_PAYMENTS {
        uuid id PK
        uuid student_id FK
        float amount
        string transaction_id UK
        enum payment_status "SUCCESS, FAILED, PENDING"
        timestamp paid_at
    }

    NOTIFICATIONS {
        uuid id PK
        uuid user_id FK
        string message
        enum channel "PUSH, EMAIL, SMS"
        boolean is_read
        timestamp created_at
    }
```

## Table Descriptions

| Entity | Description | Core Responsibility |
| :--- | :--- | :--- |
| **USERS** | Core identity table. | Authentication and identity management. |
| **DEPARTMENTS** | University departments. | Organizational unit management. |
| **COURSES** | Academic subjects. | Curriculum definition. |
| **SECTIONS** | Specific instances of courses. | Scheduling and instructor assignment. |
| **ENROLLMENTS** | Student-Course mapping. | Registration and grading. |
| **FEE_PAYMENTS** | Financial records. | Revenue and fee tracking. |
| **NOTIFICATIONS** | Messaging system. | Real-time user alerting. |
