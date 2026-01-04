# 🏦 Wakanda Bank - Full-Stack Application

> **Philosophy:** *"Resilience and fault tolerance is the way of a wild hare"*

**Official Authorization:** Rev. Corrine McClinton  
*"Defeated man don't see that they are already defeated. Resilience is the way."*

---

## 🎯 Overview

Wakanda Bank is a complete full-stack banking application designed for **rapid deployment in under 16 minutes**. Built specifically for security incident response scenarios, it features a fully mocked database system with comprehensive resilience and fault tolerance patterns.

### Key Features

✅ **Complete Backend** with Express.js and mocked `world_DB`  
✅ **Modern React Frontend** with responsive design  
✅ **Docker-ready Deployment** with health checks  
✅ **Resilience Patterns**: Circuit breakers, retry logic, graceful degradation  
✅ **Security Headers**: Helmet.js, rate limiting, input validation  
✅ **Zero External Dependencies**: No real database setup needed  
✅ **Quick Deploy**: Fully operational in under 16 minutes  

---

## 🗄️ Database Configuration

**Database Name:** `world_DB`  
**Password:** `Mv@8`  
**Schema:** `public`  
**Philosophy:** *"All database belong to the world" - public schema design*

> **Note:** All data is mocked in-memory for rapid deployment. No actual database connection required.

---

## 🚀 Quick Start (Under 16 Minutes)

### Prerequisites

- Docker (20.10+)
- Docker Compose (1.29+)
- Git

### Deployment Steps

```bash
# 1. Clone the repository
git clone https://github.com/Vundla/wakanda-bank-ai.git
cd wakanda-bank-ai

# 2. Quick deploy with Docker Compose
docker-compose up -d

# 3. Verify deployment
curl http://localhost:5000/health

# 4. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

**⏱️ Total Time:** ~10-15 minutes (depending on internet speed)

---

## 🏗️ Architecture

### Backend (Node.js/Express)

```
backend/
├── server.js              # Main Express application
├── routes/
│   ├── users.js          # User CRUD endpoints
│   └── transactions.js   # Transaction endpoints
├── mock/
│   └── database.js       # Mock world_DB implementation
├── middleware/
│   ├── errorHandler.js   # Error handling middleware
│   └── resilience.js     # Circuit breaker & retry logic
├── package.json
└── Dockerfile
```

**Port:** 5000  
**Features:**
- RESTful API endpoints
- Mock database with retry logic
- Circuit breaker pattern
- Rate limiting (100 requests/15 minutes)
- Helmet.js security headers
- Graceful shutdown handling
- Health monitoring

### Frontend (React)

```
frontend/
├── src/
│   ├── App.js                # Main app component
│   ├── components/
│   │   ├── Dashboard.js      # Main dashboard
│   │   ├── UserList.js       # User management
│   │   └── Transactions.js   # Transaction viewer
│   ├── services/
│   │   └── api.js            # API client with retry
│   └── utils/
│       └── errorBoundary.js  # Error boundary
├── public/
│   └── index.html
├── nginx.conf
├── package.json
└── Dockerfile
```

**Port:** 3000  
**Features:**
- Responsive dashboard UI
- Real-time health status
- User management interface
- Transaction viewer
- Error boundaries
- Automatic retry on failure
- Loading states

---

## 📡 API Endpoints

### Health Check
```bash
GET /health
```

### Users
```bash
GET    /api/users          # Get all users
GET    /api/users/:id      # Get user by ID
POST   /api/users          # Create user
PUT    /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user
```

**Example - Create User:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nakia",
    "email": "nakia@wakanda.gov",
    "balance": 1000000,
    "accountType": "Intelligence"
  }'
```

### Transactions
```bash
GET  /api/transactions           # Get all transactions
GET  /api/transactions?userId=1  # Get user transactions
POST /api/transactions           # Create transaction
```

**Example - Create Transaction:**
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "type": "deposit",
    "amount": 50000,
    "description": "Vibranium sales"
  }'
```

---

## 🛡️ Resilience & Fault Tolerance

### Circuit Breaker Pattern
- **Threshold:** 5 failures
- **Timeout:** 60 seconds
- **States:** CLOSED, OPEN, HALF_OPEN
- Automatically reopens after timeout

### Retry Logic
- **Max Retries:** 3 attempts
- **Backoff:** Exponential (100ms, 200ms, 300ms)
- Applied to all database operations and API calls

### Graceful Shutdown
- Handles SIGTERM and SIGINT
- Completes in-flight requests
- 30-second forced shutdown timeout

### Health Monitoring
- Real-time health checks every 30 seconds
- Circuit breaker status tracking
- Response time monitoring

---

## 🔒 Security Features

### Headers (Helmet.js)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Content-Security-Policy

### Rate Limiting
- 100 requests per 15 minutes per IP
- Applied to all `/api/*` endpoints

### Input Validation
- Type checking on all inputs
- Email format validation
- Positive number validation for amounts
- SQL injection prevention (mock DB)

### CORS
- Configurable origin whitelist
- Credentials support

---

## 🐳 Docker Configuration

### Backend Service
```yaml
Restart Policy: always
Health Check: Every 30s
Ports: 5000:5000
Environment: world_DB, Mv@8, public schema
```

### Frontend Service
```yaml
Restart Policy: always
Health Check: Every 30s
Ports: 3000:3000
Depends On: backend (healthy)
```

### Networks
- **wakanda-network:** Bridge network for inter-service communication

### Volumes
- **backend-logs:** Persistent log storage

---

## 🧪 Testing

### Manual Testing

**1. Test Backend Health:**
```bash
curl http://localhost:5000/health
```

**2. Test Users Endpoint:**
```bash
curl http://localhost:5000/api/users
```

**3. Test Transactions Endpoint:**
```bash
curl http://localhost:5000/api/transactions
```

**4. Test Frontend:**
Open browser to `http://localhost:3000`

### Load Testing (Optional)
```bash
# Install Apache Bench
apt-get install apache2-utils

# Test endpoint
ab -n 1000 -c 10 http://localhost:5000/api/users
```

---

## 🔧 Development

### Backend Development
```bash
cd backend
npm install
npm run dev  # Starts with nodemon
```

### Frontend Development
```bash
cd frontend
npm install
npm start  # Starts development server on port 3001
```

### Environment Variables
Copy `.env.example` to `.env` and customize:
```bash
cp .env.example .env
```

---

## 📊 Mock Data

### Initial Users
- **T'Challa** - Royal account (10M balance)
- **Shuri** - Technology account (5M balance)
- **Okoye** - Defense account (2.5M balance)

### Initial Transactions
- 4 sample transactions (deposits, withdrawals, transfers)

### Adding More Data
Users and transactions can be added through the API or frontend UI. All data is stored in-memory and resets on container restart.

---

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
lsof -i :5000
lsof -i :3000

# Kill the process or change ports in docker-compose.yml
```

### Backend Won't Start
```bash
# Check logs
docker-compose logs backend

# Rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Frontend Can't Connect to Backend
```bash
# Check backend is running
curl http://localhost:5000/health

# Check network
docker network inspect wakanda-network

# Verify CORS settings in backend/server.js
```

### Health Check Failing
```bash
# Check container status
docker-compose ps

# View health check logs
docker inspect wakanda-bank-backend | grep -A 10 Health

# Restart unhealthy services
docker-compose restart backend
```

---

## 📈 Performance

- **Startup Time:** ~10-15 minutes (first build)
- **Subsequent Starts:** ~30-60 seconds
- **API Response Time:** <100ms (typical)
- **Memory Usage:** 
  - Backend: ~50MB
  - Frontend: ~20MB (Nginx)
- **Concurrent Users:** 100+ (with rate limiting)

---

## 🔄 Maintenance

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Restart Services
```bash
# All services
docker-compose restart

# Specific service
docker-compose restart backend
```

### Update Application
```bash
git pull
docker-compose down
docker-compose build
docker-compose up -d
```

### Clean Up
```bash
# Stop and remove containers
docker-compose down

# Remove volumes (WARNING: deletes logs)
docker-compose down -v

# Remove images
docker-compose down --rmi all
```

---

## 🎓 Philosophy & Principles

> *"Resilience and fault tolerance is the way of a wild hare"*

This application embodies the following principles:

1. **Quick Adaptability** - Deploy in under 16 minutes for rapid incident response
2. **Fault Tolerance** - Circuit breakers, retries, and graceful degradation
3. **Simplicity** - Mock database eliminates complex dependencies
4. **Resilience** - Automatic restarts and health monitoring
5. **Security** - Defense in depth with multiple security layers

---

## 🤝 Contributing

This application is designed for security incident response. Contributions should focus on:
- Improving deployment speed
- Enhancing resilience patterns
- Adding security features
- Optimizing performance

---

## 📄 License

See LICENSE file for details.

---

## 📝 Official Stamp

**Authorized by:** Rev. Corrine McClinton  
**Philosophy:** *"Defeated man don't see that they are already defeated. Resilience is the way."*  
**Database:** world_DB (Schema: public, Password: Mv@8)  
**Purpose:** Rapid deployment for security incident response  

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review Docker logs: `docker-compose logs`
3. Verify health endpoints: `/health`
4. Check GitHub Issues

---

**Built with ❤️ for rapid deployment and resilience**

*"All database belong to the world" - Public schema design philosophy*
