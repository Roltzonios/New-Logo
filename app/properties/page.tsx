"use client"
import ChatInterface from "@/components/ChatInterface"

const PropertiesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[600px] shadow-xl">
        <ChatInterface />
      </div>
    </div>
  )
}

export default PropertiesPage
