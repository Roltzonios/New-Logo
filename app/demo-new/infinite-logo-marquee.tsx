"use client"

import { useRef, useEffect } from "react"
import styles from "./marquee.module.css"

interface InfiniteLogoMarqueeProps {
  logos: string[]
  direction?: "left" | "right"
  speed?: number
}

export default function InfiniteLogoMarquee({ logos, direction = "left", speed = 30 }: InfiniteLogoMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return

    const marquee = marqueeRef.current
    const marqueeInner = marqueeInnerRef.current

    // Clone the marquee content to create a seamless loop
    const clone = marqueeInner.cloneNode(true)
    marquee.appendChild(clone)

    let animationId: number
    let startTime: number
    let progress = 0

    // Calculate the animation speed based on the width and desired speed
    const marqueeWidth = marqueeInner.offsetWidth
    const pixelsPerSecond = speed

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      // Calculate how far to move based on elapsed time and speed
      const move = (elapsed / 1000) * pixelsPerSecond
      progress = move % marqueeWidth

      // Apply the movement based on direction
      if (direction === "left") {
        marquee.style.transform = `translateX(-${progress}px)`
      } else {
        marquee.style.transform = `translateX(${progress}px)`
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [direction, speed, logos])

  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marquee} ref={marqueeRef}>
        <div className={styles.marqueeInner} ref={marqueeInnerRef}>
          {logos.map((logo, index) => (
            <div key={index} className={styles.logoContainer}>
              <img src={logo || "/placeholder.svg"} alt={`Property ${index + 1}`} className={styles.logo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
