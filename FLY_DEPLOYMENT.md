# 🚀 Fly.io Deployment Guide - Wakanda Bank

> **Philosophy:** *"Resilience and fault tolerance is the way of a wild hare"*  
> **Authorized by:** Rev. Corrine McClinton

---

## Quick Deploy to Fly.io (5-10 minutes)

### Prerequisites

1. **Install Fly CLI**
   ```bash
   # macOS/Linux
   curl -L https://fly.io/install.sh | sh
   
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Sign up and Login**
   ```bash
   # Create account (if you don't have one)
   fly auth signup
   
   # Or login to existing account
   fly auth login
   ```

---

## Backend Deployment

### Step 1: Deploy Backend API

```bash
# Navigate to repository root
cd wakanda-bank-ai

# Launch the backend app (uses fly.toml configuration)
fly launch --config fly.toml --copy-config --yes

# Or if already created, just deploy
fly deploy
```

The backend will be deployed with:
- ✅ Mock `world_DB` database (password: `Mv@8`, schema: `public`)
- ✅ Health checks on `/health`
- ✅ Automatic HTTPS
- ✅ 256MB RAM, 1 shared CPU
- ✅ Circuit breaker and resilience patterns

### Step 2: Get Backend URL

```bash
# Get your backend URL
fly info

# Test the deployment
curl https://wakanda-bank-backend.fly.dev/health
```

Your backend will be available at: `https://wakanda-bank-backend.fly.dev`

---

## Frontend Deployment (Optional)

For the frontend, you have two options:

### Option A: Deploy Frontend to Fly.io

1. **Create frontend Fly.io config**
   
   Create `fly-frontend.toml`:
   ```toml
   app = "wakanda-bank-frontend"
   primary_region = "iad"
   
   [build]
     dockerfile = "frontend/Dockerfile"
   
   [env]
     REACT_APP_API_URL = "https://wakanda-bank-backend.fly.dev"
   
   [http_service]
     internal_port = 3000
     force_https = true
     auto_stop_machines = false
     auto_start_machines = true
     min_machines_running = 1
   
   [[vm]]
     memory = "256mb"
     cpu_kind = "shared"
     cpus = 1
   ```

2. **Deploy frontend**
   ```bash
   fly launch --config fly-frontend.toml --copy-config --yes
   fly deploy --config fly-frontend.toml
   ```

### Option B: Use Static Hosting (Recommended for Frontend)

Since the frontend is static React app, you can use:
- **Vercel** (easiest, automatic deploys)
- **Netlify** (great for static sites)
- **Cloudflare Pages** (fast, global CDN)

---

## Environment Variables

If you need to set secrets (though our app uses mock data):

```bash
# Set environment variables
fly secrets set DB_PASSWORD=Mv@8
fly secrets set DB_NAME=world_DB

# List all secrets
fly secrets list
```

---

## Monitoring & Logs

### View Logs
```bash
# Stream logs in real-time
fly logs

# Get recent logs
fly logs --tail=100
```

### Monitor Status
```bash
# Check app status
fly status

# View app info
fly info

# Check health
fly checks list
```

### Dashboard
Visit: https://fly.io/dashboard/

---

## Scaling

### Scale Vertically (More Resources)
```bash
# Increase memory
fly scale memory 512

# View current VM size
fly scale show
```

### Scale Horizontally (More Instances)
```bash
# Add more instances for high availability
fly scale count 2

# Scale to specific regions
fly regions add lax ord
```

---

## Cost Estimation

**Free Tier Includes:**
- 3 shared-cpu-1x VMs with 256MB RAM
- 160GB bandwidth per month
- Perfect for this application!

**Current Configuration:**
- Backend: 1 VM × 256MB = **FREE** ✅
- Estimated cost: **$0/month** (within free tier)

---

## Custom Domain (Optional)

### Add Your Domain
```bash
# Add custom domain
fly certs add wakandabank.yourdomain.com

# Check certificate status
fly certs check wakandabank.yourdomain.com
```

### DNS Configuration
Add these records to your DNS:
```
CNAME wakandabank.yourdomain.com -> wakanda-bank-backend.fly.dev
```

---

## API Endpoints

Once deployed, your API will be available at:

```
https://wakanda-bank-backend.fly.dev
```

### Test Endpoints

**Health Check:**
```bash
curl https://wakanda-bank-backend.fly.dev/health
```

**Get Users:**
```bash
curl https://wakanda-bank-backend.fly.dev/api/users
```

**Get Transactions:**
```bash
curl https://wakanda-bank-backend.fly.dev/api/transactions
```

**Create User:**
```bash
curl -X POST https://wakanda-bank-backend.fly.dev/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nakia",
    "email": "nakia@wakanda.gov",
    "balance": 1000000,
    "accountType": "Intelligence"
  }'
```

---

## Troubleshooting

### App Won't Start
```bash
# Check logs for errors
fly logs

# SSH into the machine
fly ssh console

# Restart the app
fly apps restart wakanda-bank-backend
```

### Health Check Failing
```bash
# Check health endpoint manually
fly ssh console -C "wget -O- http://localhost:5000/health"

# View detailed status
fly status --all
```

### Deployment Failed
```bash
# Redeploy with verbose output
fly deploy --verbose

# Check machine status
fly machine list
```

### Update Configuration
```bash
# After editing fly.toml
fly deploy

# Restart to apply changes
fly apps restart
```

---

## Updating the Application

### Deploy New Version
```bash
# Pull latest changes
git pull

# Deploy update
fly deploy

# Or with zero-downtime
fly deploy --strategy rolling
```

### Rollback
```bash
# List releases
fly releases

# Rollback to previous version
fly releases rollback
```

---

## Cleanup (If Needed)

### Destroy App
```bash
# Delete the app completely
fly apps destroy wakanda-bank-backend

# Confirm deletion
yes
```

---

## Quick Reference Commands

```bash
# Deploy
fly deploy

# Logs
fly logs

# Status
fly status

# SSH Access
fly ssh console

# Restart
fly apps restart

# Scale
fly scale count 2

# Open in browser
fly open

# Dashboard
fly dashboard
```

---

## Architecture on Fly.io

```
┌─────────────────────────────────────────┐
│         Fly.io Global Network           │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │   wakanda-bank-backend.fly.dev    │ │
│  │                                   │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │  Express.js API Server      │ │ │
│  │  │  - Port 5000 → 443          │ │ │
│  │  │  - Auto HTTPS               │ │ │
│  │  │  - Health Checks            │ │ │
│  │  └─────────────────────────────┘ │ │
│  │                                   │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │  Mock world_DB              │ │ │
│  │  │  - In-Memory                │ │ │
│  │  │  - Schema: public           │ │ │
│  │  └─────────────────────────────┘ │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Features:                              │
│  ✅ Auto SSL/TLS                        │
│  ✅ Health Monitoring                   │
│  ✅ Auto Restart                        │
│  ✅ Global CDN                          │
│  ✅ DDoS Protection                     │
└─────────────────────────────────────────┘
```

---

## Success Criteria

Once deployed, verify:

- ✅ Health endpoint returns 200: `https://wakanda-bank-backend.fly.dev/health`
- ✅ Users endpoint works: `https://wakanda-bank-backend.fly.dev/api/users`
- ✅ Transactions endpoint works: `https://wakanda-bank-backend.fly.dev/api/transactions`
- ✅ HTTPS is enabled
- ✅ Health checks are passing
- ✅ App is running in production mode

---

## Next Steps

1. ✅ Deploy backend to Fly.io
2. ✅ Test all API endpoints
3. 🔄 Deploy frontend (optional)
4. 🔄 Set up custom domain (optional)
5. 🔄 Configure monitoring alerts (optional)

---

## Support & Resources

- **Fly.io Docs:** https://fly.io/docs/
- **Fly.io Discord:** https://fly.io/discord
- **Fly.io Status:** https://status.fly.io/

---

**Official Stamp:** Rev. Corrine McClinton  
*"Defeated man don't see that they are already defeated. Resilience is the way."*

**Database:** world_DB • **Schema:** public • **Password:** Mv@8  
**Philosophy:** "Resilience and fault tolerance is the way of a wild hare"
