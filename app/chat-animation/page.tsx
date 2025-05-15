"use client"

import { useEffect, useRef } from "react"
import styles from "./styles.module.css"
import gsap from "gsap"

export default function ChatAnimation() {
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const slotMachineContainerRef = useRef<HTMLDivElement>(null)
  const loadingOverlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize the animation when the component mounts
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
    script.async = true
    script.onload = () => {
      // Start the animation once GSAP is loaded
      startChatAnimation()
    }
    document.body.appendChild(script)

    return () => {
      // Clean up
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // Function to show an element with fade-in
  const showElement = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.style.display = "flex"
      // Force reflow
      void element.offsetHeight
      // Fade in
      element.style.opacity = "1"
      // Scroll to bottom
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
      }
    }
  }

  // Function to hide an element with fade-out
  const hideElement = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.style.opacity = "0"
      setTimeout(() => {
        element.style.display = "none"
      }, 300) // Match transition duration
    }
  }

  // Start the chat animation sequence
  const startChatAnimation = () => {
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
          <div class="${styles.avatarLabel}">ZAPCRE AI</div>
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
          <div class="${styles.avatarLabel}">ZAPCRE AI</div>
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
                // @ts-ignore - gsap is loaded via CDN
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
                    }

                    // Start slot machine initialization (which shows the loading animation first)
                    initSlotMachine()
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
  const preloadSlotMachineImages = () => {
    const images = [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image5-YHpyLYDh6xJ7E3MK2CXiq4I0JcFMW3.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image3-Xpw6rsJoRphyeuMOg9mJu6WNcXunu1.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image1-yfnaQGuRx0a1zVO2tKoBk36NTQYGdb.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image4-RBcTMpROISFubsu6pBMkL4t4d8lfMj.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image2-P3ZPGGdvUq328DmCJ3Mnap0LEZmiI0.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2836%29-u39s78ekm6jjsgZoyDFgkbKKtKooXo.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2837%29-5cJTuK5XBR0MGlpwB2ggkzJH7f4H6i.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image7-Af0d3Dra9y9KVl3lVqGsFHbEGeHYzU.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OpenAI%20Playground%202025-05-13%20at%2020.33.54-f7MRl8CQPHepzGxLOCwabfRfCvsRV7.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image6-AnewAPuzhmlsPdsLmv7ChJxJNcunLb.png",
    ]

    images.forEach((src) => {
      const img = new Image()
      img.src = src
      img.crossOrigin = "anonymous"
    })
  }

  // Show and control the loading animation
  const showLoadingAnimation = () => {
    if (loadingOverlayRef.current) {
      loadingOverlayRef.current.style.opacity = "1"
    }

    // Start the grid cell animation patterns
    const gridAnimator = new GridAnimator()
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
        this.cells[row * 3 + col].classList.add(styles.active)
      }
    }

    // Vertical pattern (column by column)
    verticalPattern(step: number) {
      this.clearCells()
      const col = Math.floor(step / 3) % 3
      for (let row = 0; row < 3; row++) {
        this.cells[row * 3 + col].classList.add(styles.active)
      }
    }

    // Diagonal pattern
    diagonalPattern(step: number) {
      this.clearCells()
      if (step % 2 === 0) {
        // Main diagonal (top-left to bottom-right)
        for (let i = 0; i < 3; i++) {
          this.cells[i * 3 + i].classList.add(styles.active)
        }
      } else {
        // Anti-diagonal (top-right to bottom-left)
        for (let i = 0; i < 3; i++) {
          this.cells[i * 3 + (2 - i)].classList.add(styles.active)
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
        this.cells[sequence[i]].classList.add(styles.active)
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

      for (let i = 0; i < Math.min(numCells, 9); i++) {
        this.cells[shuffled[i]].classList.add(styles.active)
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
        this.cells[4].classList.add(styles.active)
      } else if (patternStep === 1) {
        // Center + edges
        ;[1, 3, 4, 5, 7].forEach((idx) => this.cells[idx].classList.add(styles.active))
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

  // Selection Grid Animation Controller with different patterns
  class SelectionGridAnimator extends GridAnimator {
    constructor() {
      super() // Initialize base properties
      this.currentPattern = 0
      this.patterns = [
        this.zigzagPattern.bind(this),
        this.xPattern.bind(this),
        this.scanningPattern.bind(this),
        this.cornerToCenterPattern.bind(this),
        this.flashingPattern.bind(this),
        this.analyzingPattern.bind(this),
      ]
    }

    // Zigzag pattern (resembles a Z)
    zigzagPattern(step: number) {
      this.clearCells()
      const zigzagCells = [0, 1, 2, 4, 6, 7, 8] // Forms a Z shape
      const patternStep = step % zigzagCells.length

      for (let i = 0; i <= patternStep; i++) {
        this.cells[zigzagCells[i]].classList.add(styles.active)
      }
    }

    // X pattern (forms an X)
    xPattern(step: number) {
      this.clearCells()
      const patternStep = step % 2

      if (patternStep === 0) {
        // Main diagonal
        for (let i = 0; i < 3; i++) {
          this.cells[i * 3 + i].classList.add(styles.active)
        }
      } else {
        // Anti-diagonal
        for (let i = 0; i < 3; i++) {
          this.cells[i * 3 + (2 - i)].classList.add(styles.active)
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
          this.cells[currentStep * 3 + col].classList.add(styles.active)
        }
      } else {
        // Highlight a column
        const col = currentStep - 3
        for (let row = 0; row < 3; row++) {
          this.cells[row * 3 + col].classList.add(styles.active)
        }
      }
    }

    // Corner to center pattern (like zooming in)
    cornerToCenterPattern(step: number) {
      this.clearCells()
      const patternStep = step % 3

      if (patternStep === 0) {
        // Corners only
        ;[0, 2, 6, 8].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else if (patternStep === 1) {
        // Edges
        ;[1, 3, 5, 7].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else {
        // Center
        this.cells[4].classList.add(styles.active)
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
      groups[groupIndex].forEach((idx) => this.cells[idx].classList.add(styles.active))
    }

    // Analyzing pattern (simulates detailed analysis)
    analyzingPattern(step: number) {
      this.clearCells()
      const sequence = [4, 1, 5, 7, 3, 0, 2, 8, 6] // Center first, then edges, then corners
      const activeCells = step % 10 // 0-9, where 9 means all cells

      for (let i = 0; i < Math.min(activeCells, 9); i++) {
        this.cells[sequence[i]].classList.add(styles.active)
      }
    }
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
        this.checkerboardPattern.bind(this),
        this.crosshairPattern.bind(this),
      ]
    }

    // Square growth pattern (expands from center)
    squareGrowthPattern(step: number) {
      this.clearCells()
      const patternStep = step % 3

      if (patternStep === 0) {
        // Center only
        this.cells[4].classList.add(styles.active)
      } else if (patternStep === 1) {
        // Center + middle edges
        ;[1, 3, 4, 5, 7].forEach((idx) => this.cells[idx].classList.add(styles.active))
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
        this.cells[currentRow * 3 + col].classList.add(styles.active)
      }
    }

    // Document pattern (simulates document scanning)
    documentPattern(step: number) {
      this.clearCells()
      const patternStep = step % 5

      if (patternStep === 0) {
        // Top row (header)
        ;[0, 1, 2].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else if (patternStep === 1) {
        // Middle row (content line 1)
        ;[3, 4, 5].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else if (patternStep === 2) {
        // Bottom row (content line 2)
        ;[6, 7, 8].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else if (patternStep === 3) {
        // Left column (margin)
        ;[0, 3, 6].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else {
        // Right column (margin)
        ;[2, 5, 8].forEach((idx) => this.cells[idx].classList.add(styles.active))
      }
    }

    // Building pattern (builds document from top to bottom)
    buildingPattern(step: number) {
      const totalRows = 3
      const currentRows = Math.min(totalRows, Math.floor(step / 2) + 1)

      this.clearCells()

      for (let row = 0; row < currentRows; row++) {
        for (let col = 0; col < 3; col++) {
          this.cells[row * 3 + col].classList.add(styles.active)
        }
      }
    }

    // Checkerboard pattern
    checkerboardPattern(step: number) {
      this.clearCells()
      const checkerboard = step % 2 === 0 ? [0, 2, 4, 6, 8] : [1, 3, 5, 7]

      checkerboard.forEach((idx) => {
        this.cells[idx].classList.add(styles.active)
      })
    }

    // Crosshair pattern (center + vertical and horizontal lines)
    crosshairPattern(step: number) {
      this.clearCells()
      const patternStep = step % 3

      if (patternStep === 0) {
        // Center only
        this.cells[4].classList.add(styles.active)
      } else if (patternStep === 1) {
        // Center + vertical line
        ;[1, 4, 7].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else {
        // Center + horizontal line
        ;[3, 4, 5].forEach((idx) => this.cells[idx].classList.add(styles.active))
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
        this.envelopePattern.bind(this),
        this.sendingPattern.bind(this),
      ]
    }

    // Cross pattern focusing on 2, 4, 6, 8 (the middle of each edge)
    crossPattern(step: number) {
      this.clearCells()
      const crossCells = [1, 3, 5, 7] // Center cross (2 4 6 8 in zero-indexed would be 1,3,5,7)
      const patternStep = step % 3

      if (patternStep === 0) {
        // Vertical line (1, 7)
        ;[1, 7].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else if (patternStep === 1) {
        // Horizontal line (3, 5)
        ;[3, 5].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else {
        // All cross cells
        crossCells.forEach((idx) => this.cells[idx].classList.add(styles.active))
      }
    }

    // Pulse pattern on middle edges
    pulsePattern(step: number) {
      this.clearCells()
      // Boxes 2,4,6,8 in zero-indexed are 1,3,5,7
      const edgeCells = [1, 3, 5, 7]

      if (step % 2 === 0) {
        // Activate all edge cells
        edgeCells.forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else {
        // Activate only center
        this.cells[4].classList.add(styles.active)
      }
    }

    // Rotation pattern around center
    rotationPattern(step: number) {
      this.clearCells()
      // Boxes 2,4,6,8 in zero-indexed are 1,3,5,7
      const edgeCells = [1, 3, 5, 7]
      const position = step % 4

      // Activate the current position
      this.cells[edgeCells[position]].classList.add(styles.active)

      // Always keep center active
      this.cells[4].classList.add(styles.active)
    }

    // Wave pattern flowing through edges
    wavePattern(step: number) {
      this.clearCells()
      // Wave sequence through middle edges
      const sequence = [1, 3, 5, 7]
      const indices = step % 4

      for (let i = 0; i <= indices; i++) {
        this.cells[sequence[i]].classList.add(styles.active)
      }
    }

    // Envelope pattern (simulates an envelope)
    envelopePattern(step: number) {
      this.clearCells()
      const patternStep = step % 4

      if (patternStep === 0) {
        // Top and bottom rows (envelope)
        ;[0, 1, 2, 6, 7, 8].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else if (patternStep === 1) {
        // Diagonal lines (envelope fold)
        ;[0, 4, 8].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else if (patternStep === 2) {
        // Other diagonal
        ;[2, 4, 6].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else {
        // Full envelope
        this.cells.forEach((cell) => cell.classList.add(styles.active))
      }
    }

    // Sending pattern (simulates sending an email)
    sendingPattern(step: number) {
      this.clearCells()
      const patternStep = step % 5

      if (patternStep === 0) {
        // Start at bottom left
        this.cells[6].classList.add(styles.active)
      } else if (patternStep === 1) {
        // Move to center
        this.cells[4].classList.add(styles.active)
      } else if (patternStep === 2) {
        // Move to top right
        this.cells[2].classList.add(styles.active)
      } else if (patternStep === 3) {
        // Flash top right
        ;[0, 1, 2, 5].forEach((idx) => this.cells[idx].classList.add(styles.active))
      } else {
        // Complete
        ;[0, 1, 2].forEach((idx) => this.cells[idx].classList.add(styles.active))
      }
    }
  }

  // Update initSlotMachine to show loading animation
  const initSlotMachine = () => {
    // Start the loading animation
    const gridAnimator = showLoadingAnimation()

    // Images to use
    const images = [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image5-YHpyLYDh6xJ7E3MK2CXiq4I0JcFMW3.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image3-Xpw6rsJoRphyeuMOg9mJu6WNcXunu1.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image1-yfnaQGuRx0a1zVO2tKoBk36NTQYGdb.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image4-RBcTMpROISFubsu6pBMkL4t4d8lfMj.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image2-P3ZPGGdvUq328DmCJ3Mnap0LEZmiI0.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2836%29-u39s78ekm6jjsgZoyDFgkbKKtKooXo.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%2837%29-5cJTuK5XBR0MGlpwB2ggkzJH7f4H6i.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image7-Af0d3Dra9y9KVl3lVqGsFHbEGeHYzU.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OpenAI%20Playground%202025-05-13%20at%2020.33.54-f7MRl8CQPHepzGxLOCwabfRfCvsRV7.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image6-AnewAPuzhmlsPdsLmv7ChJxJNcunLb.png",
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
    const marquees = [
      document.getElementById("marquee1"),
      document.getElementById("marquee2"),
      document.getElementById("marquee3"),
    ]

    if (marquees[0] && marquees[1] && marquees[2]) {
      const reelOrders = [shuffle(images), shuffle(images), shuffle(images)]
      const reelOrders2 = [shuffle(images), shuffle(images), shuffle(images)]

      marquees.forEach((marquee, i) => {
        if (marquee) {
          marquee.innerHTML = ""
          // First unique shuffle
          reelOrders[i].forEach((src) => {
            const div = document.createElement("div")
            div.className = styles.item
            const img = document.createElement("img")
            img.src = src
            img.alt = "Property Image"
            img.crossOrigin = "anonymous"
            div.appendChild(img)
            marquee.appendChild(div)
          })
          // Second unique shuffle (for seamless loop)
          reelOrders2[i].forEach((src) => {
            const div = document.createElement("div")
            div.className = styles.item
            const img = document.createElement("img")
            img.src = src
            img.alt = "Property Image"
            img.crossOrigin = "anonymous"
            div.appendChild(img)
            marquee.appendChild(div)
          })
        }
      })
    }

    // Start the slot machine animation with a slight delay
    setTimeout(() => {
      // Hide loading animation
      if (loadingOverlayRef.current) {
        loadingOverlayRef.current.style.opacity = "0"
      }
      // Stop the grid animator
      gridAnimator.stop()

      // Start spinning
      spinOnce()
    }, 3000) // Show loading for 3 seconds before starting spin
  }

  // Slot machine animation (one-time, automatic)
  const ITEM_HEIGHT = 280
  const SPACING = 30
  const SPIN_DISTANCE = (ITEM_HEIGHT + SPACING) * 10 // Using 10 as a base for the images array length

  const spinOnce = () => {
    const marquees = [
      document.getElementById("marquee1"),
      document.getElementById("marquee2"),
      document.getElementById("marquee3"),
    ]

    if (marquees[0] && marquees[1] && marquees[2]) {
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
        if (marquee) {
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
        }
      })

      // Allow enough time for all animation phases to complete
      setTimeout(() => {
        // Reset will-change property after animation
        marquees.forEach((marquee) => {
          if (marquee) {
            marquee.style.willChange = "auto"
          }
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

          const gridCells = document.querySelectorAll(`.${styles.gridCell}`)
          gridCells.forEach((cell) => {
            cell.classList.remove(styles.selectionMode)
          })

          // Stop the grid animator
          selectionAnimator.stop()

          // Start highlight animation
          highlightAndAnimate()
        }, 2500) // Show selection loading for 2.5 seconds
      }, 5000)
    }
  }

  // Add a second loading animation for the selection process
  const showSelectionLoadingAnimation = () => {
    if (loadingOverlayRef.current) {
      // Change the text for this phase and add selection phase class
      const loadingText = document.querySelector(`.${styles.loadingText}`)
      if (loadingText) {
        loadingText.textContent = "Choosing the best properties..."
        loadingText.classList.add(styles.selectionPhase)
      }
      loadingOverlayRef.current.style.opacity = "1"
    }

    // Add selection mode class to all grid cells to use different style
    const gridCells = document.querySelectorAll(`.${styles.gridCell}`)
    gridCells.forEach((cell) => {
      cell.classList.add(styles.selectionMode)
    })

    // Start the grid cell animation with selection patterns
    const gridAnimator = new SelectionGridAnimator()
    gridAnimator.start()

    // Return the animator so we can stop it later
    return gridAnimator
  }

  // Function to show memorandum loading animation
  const showMemorandumLoadingAnimation = () => {
    if (loadingOverlayRef.current) {
      // Change the text for this phase and add memorandum phase class
      const loadingText = document.querySelector(`.${styles.loadingText}`)
      if (loadingText) {
        loadingText.textContent = "Generating branded offering memorandums..."
        loadingText.classList.add(styles.memorandumPhase)
      }
      loadingOverlayRef.current.style.opacity = "1"
    }

    // Add memorandum mode class to all grid cells to use different style
    const gridCells = document.querySelectorAll(`.${styles.gridCell}`)
    gridCells.forEach((cell) => {
      cell.classList.remove(styles.selectionMode) // Remove any previous mode
      cell.classList.add(styles.memorandumMode)
    })

    // Start the grid cell animation with memorandum patterns
    const gridAnimator = new MemorandumGridAnimator()
    gridAnimator.start()

    // Return the animator so we can stop it later
    return gridAnimator
  }

  // Function to show email generation animation
  const showEmailGenerationAnimation = () => {
    if (loadingOverlayRef.current) {
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
    }

    // Add email mode class to all grid cells to use different style
    const gridCells = document.querySelectorAll(`.${styles.gridCell}`)
    gridCells.forEach((cell) => {
      cell.classList.remove(styles.memorandumMode) // Remove any previous mode
      cell.classList.add(styles.emailMode)
    })

    // Start the grid cell animation with email patterns
    const gridAnimator = new EmailGridAnimator()
    gridAnimator.start()

    // Return the animator so we can stop it later
    return gridAnimator
  }

  const highlightAndAnimate = () => {
    const marquees = [
      document.getElementById("marquee1"),
      document.getElementById("marquee2"),
      document.getElementById("marquee3"),
    ]

    if (marquees[0] && marquees[1] && marquees[2]) {
      // Find the 3 images closest to center
      const selected: HTMLElement[] = []
      marquees.forEach((marquee, i) => {
        if (marquee) {
          const items = marquee.querySelectorAll(`.${styles.item}`)
          const wrapper = marquee.parentElement
          if (wrapper) {
            const wrapperRect = wrapper.getBoundingClientRect()
            const wrapperCenterY = wrapperRect.top + wrapperRect.height / 2
            let minDist = Number.POSITIVE_INFINITY
            let closest: Element | null = null
            items.forEach((item) => {
              const rect = item.getBoundingClientRect()
              const itemCenterY = rect.top + rect.height / 2
              const dist = Math.abs(itemCenterY - wrapperCenterY)
              if (dist < minDist) {
                minDist = dist
                closest = item
              }
            })
            if (closest) selected.push(closest as HTMLElement)
          }
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
      const centerPosition = centerClone.getBoundingClientRect()

      // Hide all original marquee content
      marquees.forEach((marquee) => {
        if (marquee) {
          // Fade out with transition
          marquee.style.transition = "opacity 0.5s ease"
          marquee.style.opacity = "0"
        }
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
        clone.style.boxShadow = "0 0 20px 8px rgba(59, 130, 246, 0.5)"
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
          // Get the left and right clones
          const leftClone = clones[0]
          const rightClone = clones[2]

          // Prepare for movement to center
          leftClone.style.transition = "left 0.8s cubic-bezier(0.16, 1, 0.3, 1), top 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
          rightClone.style.transition =
            "left 0.8s cubic-bezier(0.16, 1, 0.3, 1), top 0.8s cubic-bezier(0.16, 1, 0.3, 1)"

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

            const gridCells = document.querySelectorAll(`.${styles.gridCell}`)
            gridCells.forEach((cell) => {
              cell.classList.remove(styles.memorandumMode)
            })

            // Stop the memorandum animator
            memorandumAnimator.stop()

            // Show offering memorandum
            showOfferingMemorandum()
          }, 2500) // Show memorandum loading for 2.5 seconds
        }, 1500)
      }
    }
  }

  // Function to show offering memorandum
  const showOfferingMemorandum = () => {
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
      container.style.bottom = "-10%"

      // Fade in text separately with requestAnimationFrame
      const text = container.querySelector(`.${styles.offeringText}`)
      if (text) {
        ;(text as HTMLElement).style.willChange = "opacity, transform"
        ;(text as HTMLElement).style.transform = "translateY(20px)"
        ;(text as HTMLElement).style.transition = "opacity 0.7s ease, transform 0.7s ease"

        setTimeout(() => {
          requestAnimationFrame(() => {
            ;(text as HTMLElement).style.opacity = "1"
            ;(text as HTMLElement).style.transform = "translateY(0)"

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

                const gridCells = document.querySelectorAll(`.${styles.gridCell}`)
                gridCells.forEach((cell) => {
                  cell.classList.remove(styles.emailMode)
                })

                // Stop the email animator
                emailAnimator.stop()

                // Fade out the offering memorandum and text
                container.style.transition = "opacity 1s ease"
                container.style.opacity = "0"
                if (text) {
                  ;(text as HTMLElement).style.transition = "opacity 1s ease"
                  ;(text as HTMLElement).style.opacity = "0"
                }

                // After fade out completes, restore chat
                setTimeout(() => {
                  container.style.willChange = "auto"
                  if (text) {
                    ;(text as HTMLElement).style.willChange = "auto"
                  }

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

  const restoreChatInterface = () => {
    if (chatContainerRef.current && slotMachineContainerRef.current) {
      // Hide slot machine and clear background
      slotMachineContainerRef.current.style.opacity = "0"
      slotMachineContainerRef.current.style.pointerEvents = "none"

      // Restore chat container to full size
      // @ts-ignore - gsap is loaded via CDN
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
  }

  const showTypingAnimation = () => {
    if (chatMessagesRef.current) {
      const typingIndicator = document.createElement("div")
      typingIndicator.className = `${styles.messageGroup} ${styles.aiGroup}`
      typingIndicator.id = "typingIndicator"
      typingIndicator.innerHTML = `
        <div class="${styles.messageAvatar} ${styles.ai}">Z
          <div class="${styles.avatarLabel}">ZAPCRE AI</div>
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
  }

  // Helper function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }

  const showPropertyMessage = () => {
    if (chatMessagesRef.current) {
      const propertyMessage = document.createElement("div")
      propertyMessage.className = `${styles.messageGroup} ${styles.aiGroup}`
      propertyMessage.innerHTML = `
        <div class="${styles.messageAvatar} ${styles.ai}">Z
          <div class="${styles.avatarLabel}">ZAPCRE AI</div>
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
  }

  const showUserResponse = () => {
    if (chatMessagesRef.current) {
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
                <path d="M5 13L9 17L19 7" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
  }

  // Function to display restart overlay
  const showRestartOverlay = () => {
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
    <div className={styles.pageContainer}>
      {/* Chat Interface Container */}
      <div className={styles.chatContainer} id="chatContainer" ref={chatContainerRef}>
        <div className={styles.chatHeader}>
          <div className={styles.backButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="#3b82f6"
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
                stroke="#3b82f6"
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
                stroke="#ffffff"
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
            <div className={styles.marquee} id="marquee1"></div>
          </div>
          <div className={styles.wrapper} id="column2">
            <div className={styles.marquee} id="marquee2"></div>
          </div>
          <div className={styles.wrapper} id="column3">
            <div className={styles.marquee} id="marquee3"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
