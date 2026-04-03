# 🧠 Emart DevOps Architecture — Design & Decisions

This document explains the **architecture, design choices, and trade-offs** behind the Emart DevOps platform.

---

## 🎯 Objective

The goal of this project is to simulate a **production-like DevOps environment** using cost-efficient infrastructure while demonstrating:

* CI/CD automation
* GitOps deployment model
* Kubernetes orchestration
* Observability and security practices

---

## 🏗️ High-Level Architecture

![Architecture](../architecture-diagram/emartapp_architecture.png)

---

## 🧩 System Components

### 1. Application Layer

| Service  | Technology  | Responsibility                |
| -------- | ----------- | ----------------------------- |
| Frontend | Angular     | UI layer                      |
| Node API | Node.js     | Product/catalog services      |
| Java API | Spring Boot | Business logic & transactions |

---

### 2. Data Layer

| Database | Used By  |
| -------- | -------- |
| MongoDB  | Node API |
| MySQL    | Java API |

---

### 3. Containerization

* Each service is containerized using Docker
* Images are built independently
* Stored in Docker Hub

**Why?**

* Portability across environments
* Standardized runtime
* Enables CI/CD automation

---

### 4. Kubernetes (k3s)

* Lightweight Kubernetes distribution
* 1 Master + 1 Worker node setup

**Why k3s instead of EKS?**

* Cost-effective for portfolio
* Faster setup
* Still production-relevant concepts

---

### 5. CI Pipeline (GitHub Actions)

Pipeline stages:

1. Build Docker images
2. Scan with Trivy
3. Push to Docker Hub
4. Update GitOps repository

**Why GitHub Actions?**

* Native GitHub integration
* Easy to demonstrate CI workflows

---

### 6. GitOps (ArgoCD)

* Kubernetes manifests stored in separate repo (`emart-gitops`)
* ArgoCD continuously syncs desired state

**Why GitOps?**

* Declarative infrastructure
* Version-controlled deployments
* Easy rollback and audit

---

### 7. Ingress & Networking

* Traefik (default in k3s)
* Routes:

  * `/` → frontend
  * `/api` → node-api
  * `/webapi` → java-api

**Why Traefik?**

* Lightweight
* Native integration with k3s

---

### 8. Observability

| Tool         | Purpose            |
| ------------ | ------------------ |
| Prometheus   | Metrics collection |
| Grafana      | Visualization      |
| Alertmanager | Alerting           |

**Why this stack?**

* Industry standard
* Kubernetes-native monitoring

---

### 9. Security

* Trivy used for image scanning
* Non-root containers
* Secrets externalized

**Why Trivy?**

* Fast, open-source, CI-friendly

---

## 🔄 End-to-End Workflow

```text
Developer Pushes Code
        ↓
GitHub Actions (CI)
        ↓
Docker Images Built & Scanned
        ↓
Images Pushed to Docker Hub
        ↓
GitOps Repo Updated
        ↓
ArgoCD Detects Changes
        ↓
Kubernetes Cluster Updated
```

---

## ⚖️ Design Trade-offs

### 1. k3s vs EKS

| Choice         | Reason                    |
| -------------- | ------------------------- |
| k3s            | Lower cost, simpler setup |
| EKS (not used) | Expensive for portfolio   |

---

### 2. In-cluster DB vs Managed DB

| Choice         | Reason                 |
| -------------- | ---------------------- |
| In-cluster DB  | Simpler setup          |
| RDS (not used) | Adds cost & complexity |

---

### 3. Docker Hub vs ECR

| Choice         | Reason              |
| -------------- | ------------------- |
| Docker Hub     | Simpler integration |
| ECR (not used) | AWS-specific        |

---

### 4. GitOps Repo Separation

| Choice        | Reason                       |
| ------------- | ---------------------------- |
| Separate repo | Clean separation of concerns |

---

## 📈 Scalability Considerations

Currently:

* Fixed replicas
* Single cluster

Future improvements:

* Horizontal Pod Autoscaler (HPA)
* Multi-environment setup (dev/stage/prod)
* External databases (RDS)
* Load testing

---

## 🔐 Security Considerations

* Avoid hardcoded credentials
* Use environment variables / secrets
* Scan images before deployment
* Least privilege access (future improvement)

---

## 🧠 Key Takeaways

This project demonstrates:

* End-to-end CI/CD automation
* GitOps-based deployments
* Kubernetes orchestration
* Observability integration
* Security best practices

---

## 🚀 Future Enhancements

* Helm/Kustomize standardization
* External Secrets / Vault
* Canary deployments
* Advanced alerting (Slack/Email)
* Service mesh (Istio/Linkerd)

---

## 📌 Conclusion

This architecture reflects how modern DevOps teams:

* Build
* Deploy
* Monitor
* Secure

applications in a cloud-native environment.

---
