# Restwell - AI-Powered Sleep & Wellness Companion

A full-stack web application that serves as an intelligent sleep and wellness companion, combining sleep tracking with AI-powered personalization, community features, and holistic wellness tools.

## Features

- 🧬 **Sleep DNA Profile** - Personalized sleep signature based on detailed questionnaire
- 🤖 **AI Sleep Concierge** - Intelligent chatbot that analyzes patterns and provides personalized recommendations
- 📊 **Sleep Tracking & Analytics** - Comprehensive sleep logging with trends and correlations
- 🌙 **Sleep Environment Scanner** - AI-powered bedroom analysis for optimization tips
- 👥 **Community Features** - Live events, anonymous tips sharing, and wellness challenges
- 🧘 **Wellness Tools** - Breathing exercises, soundscapes, mini-games, and dream journal
- 📈 **Health Dashboard** - Readiness scores, holistic wellness view, and exportable reports

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with OAuth
- **AI**: OpenAI API for Sleep Concierge and analysis
- **Real-time**: Socket.io for live events

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd restwell
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL (e.g., `http://localhost:3000`)
- `OPENAI_API_KEY` - Your OpenAI API key
- OAuth credentials (optional)

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
restwell/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main app pages (protected)
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── dashboard/        # Dashboard components
│   ├── sleep/            # Sleep tracking components
│   └── ai/               # AI concierge components
├── lib/                   # Utility functions
│   ├── db/               # Database config
│   ├── ai/               # AI service functions
│   ├── utils/            # General utilities
│   └── validations/      # Zod schemas
├── prisma/               # Prisma schema
└── public/               # Static assets
```

## Development Phases

### Phase 1: Foundation ✅
- Project setup
- Database schema
- Authentication

### Phase 2: Core Features (In Progress)
- Dashboard
- Sleep tracking
- AI Concierge

### Phase 3: Advanced Features
- Community features
- Wellness tools
- Reports

### Phase 4: Polish & Optimization
- Performance optimization
- Testing
- Deployment

## License

MIT

