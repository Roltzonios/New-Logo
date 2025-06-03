"use client"

import { useState } from "react"
import ChatHeader from "./ChatHeader"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import ChatTypingIndicator from "./ChatTypingIndicator"

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { content: "Hello! How can I help you today?", isUser: false, timestamp: "10:30 AM" },
  ])
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { content: message, isUser: true, timestamp: getCurrentTime() }])

    // Show typing indicator
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          content: getResponseForMessage(message),
          isUser: false,
          timestamp: getCurrentTime(),
        },
      ])
    }, 1500)
  }

  const getCurrentTime = () => {
    const now = new Date()
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`
  }

  const getResponseForMessage = (message: string) => {
    const responses = [
      "I've found several properties that match your criteria.",
      "That's a great question about commercial real estate investments.",
      "Let me check the latest listings for you.",
      "I can help you analyze the potential ROI for that property.",
      "Would you like me to schedule a viewing for you?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <ChatHeader title="Astroop CRE Assistant" subtitle="Online" />

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessage key={index} content={msg.content} isUser={msg.isUser} timestamp={msg.timestamp} />
        ))}
        {isTyping && (
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden flex items-center justify-center bg-blue-500 text-white">
              <div className="w-full h-full flex items-center justify-center">A</div>
            </div>
            <div className="flex flex-col max-w-[80%] items-start">
              <div className="rounded-2xl px-4 py-2 break-words bg-blue-500 text-white">
                <ChatTypingIndicator />
              </div>
            </div>
          </div>
        )}
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}
