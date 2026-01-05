#!/bin/bash

###############################################################################
# Wakanda Bank - Fly.io Quick Deploy Script
# Philosophy: "Resilience and fault tolerance is the way of a wild hare"
# Authorized by: Rev. Corrine McClinton
###############################################################################

set -e  # Exit on error

echo "============================================================"
echo "🏦 Wakanda Bank - Fly.io Deployment"
echo "============================================================"
echo ""
echo "Philosophy: 'Resilience and fault tolerance is the way of a wild hare'"
echo "Authorized by: Rev. Corrine McClinton"
echo ""

# Check if Fly CLI is installed
if ! command -v fly &> /dev/null; then
    echo "❌ Fly CLI not found. Installing..."
    echo ""
    curl -L https://fly.io/install.sh | sh
    echo ""
    echo "✅ Fly CLI installed"
    echo "⚠️  Please restart your terminal and run this script again"
    exit 1
fi

echo "✅ Fly CLI found: $(fly version)"
echo ""

# Check if user is logged in
if ! fly auth whoami &> /dev/null; then
    echo "❌ Not logged in to Fly.io"
    echo ""
    echo "Please login first:"
    echo "  fly auth login"
    echo ""
    exit 1
fi

echo "✅ Logged in as: $(fly auth whoami)"
echo ""

# Ask which component to deploy
echo "What would you like to deploy?"
echo "1) Backend only (recommended first)"
echo "2) Frontend only"
echo "3) Both backend and frontend"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📦 Deploying Backend..."
        echo "============================================================"
        
        # Check if app exists
        if fly apps list | grep -q "wakanda-bank-backend"; then
            echo "App already exists, deploying update..."
            fly deploy --config fly.toml
        else
            echo "Creating new app..."
            fly launch --config fly.toml --copy-config --yes --now
        fi
        
        echo ""
        echo "✅ Backend deployed successfully!"
        echo ""
        echo "🌐 Backend URL: https://wakanda-bank-backend.fly.dev"
        echo ""
        echo "Testing health endpoint..."
        sleep 5
        curl -s https://wakanda-bank-backend.fly.dev/health | head -20
        echo ""
        ;;
    
    2)
        echo ""
        echo "📦 Deploying Frontend..."
        echo "============================================================"
        
        # Check if app exists
        if fly apps list | grep -q "wakanda-bank-frontend"; then
            echo "App already exists, deploying update..."
            fly deploy --config fly-frontend.toml
        else
            echo "Creating new app..."
            fly launch --config fly-frontend.toml --copy-config --yes --now
        fi
        
        echo ""
        echo "✅ Frontend deployed successfully!"
        echo ""
        echo "🌐 Frontend URL: https://wakanda-bank-frontend.fly.dev"
        echo ""
        ;;
    
    3)
        echo ""
        echo "📦 Deploying Backend..."
        echo "============================================================"
        
        # Deploy backend
        if fly apps list | grep -q "wakanda-bank-backend"; then
            fly deploy --config fly.toml
        else
            fly launch --config fly.toml --copy-config --yes --now
        fi
        
        echo ""
        echo "✅ Backend deployed!"
        echo ""
        echo "Waiting for backend to be ready..."
        sleep 10
        
        echo ""
        echo "📦 Deploying Frontend..."
        echo "============================================================"
        
        # Deploy frontend
        if fly apps list | grep -q "wakanda-bank-frontend"; then
            fly deploy --config fly-frontend.toml
        else
            fly launch --config fly-frontend.toml --copy-config --yes --now
        fi
        
        echo ""
        echo "✅ Both components deployed successfully!"
        echo ""
        echo "🌐 Backend URL: https://wakanda-bank-backend.fly.dev"
        echo "🌐 Frontend URL: https://wakanda-bank-frontend.fly.dev"
        echo ""
        ;;
    
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo "============================================================"
echo "🎉 Deployment Complete!"
echo "============================================================"
echo ""
echo "📝 Next steps:"
echo "1. Test your endpoints:"
echo "   curl https://wakanda-bank-backend.fly.dev/health"
echo "   curl https://wakanda-bank-backend.fly.dev/api/users"
echo ""
echo "2. View logs:"
echo "   fly logs --config fly.toml"
echo ""
echo "3. Check status:"
echo "   fly status --config fly.toml"
echo ""
echo "4. Open in browser:"
echo "   fly open --config fly.toml"
echo ""
echo "📚 Full documentation: See FLY_DEPLOYMENT.md"
echo ""
echo "Official Stamp: Rev. Corrine McClinton"
echo "Database: world_DB (Schema: public, Password: Mv@8)"
echo "============================================================"
