# Quick Start Guide - Wakanda Bank

> **Deploy in under 16 minutes!**

## Prerequisites Check

Before starting, ensure you have:

- [ ] Docker installed (20.10+)
- [ ] Docker Compose installed (1.29+ or Docker Compose V2)
- [ ] Git installed
- [ ] Ports 3000 and 5000 available

Check your Docker version:
```bash
docker --version
docker compose version
```

## 1-Minute Quick Deploy

```bash
# Clone the repository
git clone https://github.com/Vundla/wakanda-bank-ai.git
cd wakanda-bank-ai

# Deploy everything
docker compose up -d

# Verify it's running
curl http://localhost:5000/health
```

**Done!** Access the app at: http://localhost:3000

## Testing the API

### Health Check
```bash
curl http://localhost:5000/health
```

### Get All Users
```bash
curl http://localhost:5000/api/users
```

### Get All Transactions
```bash
curl http://localhost:5000/api/transactions
```

### Create a New User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "M'Baku",
    "email": "mbaku@jabari.wakanda",
    "balance": 1000000,
    "accountType": "Tribal"
  }'
```

### Create a Transaction
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "type": "deposit",
    "amount": 100000,
    "description": "Monthly stipend"
  }'
```

## Viewing Logs

```bash
# All services
docker compose logs -f

# Just backend
docker compose logs -f backend

# Just frontend
docker compose logs -f frontend
```

## Stopping the Application

```bash
# Stop services (keeps data)
docker compose stop

# Stop and remove containers
docker compose down

# Remove everything including volumes
docker compose down -v
```

## Troubleshooting

### Port 5000 Already in Use
```bash
# Find what's using it
lsof -i :5000

# Kill the process or change the port in docker-compose.yml
```

### Services Not Starting
```bash
# Check logs
docker compose logs

# Rebuild from scratch
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Can't Connect to Backend
```bash
# Verify backend is running
docker compose ps

# Check backend logs
docker compose logs backend

# Test health endpoint
curl http://localhost:5000/health
```

## Architecture Overview

```
┌─────────────────┐
│   Browser       │
│  (Port 3000)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Frontend      │
│   (React +      │
│    Nginx)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Backend       │
│   (Express.js)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Mock DB       │
│   (world_DB)    │
│   In-Memory     │
└─────────────────┘
```

## What's Included

### Backend Features
- ✅ RESTful API with Express.js
- ✅ Mock world_DB database (no setup needed)
- ✅ Circuit breaker pattern
- ✅ Retry logic on failures
- ✅ Rate limiting (100 req/15min)
- ✅ Security headers (Helmet.js)
- ✅ Health monitoring
- ✅ Graceful shutdown

### Frontend Features
- ✅ React dashboard
- ✅ User management UI
- ✅ Transaction viewer
- ✅ Real-time health status
- ✅ Error boundaries
- ✅ Automatic retries
- ✅ Responsive design

### DevOps Features
- ✅ Docker containerization
- ✅ Docker Compose orchestration
- ✅ Health checks
- ✅ Auto-restart policies
- ✅ Volume persistence
- ✅ Network isolation

## Philosophy

> "Resilience and fault tolerance is the way of a wild hare"
> - Rev. Corrine McClinton

This application is designed for:
- **Speed**: Deploy in under 16 minutes
- **Resilience**: Automatic recovery from failures
- **Simplicity**: No complex database setup
- **Security**: Multiple layers of protection

## Database Information

- **Name**: world_DB
- **Schema**: public
- **Password**: Mv@8
- **Type**: Mock (in-memory)
- **Philosophy**: "All database belong to the world"

## Next Steps

1. ✅ Deploy the application
2. ✅ Test the API endpoints
3. ✅ Explore the frontend UI
4. ✅ Create users and transactions
5. ✅ Monitor health status
6. 📖 Read the full README.md for details

## Support

Need help? Check:
1. The troubleshooting section above
2. Docker logs: `docker compose logs`
3. Health endpoint: http://localhost:5000/health
4. Full documentation in README.md

---

**Official Stamp**: Rev. Corrine McClinton  
*"Defeated man don't see that they are already defeated. Resilience is the way."*
