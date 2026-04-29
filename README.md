# FemsChat 🇳🇬

**Chat, Post, Hustle - Bori to the World**

A modern web app built with Next.js, React, Tailwind CSS, and powered by Supabase authentication & Groq AI.

## Features

✅ **SMS OTP Authentication** - Secure login via Supabase  
✅ **FemsChat AI** - Nigerian Pidgin-speaking AI assistant  
✅ **Progressive Web App** - Installable on mobile devices  
✅ **Responsive Design** - Works on all devices  
✅ **Built with Modern Stack** - Next.js 14, React 18, TypeScript, Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: Supabase Auth (SMS OTP)
- **AI**: Groq API (Llama 3 70B)
- **Styling**: Tailwind CSS + Autoprefixer
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (https://supabase.com)
- Groq API key (https://console.groq.com)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/bossfemi07-blip/femschat.git
cd femschat
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

## Project Structure

```
femschat/
├── app/
│   ├── api/
│   │   └── femschat/
│   │       └── route.ts          # AI endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── public/
│   └── manifest.json             # PWA manifest
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── .env.local                    # Environment variables
```

## How It Works

### Authentication
Users authenticate using their phone number via SMS OTP powered by Supabase.

### FemsChat AI
Users can ask FemsChat anything in Nigerian Pidgin. The AI responds using the Groq API with the Llama 3 70B model.

## Future Features

- 💬 Direct messaging between users
- 📱 Status updates (coming next)
- 📰 Social feed
- 🛍️ Marketplace
- 🔔 Real-time notifications

## License

MIT License - Feel free to use this project for any purpose.

## Built by

👤 **Itz Femiranking** from Bori, Rivers State, Nigeria 🇳🇬

---

**Bori to the World!** 🚀
