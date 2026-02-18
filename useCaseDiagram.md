# Use Case Diagram — CampusOS

## Overview
This diagram shows all major use cases for the CampusOS platform, organized by the three primary actors: **Student**, **Teacher**, and **Admin**. It highlights the functional boundaries of the system and the core services each actor interacts with.

```mermaid
useCaseDiagram
    actor Student
    actor Teacher
    actor Admin

    package "Academic Management" {
        usecase "View Personal Profile" as UC1
        usecase "Browse Courses & Sections" as UC2
        usecase "Enroll in Section" as UC3
        usecase "Mark Hourly Attendance" as UC4
        usecase "View Attendance Stats" as UC5
        usecase "Submit Assignment" as UC6
        usecase "View Academic Progress" as UC7
    }

    package "Instructional Tools" {
        usecase "Create Assignment" as UC8
        usecase "Grade Submissions" as UC9
        usecase "Finalize Semester Grades" as UC10
        usecase "Generate Section Report" as UC11
    }

    package "AI & Utilities" {
        usecase "Query AI Chatbot" as UC12
        usecase "Receive Performance Alerts" as UC13
        usecase "Predict Student Success" as UC14
    }

    package "System Administration" {
        usecase "Manage User Roles" as UC15
        usecase "Configure Dept/Courses" as UC16
        usecase "Audit System Logs" as UC17
    }

    %% Student Relations
    Student --> UC1
    Student --> UC2
    Student --> UC3
    Student --> UC5
    Student --> UC6
    Student --> UC12
    Student --> UC13

    %% Teacher Relations
    Teacher --> UC4
    Teacher --> UC8
    Teacher --> UC9
    Teacher --> UC11
    Teacher --> UC10

    %% Admin Relations
    Admin --> UC15
    Admin --> UC16
    Admin --> UC17
    Admin --> UC14
    Admin --> UC11
```

## Use Case Descriptions

| # | Use Case | Actors | Description |
| :--- | :--- | :--- | :--- |
| **UC1** | Register / Login | All | Standard JWT-based authentication to enter the platform. |
| **UC2** | Browse Sections | Student | View available course sections based on current department and prerequisites. |
| **UC3** | Section Enrollment | Student | Securely register for a specific section, updating the global student capacity. |
| **UC4** | Mark Attendance | Teacher | Record student presence for a specific lecture hour. Triggers Kafka events. |
| **UC5** | Attendance Stats | Student | Real-time dashboard showing percentage of presence vs required thresholds. |
| **UC8** | Create Assignment | Teacher | Upload assignment meta-data and deadlines for specific sections. |
| **UC12** | AI Hub Chat | Student | Interact with the CampusOS LLM model for course queries or tech support. |
| **UC14** | Predict Success | Admin | Run ML models to identify students at risk of low performance or dropout. |
| **UC15** | Role Management | Admin | Assign or revoke TEACHER/STUDENT privileges across the distributed system. |
