'use client'
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
          <h1 className="text-3xl font-bold text-center mb-2">FemsChat 🇳🇬</h1>
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
        <h1 className="text-xl font-bold">FemsChat</h1>
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
}