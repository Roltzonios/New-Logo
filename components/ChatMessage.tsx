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
          "flex-shrink-0 h-10 w-10 rounded-full overflow-hidden flex items-center justify-center",
          isUser ? "bg-primary text-primary-foreground" : "bg-blue-500 text-white",
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
            "rounded-2xl px-4 py-2 break-words",
            isUser ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white",
          )}
        >
          {content}
        </div>
        {(timestamp || status) && (
          <div className="text-xs text-gray-500 mt-1">
            {timestamp && <span>{timestamp}</span>}
            {status && <span className="ml-1">{status}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
