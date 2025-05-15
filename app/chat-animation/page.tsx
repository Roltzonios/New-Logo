"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import styles from "./styles.module.css"
import { Inter } from "next/font/google"

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export default function ChatAnimationPage() {
  // Refs for DOM elements
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const slotMachineContainerRef = useRef<HTMLDivElement>(null)
  const loadingOverlayRef = useRef<HTMLDivElement>(null)
  const marquee1Ref = useRef<HTMLDivElement>(null)
  const marquee2Ref = useRef<HTMLDivElement>(null)
  const marquee3Ref = useRef<HTMLDivElement>(null)

  // Animation controller refs
  const gridAnimatorRef = useRef<GridAnimator | null>(null)
  const selectionAnimatorRef = useRef<SelectionGridAnimator | null>(null)
  const memorandumAnimatorRef = useRef<MemorandumGridAnimator | null>(null)
  const emailAnimatorRef = useRef<EmailGridAnimator | null>(null)

  useEffect(() => {
    // Start the chat animation when the component mounts
    startChatAnimation()

    // Cleanup function to remove any event listeners or timers
    return () => {
      if (gridAnimatorRef.current) gridAnimatorRef.current.stop()
      if (selectionAnimatorRef.current) selectionAnimatorRef.current.stop()
      if (memorandumAnimatorRef.current) memorandumAnimatorRef.current.stop()
      if (emailAnimatorRef.current) emailAnimatorRef.current.stop()
    }
  }, [])

  // Chat Animation
  function startChatAnimation() {
    if (!chatMessagesRef.current) return

    // Add all message elements at the beginning but keep them hidden
    const messagesHTML = `
      <!-- User message -->
      <div class="${styles.messageGroup}" id="userMessage">
        <div class="${styles.messageAvatar} ${styles.user}">J</div>
        <div class="${styles.message} ${styles.userMessage}">
          <div class="${styles.notification}">New Lead Inquiry</div>
          <div class="${styles.messageText}">
            Hey! I'm looking for a NNN property with a 6% cap rate. - Under $3M -10 Year Min Remaining -Single Tenant Only -In Texas Can you send me some Offering Memorandums? Thanks!
          </div>
          <div class="${styles.messageTime}">12:05 PM</div>
        </div>
      </div>
      
      <!-- AI typing indicator 1 -->
      <div class="${styles.messageGroup} ${styles.aiGroup}" id="typingIndicator1" style="opacity: 0; display: none;">
        <div class="${styles.messageAvatar} ${styles.ai}">Z
          <div class="${styles.avatarLabel}">Astroop AI</div>
        </div>
        <div class="${styles.message} ${styles.aiMessage}">
          <div class="${styles.typingIndicator}">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      <!-- AI response -->
      <div class="${styles.messageGroup} ${styles.aiGroup}" id="aiResponse1" style="opacity: 0; display: none;">
        <div class="${styles.messageAvatar} ${styles.ai}">Z
          <div class="${styles.avatarLabel}">Astroop AI</div>
        </div>
        <div class="${styles.message} ${styles.aiMessage}">
          <div class="${styles.messageText}">
            Sure, give me a moment to get those!
          </div>
          <div class="${styles.messageTime}">12:06 PM</div>
        </div>
      </div>
    `

    chatMessagesRef.current.innerHTML = messagesHTML

    // Function to show an element with fade-in
    function showElement(id: string) {
      const element = document.getElementById(id)
      if (!element || !chatMessagesRef.current) return

      element.style.display = "flex"
      // Force reflow
      void element.offsetHeight
      // Fade in
      element.style.opacity = "1"
      // Scroll to bottom
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }

    // Function to hide an element with fade-out
    function hideElement(id: string) {
      const element = document.getElementById(id)
      if (!element) return

      element.style.opacity = "0"
      setTimeout(() => {
        element.style.display = "none"
      }, 300) // Match transition duration
    }

    // Show messages and typing indicators in sequence
    setTimeout(() => {
      // Show user message
      showElement("userMessage")

      // Show typing indicator
      setTimeout(() => {
        showElement("typingIndicator1")

        // Hide typing indicator and show AI response
        setTimeout(() => {
          hideElement("typingIndicator1")

          setTimeout(() => {
            showElement("aiResponse1")

            // Now animate chat sliding to left and start slot animation
            setTimeout(() => {
              // Preload images for slot machine before starting animation
              preloadSlotMachineImages()

              // Add minimized class before animation
              if (chatContainerRef.current) {
                chatContainerRef.current.classList.add(styles.minimized)

                // Set will-change to optimize animation
                chatContainerRef.current.style.willChange = "transform, width, left"

                // Position chat container on the left side but fully visible
                gsap.to(chatContainerRef.current, {
                  left: "50%", // Keep centered horizontally
                  xPercent: -150, // Move left by 1.5x its width from center
                  width: "33%", // Take up 33% of screen width
                  height: "90vh", // Maintain original height
                  duration: 1.2,
                  ease: "power2.inOut",
                  onComplete: () => {
                    // Clean up will-change after animation
                    if (chatContainerRef.current) {
                      chatContainerRef.current.style.willChange = "auto"
                    }

                    // Once chat is moved, show slot machine and loading overlay
                    if (slotMachineContainerRef.current) {
                      slotMachineContainerRef.current.style.opacity = "1"
                      slotMachineContainerRef.current.style.pointerEvents = "auto"

                      // Start slot machine initialization (which shows the loading animation first)
                      initSlotMachine()
                    }
                  },
                })
              }
            }, 2000)
          }, 300)
        }, 1500)
      }, 800)
    }, 1000)
  }

  // Preload images function to ensure smooth animation
  function preloadSlotMachineImages() {
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
      "/images/slot/offering-memorandum.png",
    ]

    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }

  // Show and control the loading animation
  function showLoadingAnimation() {
    if (!loadingOverlayRef.current) return null

    loadingOverlayRef.current.style.opacity = "1"

    // Start the grid cell animation patterns
    const gridAnimator = new GridAnimator()
    gridAnimatorRef.current = gridAnimator
    gridAnimator.start()

    // Return the animator so we can stop it later
    return gridAnimator
  }

  // Grid Animation Controller
  class GridAnimator {
    cells: HTMLElement[] = []
    running = false
    animationInterval: NodeJS.Timeout | null = null
    currentPattern = 0
    patterns: ((step: number) => void)[] = []

    constructor() {
      this.cells = []
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const cell = document.getElementById(`cell-${row}-${col}`)
          if (cell) this.cells.push(cell)
        }
      }
      this.running = false
      this.animationInterval = null
      this.currentPattern = 0
      this.patterns = [
        this.horizontalPattern.bind(this),
        this.verticalPattern.bind(this),
        this.diagonalPattern.bind(this),
        this.spiralPattern.bind(this),
        this.randomPattern.bind(this),
        this.centerOutPattern.bind(this),
      ]
    }

    // Clear all active cells
    clearCells() {
      this.cells.forEach((cell) => cell.classList.remove(styles.active))
    }

    // Horizontal pattern (row by row)
    horizontalPattern(step: number) {
      this.clearCells()
      const row = Math.floor(step / 3) % 3
      for (let col = 0; col < 3; col++) {
        this.cells[row * 3 + col]?.classList.add(styles.active)
      }
    }

    // Vertical pattern (column by column)
    verticalPattern(step: number) {
      this.clearCells()
      const col = Math.floor(step / 3) % 3
      for (let row = 0; row < 3; row++) {
        this.cells[row * 3 + col]?.classList.add(styles.active)
      }
    }

    // Diagonal pattern
    diagonalPattern(step: number) {
      this.clearCells()
      if (step % 2 === 0) {
        // Main diagonal (top-left to bottom-right)
        for (let i = 0; i < 3; i++) {
          this.cells[i * 3 + i]?.classList.add(styles.active)
        }
      } else {
        // Anti-diagonal (top-right to bottom-left)
        for (let i = 0; i < 3; i++) {
          this.cells[i * 3 + (2 - i)]?.classList.add(styles.active)
        }
      }
    }

    // Spiral pattern (outside to inside or inside to outside)
    spiralPattern(step: number) {
      this.clearCells()
      const cells = [0, 1, 2, 5, 8, 7, 6, 3, 4] // Clockwise spiral from outside
      const reversedCells = [4, 3, 6, 7, 8, 5, 2, 1, 0] // Inside to outside
      const sequence = step % 2 === 0 ? cells : reversedCells

      const patternStep = Math.floor(step / 2) % 3
      for (let i = 0; i <= patternStep; i++) {
        this.cells[sequence[i]]?.classList.add(styles.active)
      }
    }

    // Random pattern (cells light up randomly)
    randomPattern(step: number) {
      this.clearCells()
      const numCells = 1 + (step % 5) // 1 to 5 cells lit up

      const shuffled = [...Array(9).keys()]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

      for (let i = 0; i < numCells; i++) {
        this.cells[shuffled[i]]?.classList.add(styles.active)
      }
    }

    // Center out pattern (center cell first, then surrounding cells)
    centerOutPattern(step: number) {
      this.clearCells()
      // Center is cell 4
      // First ring is cells 1, 3, 5, 7
      // Corners are cells 0, 2, 6, 8
      const patternStep = step % 3

      if (patternStep === 0) {
        // Center only
        this.cells[4]?.classList.add(styles.active)
      } else if (patternStep === 1) {
        // Center + edges
        ;[1, 3, 4, 5, 7].forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      } else {
        // All cells
        this.cells.forEach((cell) => cell.classList.add(styles.active))
      }
    }

    // Start the animation
    start() {
      if (this.running) return

      this.running = true
      let step = 0

      this.animationInterval = setInterval(() => {
        // Every 10 steps, change to a new pattern
        if (step % 10 === 0) {
          this.currentPattern = (this.currentPattern + 1) % this.patterns.length
        }

        // Execute the current pattern
        this.patterns[this.currentPattern](step)

        step++
      }, 300) // Change pattern every 300ms
    }

    // Stop the animation
    stop() {
      if (!this.running) return

      if (this.animationInterval) {
        clearInterval(this.animationInterval)
      }
      this.running = false
      this.clearCells()
    }
  }

  // Update initSlotMachine to show loading animation
  function initSlotMachine() {
    // Start the loading animation
    const gridAnimator = showLoadingAnimation()

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
    function shuffle(arr: string[]) {
      const a = arr.slice()
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    }

    // Fill each column with a different shuffled order
    const marquees = [marquee1Ref.current, marquee2Ref.current, marquee3Ref.current]

    if (!marquees[0] || !marquees[1] || !marquees[2]) return

    const reelOrders = [shuffle(images), shuffle(images), shuffle(images)]
    const reelOrders2 = [shuffle(images), shuffle(images), shuffle(images)]

    marquees.forEach((marquee, i) => {
      if (!marquee) return

      marquee.innerHTML = ""
      // First unique shuffle
      reelOrders[i].forEach((src) => {
        const div = document.createElement("div")
        div.className = styles.item
        const img = document.createElement("img")
        img.src = src
        img.alt = "Slot Image"
        div.appendChild(img)
        marquee.appendChild(div)
      })
      // Second unique shuffle (for seamless loop)
      reelOrders2[i].forEach((src) => {
        const div = document.createElement("div")
        div.className = styles.item
        const img = document.createElement("img")
        img.src = src
        img.alt = "Slot Image"
        div.appendChild(img)
        marquee.appendChild(div)
      })
    })

    // Start the slot machine animation with a slight delay
    setTimeout(() => {
      // Hide loading animation
      if (loadingOverlayRef.current) {
        loadingOverlayRef.current.style.opacity = "0"
      }
      // Stop the grid animator
      if (gridAnimator) {
        gridAnimator.stop()
      }

      // Start spinning
      spinOnce()
    }, 3000) // Show loading for 3 seconds before starting spin
  }

  // Slot machine animation (one-time, automatic)
  const ITEM_HEIGHT = 280
  const SPACING = 50 // Increased from 30px to 50px for more space
  const SPIN_DISTANCE = (ITEM_HEIGHT + SPACING) * 10 // Using 10 as a base for the images array length

  function spinOnce() {
    const marquees = [marquee1Ref.current, marquee2Ref.current, marquee3Ref.current]

    if (!marquees[0] || !marquees[1] || !marquees[2]) return

    // Prepare for animation by forcing layout calculations first
    marquees.forEach((marquee) => {
      // Force layout calculation
      void marquee.offsetHeight

      // Apply GPU acceleration
      marquee.style.willChange = "transform"
      marquee.style.transform = "translateZ(0)"
    })

    // Sequential stopping for reels (left to right)
    marquees.forEach((marquee, index) => {
      // Add staggered delay for each column
      setTimeout(() => {
        // Initial fast spin with better transition curve
        marquee.style.transition = "transform 1.5s cubic-bezier(0.19, 0.69, 0.22, 1)"

        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          marquee.style.transform = `translateY(-${SPIN_DISTANCE * 0.6}px)`

          // Then slow down to final position
          setTimeout(() => {
            marquee.style.transition = "transform 2.5s cubic-bezier(0.33, 0.9, 0.33, 1)"

            requestAnimationFrame(() => {
              marquee.style.transform = `translateY(-${SPIN_DISTANCE}px)`
            })
          }, 1500)
        })
      }, index * 600) // Each column starts with a delay
    })

    // Allow enough time for all animation phases to complete
    setTimeout(() => {
      // Reset will-change property after animation
      marquees.forEach((marquee) => {
        marquee.style.willChange = "auto"
      })

      // Show the selection loading animation
      const selectionAnimator = showSelectionLoadingAnimation()

      // After showing loading animation for a while, start highlight process
      setTimeout(() => {
        // Hide loading animation
        if (loadingOverlayRef.current) {
          loadingOverlayRef.current.style.opacity = "0"
        }

        // Clean up selection styles
        const loadingText = document.querySelector(`.${styles.loadingText}`)
        if (loadingText) {
          loadingText.classList.remove(styles.selectionPhase)
        }

        document.querySelectorAll(`.${styles.gridCell}`).forEach((cell) => {
          cell.classList.remove(styles.selectionMode)
        })

        // Stop the grid animator
        if (selectionAnimator) {
          selectionAnimator.stop()
        }

        // Start highlight animation
        highlightAndAnimate()
      }, 2500) // Show selection loading for 2.5 seconds
    }, 5000)
  }

  function highlightAndAnimate() {
    const marquees = [marquee1Ref.current, marquee2Ref.current, marquee3Ref.current]

    if (!marquees[0] || !marquees[1] || !marquees[2]) return

    // Find the 3 images closest to center
    const selected: HTMLElement[] = []
    marquees.forEach((marquee, i) => {
      const items = marquee.querySelectorAll(`.${styles.item}`)
      const wrapper = marquee.parentElement
      if (!wrapper) return

      const wrapperRect = wrapper.getBoundingClientRect()
      const wrapperCenterY = wrapperRect.top + wrapperRect.height / 2
      let minDist = Number.POSITIVE_INFINITY
      let closest: HTMLElement | null = null

      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const itemCenterY = rect.top + rect.height / 2
        const dist = Math.abs(itemCenterY - wrapperCenterY)
        if (dist < minDist) {
          minDist = dist
          closest = item as HTMLElement
        }
      })

      if (closest) {
        selected.push(closest)
      }
    })

    // Create clones of selected elements that we'll animate
    const clones = selected.map((item, index) => {
      const clone = item.cloneNode(true) as HTMLElement
      clone.classList.add(styles.selectedClone)
      clone.classList.add(`${styles.selectedClone}-${index}`)

      // Get current position
      const rect = item.getBoundingClientRect()

      // Style the clone for animation
      clone.style.position = "fixed"
      clone.style.top = rect.top + "px"
      clone.style.left = rect.left + "px"
      clone.style.width = rect.width + "px"
      clone.style.height = rect.height + "px"
      clone.style.zIndex = "1000"
      clone.style.margin = "0"
      clone.style.transition = "none"

      // Add to document
      document.body.appendChild(clone)

      return clone
    })

    // Store the center clone and its position for other clones to move to
    const centerClone = clones[1]
    const centerPosition = centerClone?.getBoundingClientRect()

    // Hide all original marquee content
    marquees.forEach((marquee) => {
      // Fade out with transition
      marquee.style.transition = "opacity 0.5s ease"
      marquee.style.opacity = "0"
    })

    // Highlight clones one by one
    function highlightClones(idx: number) {
      if (idx >= clones.length) {
        // After highlighting all clones, begin the move to center sequence
        setTimeout(moveToCenter, 600)
        return
      }

      // Apply highlight with CSS transitions
      const clone = clones[idx]
      clone.style.transition = "box-shadow 0.5s ease, transform 0.5s ease"
      clone.style.boxShadow = "0 0 20px 8px rgba(173, 216, 230, 0.5)"
      clone.style.transform = "scale(1.05)"

      // Add a glow class for extra visual effect
      clone.classList.add(styles.highlightedClone)

      // Move to next clone after delay
      setTimeout(() => highlightClones(idx + 1), 800)
    }

    // Start highlighting process
    setTimeout(() => highlightClones(0), 500)

    // Move side clones to center
    function moveToCenter() {
      // First move up slightly
      clones.forEach((clone) => {
        clone.style.transition = "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
        clone.style.transform = "scale(1.05) translateY(-40px)"
      })

      // After moving up, begin the converge to center animation
      setTimeout(() => {
        if (!centerPosition) return

        // Get the left and right clones
        const leftClone = clones[0]
        const rightClone = clones[2]

        // Prepare for movement to center
        leftClone.style.transition = "left 0.8s cubic-bezier(0.16, 1, 0.3, 1), top 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        rightClone.style.transition = "left 0.8s cubic-bezier(0.16, 1, 0.3, 1), top 0.8s cubic-bezier(0.16, 1, 0.3, 1)"

        // Move to center position
        leftClone.style.left = centerPosition.left + "px"
        rightClone.style.left = centerPosition.left + "px"

        // After converging to center, drop them all
        setTimeout(dropClones, 1000)
      }, 800)
    }

    // Drop clones down off-screen
    function dropClones() {
      clones.forEach((clone) => {
        // Change transition for drop animation
        clone.style.transition = "top 1.2s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.8s ease"

        // Move down below screen
        clone.style.top = window.innerHeight + 100 + "px"

        // Fade out as they drop
        setTimeout(() => {
          clone.style.opacity = "0"
        }, 300)
      })

      // After clones drop, show the memorandum loading animation
      setTimeout(() => {
        // Remove clones from DOM when animations complete
        clones.forEach((clone) => clone.remove())

        // Show memorandum loading animation
        const memorandumAnimator = showMemorandumLoadingAnimation()

        // After showing memorandum loading animation, show offering memorandum
        setTimeout(() => {
          // Hide loading animation
          if (loadingOverlayRef.current) {
            loadingOverlayRef.current.style.opacity = "0"
          }

          // Clean up memorandum styles
          const loadingText = document.querySelector(`.${styles.loadingText}`)
          if (loadingText) {
            loadingText.classList.remove(styles.memorandumPhase)
          }

          document.querySelectorAll(`.${styles.gridCell}`).forEach((cell) => {
            cell.classList.remove(styles.memorandumMode)
          })

          // Stop the memorandum animator
          if (memorandumAnimator) {
            memorandumAnimator.stop()
          }

          // Show offering memorandum
          showOfferingMemorandum()
        }, 2500) // Show memorandum loading for 2.5 seconds
      }, 1500)
    }

    // Function to show offering memorandum
    function showOfferingMemorandum() {
      // Create container
      const container = document.createElement("div")
      container.className = styles.upwardsContainer
      container.innerHTML = `
        <div class="${styles.offeringText}">OFFERING MEMORANDUMS</div>
        <div class="${styles.upwardsImageWrapper}">
          <img src="/images/slot/offering-memorandum.png" alt="Offering Memorandums">
        </div>
      `

      // Set will-change for better performance
      container.style.willChange = "transform, bottom"

      // Set initial position
      container.style.bottom = "-100%"
      container.style.transition = "bottom 1.5s cubic-bezier(0.16, 1, 0.3, 1)"
      document.body.appendChild(container)

      // Force reflow before animation
      void container.offsetHeight

      // Move up with requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        container.style.bottom = "10%" // Changed from -10% to 10% to fix positioning

        // Fade in text separately with requestAnimationFrame
        const text = container.querySelector(`.${styles.offeringText}`)
        if (text) {
          text.style.willChange = "opacity, transform"
          text.style.transform = "translateY(20px)"
          text.style.transition = "opacity 0.7s ease, transform 0.7s ease"

          setTimeout(() => {
            requestAnimationFrame(() => {
              text.style.opacity = "1"
              text.style.transform = "translateY(0)"

              // WAIT FOR FULL OFFERING MEMORANDUM DOCUMENT TO BE VISIBLE FIRST
              // Let it be visible for a while
              setTimeout(() => {
                // NOW show the email generation animation
                const emailAnimator = showEmailGenerationAnimation()

                // After email generation animation, fade things out
                setTimeout(() => {
                  // Hide loading animation
                  if (loadingOverlayRef.current) {
                    loadingOverlayRef.current.style.opacity = "0"
                  }

                  // Clean up email styles
                  const loadingText = document.querySelector(`.${styles.loadingText}`)
                  if (loadingText) {
                    loadingText.classList.remove(styles.emailPhase)
                  }

                  document.querySelectorAll(`.${styles.gridCell}`).forEach((cell) => {
                    cell.classList.remove(styles.emailMode)
                  })

                  // Stop the email animator
                  if (emailAnimator) {
                    emailAnimator.stop()
                  }

                  // Fade out the offering memorandum and text
                  container.style.transition = "opacity 1s ease"
                  container.style.opacity = "0"
                  text.style.transition = "opacity 1s ease"
                  text.style.opacity = "0"

                  // After fade out completes, restore chat
                  setTimeout(() => {
                    container.style.willChange = "auto"
                    text.style.willChange = "auto"

                    // Restore chat interface
                    restoreChatInterface()
                  }, 1000)
                }, 3000) // Email generation animation duration
              }, 3000) // Time to display offering memorandum before starting email animation
            })
          }, 600)
        }
      })
    }
  }

  // Add a second loading animation for the selection process
  function showSelectionLoadingAnimation() {
    if (!loadingOverlayRef.current) return null

    // Change the text for this phase and add selection phase class
    const loadingText = document.querySelector(`.${styles.loadingText}`)
    if (loadingText) {
      loadingText.textContent = "Choosing the best properties..."
      loadingText.classList.add(styles.selectionPhase)
    }

    loadingOverlayRef.current.style.opacity = "1"

    // Add selection mode class to all grid cells to use different style
    const gridCells = document.querySelectorAll(`.${styles.gridCell}`)
    gridCells.forEach((cell) => cell.classList.add(styles.selectionMode))

    // Start the grid cell animation with selection patterns
    const gridAnimator = new SelectionGridAnimator()
    selectionAnimatorRef.current = gridAnimator
    gridAnimator.start()

    // Return the animator so we can stop it later
    return gridAnimator
  }

  // Selection Grid Animation Controller with different patterns
  class SelectionGridAnimator extends GridAnimator {
    constructor() {
      super() // Initialize base properties
      this.currentPattern = 0
      this.patterns = [
        this.checkmarkPattern.bind(this),
        this.xPattern.bind(this),
        this.scanningPattern.bind(this),
        this.cornerToCenterPattern.bind(this),
        this.flashingPattern.bind(this),
        this.analyzingPattern.bind(this),
      ]
    }

    // Checkmark pattern (resembles a check)
    checkmarkPattern(step: number) {
      this.clearCells()
      const checkmarkCells = [6, 7, 4, 2, 0] // Forms a checkmark shape
      const patternStep = step % checkmarkCells.length

      for (let i = 0; i <= patternStep; i++) {
        this.cells[checkmarkCells[i]]?.classList.add(styles.active)
      }
    }

    // X pattern (forms an X)
    xPattern(step: number) {
      this.clearCells()
      const patternStep = step % 2

      if (patternStep === 0) {
        // Main diagonal
        for (let i = 0; i < 3; i++) {
          this.cells[i * 3 + i]?.classList.add(styles.active)
        }
      } else {
        // Anti-diagonal
        for (let i = 0; i < 3; i++) {
          this.cells[i * 3 + (2 - i)]?.classList.add(styles.active)
        }
      }
    }

    // Scanning pattern (simulates scanning rows and columns)
    scanningPattern(step: number) {
      this.clearCells()
      const totalSteps = 6 // 3 rows + 3 columns
      const currentStep = step % totalSteps

      if (currentStep < 3) {
        // Highlight a row
        for (let col = 0; col < 3; col++) {
          this.cells[currentStep * 3 + col]?.classList.add(styles.active)
        }
      } else {
        // Highlight a column
        const col = currentStep - 3
        for (let row = 0; row < 3; row++) {
          this.cells[row * 3 + col]?.classList.add(styles.active)
        }
      }
    }

    // Corner to center pattern (like zooming in)
    cornerToCenterPattern(step: number) {
      this.clearCells()
      const patternStep = step % 3

      if (patternStep === 0) {
        // Corners only
        ;[0, 2, 6, 8].forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      } else if (patternStep === 1) {
        // Edges
        ;[1, 3, 5, 7].forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      } else {
        // Center
        this.cells[4]?.classList.add(styles.active)
      }
    }

    // Flashing pattern (random cells flash in groups)
    flashingPattern(step: number) {
      this.clearCells()
      // Group flashing based on step
      const groups = [
        [0, 1, 2], // Top row
        [2, 5, 8], // Right column
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [4], // Center
        [0, 4, 8], // Main diagonal
        [2, 4, 6], // Anti-diagonal
      ]

      const groupIndex = step % groups.length
      groups[groupIndex].forEach((idx) => {
        this.cells[idx]?.classList.add(styles.active)
      })
    }

    // Analyzing pattern (simulates detailed analysis)
    analyzingPattern(step: number) {
      this.clearCells()
      const sequence = [4, 1, 5, 7, 3, 0, 2, 8, 6] // Center first, then edges, then corners
      const activeCells = step % 10 // 0-9, where 9 means all cells

      for (let i = 0; i < Math.min(activeCells, 9); i++) {
        this.cells[sequence[i]]?.classList.add(styles.active)
      }
    }
  }

  // Function to show memorandum loading animation
  function showMemorandumLoadingAnimation() {
    if (!loadingOverlayRef.current) return null

    // Change the text for this phase and add memorandum phase class
    const loadingText = document.querySelector(`.${styles.loadingText}`)
    if (loadingText) {
      loadingText.textContent = "Generating branded offering memorandums..."
      loadingText.classList.add(styles.memorandumPhase)
    }

    loadingOverlayRef.current.style.opacity = "1"

    // Add memorandum mode class to all grid cells to use different style
    const gridCells = document.querySelectorAll(`.${styles.gridCell}`)
    gridCells.forEach((cell) => {
      cell.classList.remove(styles.selectionMode) // Remove any previous mode
      cell.classList.add(styles.memorandumMode)
    })

    // Start the grid cell animation with memorandum patterns
    const gridAnimator = new MemorandumGridAnimator()
    memorandumAnimatorRef.current = gridAnimator
    gridAnimator.start()

    // Return the animator so we can stop it later
    return gridAnimator
  }

  // Memorandum Grid Animation Controller with different patterns
  class MemorandumGridAnimator extends GridAnimator {
    constructor() {
      super() // Initialize base properties
      this.currentPattern = 0
      this.patterns = [
        this.squareGrowthPattern.bind(this),
        this.wavesPattern.bind(this),
        this.documentPattern.bind(this),
        this.buildingPattern.bind(this),
      ]
    }

    // Square growth pattern (expands from center)
    squareGrowthPattern(step: number) {
      this.clearCells()
      const patternStep = step % 3

      if (patternStep === 0) {
        // Center only
        this.cells[4]?.classList.add(styles.active)
      } else if (patternStep === 1) {
        // Center + middle edges
        ;[1, 3, 4, 5, 7].forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      } else {
        // All cells
        this.cells.forEach((cell) => cell.classList.add(styles.active))
      }
    }

    // Waves pattern (horizontal waves moving down)
    wavesPattern(step: number) {
      this.clearCells()
      const currentRow = step % 3
      for (let col = 0; col < 3; col++) {
        this.cells[currentRow * 3 + col]?.classList.add(styles.active)
      }
    }

    // Document pattern (simulates document scanning)
    documentPattern(step: number) {
      this.clearCells()
      const patternStep = step % 5

      if (patternStep === 0) {
        // Top row (header)
        ;[0, 1, 2].forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      } else if (patternStep === 1) {
        // Middle row (content line 1)
        ;[3, 4, 5].forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      } else if (patternStep === 2) {
        // Bottom row (content line 2)
        ;[6, 7, 8].forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      } else if (patternStep === 3) {
        // Left column (margin)
        ;[0, 3, 6].forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      } else {
        // Right column (margin)
        ;[2, 5, 8].forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      }
    }

    // Building pattern (builds document from top to bottom)
    buildingPattern(step: number) {
      const totalRows = 3
      const currentRows = Math.min(totalRows, Math.floor(step / 2) + 1)

      this.clearCells()

      for (let row = 0; row < currentRows; row++) {
        for (let col = 0; col < 3; col++) {
          this.cells[row * 3 + col]?.classList.add(styles.active)
        }
      }
    }
  }

  // Email Grid Animation Controller with different patterns
  class EmailGridAnimator extends GridAnimator {
    constructor() {
      super() // Initialize base properties
      this.currentPattern = 0
      this.patterns = [
        this.crossPattern.bind(this),
        this.pulsePattern.bind(this),
        this.rotationPattern.bind(this),
        this.wavePattern.bind(this),
      ]
    }

    // Cross pattern focusing on 2, 4, 6, 8 (the middle of each edge)
    crossPattern(step: number) {
      this.clearCells()
      const crossCells = [1, 3, 5, 7] // Center cross (2 4 6 8 in zero-indexed would be 1,3,5,7)
      const patternStep = step % 3

      if (patternStep === 0) {
        // Vertical line (1, 7)
        ;[1, 7].forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      } else if (patternStep === 1) {
        // Horizontal line (3, 5)
        ;[3, 5].forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      } else {
        // All cross cells
        crossCells.forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      }
    }

    // Pulse pattern on middle edges
    pulsePattern(step: number) {
      this.clearCells()
      // Boxes 2,4,6,8 in zero-indexed are 1,3,5,7
      const edgeCells = [1, 3, 5, 7]

      if (step % 2 === 0) {
        // Activate all edge cells
        edgeCells.forEach((idx) => {
          this.cells[idx]?.classList.add(styles.active)
        })
      } else {
        // Activate only center
        this.cells[4]?.classList.add(styles.active)
      }
    }

    // Rotation pattern around center
    rotationPattern(step: number) {
      this.clearCells()
      // Boxes 2,4,6,8 in zero-indexed are 1,3,5,7
      const edgeCells = [1, 3, 5, 7]
      const position = step % 4

      // Activate the current position
      this.cells[edgeCells[position]]?.classList.add(styles.active)

      // Always keep center active
      this.cells[4]?.classList.add(styles.active)
    }

    // Wave pattern flowing through edges
    wavePattern(step: number) {
      this.clearCells()
      // Wave sequence through middle edges
      const sequence = [1, 3, 5, 7]
      const indices = step % 4

      for (let i = 0; i <= indices; i++) {
        this.cells[sequence[i]]?.classList.add(styles.active)
      }
    }
  }

  // Function to show email generation animation
  function showEmailGenerationAnimation() {
    if (!loadingOverlayRef.current) return null

    // Change the text for this phase
    const loadingText = document.querySelector(`.${styles.loadingText}`)
    if (loadingText) {
      loadingText.textContent = "Generating email with OM's..."
      loadingText.classList.add(styles.emailPhase)
    }

    // Make the overlay darker for email generation phase and place it on top
    loadingOverlayRef.current.style.backgroundColor = "rgba(10, 14, 18, 0.92)"
    loadingOverlayRef.current.style.opacity = "1"
    loadingOverlayRef.current.style.zIndex = "1500" // Very high z-index to be on top of almost everything

    // Add email mode class to all grid cells to use different style
    const gridCells = document.querySelectorAll(`.${styles.gridCell}`)
    gridCells.forEach((cell) => {
      cell.classList.remove(styles.memorandumMode) // Remove any previous mode
      cell.classList.add(styles.emailMode)
    })

    // Start the grid cell animation with email patterns
    const gridAnimator = new EmailGridAnimator()
    emailAnimatorRef.current = gridAnimator
    gridAnimator.start()

    // Return the animator so we can stop it later
    return gridAnimator
  }

  function restoreChatInterface() {
    if (!chatContainerRef.current || !slotMachineContainerRef.current) return

    // Hide slot machine and clear background
    slotMachineContainerRef.current.style.opacity = "0"
    slotMachineContainerRef.current.style.pointerEvents = "none"

    // Restore chat container to full size
    gsap.to(chatContainerRef.current, {
      left: "50%",
      xPercent: -50,
      width: "90%",
      height: "90vh",
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        // Show typing animation
        showTypingAnimation()
      },
    })
  }

  function showTypingAnimation() {
    if (!chatMessagesRef.current) return

    const typingIndicator = document.createElement("div")
    typingIndicator.className = `${styles.messageGroup} ${styles.aiGroup}`
    typingIndicator.id = "typingIndicator"
    typingIndicator.innerHTML = `
      <div class="${styles.messageAvatar} ${styles.ai}">Z
        <div class="${styles.avatarLabel}">Astroop AI</div>
      </div>
      <div class="${styles.message} ${styles.aiMessage}">
        <div class="${styles.typingIndicator}">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `
    chatMessagesRef.current.appendChild(typingIndicator)

    // Scroll to the bottom of the chat container
    scrollToBottom()

    // Show typing indicator for a bit
    setTimeout(() => {
      typingIndicator.style.opacity = "1"

      // After typing, show the message
      setTimeout(() => {
        // Remove typing indicator
        typingIndicator.remove()
        showPropertyMessage()
      }, 2000)
    }, 500)
  }

  // Helper function to scroll to the bottom of the chat container
  function scrollToBottom() {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }

  function showPropertyMessage() {
    if (!chatMessagesRef.current) return

    const propertyMessage = document.createElement("div")
    propertyMessage.className = `${styles.messageGroup} ${styles.aiGroup}`
    propertyMessage.innerHTML = `
      <div class="${styles.messageAvatar} ${styles.ai}">Z
        <div class="${styles.avatarLabel}">Astroop AI</div>
      </div>
      <div class="${styles.message} ${styles.aiMessage}">
        <div class="${styles.messageText}">
          I found some properties matching your description here they are with their Offering Memorandums:
          <div class="${styles.propertyCards}">
            <div class="${styles.propertyCard}">
              <strong>Property 1</strong><br>
              6% cap rate, $2.5M, 10-year lease, Single Tenant, Texas<br>
              <a href="#" class="${styles.memorandumLink}">Offering Memorandum 1.pdf</a>
            </div>
            <div class="${styles.propertyCard}">
              <strong>Property 2</strong><br>
              5.8% cap rate, $2.8M, 12-year lease, Single Tenant, Texas<br>
              <a href="#" class="${styles.memorandumLink}">Offering Memorandum 2.pdf</a>
            </div>
            <div class="${styles.propertyCard}">
              <strong>Property 3</strong><br>
              6.2% cap rate, $2.9M, 15-year lease, Single Tenant, Texas<br>
              <a href="#" class="${styles.memorandumLink}">Offering Memorandum 3.pdf</a>
            </div>
          </div>
        </div>
        <div class="${styles.messageTime}">12:07 PM</div>
      </div>
    `
    chatMessagesRef.current.appendChild(propertyMessage)

    // Scroll to the bottom of the chat container
    scrollToBottom()

    // After showing properties, show user response with a longer delay
    setTimeout(() => {
      showUserResponse()
    }, 5000) // Increased from 2000 to 5000 for more delay
  }

  function showUserResponse() {
    if (!chatMessagesRef.current) return

    const userResponse = document.createElement("div")
    userResponse.className = styles.messageGroup
    userResponse.innerHTML = `
      <div class="${styles.messageAvatar} ${styles.user}">J</div>
      <div class="${styles.message} ${styles.userMessage}">
        <div class="${styles.messageText}">
          Wow! Thanks, that was quick!
        </div>
        <div class="${styles.messageInfo}">
          <div class="${styles.messageTime}">12:09 PM</div>
          <div class="${styles.messageStatus}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13L9 17L19 7" stroke="#4F80FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    `
    chatMessagesRef.current.appendChild(userResponse)

    // Scroll to the bottom of the chat container
    scrollToBottom()

    // Show restart overlay after 3 seconds
    setTimeout(() => {
      showRestartOverlay()
    }, 3000)
  }

  // Function to display restart overlay
  function showRestartOverlay() {
    // Create the overlay
    const overlay = document.createElement("div")
    overlay.className = styles.restartOverlay

    // Create the restart button
    const restartButton = document.createElement("button")
    restartButton.className = styles.restartButton
    restartButton.textContent = "Restart Demo"

    // Add click event to restart button
    restartButton.addEventListener("click", () => {
      window.location.reload()
    })

    // Add button to overlay
    overlay.appendChild(restartButton)

    // Add overlay to body
    document.body.appendChild(overlay)

    // Trigger reflow and add visible class for animation
    void overlay.offsetHeight
    overlay.classList.add(styles.visible)
  }

  return (
    <div className={inter.className}>
      {/* Chat Interface Container */}
      <div className={styles.chatContainer} id="chatContainer" ref={chatContainerRef}>
        <div className={styles.chatHeader}>
          <div className={styles.backButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="#4F80FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.companyInfo}>
            <div className={styles.companyLogo}>J</div>
            <div className={styles.companyDetails}>
              <div className={styles.companyName}>John Doe</div>
              <div className={styles.companyStatus}>Lead Response System</div>
            </div>
          </div>
          <div className={styles.menuButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 12V12.01M12 6V6.01M12 18V18.01"
                stroke="#4F80FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className={styles.chatMessages} id="chatMessages" ref={chatMessagesRef}>
          {/* Messages will be added here via JavaScript */}
        </div>

        <div className={styles.chatInput}>
          <input type="text" placeholder="Write a message" disabled />
          <button className={styles.sendButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
                stroke="#4F80FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Slot Machine Container (Initially Hidden) */}
      <div
        className={styles.slotMachineContainer}
        id="slotMachineContainer"
        ref={slotMachineContainerRef}
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        {/* Loading Animation Overlay */}
        <div className={styles.loadingOverlay} id="loadingOverlay" ref={loadingOverlayRef}>
          <div className={styles.loadingText}>Searching for the best properties...</div>
          <div className={styles.loadingGrid}>
            <div className={styles.gridCell} id="cell-0-0"></div>
            <div className={styles.gridCell} id="cell-0-1"></div>
            <div className={styles.gridCell} id="cell-0-2"></div>
            <div className={styles.gridCell} id="cell-1-0"></div>
            <div className={styles.gridCell} id="cell-1-1"></div>
            <div className={styles.gridCell} id="cell-1-2"></div>
            <div className={styles.gridCell} id="cell-2-0"></div>
            <div className={styles.gridCell} id="cell-2-1"></div>
            <div className={styles.gridCell} id="cell-2-2"></div>
          </div>
        </div>

        <div className={styles.columnsContainer}>
          <div className={styles.wrapper} id="column1">
            <div className={styles.marquee} id="marquee1" ref={marquee1Ref}></div>
          </div>
          <div className={styles.wrapper} id="column2">
            <div className={styles.marquee} id="marquee2" ref={marquee2Ref}></div>
          </div>
          <div className={styles.wrapper} id="column3">
            <div className={styles.marquee} id="marquee3" ref={marquee3Ref}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
