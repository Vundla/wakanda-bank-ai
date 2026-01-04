#!/bin/bash

###############################################################################
# Wakanda Bank - Quick Deployment Test Script
# Philosophy: "Resilience and fault tolerance is the way of a wild hare"
# Authorized by: Rev. Corrine McClinton
###############################################################################

set -e  # Exit on error

echo "============================================================"
echo "🏦 Wakanda Bank - Quick Deployment Test"
echo "============================================================"
echo ""
echo "Testing deployment time (target: under 16 minutes)"
echo ""

START_TIME=$(date +%s)

# Function to calculate elapsed time
elapsed_time() {
    END_TIME=$(date +%s)
    ELAPSED=$((END_TIME - START_TIME))
    MINUTES=$((ELAPSED / 60))
    SECONDS=$((ELAPSED % 60))
    echo "⏱️  Elapsed time: ${MINUTES}m ${SECONDS}s"
}

echo "Step 1: Validating Docker Compose configuration..."
docker compose config --quiet
echo "✅ Configuration valid"
elapsed_time
echo ""

echo "Step 2: Building images..."
docker compose build --progress=plain
echo "✅ Images built successfully"
elapsed_time
echo ""

echo "Step 3: Starting services..."
docker compose up -d
echo "✅ Services started"
elapsed_time
echo ""

echo "Step 4: Waiting for services to be healthy..."
MAX_WAIT=120  # 2 minutes max
WAITED=0
while [ $WAITED -lt $MAX_WAIT ]; do
    if docker compose ps | grep -q "healthy"; then
        echo "✅ Services are healthy"
        break
    fi
    sleep 5
    WAITED=$((WAITED + 5))
    echo "   Waiting... (${WAITED}s)"
done

if [ $WAITED -ge $MAX_WAIT ]; then
    echo "⚠️  Warning: Services may not be fully healthy yet"
fi
elapsed_time
echo ""

echo "Step 5: Testing API endpoints..."

# Test health endpoint
echo "   Testing /health..."
HEALTH_RESPONSE=$(curl -s http://localhost:5000/health)
if echo "$HEALTH_RESPONSE" | grep -q "healthy"; then
    echo "   ✅ Health check passed"
else
    echo "   ❌ Health check failed"
    exit 1
fi

# Test users endpoint
echo "   Testing /api/users..."
USERS_RESPONSE=$(curl -s http://localhost:5000/api/users)
if echo "$USERS_RESPONSE" | grep -q "success"; then
    echo "   ✅ Users endpoint working"
else
    echo "   ❌ Users endpoint failed"
    exit 1
fi

# Test transactions endpoint
echo "   Testing /api/transactions..."
TRANS_RESPONSE=$(curl -s http://localhost:5000/api/transactions)
if echo "$TRANS_RESPONSE" | grep -q "success"; then
    echo "   ✅ Transactions endpoint working"
else
    echo "   ❌ Transactions endpoint failed"
    exit 1
fi

elapsed_time
echo ""

echo "Step 6: Deployment Summary"
echo "============================================================"
docker compose ps
echo "============================================================"
elapsed_time
echo ""

END_TIME=$(date +%s)
TOTAL_TIME=$((END_TIME - START_TIME))
TOTAL_MINUTES=$((TOTAL_TIME / 60))
TOTAL_SECONDS=$((TOTAL_TIME % 60))

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo "============================================================"
echo "Total deployment time: ${TOTAL_MINUTES}m ${TOTAL_SECONDS}s"
echo ""

if [ $TOTAL_TIME -lt 960 ]; then  # 16 minutes = 960 seconds
    echo "✅ SUCCESS: Deployed in under 16 minutes!"
else
    echo "⚠️  WARNING: Deployment took longer than 16 minutes"
fi

echo ""
echo "🌐 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo "   Health: http://localhost:5000/health"
echo ""
echo "Philosophy: 'Resilience and fault tolerance is the way of a wild hare'"
echo "Authorized by: Rev. Corrine McClinton"
echo "============================================================"
