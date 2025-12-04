# Mi Chame - WhatsApp Taxi Dispatch System

## Project Overview

Mi Chame is a WhatsApp-based taxi dispatch automation system for a taxi company in São Paulo, Brazil. The system integrates with Machine Global API for ride management, WhatsApp Cloud API for customer communication, OpenAI for natural language understanding, and Twilio for call deflection.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   WhatsApp      │────▶│   Node.js       │────▶│  Machine Global │
│   Cloud API     │◀────│   Backend       │◀────│  API            │
│   (Meta)        │     │   (Express)     │     │  (Taxi System)  │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
┌───────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  PostgreSQL   │      │     OpenAI      │      │    Twilio       │
│  (Prisma)     │      │  GPT-4/Whisper  │      │  (Call Deflect) │
└───────────────┘      └─────────────────┘      └─────────────────┘
        │
        ▼
┌─────────────────┐
│  React Dashboard│
│    (Vite)       │
└─────────────────┘
```

## Tech Stack

### Frontend (Dashboard)
- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **UI Components:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS
- **State Management:** React Query
- **Routing:** React Router DOM
- **Charts:** Recharts
- **Deployment:** Vercel

### Backend (Server)
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Deployment:** Railway

### External APIs
- **WhatsApp:** Meta Cloud API
- **Taxi System:** Machine Global API
- **AI:** OpenAI (GPT-4 + Whisper)
- **Voice:** Twilio (Call Deflection)

## Project Structure

```
chat-dispatch/
├── src/                      # Frontend React app
│   ├── components/
│   │   ├── dashboard/        # Dashboard components
│   │   └── ui/               # shadcn/ui components
│   ├── pages/                # Route pages
│   ├── lib/                  # Utilities & API client
│   ├── data/                 # Mock data (fallback)
│   ├── types/                # TypeScript types
│   └── hooks/                # Custom hooks
├── server/                   # Backend Node.js app
│   ├── src/
│   │   ├── services/         # Business logic
│   │   │   ├── machineGlobal.service.ts
│   │   │   ├── whatsapp.service.ts
│   │   │   ├── openai.service.ts
│   │   │   ├── conversation.service.ts
│   │   │   └── twilio.service.ts
│   │   ├── routes/           # API routes
│   │   └── utils/            # Helpers
│   └── prisma/               # Database schema
└── public/                   # Static assets
```

## Key Features

### 1. WhatsApp Integration
- Receive and process customer messages
- Send interactive messages (buttons, lists)
- Request and process location sharing
- Audio message transcription via Whisper
- Mark messages as read

### 2. Conversation Flow (State Machine)
```
GREETING → AWAITING_ORIGIN → AWAITING_DESTINATION → AWAITING_CATEGORY
    → SHOWING_PRICE → AWAITING_CONFIRMATION → CREATING_RIDE → RIDE_CREATED
    → RIDE_IN_PROGRESS → RIDE_COMPLETED
```

### 3. Machine Global Integration
- Create rides automatically
- Get price quotes
- Track ride status
- Receive webhook updates
- List drivers

### 4. Call Deflection (Twilio)
- Intercept incoming phone calls
- Auto-send WhatsApp message
- Redirect customers to chat

### 5. Dashboard Features
- Real-time ride monitoring
- WhatsApp conversations panel
- Analytics and metrics
- Driver management
- Settings and configuration

## API Credentials

### Machine Global
- **Base URL:** `https://api.taximachine.com.br` (or similar)
- **API Key Header:** `api-key`
- **Auth:** Basic Auth (username + password)
- **Platform ID:** 2330

### WhatsApp Cloud API
- **WABA ID:** 503563854395009
- **Business ID:** 297761868009809
- **Phone Number ID:** (pending from client)

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

### Backend (server/.env)
```
# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL="postgresql://..."

# WhatsApp
WHATSAPP_ACCESS_TOKEN=EAANcAYj2AawBQ...
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_BUSINESS_ACCOUNT_ID=503563854395009
WHATSAPP_VERIFY_TOKEN=michame_verify_token_2024

# Machine Global
MACHINE_GLOBAL_API_KEY=mch_api_8nLYkTW515GOmSC576BCLNUE
MACHINE_GLOBAL_USERNAME=borysenkooleh7@gmail.com
MACHINE_GLOBAL_PASSWORD=Aa123456@
MACHINE_GLOBAL_BASE_URL=https://api.taximachine.com.br

# OpenAI
OPENAI_API_KEY=sk-...

# Twilio
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+5519...
```

## Running the Project

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Webhook URLs (for production)

- **WhatsApp:** `https://your-domain.com/webhook/whatsapp`
- **Machine Global Status:** `https://your-domain.com/webhook/machine/status`
- **Machine Global Position:** `https://your-domain.com/webhook/machine/position`
- **Twilio Voice:** `https://your-domain.com/webhook/twilio/voice`

## Service Areas

- Capivari
- Rafard
- Santa Bárbara d'Oeste
- Americana
- Nova Odessa
- Sumaré
- Mirassol
- São José do Rio Preto (SP)

## Vehicle Categories

- **Carro:** Standard vehicle
- **Moto:** Motorcycle (mototaxi)
- **Premium:** Executive vehicle
- **Corporativo:** Corporate rides

## Payment Methods

| Code | Type | Portuguese |
|------|------|------------|
| D | Cash | Dinheiro |
| B | Debit | Débito |
| C | Credit | Crédito |
| X | Pix | Pix |
| P | PicPay | PicPay |

## Client Information

- **Company:** Mi Chame Taxi
- **Location:** São Paulo, Brazil
- **WhatsApp:** (19) 99275-3360
- **DDD:** 19

## Pending Items

1. Get Phone Number ID from client (WhatsApp API)
2. Client needs to create OpenAI account
3. Client needs to create Twilio account
4. Confirm Machine Global base URL
5. End-to-end testing
6. Production deployment
