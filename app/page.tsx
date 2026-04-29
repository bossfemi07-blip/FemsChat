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
'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function FemsAppHome() {
  const [user, setUser] = useState<any>(null)
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [aiReply, setAiReply] = useState('')
  const [chats, setChats] = useState<any[]>([])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    if (user) fetchChats()
  }, [user])

  const login = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ phone })
    setLoading(false)
    if (!error) alert('OTP sent! Check SMS 📱')
    else alert('Error: ' + error.message)
  }

  const fetchChats = async () => {
    const { data } = await supabase
     .from('messages')
     .select('*, profiles(username, avatar_url)')
     .order('created_at', { ascending: false })
     .limit(10)
    setChats(data || [])
  }

  const askFemsChat = async () => {
    if (!message) return
    setAiReply('FemsChat dey think... 🤔')
    const res = await fetch('/api/femschat', {
      method: 'POST',
      body: JSON.stringify({ message })
    })
    const data = await res.json()
    setAiReply(data.reply)
    setMessage('')
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  // LOGIN SCREEN
  if (!user) {
    return (
      <div className="h-screen bg-gradient-to-b from-green-500 to-blue-500 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-1">FemsApp 🇳🇬</h1>
            <p className="text-sm text-gray-600">Chat, Post, Hustle</p>
            <p className="text-xs text-gray-400 mt-1">Bori to the World</p>
          </div>

          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+234 800 000 0000"
            className="w-full p-3 border-2 border-gray-200 rounded-lg mb-4 focus:border-green-500 outline-none"
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-bold disabled:opacity-50"
          >
            {loading? 'Sending...' : 'Send OTP 📱'}
          </button>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Built by <span className="font-bold text-green-600">Itz Femiranking</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">From Bori, Rivers State</p>
          </div>
        </div>
      </div>
    )
  }

  // MAIN APP SCREEN
  return (
    <div className="max-w-md mx-auto h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <div className="bg-green-500 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">FemsApp</h1>
            <p className="text-xs opacity-90">Welcome, {user.phone || 'Bori Guy'}!</p>
          </div>
          <button onClick={logout} className="text-xs bg-white/20 px-3 py-1 rounded">Logout</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {/* FEMSCHAT AI SECTION */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl mb-4 shadow-lg">
          <h2 className="font-bold mb-2 flex items-center gap-2">
            🤖 FemsChat AI <span className="text-xs bg-white/20 px-2 py-0.5 rounded">PIDGIN</span>
          </h2>
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && askFemsChat()}
            placeholder="Ask anything... How far?"
            className="w-full p-2 rounded-lg text-black text-sm mb-2"
          />
          <button
            onClick={askFemsChat}
            className="w-full bg-white text-purple-600 p-2 rounded-lg font-bold text-sm"
          >
            Ask FemsChat
          </button>
          {aiReply && (
            <div className="bg-white/10 p-3 rounded-lg mt-3 text-sm">
              <b>AI:</b> {aiReply}
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Link href="/music" className="bg-white p-4 rounded-xl shadow text-center">
            <div className="text-3xl mb-1">🎵</div>
            <p className="font-bold text-sm">FemsMusic</p>
            <p className="text-xs text-gray-500">Like Audiomack</p>
          </Link>
          <Link href="/reels" className="bg-white p-4 rounded-xl shadow text-center">
            <div className="text-3xl mb-1">📱</div>
            <p className="font-bold text-sm">FemsReels</p>
            <p className="text-xs text-gray-500">Like TikTok</p>
          </Link>
          <Link href="/live" className="bg-white p-4 rounded-xl shadow text-center">
            <div className="text-3xl mb-1">🔴</div>
            <p className="font-bold text-sm">Go Live</p>
            <p className="text-xs text-gray-500">Earn Gifts</p>
          </Link>
          <Link href="/market" className="bg-white p-4 rounded-xl shadow text-center">
            <div className="text-3xl mb-1">🛒</div>
            <p className="font-bold text-sm">Bori Market</p>
            <p className="text-xs text-gray-500">Buy & Sell</p>
          </Link>
        </div>

        {/* RECENT CHATS PREVIEW */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-bold mb-3">Recent Chats 💬</h3>
          {chats.length === 0? (
            <p className="text-sm text-gray-500 text-center py-4">No chats yet. Start one!</p>
          ) : (
            chats.map(chat => (
              <div key={chat.id} className="flex items-center gap-3 mb-3 pb-3 border-b last:border-0">
                <div className="w-10
'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function FemsMusic() {
  const [songs, setSongs] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [currentSong, setCurrentSong] = useState<any>(null)

  useEffect(() => { fetchSongs() }, [])

  const fetchSongs = async () => {
    const { data } = await supabase
     .from('songs')
     .select('*, profiles(username, avatar_url)')
     .order('plays', { ascending: false })
    setSongs(data || [])
  }

  const uploadSong = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const title = prompt('Song title:')
    const artist = prompt('Artist name:')
    const { data: user } = await supabase.auth.getUser()

    const fileName = `${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage
     .from('music')
     .upload(fileName, file)

    if (!uploadError) {
      await supabase.from('songs').insert({
        title, artist,
        url: fileName,
        user_id: user.user?.id,
        plays: 0, likes: 0
      })
      fetchSongs()
      alert('Song uploaded! 🔥')
    }
    setUploading(false)
  }

  const playSong = async (song: any) => {
    setCurrentSong(song)
    await supabase.rpc('increment_plays', { song_id: song.id })
  }

  const likeSong = async (id: number) => {
    await supabase.from('songs').update({ likes: songs.find(s => s.id === id).likes + 1 }).eq('id', id)
    fetchSongs()
  }

  return (
    <div className="max-w-md mx-auto h-screen bg-black text-white flex flex-col">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4">
        <h1 className="text-2xl font-bold">FemsMusic 🎵</h1>
        <p className="text-xs opacity-80">Stream & Upload like Audiomack</p>
      </div>

      <div className="p-4">
        <label className="w-full bg-green-500 text-center p-3 rounded-lg block font-bold mb-4">
          {uploading? 'Uploading...' : '⬆️ Upload Song'}
          <input type="file" accept="audio/*" onChange={uploadSong} className="hidden" />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <h2 className="font-bold mb-3">🔥 Trending in Bori</h2>
        {songs.map(song => (
          <div key={song.id} onClick={() => playSong(song)}
            className={`bg-gray-900 p-3 rounded-lg mb-3 flex gap-3 items-center ${currentSong?.id === song.id? 'ring-2 ring-green-500' : ''}`}>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center text-2xl">
              🎵
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">{song.title}</p>
              <p className="text-xs text-gray-400">@{song.profiles?.username || song.artist}</p>
              <div className="flex gap-3 text-xs text-gray-500 mt-1">
                <span>▶️ {song.plays}</span>
                <span onClick={(e) => { e.stopPropagation(); likeSong(song.id) }}>❤️ {song.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentSong && (
        <div className="fixed bottom-16 left-0 right-0 bg-gray-900 border-t border-gray-800 p-3 max-w-md mx-auto">
          <p className="text-sm font-bold truncate">{currentSong.title}</p>
          <p className="text-xs text-gray-400">@{currentSong.profiles?.username}</p>
          <audio
            controls autoPlay
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/music/${currentSong.url}`}
            className="w-full mt-2 h-8"
          />
        </div>
      )}
    </div>
  )
}
'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function FemsReels() {
  const [reels, setReels] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const videoRefs = useRef<any[]>([])

  useEffect(() => {
    fetchReels()
  }, [])

  const fetchReels = async () => {
    const { data } = await supabase
     .from('reels')
     .select('*, profiles(username, avatar_url)')
     .order('created_at', { ascending: false })
    setReels(data || [])
  }

  const uploadReel = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const caption = prompt('Add caption:')
    const { data: user } = await supabase.auth.getUser()

    const fileName = `${Date.now()}-${file.name}`
    await supabase.storage.from('reels').upload(fileName, file)
    await supabase.from('reels').insert({
      video_url: fileName,
      caption,
      user_id: user.user?.id,
      likes: 0, views: 0
    })
    setUploading(false)
    fetchReels()
  }

  const likeReel = async (id: number, e: any) => {
    e.stopPropagation()
    await supabase.rpc('increment_reel_likes', { reel_id: id })
    fetchReels()
  }

  return (
    <div className="h-screen snap-y snap-mandatory overflow-scroll bg-black">
      <div className="fixed top-4 left-4 z-50">
        <label className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm">
          {uploading? 'Uploading...' : '+ Post Reel'}
          <input type="file" accept="video/*" onChange={uploadReel} className="hidden" />
        </label>
      </div>

      {reels.map((reel, idx) => (
        <div key={reel.id} className="h-screen snap-start relative">
          <video
            ref={el => videoRefs.current[idx] = el}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/reels/${reel.video_url}`}
            className="h-full w-full object-cover"
            loop autoPlay muted playsInline
            onClick={(e) => e.currentTarget.paused? e.currentTarget.play() : e.currentTarget.pause()}
          />

          <div className="absolute bottom-24 left-4 text-white max-w-[70%]">
            <p className="font-bold">@{reel.profiles?.username}</p>
            <p className="text-sm mt-1">{reel.caption}</p>
            <p className="text-xs mt-2 opacity-80">🎵 Original Sound - FemsApp</p>
          </div>

          <div className="absolute bottom-32 right-3 flex flex-col gap-5 text-white items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center font-bold border-2 border-white">
              {reel.profiles?.username?.[0] || 'F'}
            </div>
            <button onClick={(e) => likeReel(reel.id, e)} className="flex flex-col items-center">
              <span className="text-3xl">❤️</span>
              <span className="text-xs font-bold">{reel.likes}</span>
            </button>
            <button className="flex flex-col items-center">
              <span className="text-3xl">💬</span>
              <span className="text-xs font-bold">{reel.comments || 0}</span>
            </button>
            <button className="flex flex-col items-center">
              <span className="text-3xl">💰</span>
              <span className="text-xs font-bold">Gift</span>
            </button>
            <button className="flex flex-col items-center">
              <span className="text-3xl">🔄</span>
              <span className="text-xs font-bold">{reel.shares || 0}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
-- SONGS TABLE
create table songs (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id),
  title text not null,
  artist text,
  url text not null,
  cover_url text,
  plays int default 0,
  likes int default 0,
  created_at timestamp default now()
);

-- REELS TABLE
create table reels (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id),
  video_url text not null,
  caption text,
  sound_name text default 'Original Sound',
  likes int default 0,
  comments int default 0,
  shares int default 0,
  views int default 0,
  created_at timestamp default now()
);

-- PROFILES TABLE - ADD IF NOT EXISTS
create table profiles (
  id uuid references auth.users primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamp default now()
);

-- FUNCTIONS
create or replace function increment_plays(song_id bigint)
returns void as $$
  update songs set plays = plays + 1 where id = song_id;
$$ language sql;

create or replace function increment_reel_likes(reel_id bigint)
returns void as $$
  update reels set likes = likes + 1 where id = reel_id;
$$ language sql;

-- STORAGE BUCKETS - RUN THESE IN SUPABASE DASHBOARD
-- insert into storage.buckets (id, name, public) values ('music', 'music', true);
-- insert into storage.buckets (id, name, public) values ('reels', 'reels', true);
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FemsApp - TikTok + Audiomack + WhatsApp 🇳🇬',
  description: 'Chat, Post, Stream Music, Go Live. Built by Itz Femiranking',
  manifest: '/manifest.json',
  themeColor: '#25D366'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
