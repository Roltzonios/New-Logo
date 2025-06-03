"use client"

import { useEffect, useState } from "react"
import InfiniteLogoMarquee from "./infinite-logo-marquee"
import styles from "./styles.module.css"

export default function DemoNewPage() {
  const [logos, setLogos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use the property images we already have as logos
    const propertyLogos = [
      "/images/slot/image1.png",
      "/images/slot/image2.png",
      "/images/slot/image3.png",
      "/images/slot/image4.png",
      "/images/slot/image5.png",
      "/images/slot/image6.png",
      "/images/slot/image7.png",
      "/images/slot/image8.png",
      "/images/slot/image9.png",
      "/images/slot/image10.png",
    ]

    setLogos(propertyLogos)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading logo marquee...</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Astroop CRE Property Showcase</h1>
      <p className={styles.description}>Explore our exclusive commercial real estate properties</p>

      <div className={styles.marqueeContainer}>
        <InfiniteLogoMarquee logos={logos} direction="left" speed={40} />
      </div>

      <div className={styles.marqueeContainer}>
        <InfiniteLogoMarquee logos={logos} direction="right" speed={30} />
      </div>
    </div>
  )
}
