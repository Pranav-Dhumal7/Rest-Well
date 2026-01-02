# Step-by-Step Guide to Run Restwell in Browser

## ✅ Step 1: Verify Node.js is Installed
You have Node.js v24.7.0 ✅ (Already done!)

## ✅ Step 2: Install Dependencies  
Dependencies are already installed ✅ (node_modules exists)

## 📝 Step 3: Create Environment Variables File

You need to create a `.env` file in the project root.

**Option A: Quick Start (Minimal Setup)**
Create a file named `.env` in the root directory with:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/restwell?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-random-string"
```

**Option B: Full Setup (With AI Features)**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/restwell?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-random-string"
OPENAI_API_KEY="your-openai-api-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 🗄️ Step 4: Set Up Database

You have 3 options:

### Option A: Local PostgreSQL (If installed)
```bash
# Create database
createdb restwell

# Update DATABASE_URL in .env to match your PostgreSQL setup
```

### Option B: Free Cloud Database (Easiest - Recommended)
1. Go to https://supabase.com (or https://neon.tech)
2. Sign up (free)
3. Create a new project
4. Copy the connection string
5. Paste it as `DATABASE_URL` in your `.env` file

### Option C: SQLite for Testing (Simplest, but limited)
Not recommended for production, but you can modify `prisma/schema.prisma` temporarily.

## 🔧 Step 5: Generate Prisma Client
Run this command:
```bash
npx prisma generate
```

## 📊 Step 6: Push Database Schema
Run this command:
```bash
npx prisma db push
```

## 🚀 Step 7: Start Development Server
Run this command:
```bash
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000

✓ Ready in 2.5s
```

## 🌐 Step 8: Open in Browser

1. Open your web browser (Chrome, Firefox, Safari, etc.)
2. Go to: **http://localhost:3000**
3. You should see the Restwell landing page! 🎉

## 📱 Step 9: Test the Application

1. **Landing Page** - You'll see the Restwell homepage
2. **Sign In** - Click "Get Started" button
3. **Note**: Without Google OAuth setup, you can view pages but may need to implement alternative auth

## 🔍 Troubleshooting

### Issue: "Port 3000 already in use"
**Solution**: 
- Kill the process using port 3000, OR
- Next.js will automatically use port 3001, 3002, etc.
- Check the terminal for the actual URL

### Issue: Database connection error
**Solution**:
- Verify your `DATABASE_URL` is correct
- Make sure PostgreSQL is running (if local)
- For cloud databases, check the connection string

### Issue: Module not found errors
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Prisma errors
**Solution**:
```bash
npx prisma generate
npx prisma db push
```

## 📝 Quick Command Summary

Copy and paste these commands in order:

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Push database schema
npx prisma db push

# 3. Start server
npm run dev

# 4. Open browser to http://localhost:3000
```

## 🎯 What You'll See

Once running, you can access:
- `/` - Landing page
- `/auth/signin` - Sign in page
- `/dashboard` - Dashboard (after auth)
- `/sleep/tracker` - Sleep tracking
- `/ai/concierge` - AI features
- `/wellness` - Wellness tools

---

**Ready? Start with Step 3!**

