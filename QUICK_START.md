# Quick Start - Deploy to Render (5 Minutes)

## Fastest Way to Go Live

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy Backend (2 minutes)

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub and select your repository
4. Configure:
   - **Name**: `hybridai-server`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

5. **Add Environment Variable**:
   - Key: `OPENAI_API_KEY`
   - Value: `your-openai-api-key-here`

6. Click **"Create Web Service"**
7. **Wait for deployment** - copy your server URL (e.g., `https://hybridai-server.onrender.com`)

### Step 3: Deploy Frontend (2 minutes)

1. Still in Render dashboard, click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure:
   - **Name**: `hybridai-client`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variable**:
   - Key: `VITE_API_URL`
   - Value: `https://hybridai-server.onrender.com` (your server URL from Step 2)

5. Click **"Create Static Site"**
6. **Done!** Your app is live! 🚀

### Step 4: Update CORS (1 minute)

1. Go back to your **Backend** service settings
2. Click **"Environment"**
3. Add new variable:
   - Key: `CORS_ORIGIN`
   - Value: Your client URL (e.g., `https://hybridai-client.onrender.com`)
4. Click **"Save Changes"** - Render will auto-restart

---

## That's It! 

Your app is now live and accessible at your client URL.

**Note**: Render free tier services sleep after 15 minutes of inactivity. First request after sleep takes ~30 seconds to wake up.

---

## Alternative: Vercel (Even Faster for Frontend)

If you prefer Vercel for frontend:

1. Follow **Step 1** and **Step 2** above (Render backend)
2. Go to https://vercel.com
3. Click **"New Project"** → Import your GitHub repo
4. Settings:
   - Framework: **Vite**
   - Root Directory: `client`
   - Environment Variable: `VITE_API_URL` = your Render server URL
5. Deploy!

Vercel doesn't sleep, so your frontend will always be fast! ⚡

