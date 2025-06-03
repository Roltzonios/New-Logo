import type React from "react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"

type ChatMessageProps = {
  content: React.ReactNode
  isUser?: boolean
  timestamp?: string
  status?: "delivered" | "sending" | "sent"
  avatar?: string
}

const ChatMessage = ({ content, isUser = false, timestamp, status, avatar }: ChatMessageProps) => {
  return (
    <div className={cn("flex items-start gap-3 mb-4", isUser ? "flex-row-reverse" : "")}>
      <div
        className={cn(
          "flex-shrink-0 h-10 w-10 rounded-full overflow-hidden flex items-center justify-center border border-blue-600 shadow shadow-blue-500/30",
          isUser ? "bg-blue-700 text-white" : "bg-blue-500 text-white",
        )}
      >
        <Avatar>
          {avatar ? (
            <img src={avatar || "/placeholder.svg"} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">{isUser ? "U" : "A"}</div>
          )}
        </Avatar>
      </div>
      <div className={cn("flex flex-col max-w-[80%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2 break-words shadow-md",
            isUser ? "bg-blue-800 text-white shadow-blue-500/30" : "bg-blue-600 text-white shadow-blue-400/20",
          )}
        >
          {content}
        </div>
        {(timestamp || status) && (
          <div className="text-xs text-blue-400 mt-1">
            {timestamp && <span>{timestamp}</span>}
            {status && <span className="ml-1">{status}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
