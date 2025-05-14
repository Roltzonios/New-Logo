import { ArrowLeft } from "lucide-react"

type ChatHeaderProps = {
  title: string
  subtitle?: string
  avatar?: string
}

const ChatHeader = ({ title, subtitle, avatar }: ChatHeaderProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-black text-blue-400 shadow-lg shadow-blue-600/20">
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-800/20">
        <ArrowLeft className="text-blue-400" />
      </button>
      <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-blue-500 shadow-md shadow-blue-500/30">
        {avatar ? (
          <img src={avatar || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-blue-400 font-bold">{title.charAt(0)}</div>
        )}
      </div>
      <div>
        <h2 className="font-bold text-lg text-white">{title}</h2>
        {subtitle && <p className="text-sm text-blue-300">{subtitle}</p>}
      </div>
      <div className="ml-auto flex gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-800/20">
          <span className="text-xl text-blue-400">⋮</span>
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
