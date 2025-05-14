import type React from "react"
import "./styles.css"

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="properties-layout">{children}</div>
}
