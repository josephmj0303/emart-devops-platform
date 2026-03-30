# EMart Services Overview

This document defines all microservices in the EMart platform, including their roles, ports, and how they are exposed within the system.

---

## 🔹 Service Architecture

| Service Name | Component Type | Description                                         | Container Port | Kubernetes Exposure          |
| ------------ | -------------- | --------------------------------------------------- | -------------- | ---------------------------- |
| client       | Frontend       | Angular UI served via Nginx                         | 80             | Ingress                      |
| api          | Backend        | Node.js EMart API (handles products, users, orders) | 5000           | ClusterIP                    |
| webapi       | Backend        | Java Spring Boot Books API                          | 9000           | ClusterIP                    |
| nginx        | Gateway        | Reverse proxy / API Gateway                         | 80             | Ingress Controller (Traefik) |
| emongo       | Database       | MongoDB for Node API                                | 27017          | ClusterIP                    |
| emartdb      | Database       | MySQL for Java API                                  | 3306           | ClusterIP                    |

---

## 🔹 Networking Flow

Client → Ingress (Traefik) → Nginx (Gateway) → Services

* `/` → client (Angular UI)
* `/api` → Node.js API (MongoDB)
* `/webapi` → Java API (MySQL)

---

## 🔹 Key Notes

* Frontend is served via **Nginx (port 80)** in production (not Angular dev server).
* Databases are **not exposed externally** (ClusterIP only).
* Backend services communicate internally via Kubernetes DNS:

  * `api`
  * `webapi`
  * `emongo`
  * `emartdb`
* External access is routed through **Ingress (Traefik in k3s)**.

---

## 🔹 Future Enhancements

* Replace Nginx gateway with **Ingress-only routing**
* Add **Redis cache layer**
* Introduce **Horizontal Pod Autoscaling (HPA)**

---

