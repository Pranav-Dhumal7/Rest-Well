# Restwell Setup Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- OpenAI API key
- Google OAuth credentials (optional but recommended)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/restwell?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OAuth Providers (Optional but recommended)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI API (Required for AI features)
OPENAI_API_KEY="your-openai-api-key"

# Weather API (Optional)
WEATHER_API_KEY="your-weather-api-key"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - Your production URL for deployment
6. Copy the Client ID and Client Secret to your `.env` file

## Project Structure

```
restwell/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Protected dashboard pages
│   ├── api/                 # API routes
│   ├── onboarding/          # Sleep DNA questionnaire
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── ai/                  # AI Concierge components
│   ├── auth/                # Authentication components
│   ├── dashboard/           # Dashboard components
│   ├── layout/              # Layout components
│   ├── profile/             # Profile components
│   ├── sleep/               # Sleep tracking components
│   └── ui/                  # Reusable UI components
├── lib/                     # Utility functions
│   ├── ai/                  # AI/OpenAI integrations
│   ├── auth.ts              # NextAuth configuration
│   ├── db/                  # Database utilities
│   ├── utils.ts             # General utilities
│   └── validations/         # Zod schemas
├── prisma/
│   └── schema.prisma        # Database schema
└── public/                  # Static assets
```

## Key Features Implemented

✅ **Authentication** - NextAuth.js with Google OAuth  
✅ **Sleep DNA Profile** - Multi-step onboarding questionnaire  
✅ **Dashboard** - Sleep scores, readiness scores, quick actions  
✅ **Sleep Tracking** - Log sleep, view history, analytics  
✅ **AI Sleep Concierge** - Chat interface with OpenAI GPT-4  
✅ **Sleep Tracker** - Calendar view and trend graphs  
✅ **Profile Settings** - View and update user profile  

## Features in Development

🚧 **Sleep Environment Scanner** - AI-powered bedroom analysis  
🚧 **Community Features** - Live events, tips board, challenges  
🚧 **Wellness Tools** - Breathing exercises, soundscapes, mini-games  
🚧 **Dream Journal** - AI-powered dream analysis  
🚧 **Health Reports** - Exportable PDF reports  

## Database Schema

The project uses Prisma with PostgreSQL. Key models:

- **User** - User accounts
- **SleepProfile** - Sleep DNA profile data
- **SleepLog** - Individual sleep sessions
- **DreamLog** - Dream journal entries
- **ReadinessScore** - Daily readiness calculations
- **ExerciseLog** - Exercise tracking
- **MoodLog** - Mood and stress tracking
- **CommunityTip** - Community-shared tips
- **Challenge** - Wellness challenges
- **LiveEvent** - Live community events
- **AIConversation** - AI chat history

## Development Tips

1. **Database Changes**: After modifying `prisma/schema.prisma`, run:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. **View Database**: Use Prisma Studio:
   ```bash
   npx prisma studio
   ```

3. **Environment Variables**: Never commit `.env` file. Use `.env.example` as template.

4. **Type Safety**: The project uses TypeScript. Always type your components and functions.

5. **API Routes**: All API routes are in `app/api/` and use server-side authentication.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Set up PostgreSQL database (e.g., Vercel Postgres, Supabase, Neon)
5. Deploy!

### Database Options for Production

- **Vercel Postgres** - Integrated with Vercel
- **Supabase** - Free tier available
- **Neon** - Serverless Postgres
- **Railway** - Easy setup
- **AWS RDS** - Enterprise option

## Troubleshooting

### Database Connection Issues
- Check `DATABASE_URL` format
- Ensure PostgreSQL is running
- Verify credentials are correct

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set
- Check OAuth redirect URIs match exactly
- Ensure `NEXTAUTH_URL` matches your domain

### OpenAI API Issues
- Verify API key is valid
- Check API quota/usage
- Ensure model access (GPT-4 requires API access)

## Next Steps

1. Complete onboarding flow for new users
2. Add more AI features and personalization
3. Implement community features
4. Add wellness tools (breathing, soundscapes)
5. Build mobile app (React Native)
6. Add wearable integrations

## Support

For issues or questions, please check:
- Next.js documentation: https://nextjs.org/docs
- Prisma documentation: https://www.prisma.io/docs
- NextAuth.js documentation: https://next-auth.js.org

