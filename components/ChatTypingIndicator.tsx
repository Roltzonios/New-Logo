const ChatTypingIndicator = ({ text = "typing" }: { text?: string }) => {
  return (
    <div className="flex items-center gap-1 text-white">
      <span>{text}</span>
      <span className="flex space-x-1">
        <span className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
        <span className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
        <span className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
      </span>
    </div>
  )
}

export default ChatTypingIndicator
