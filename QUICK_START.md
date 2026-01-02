# Quick Start Guide - View Restwell in Browser

## Step-by-Step Instructions

### 1. Install Dependencies
First, make sure you have Node.js installed (version 18 or higher). Then run:

```bash
npm install
```

This will install all required packages.

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file (if you have one) or create .env manually
```

**Minimum required variables:**

```env
# Database (you can use a free PostgreSQL database)
DATABASE_URL="postgresql://user:password@localhost:5432/restwell?schema=public"

# NextAuth (generate a secret)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-your-generated-secret-here"

# OpenAI API (required for AI features)
OPENAI_API_KEY="your-openai-api-key-here"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**For Quick Testing (without full features):**
- You can start with just `DATABASE_URL` and `NEXTAUTH_SECRET`
- AI features won't work without `OPENAI_API_KEY`, but you can still view the UI

### 3. Set Up Database

**Option A: Local PostgreSQL**
- Install PostgreSQL on your machine
- Create a database named `restwell`
- Update `DATABASE_URL` in `.env`

**Option B: Free Cloud Database (Recommended for Quick Start)**
- Sign up for free at [Supabase](https://supabase.com) or [Neon](https://neon.tech)
- Create a new PostgreSQL database
- Copy the connection string to `DATABASE_URL` in `.env`

### 4. Initialize Database Schema

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 5. Start Development Server

```bash
npm run dev
```

### 6. Open in Browser

Once the server starts, you'll see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
```

**Open your browser and go to:**
```
http://localhost:3000
```

You should see the Restwell landing page!

## Quick Test Flow

1. **Landing Page** - `http://localhost:3000`
2. **Sign In** - Click "Get Started" or "Sign In"
3. **Onboarding** - Complete the Sleep DNA questionnaire
4. **Dashboard** - View your personalized dashboard
5. **Features** - Explore sleep tracking, AI concierge, wellness tools, etc.

## Troubleshooting

### Port Already in Use?
If port 3000 is busy, Next.js will automatically use the next available port (3001, 3002, etc.). Check the terminal for the actual URL.

### Database Connection Error?
- Verify your `DATABASE_URL` is correct
- Make sure PostgreSQL is running (if local)
- Check database credentials

### Module Not Found Errors?
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Authentication Not Working?
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your browser URL
- Google OAuth is optional - the app will work without it (though sign-in will be limited)

## Default Routes

- `/` - Landing page
- `/auth/signin` - Sign in page
- `/dashboard` - Main dashboard (requires auth)
- `/sleep/tracker` - Sleep tracking
- `/ai/concierge` - AI Sleep Concierge
- `/wellness` - Wellness tools hub
- `/wellness/breathing` - Breathing exercises
- `/wellness/soundscapes` - Soundscapes
- `/wellness/games` - Sleep mini-games
- `/wellness/routines` - Wind-down routines
- `/dreams` - Dream journal
- `/sleep/environment` - Environment scanner
- `/reports` - Health reports
- `/community` - Community features
- `/profile` - Profile settings

## Need Help?

Check the main `SETUP.md` file for detailed documentation and advanced configuration.

