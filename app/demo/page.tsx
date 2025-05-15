"use client"

import { useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import styles from "./styles.module.css"
import RestartButton from "./restart-button"

export default function DemoPage() {
  const [key, setKey] = useState(0)

  const handleRestart = useCallback(() => {
    setKey((prevKey) => prevKey + 1)
  }, [])

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(TextPlugin)

    // Images to use
    const images = [
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

    // Shuffle helper
    function shuffle(arr) {
      const a = arr.slice()
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    }

    // Fill each column with a different shuffled order
    const marquees = [
      document.getElementById("marquee1"),
      document.getElementById("marquee2"),
      document.getElementById("marquee3"),
    ]

    if (!marquees[0] || !marquees[1] || !marquees[2]) return

    const reelOrders = [shuffle(images), shuffle(images), shuffle(images)]
    const reelOrders2 = [shuffle(images), shuffle(images), shuffle(images)]

    marquees.forEach((marquee, i) => {
      marquee.innerHTML = ""
      // First unique shuffle
      reelOrders[i].forEach((src) => {
        const div = document.createElement("div")
        div.className = "item"
        const img = document.createElement("img")
        img.src = src
        img.alt = "Slot Image"
        div.appendChild(img)
        marquee.appendChild(div)
      })
      // Second unique shuffle (for seamless loop)
      reelOrders2[i].forEach((src) => {
        const div = document.createElement("div")
        div.className = "item"
        const img = document.createElement("img")
        img.src = src
        img.alt = "Slot Image"
        div.appendChild(img)
        marquee.appendChild(div)
      })
    })

    // Slot machine animation (one-time, automatic)
    const ITEM_HEIGHT = 280
    const SPACING = 50 // INCREASED from 30 to 50 to match CSS
    const SPIN_DISTANCE = (ITEM_HEIGHT + SPACING) * images.length

    function spinOnce() {
      marquees.forEach((marquee) => {
        marquee.style.transition = "transform 4s cubic-bezier(0.23, 1, 0.32, 1)"
        marquee.style.transform = `translateY(-${SPIN_DISTANCE}px)`
      })
      setTimeout(() => highlightAndAnimate(), 4100) // after spin
    }

    function highlightAndAnimate() {
      // Find the 3 images visually closest to the center (one per column)
      const selected = []
      marquees.forEach((marquee, i) => {
        const items = marquee.querySelectorAll(".item")
        const wrapper = marquee.parentElement
        const wrapperRect = wrapper.getBoundingClientRect()
        const wrapperCenterY = wrapperRect.top + wrapperRect.height / 2
        let minDist = Number.POSITIVE_INFINITY
        let closest = null
        items.forEach((item) => {
          const rect = item.getBoundingClientRect()
          const itemCenterY = rect.top + rect.height / 2
          const dist = Math.abs(itemCenterY - wrapperCenterY)
          if (dist < minDist) {
            minDist = dist
            closest = item
          }
        })
        selected.push(closest)
      })

      // MODIFIED: Immediately fade out all non-selected items
      marquees.forEach((marquee) => {
        marquee.querySelectorAll(".item").forEach((item) => {
          if (!selected.includes(item)) {
            item.classList.add("fade-out")
          }
        })
      })

      // Add a blue glow outline to one image at a time
      function glowOneByOne(idx) {
        if (idx >= selected.length) {
          // After highlighting all, make them rise together
          setTimeout(riseAndCombine, 600)
          return
        }
        selected[idx].classList.add("highlight")
        setTimeout(() => glowOneByOne(idx + 1), 800) // longer delay between highlights
      }

      // Start the highlight sequence
      glowOneByOne(0)

      // After highlighting all, make them rise, combine, and exit
      function riseAndCombine() {
        // Make all selected items rise at once
        selected.forEach((item, i) => {
          item.classList.add("rise")
          // Add center-item class to the middle item (index 1)
          if (i === 1) {
            item.classList.add("center-item")
          }
        })

        // After rise animation, move side items to center
        setTimeout(() => {
          // Get position of center item for other items to move to
          const centerItem = selected[1]
          const centerRect = centerItem.getBoundingClientRect()

          // Get positions of left and right items
          const leftItem = selected[0]
          const rightItem = selected[2]

          // Calculate the X translation needed to center
          const leftRect = leftItem.getBoundingClientRect()
          const rightRect = rightItem.getBoundingClientRect()

          const leftToCenter = centerRect.left - leftRect.left
          const rightToCenter = centerRect.left - rightRect.left

          // Use GSAP to animate items moving to center
          gsap.to(leftItem, {
            x: leftToCenter,
            duration: 0.8,
            ease: "power3.inOut",
          })

          gsap.to(rightItem, {
            x: rightToCenter,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
              // Create a combined container
              const combinedContainer = document.createElement("div")
              combinedContainer.className = "combined-container"
              document.body.appendChild(combinedContainer)

              // Clone the center item for the combined animation
              const combinedItem = centerItem.cloneNode(true)
              combinedItem.classList.add("combined")
              combinedContainer.appendChild(combinedItem)

              // Hide the original items
              gsap.to([leftItem, centerItem, rightItem], {
                opacity: 0,
                duration: 0.5,
              })

              // Animate the combined item going down
              gsap.to(combinedContainer, {
                y: window.innerHeight,
                duration: 1.5,
                ease: "power2.in",
                delay: 0.5,
                onComplete: () => {
                  // Create and animate the upwards image
                  const upwardsContainer = document.createElement("div")
                  upwardsContainer.className = "upwards-container"
                  document.body.appendChild(upwardsContainer)

                  // Add offering text
                  const offeringText = document.createElement("div")
                  offeringText.className = "offering-text"
                  offeringText.textContent = "Offering Memorandum"
                  upwardsContainer.appendChild(offeringText)

                  // Create image wrapper for glow effect
                  const imageWrapper = document.createElement("div")
                  imageWrapper.className = "upwards-image-wrapper"
                  upwardsContainer.appendChild(imageWrapper)

                  // Create the image using the new filename
                  const upwardsImage = document.createElement("img")
                  upwardsImage.src = "/images/slot/offering-memorandum.png"
                  upwardsImage.alt = "Offering Memorandum"
                  imageWrapper.appendChild(upwardsImage)

                  // Animation timeline
                  const tl = gsap.timeline()

                  // Initial state
                  gsap.set(upwardsContainer, {
                    bottom: "-100%",
                    height: "auto",
                  })

                  // FIXED: Animate it coming up to 10% from the bottom
                  tl.to(upwardsContainer, {
                    bottom: "10%", // CHANGED from -10% to 10%
                    duration: 1.8,
                    ease: "power2.out",
                  })

                  // Fade in the offering text
                  tl.to(
                    offeringText,
                    {
                      opacity: 1,
                      duration: 1,
                      ease: "power2.out",
                    },
                    "-=1.5",
                  )
                },
              })
            },
          })
        }, 800)
      }
    }

    // Start the slot machine animation with a slight delay
    setTimeout(spinOnce, 100)

    // Cleanup function
    return () => {
      // Remove any event listeners or timers if needed
      const containers = document.querySelectorAll(".combined-container, .upwards-container")
      containers.forEach((container) => {
        if (container && container.parentNode) {
          container.parentNode.removeChild(container)
        }
      })
    }
  }, [key])

  return (
    <div className={styles.slotContainer} key={key}>
      <div className={styles.columnsContainer}>
        <div className={styles.wrapper} id="column1">
          <div className={styles.marquee} id="marquee1"></div>
        </div>
        <div className={styles.wrapper} id="column2">
          <div className={styles.marquee} id="marquee2"></div>
        </div>
        <div className={styles.wrapper} id="column3">
          <div className={styles.marquee} id="marquee3"></div>
        </div>
      </div>
      <RestartButton onClick={handleRestart} />
    </div>
  )
}
