# 📋 Complete Setup Steps - Restwell

## ✅ Step 1: Node.js Installed
**Status**: ✅ Done (Node.js v24.7.0, npm v11.5.1)

## ✅ Step 2: Dependencies Installed  
**Status**: ✅ Done (node_modules exists)

## ✅ Step 3: Environment File Created
**Status**: ✅ Done (.env file created)

**⚠️ IMPORTANT**: You need to update the `DATABASE_URL` in `.env` file!

---

## 📝 Step 4: Set Up Database (CHOOSE ONE OPTION)

### Option A: Free Cloud Database (EASIEST - Recommended) ⭐

1. **Go to Supabase** (https://supabase.com)
   - Click "Start your project"
   - Sign up (free account)
   - Create a new project
   - Wait for project to finish setting up

2. **Get Connection String**:
   - In your Supabase project, go to: Settings → Database
   - Find "Connection string" section
   - Copy the "URI" connection string
   - It looks like: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

3. **Update .env file**:
   - Open `.env` file
   - Replace `DATABASE_URL` with your Supabase connection string

**OR**

### Option B: Use Neon (Alternative Free Database)

1. Go to https://neon.tech
2. Sign up and create a project
3. Copy the connection string
4. Update `DATABASE_URL` in `.env`

**OR**

### Option C: Local PostgreSQL (If You Have It)

If you have PostgreSQL installed locally:
1. Create database: `createdb restwell`
2. Update `.env` with: `DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/restwell?schema=public"`

---

## 🔧 Step 5: Generate Prisma Client

Open terminal in project folder and run:

```bash
npx prisma generate
```

**Expected output**: ✓ Generated Prisma Client

---

## 📊 Step 6: Create Database Tables

Run:

```bash
npx prisma db push
```

**Expected output**: ✓ Database schema pushed successfully

---

## 🚀 Step 7: Start Development Server

Run:

```bash
npm run dev
```

**Expected output**:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Ready in 2.5s
```

---

## 🌐 Step 8: Open in Browser

1. Open your browser (Chrome, Firefox, Safari, Edge)
2. Type in address bar: `http://localhost:3000`
3. Press Enter

**You should see the Restwell landing page!** 🎉

---

## 🎯 Step 9: Test the App

1. **Landing Page** - Beautiful homepage with features
2. **Click "Get Started"** - Goes to sign-in page
3. **Note**: Without Google OAuth, you can still view the UI structure

---

## 📋 Quick Checklist

- [ ] Updated `DATABASE_URL` in `.env` file
- [ ] Ran `npx prisma generate`
- [ ] Ran `npx prisma db push`
- [ ] Ran `npm run dev`
- [ ] Opened `http://localhost:3000` in browser
- [ ] Saw the landing page ✅

---

## 🆘 Need Help?

### If Database Setup is Confusing:
1. Use Supabase (easiest option)
2. Sign up takes 2 minutes
3. Copy connection string
4. Paste in `.env` file
5. Done!

### If Port 3000 is Busy:
- Next.js will automatically use port 3001, 3002, etc.
- Check terminal for the actual URL

### If You See Errors:
- Make sure `DATABASE_URL` is correct
- Run `npx prisma generate` again
- Check that database is accessible

---

## 🎉 Ready to Start?

**Start with Step 4** (Set up your database), then continue through the steps!

