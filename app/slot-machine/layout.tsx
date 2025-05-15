import type React from "react"
import { Inter } from "next/font/google"

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export default function SlotMachineLayout({ children }: { children: React.ReactNode }) {
  return <div className={inter.className}>{children}</div>
}
