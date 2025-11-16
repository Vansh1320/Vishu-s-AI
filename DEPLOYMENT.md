# Deployment Guide

This guide covers deploying your Hybrid AI application to production.

## Option 1: Render (Recommended - Easiest)

Render can host both your frontend and backend with a free tier.

### Prerequisites
- GitHub account
- Render account (sign up at https://render.com)
- Your repository pushed to GitHub

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy Backend (Server)

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `hybridai-server`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Free

5. **Environment Variables** (click "Advanced"):
   ```
   NODE_ENV=production
   PORT=4000
   OPENAI_API_KEY=your-openai-api-key-here
   ```

6. Click **"Create Web Service"**
7. Wait for deployment - note your server URL (e.g., `https://hybridai-server.onrender.com`)

### Step 3: Deploy Frontend (Client)

1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `hybridai-client`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables**:
   ```
   VITE_API_URL=https://hybridai-server.onrender.com
   ```
   (Replace with your actual server URL from Step 2)

5. Click **"Create Static Site"**
6. Your app will be live at the provided URL!

### Step 4: Update CORS (Important!)

Once you have your client URL, go back to your server settings and add:

```
CORS_ORIGIN=https://your-client-url.onrender.com
```

Or update the `server/index.js` CORS settings to allow your client domain.

---

## Option 2: Vercel (Frontend) + Render (Backend)

### Deploy Backend on Render
Follow **Step 2** from Option 1 above.

### Deploy Frontend on Vercel

1. Go to https://vercel.com and sign up
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables**:
   ```
   VITE_API_URL=https://your-render-server-url.onrender.com
   ```

6. Click **"Deploy"**

---

## Option 3: Railway (Full Stack)

1. Go to https://railway.app and sign up
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Add two services:
   - **Backend Service**: 
     - Root: `server`
     - Start Command: `node index.js`
     - Environment Variables:
       ```
       OPENAI_API_KEY=your-openai-api-key-here
       ```
   
   - **Frontend Service**:
     - Root: `client`
     - Build Command: `npm run build`
     - Start Command: `npm run preview`
     - Environment Variables:
       ```
       VITE_API_URL=${{BACKEND_SERVICE_URL}}
       ```

---

## Environment Variables Reference

### Backend (Server)
- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 4000)
- `NODE_ENV` - Set to `production`
- `OPENAI_BASE_URL` - (Optional) Custom OpenAI API base URL
- `OPENAI_MODEL` - (Optional) Model to use (default: gpt-4o-mini)

### Frontend (Client)
- `VITE_API_URL` - Your backend server URL (required)

---

## Post-Deployment Checklist

- [ ] Backend is accessible and returns "Server is running 🚀"
- [ ] Frontend loads successfully
- [ ] API calls from frontend work
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Test all API endpoints

---

## Troubleshooting

### CORS Errors
Update `server/index.js`:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://your-client-domain.com'
}));
```

### 404 on API Calls
Ensure `VITE_API_URL` is set correctly in your frontend environment variables.

### Server Not Starting
Check Render/Railway logs for errors. Common issues:
- Missing environment variables
- Port configuration (Render uses PORT env var automatically)
- Build command errors

---

## Free Tier Limits

- **Render**: Free tier includes 750 hours/month, services sleep after inactivity
- **Vercel**: Generous free tier for static sites
- **Railway**: $5/month free credit

For production use, consider upgrading to prevent cold starts on free tiers.

