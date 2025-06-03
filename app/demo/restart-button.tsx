"use client"

import { RefreshCw } from "lucide-react"
import styles from "./styles.module.css"

interface RestartButtonProps {
  onClick: () => void
}

export default function RestartButton({ onClick }: RestartButtonProps) {
  return (
    <button onClick={onClick} className={styles.restartButton}>
      <RefreshCw className={styles.restartIcon} />
      <span>Restart Animation</span>
    </button>
  )
}
