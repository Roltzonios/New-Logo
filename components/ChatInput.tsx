"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

type ChatInputProps = {
  onSendMessage: (message: string) => void
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 rounded-full border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a message"
        />
      </div>
      <Button type="submit" size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600">
        <Send className="h-5 w-5" />
      </Button>
    </form>
  )
}

export default ChatInput
