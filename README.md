# eMart Microservices Application

A production-grade, containerized microservices application built using **Angular**, **Node.js**, **Java**, **MongoDB**, **MySQL**, and **Nginx**.  
The system is deployed using **Docker Compose** and optionally integrates CI/CD using **Jenkins**.

---

## 1. Overview

This repository contains the complete microservices ecosystem for the eMart Application, including:

- Angular Client Application  
- Node.js eMart API (MongoDB)  
- Java Books API (MySQL)  
- Nginx API Gateway  
- kkartchart analytics module  
- Docker Compose deployment  
- Jenkins pipeline configuration  

---

## 2. Repository Structure

---
```
.
├── architecture-diagram/      # Architecture diagrams (PNG/SVG)
├── javaapi/                   # Java Books API (Microservice)
├── nodeapi/                   # Node.js eMart API (Microservice)
├── client/                    # Angular frontend application
├── nginx/                     # API Gateway (reverse proxy)
├── kkartchart/                # Chart analytics service
│
├── Dockerfile                 # Optional global Dockerfile
├── Jenkinsfile                # CI/CD pipeline definition
├── docker-compose.yaml        # Multi-service orchestration
├── package-lock.json          # Node dependency lockfile
└── README.md                  # Main documentation
```
---

## 3. Architecture

The system follows a microservices architecture with an Nginx API Gateway that routes traffic to all backend services.

### Routing Table

| Route Prefix | Service | Technology |
|--------------|----------|-------------|
| `/` | Angular Client | Angular |
| `/api/*` | eMart API | Node.js + MongoDB |
| `/webapi/*` | Books API | Java + MySQL |
| `/charts/*` | kkartchart | Node.js |

Architecture diagrams are stored in:

```
architecture-diagram/
```

---

## 4. Technology Stack

### Frontend
- Angular

### Backend APIs
- Node.js + Express + Mongoose  
- Java (Spring Boot / JAX-RS)

### Databases
- MongoDB (for eMart API)  
- MySQL (for Books API)

### Infrastructure
- Nginx API Gateway  
- Docker  
- Docker Compose  
- Jenkins CI/CD

---

## 5. Running the Application

### Prerequisites
- Docker   
- Docker Compose
- NodeJS (optional for local dev)
- Java 8+ (optional for local dev)


### Start all services

```
docker compose up -d --build
```

### Stop all services

```
docker compose down
```

---

## 6. Access URLs

| Service | URL |
|---------|------|
| Angular Client | http://localhost/ |
| eMart API | http://localhost/api |
| Books API | http://localhost/webapi |
| Charts Service | http://localhost/charts |
| Nginx Gateway | http://localhost/ |

---

## 7. CI/CD Pipeline (Jenkins)

The included `Jenkinsfile` automates:

- Building Angular, Node.js, and Java applications  
- Creating Docker images  
- Deploying using Docker Compose  

To use:

1. Create a Jenkins Pipeline job  
2. Link this Git repository  
3. Ensure the Jenkins agent has Docker installed  

---

## 8. Future Enhancements

- Kubernetes deployment  
- Centralized logging (ELK / Loki)  
- Monitoring with Prometheus + Grafana  
- JWT authentication  
- API rate limiting  

---

## 9. License

This project is intended for demonstration purposes.



