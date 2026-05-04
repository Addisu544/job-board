**Job Board System**

A production-oriented job platform built with Node.js, Express, Prisma, and React, designed around role-controlled workflows, structured hiring pipelines, and consistent application lifecycle management.

**Overview**

This system models the hiring process as a controlled multi-actor workflow, where

- recruiters manage job lifecycles
- employees apply and track progress
- admins oversee system integrity

Rather than simple CRUD operations, the platform enforces:
- role-based boundaries
- state-driven transitions
- data consistency across relationships

**Problem It Solves**
- Unstructured hiring processes with no lifecycle control
- Lack of visibility into application status
- Weak separation between recruiter and candidate responsibilities
- No centralized system for managing job postings and applications

  **Solution**
  
This application introduces a role-aware hiring pipeline, where:
- job creation, application, and evaluation follow explicit transitions
- access is restricted using RBAC at API level
- relationships between users, jobs, and applications are strictly enforced

 **Architecture**
 
Built using a layered backend + modular frontend architecture:

Client (React + MUI)

↓

REST API (Express)

↓

Application Logic (Controllers / Services)

↓

Data Layer (Prisma ORM)

↓

PostgreSQL






 **Tech Stack**
 
**Backend**

- Node.js + Express 5
- Prisma ORM
- PostgreSQL
- JWT Authentication
- BCrypt Password Hashing
- Multer (CV Upload Handling)

**Frontend**

- React 18 + Vite
- Material UI (MUI)
- React Router
- Axios
- React Context (Auth State)




**Security & Access Control**
  
- JWT-based authentication (7-day expiry)
- Role-Based Access Control (RBAC):
  - ADMIN
  - RECRUITER
  - EMPLOYEE
- Route-level and controller-level protection
- Secure password hashing (bcrypt)






   **Core Domain Model**
  
**Users**

- Central identity with role + status
- One-to-one profile mapping
- Recruiter Profile
- Company metadata
- Owns job postings
- Employee Profile
- Skills, CV, experience
- Owns job applications



**Jobs**

- Created by recruiters
- Controlled lifecycle: OPEN → HIRED / CLOSED
- Applications
- Unique per (job, employee)



**Lifecycle**:

PENDING → SHORTLISTED → PASSED / DECLINED




**Core Features**

** Multi-Role System**
- Admin, Recruiter, Employee workflows fully separated
- Role-aware routing and UI rendering

**Job Management**

- Recruiters create and manage jobs
- Job lifecycle enforcement (OPEN → CLOSED/HIRED)
- Profile completeness validation before posting

**Application Workflow**

- Employees apply with cover letter
- One application per job constraint
- Recruiters evaluate and update status


  **CV Upload System**
  
- File upload using Multer
- Persistent CV storage
- Linked to employee profiles


  **Dashboards**
  
- Recruiter: jobs, applicants, profile management
- Employee: application tracking by status
- Admin: system stats + user management


**Frontend Highlights**

- Role-based navigation and protected routes
- Lazy loading + route-level code splitting
- Animated transitions (Framer Motion)
- Data-driven UI components (cards, tables, dashboards)
- Toast-based feedback system



**Project Structure**

**Backend**

backend/

 ├── prisma/
 
 ├── src/
 
 │   ├── controllers/
 
 │   ├── middleware/
 
 │   ├── routes/
 
 │   ├── lib/
 
 │   └── app.js



**Frontend**

client/

 
 ├── src/
 
 │   ├── pages/
 
 │   ├── components/
 
 │   ├── context/
 
 │   ├── services/
 
 │   └── routes/


 **Key Workflows**
 
1. Authentication
Register → create user + profile
Login → JWT issued and stored
2. Job Creation (Recruiter)
Complete profile
Create job → stored with ownership
3. Job Application (Employee)
Browse jobs
Apply → application created (unique constraint enforced)
Track status via dashboard
4. Application Review (Recruiter)
View applicants per job
Update status through lifecycle



 **Data & Storage**
 
- PostgreSQL relational schema via Prisma
- Strong use of constraints (unique, relations)
- CV files stored in /uploads/cv




   **Key Highlights**
  
- Strong relational modeling with Prisma
- Explicit lifecycle-driven domain design
- RBAC enforced at middleware level
- Clean separation between authentication, business logic, and persistence
- Multi-role UI with isolated workflows




**Getting Started**

Prerequisites

Make sure you have:
- Node.js (v18+ recommended)
- PostgreSQL (running locally or via Docker)
- npm or yarn

**Environment Setup**

**Backend (/backend)**

Create a .env file:
```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/job_board"
JWT_SECRET="your jwt secret or this itself"
PORT=5000
```

Frontend (/client)
Create a .env file:
```
VITE_API_URL=http://localhost:5000/api
```
Installation & Run
1. Clone Repository
```
git clone https://github.com/Addisu544/job-board.git
cd job-board
```
2. Backend Setup
```
cd backend
npm install
npx prisma migrate dev
npm start
```
This will:

- Apply database migrations
- Start the API server on http://localhost:5000

3. Frontend Setup
```
cd client
npm install
npm run dev
```
(Optional) Docker Usage
```
docker pull addisu544/backend-api:latest
docker run -p 5000:5000 addisu544/backend-api
```

🔗 **Links**

GitHub:

https://github.com/Addisu544/job-board

Docker Image (Backend):

https://hub.docker.com/repository/docker/addisu544/backend-api

