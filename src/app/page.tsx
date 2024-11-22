// src/app/page.tsx
"use client"
import TypingGame from "@/components/TypingGame"

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">タイピング練習</h1>
        <TypingGame />
      </div>
    </main>
  )
}