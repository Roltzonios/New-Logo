import type React from "react"
import { Inter } from "next/font/google"
import Script from "next/script"

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export default function SlotMachineLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js" strategy="beforeInteractive" />
      <div className={inter.className}>{children}</div>
    </>
  )
}
