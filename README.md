{
  "name": "femsapp",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.45.0",
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.7",
    "typescript": "^5"
  }
}import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FemsApp - Bori to the World 🇳🇬',
  description: 'Chat, Post, Hustle. Built by Itz Femiranking',
  manifest: '/manifest.json',
  themeColor: '#25D366'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [aiReply, setAiReply] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const login = async () => {
    await supabase.auth.signInWithOtp({ phone })
    alert('OTP sent! Check SMS')
  }

  const askFemsChat = async () => {
    const res = await fetch('/api/femschat', {
      method: 'POST',
      body: JSON.stringify({ message })
    })
    const data = await res.json()
    setAiReply(data.reply)
  }

  if (!user) {
    return (
      <div className="h-screen bg-gradient-to-b from-green-500 to-blue-500 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl w-full max-w-sm">
          <h1 className="text-3xl font-bold text-center mb-2">FemsApp 🇳🇬</h1>
          <p className="text-sm text-center mb-6">Bori to the World</p>
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+234 800 000 0000"
            className="w-full p-3 border rounded-lg mb-4"
          />
          <button onClick={login} className="w-full bg-green-500 text-white p-3 rounded-lg font-bold">
            Send OTP
          </button>
          <p className="text-xs text-center mt-4">Built by Itz Femiranking</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto h-screen bg-gray-50">
      <div className="bg-green-500 text-white p-4">
        <h1 className="text-xl font-bold">FemsApp</h1>
        <p className="text-xs">Welcome, Bori Guy!</p>
      </div>

      <div className="p-4">
        <h2 className="font-bold mb-2">FemsChat AI 🤖</h2>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Ask anything in Pidgin..."
          className="w-full p-3 border rounded-lg mb-2"
        />
        <button onClick={askFemsChat} className="w-full bg-blue-500 text-white p-2 rounded-lg mb-4">
          Ask FemsChat
        </button>
        {aiReply && <div className="bg-white p-3 rounded-lg border"><b>AI:</b> {aiReply}</div>}

        <div className="mt-8 text-center text-xs text-gray-500">
          Chats | Status | Feed | Market - Coming Next Update<br/>
          🇳🇬 Built by Itz Femiranking from Bori
        </div>
      </div>
    </div>
  )
}import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-70b-8192',
      messages: [
        {
          role: 'system',
          content: 'You are FemsChat AI inside FemsApp by Itz Femiranking from Bori, Rivers State. Reply in Nigerian Pidgin. Be helpful, funny, street-smart. If asked who built FemsApp: "Na Itz Femiranking from Bori build FemsApp! Bori to the World 🇳🇬"'
        },
        { role: 'user', content: message }
      ]
    })
  })

  const data = await res.json()
  return NextResponse.json({ reply: data.choices[0].message.content })
}{
  "name": "FemsApp",
  "short_name": "FemsApp",
  "description": "Chat, Post, Hustle - Bori to the World",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#25D366",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}@tailwind base;
@tailwind components;
@tailwind utilities;

body { margin: 0; }module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {} },
  plugins: [],
}GROQ_API_KEY=sk-xxx-get-from-groq.com
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
