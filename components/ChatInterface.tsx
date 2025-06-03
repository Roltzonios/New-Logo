"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import ChatHeader from "./ChatHeader"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import ChatTypingIndicator from "./ChatTypingIndicator"
import { toast } from "@/hooks/use-toast"

const ChatInterface = () => {
  const [messages, setMessages] = useState<{ content: React.ReactNode; isUser: boolean; timestamp?: string }[]>([])
  const [typing, setTyping] = useState(false)
  const [typingText, setTypingText] = useState("typing")
  const [animationStep, setAnimationStep] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing])

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          content: (
            <div>
              <div className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full inline-block mb-2 shadow shadow-blue-600/50">
                new form submitted
              </div>
              <div className="text-white">
                Hey! I'm looking for a NNN property with a 6% cap rate. - Under $3M -10 Year Min Remaining -Single
                Tenant Only -In Texas Can you send me some Offering Memorandums? Thanks!
              </div>
            </div>
          ),
          isUser: true,
          timestamp: "12:05 PM",
        },
      ])

      setTimeout(() => {
        setTyping(true)

        setTimeout(() => {
          setTyping(false)
          setMessages((prev) => [
            ...prev,
            {
              content: "Sure, give me a moment to get those!",
              isUser: false,
              timestamp: "12:06 PM",
            },
          ])

          setTimeout(() => {
            setTyping(true)
            setTypingText("finding best matching properties...")
            setAnimationStep(1)

            setTimeout(() => {
              setTypingText("selecting best properties")
              setAnimationStep(2)

              setTimeout(() => {
                setTypingText("generating offering memorandum...")
                setAnimationStep(3)

                setTimeout(() => {
                  setTyping(false)
                  setMessages((prev) => [
                    ...prev,
                    {
                      content: (
                        <div>
                          <p className="font-semibold text-white mb-2">
                            Here are the best matching properties with their offering memorandums attached:
                          </p>

                          <div className="border-l-4 border-blue-600 pl-3 mb-3 text-blue-200">
                            <p className="font-medium">Dollar General - Dallas, TX</p>
                            <p className="text-sm">$2.8M | 6.1% Cap Rate | 12 Years Remaining | NNN</p>
                            <p className="text-blue-400 text-sm underline mt-1">Download Offering Memorandum</p>
                          </div>

                          <div className="border-l-4 border-blue-600 pl-3 mb-3 text-blue-200">
                            <p className="font-medium">CVS Pharmacy - Houston, TX</p>
                            <p className="text-sm">$2.95M | 5.9% Cap Rate | 15 Years Remaining | NNN</p>
                            <p className="text-blue-400 text-sm underline mt-1">Download Offering Memorandum</p>
                          </div>

                          <div className="border-l-4 border-blue-600 pl-3 text-blue-200">
                            <p className="font-medium">Walgreens - San Antonio, TX</p>
                            <p className="text-sm">$2.7M | 6.0% Cap Rate | 11 Years Remaining | NNN</p>
                            <p className="text-blue-400 text-sm underline mt-1">Download Offering Memorandum</p>
                          </div>
                        </div>
                      ),
                      isUser: false,
                      timestamp: "12:07 PM",
                    },
                  ])

                  toast({
                    title: "Properties Found",
                    description: "3 matching properties have been found in Texas.",
                  })
                }, 5000)
              }, 3000)
            }, 6000)
          }, 2000)
        }, 2000)
      }, 1000)
    }, 500)
  }, [])

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, { content: message, isUser: true }])
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto border border-blue-900 rounded-lg overflow-hidden shadow-xl bg-black shadow-blue-700/40">
      <ChatHeader title="Zapcre AI" subtitle="We typically reply in a few minutes" />

      <div className="flex-1 overflow-y-auto p-4 bg-black">
        {messages.map((message, index) => (
          <ChatMessage key={index} content={message.content} isUser={message.isUser} timestamp={message.timestamp} />
        ))}

        {typing && (
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow shadow-blue-400/40">
              A
            </div>
            <div className="flex flex-col max-w-[80%]">
              <div className="rounded-2xl px-4 py-2 bg-blue-500 shadow shadow-blue-400/40">
                <ChatTypingIndicator text={typingText} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatInterface
