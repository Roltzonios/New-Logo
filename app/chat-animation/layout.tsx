import { Inter } from "next/font/google"
import type { ReactNode } from "react"

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export default function ChatAnimationLayout({ children }: { children: ReactNode }) {
  return <div className={`chat-animation-layout ${inter.className}`}>{children}</div>
}
