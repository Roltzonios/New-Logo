"use client"
import { motion } from "framer-motion"
import { BellRing } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Add proper TypeScript interfaces
interface AIWorkflowDemoProps {
  active: boolean
}

interface StepData {
  id: number
  text: string
  completed: boolean
  progress: number
  isActive: boolean
}

interface PropertyData {
  name: string
  location: string
  price: string
  cap: string
  sqft: string
}

interface DemoState {
  hasStarted: boolean
  highestStepIndex: number
  stepsCompleted: boolean
  responseShown: boolean
}

// Fix the logos type
const logos: Record<string, string> = {
  "7-Eleven": "/images/7eleven-logo.png",
  CVS: "/images/cvs-logo.png",
  Walgreens: "/images/walgreens-logo.png",
}

// Fix the stepsData type
const stepsData: StepData[] = [
  { id: 1, text: "Finding Best Properties" },
  { id: 2, text: "Generating Offering Memorandum" },
  { id: 3, text: "Drafting Email" },
].map((step) => ({ ...step, completed: false, progress: 0, isActive: false }))

// Fix the properties type
const properties: PropertyData[] = [
  {
    name: "7-Eleven Gas Station",
    location: "123 Main St, Austin, TX",
    price: "$5,450,000",
    cap: "6.25%",
    sqft: "4,250",
  },
  {
    name: "Walgreens Corner Location",
    location: "456 Congress Ave, Austin, TX",
    price: "$3,750,000",
    cap: "5.90%",
    sqft: "14,500",
  },
  { name: "CVS Pharmacy", location: "789 Lamar Blvd, Austin, TX", price: "$4,250,000", cap: "6.10%", sqft: "12,200" },
]

const DotGrid = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  // Fix the gridRef type in DotGrid:
  const gridRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Fix: Only add event listener if gridRef.current exists
    if (!gridRef.current) return

    // Store a reference to the current element
    const currentElement = gridRef.current

    // Fix the handleMouseMove function in DotGrid:
    const handleMouseMove = (e: MouseEvent) => {
      if (currentElement) {
        const rect = currentElement.getBoundingClientRect()
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }
    }

    // Add event listener to the stored reference
    currentElement.addEventListener("mousemove", handleMouseMove)

    // Clean up using the stored reference
    return () => {
      if (currentElement) {
        currentElement.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div ref={gridRef} className="absolute inset-0 z-0 overflow-hidden bg-black">
      <div
        className="absolute"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(3, 112, 255, 0.3) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          opacity: 0.8,
        }}
      />
      <div className="dot-grid" />
    </div>
  )
}

const ThinkingAnimation = () => (
  <motion.div className="flex space-x-1 my-2 ml-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-blue-400 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2, ease: "easeInOut" }}
      />
    ))}
  </motion.div>
)

const PropertyCard = ({ property, index }: { property: PropertyData; index: number }) => {
  const getLogo = (name: string) =>
    logos[name.split(" ")[0]] ? (
      <img src={logos[name.split(" ")[0]] || "/placeholder.svg"} alt={name} className="h-5 w-auto" />
    ) : null
  const getBgClass = (name: string) => `property-card-${name.split(" ")[0].toLowerCase()}`

  return (
    <motion.div
      className={`property-card-futuristic mb-6 last:mb-0 ${getBgClass(property.name)}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 * index, type: "spring", damping: 25, stiffness: 300 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-md p-1.5 shadow-inner">
              {getLogo(property.name)}
            </div>
            <div>
              <p className="font-medium text-blue-100">{property.name}</p>
              <p className="text-xs text-blue-300/70">{property.location}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-md px-2 py-1 text-xs">
            <span className="text-blue-300 font-semibold tracking-wide">{property.cap} CAP</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs mb-3 text-blue-200/80">
          <div className="flex items-center">
            <svg className="w-3 h-3 mr-1.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>{property.sqft} SF</span>
          </div>
          <div className="flex items-center">
            <svg className="w-3 h-3 mr-1.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{property.price}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-blue-500/10 mt-1">
        <motion.div
          className="flex items-center justify-between text-blue-100 px-4 py-3 cursor-pointer group"
          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.08)" }}
        >
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-blue-400 group-hover:text-blue-300 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm group-hover:text-blue-200 transition-colors">View Offering Memorandum</span>
          </div>
          <svg
            className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

const WorkflowSteps = ({ steps, currentStepIndex }: { steps: StepData[]; currentStepIndex: number }) => (
  <motion.div
    className="bg-transparent backdrop-blur-md rounded-xl p-4 mb-6 w-[90%] mx-auto"
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    transition={{ duration: 0.3 }}
  >
    <div className="mb-3 text-white text-xs font-medium tracking-wide uppercase pl-12 opacity-80">Processing</div>
    <div className="relative">
      <div className="absolute left-[14px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-gray-500/30 to-gray-500/15" />
      {steps.map((step, index) => (
        <div key={step.id} className="relative mb-5 last:mb-0">
          <div className="flex items-start">
            <div
              className={`step-marker ${step.completed ? "completed" : ""} ${index === currentStepIndex ? "active" : ""}`}
              style={{
                background: step.completed
                  ? "linear-gradient(135deg, #10b981, #059669)"
                  : index === currentStepIndex
                    ? "linear-gradient(135deg, #014baa, #0370ff)"
                    : "linear-gradient(135deg, #4b5563, #6b7280)",
                boxShadow: step.completed
                  ? "0 0 5px rgba(16, 185, 129, 0.3)"
                  : index === currentStepIndex
                    ? "0 0 10px rgba(3, 112, 255, 0.5)"
                    : "0 0 10px rgba(75, 85, 99, 0.5)",
                border: step.completed
                  ? "1px solid rgba(16, 185, 129, 0.3)"
                  : index === currentStepIndex
                    ? "1px solid rgba(6, 182, 255, 0.3)"
                    : "1px solid rgba(75, 85, 99, 0.3)",
              }}
            >
              {step.completed ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13L9 17L19 7" />
                  </svg>
                </motion.div>
              ) : (
                index === currentStepIndex && (
                  <motion.div
                    className="h-2 w-2 bg-white rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                )
              )}
            </div>
            <div
              className={`step-text ml-3 flex-1 ${step.completed ? "completed" : ""} ${index === currentStepIndex ? "active" : ""}`}
              style={{
                background:
                  index === currentStepIndex
                    ? "linear-gradient(90deg, rgba(3, 112, 255, 0.15), rgba(9, 16, 31, 0.7) 70%)"
                    : "rgba(31, 41, 55, 0.7)",
                borderColor: index === currentStepIndex ? "rgba(3, 112, 255, 0.4)" : "rgba(75, 85, 99, 0.3)",
              }}
            >
              <span
                className={`text-sm ${index === currentStepIndex ? "text-blue-300" : index < currentStepIndex ? "text-green-300" : "text-gray-400"}`}
                style={{
                  textShadow:
                    index === currentStepIndex
                      ? "0 0 8px rgba(3, 112, 255, 0.7)"
                      : index < currentStepIndex
                        ? "0 0 8px rgba(16, 185, 129, 0.7)"
                        : "none",
                }}
              >
                {step.text}
              </span>
            </div>
          </div>
          {index <= currentStepIndex && (
            <div className="ml-12 mt-2 h-2 border border-white/30 rounded-lg">
              <motion.div
                className="h-full"
                initial={{ width: "0%" }}
                animate={{ width: step.completed ? "100%" : step.isActive ? `${step.progress}%` : "0%" }}
                transition={{ duration: step.isActive ? 1.5 : 0.5, ease: "easeInOut" }}
                style={{
                  background: step.completed
                    ? "linear-gradient(90deg, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.9), rgba(16, 185, 129, 0.8))"
                    : "linear-gradient(90deg, rgba(3, 112, 255, 0.8), rgba(28, 100, 242, 0.9), rgba(3, 112, 255, 0.8))",
                  boxShadow: step.completed ? "0 0 5px rgba(16, 185, 129, 0.5)" : "0 0 5px rgba(3, 112, 255, 0.5)",
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  </motion.div>
)

const UserMessage = ({ showNotification = false }: { showNotification?: boolean }) => (
  <motion.div className="pt-10 mb-6 w-[90%] mx-auto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <div className="flex items-start gap-2 mb-2">
      <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0px rgba(100,100,100,0.4)",
              "0 0 10px rgba(100,100,100,0.7)",
              "0 0 0px rgba(100,100,100,0.4)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-full h-full rounded-full flex items-center justify-center"
        >
          <span className="text-white font-medium text-sm">JD</span>
        </motion.div>
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium px-3 py-0.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded shadow-lg">
            John Doe
          </p>
          {showNotification && (
            <motion.div
              className="bg-gradient-to-r from-orange-600/80 to-orange-500/80 text-white flex items-center px-2 py-0.5 rounded-md shadow-lg border border-orange-400/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <BellRing size={12} className="text-white" />
              </motion.div>
              <span className="text-[10px] text-orange-100 ml-1 font-medium">new form submitted</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
    <motion.div
      className="rounded-lg mt-1 overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      style={{
        background: "radial-gradient(circle at 80% 20%, rgba(255,122,0,0.12), rgba(66,24,12,0.97))",
        border: "1px solid rgba(255,122,0,0.4)",
        boxShadow: "0 0 20px rgba(255,122,0,0.4)",
      }}
    >
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-red-500/20 to-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }}
            transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-amber-500 rounded-full"
          />
          <span className="text-[10px] text-amber-300 font-medium uppercase">Urgent</span>
        </div>
      </div>
      <div className="py-4 px-4 text-left">
        <h3 className="font-semibold text-base mb-3 text-white">
          Hey! I'm looking for an NNN property with these requirements:
        </h3>
        <div className="space-y-2.5 text-white text-sm">
          {["6% Cap Rate", "Single Tenant Only", "10 Years Remaining Min", "Under $5M"].map((req, i) => (
            <p key={i} className="flex items-start">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-1.5 opacity-80"></span>
              {req}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
)

const AIResponse = ({ properties }: { properties: PropertyData[] }) => (
  <motion.div
    className="p-5 rounded-2xl mt-6 w-[90%] mx-auto bg-gray-900/80 border border-blue-500/30 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.2 }}
  >
    <div className="flex items-start gap-3">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-full h-10 w-10 flex items-center justify-center shadow-lg">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0px rgba(99,102,241,0.4)",
              "0 0 15px rgba(99,102,241,0.7)",
              "0 0 0px rgba(99,102,241,0.4)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-full h-full rounded-full flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-base font-semibold text-white">NetLeasePlanet AI</p>
          <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-full px-2 py-0.5 text-[10px] text-blue-200">
            <div className="flex items-center gap-1">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-blue-400"
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <span>ACTIVE</span>
            </div>
          </div>
        </div>
        <div className="mb-5 text-blue-100 text-sm leading-relaxed">
          <p>
            I've analyzed your requirements and found{" "}
            <span className="text-white font-medium">{properties.length} properties</span> that match your criteria:
          </p>
          <ul className="space-y-1 mt-2 opacity-90">
            {[
              "Pharmacy tenant (Walgreens, CVS, 7-Eleven)",
              "Cap rates ranging from 7.1% to 8.6%",
              "East Coast locations (FL, NC, GA)",
              "All under $5M price point",
            ].map((item, i) => (
              <li key={i} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-80"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          {properties.map((property, index) => (
            <PropertyCard key={property.name} property={property} index={index} />
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

// Update the main component export with proper TypeScript annotations:
export default function AIWorkflowDemo({ active }: AIWorkflowDemoProps) {
  // Move these refs inside the component function
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const demoStateRef = useRef<DemoState>({
    hasStarted: false,
    highestStepIndex: -1,
    stepsCompleted: false,
    responseShown: false,
  })

  const [steps, setSteps] = useState(stepsData)
  const [showContainer, setShowContainer] = useState(false)
  const [showInitialMessage, setShowInitialMessage] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [showResponse, setShowResponse] = useState(false)
  const [restartDemo, setRestartDemo] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [isDemoActive, setIsDemoActive] = useState(false)

  const resetStates = () => {
    setSteps(stepsData)
    setShowContainer(false)
    setShowInitialMessage(false)
    setCurrentStepIndex(-1)
    setShowResponse(false)
    setShowNotification(false)
    demoStateRef.current = { hasStarted: false, highestStepIndex: -1, stepsCompleted: false, responseShown: false }
    setIsDemoActive(false)
  }

  const startDemo = () => {
    if (demoStateRef.current.hasStarted) return resumeDemo()
    resetStates()
    demoStateRef.current.hasStarted = true
    setIsDemoActive(true)
    setTimeout(() => {
      setShowContainer(true)
      setShowInitialMessage(true)
      setShowNotification(true)
      setTimeout(() => {
        setCurrentStepIndex(0)
        processStep(0)
      }, 1000)
    }, 100)
  }

  const resumeDemo = () => {
    setShowContainer(true)
    setShowInitialMessage(true)
    setIsDemoActive(true)
    if (demoStateRef.current.stepsCompleted) {
      setSteps(steps.map((step) => ({ ...step, completed: true, isActive: false })))
      setCurrentStepIndex(steps.length)
      setShowNotification(!demoStateRef.current.responseShown)
      setShowResponse(demoStateRef.current.responseShown)
    } else if (demoStateRef.current.highestStepIndex >= 0) {
      const highestStep = demoStateRef.current.highestStepIndex
      setSteps((prev) =>
        prev.map((step, i) => ({
          ...step,
          completed: i < highestStep,
          isActive: i === highestStep,
          progress: i === highestStep ? Math.max(step.progress, 50) : i < highestStep ? 100 : 0,
        })),
      )
      setCurrentStepIndex(highestStep)
      setShowNotification(true)
      processStep(highestStep)
    }
  }

  useEffect(() => {
    if (active) {
      if (restartDemo) {
        resetStates()
        setTimeout(startDemo, 300)
        setRestartDemo(false)
      } else {
        setTimeout(startDemo, 500)
      }

      // Fix: Only add event listener if document exists (for SSR)
      if (typeof document !== "undefined") {
        const handleVisibilityChange = () =>
          document.visibilityState === "visible" && demoStateRef.current.hasStarted && active && resumeDemo()

        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
      }
    } else {
      resetStates()
    }
  }, [active, restartDemo])

  const processStep = (index: number) => {
    demoStateRef.current.highestStepIndex = Math.max(demoStateRef.current.highestStepIndex, index)
    if (index >= steps.length) {
      demoStateRef.current.stepsCompleted = true
      setTimeout(() => {
        setShowResponse(true)
        demoStateRef.current.responseShown = true
        setShowNotification(false)
        setTimeout(() => {
          if (scrollContainerRef.current) {
            const targetScroll = 200
            const startScroll = scrollContainerRef.current.scrollTop
            const distance = targetScroll - startScroll
            const duration = 2000
            const startTime = performance.now()
            const scrollStep = (timestamp: number) => {
              const elapsed = timestamp - startTime
              const progress = Math.min(elapsed / duration, 1)
              const easeProgress = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2

              // Fix: Check if scrollContainerRef.current still exists
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = startScroll + distance * easeProgress
              }

              if (progress < 1 && scrollContainerRef.current) {
                requestAnimationFrame(scrollStep)
              }
            }
            requestAnimationFrame(scrollStep)
          }
        }, 600)
      }, 500)
      return
    }
    setSteps((prev) =>
      prev.map((step, i) => ({
        ...step,
        isActive: i === index,
        completed: i < index,
        progress: i === index ? 0 : i < index ? 100 : 0,
      })),
    )
    setTimeout(() => {
      setSteps((prev) => prev.map((step, i) => ({ ...step, progress: i === index ? 100 : step.progress })))
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((step, i) => ({ ...step, isActive: false, completed: i <= index, progress: i <= index ? 100 : 0 })),
        )
        setTimeout(() => {
          setCurrentStepIndex(index + 1)
          processStep(index + 1)
        }, 300)
      }, 300)
    }, 1500)
  }

  if (!active) return null

  return (
    <motion.div
      className="mx-auto relative w-full h-full"
      style={{ maxWidth: "100%", height: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      {showContainer && (
        <div className="relative h-full w-full">
          <DotGrid />
          <div ref={scrollContainerRef} className="p-6 pb-16 h-full overflow-y-auto relative z-10">
            <UserMessage showNotification={showNotification || showResponse} />
            {currentStepIndex >= 0 && <WorkflowSteps steps={steps} currentStepIndex={currentStepIndex} />}
            {showResponse && <AIResponse properties={properties} />}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 text-center backdrop-blur-sm border-t border-indigo-500/20 bg-gradient-to-r from-indigo-900/30 via-blue-900/30 to-indigo-900/30">
            <button
              onClick={() => setRestartDemo(true)}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
            >
              Restart Demo
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
