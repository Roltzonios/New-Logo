import { ArrowLeft } from "lucide-react"

type ChatHeaderProps = {
  title: string
  subtitle?: string
  avatar?: string
}

const ChatHeader = ({ title, subtitle, avatar }: ChatHeaderProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-blue-500 text-white">
      <button className="w-10 h-10 flex items-center justify-center rounded-full">
        <ArrowLeft />
      </button>
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
        {avatar ? (
          <img src={avatar || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-blue-500 font-bold">{title.charAt(0)}</div>
        )}
      </div>
      <div>
        <h2 className="font-bold text-lg">{title}</h2>
        {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
      </div>
      <div className="ml-auto flex gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-full">
          <span className="text-xl">⋮</span>
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
