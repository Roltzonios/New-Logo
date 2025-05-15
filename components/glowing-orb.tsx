interface GlowingOrbProps {
  color: "orange" | "blue"
  size: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  delay?: number
}

export default function GlowingOrb({ color, size, top, left, right, bottom, delay = 0 }: GlowingOrbProps) {
  return (
    <div
      className={`orb-container`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        position: "absolute",
        animationDelay: `${delay}s`,
        animation: "float 8s ease-in-out infinite",
        zIndex: 0,
      }}
    >
      <div
        className={`orb-core ${color}`}
        style={{
          width: `${size * 0.5}px`,
          height: `${size * 0.5}px`,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            color === "orange"
              ? "radial-gradient(circle at 30% 30%, #FFA94D, #FF7A00)"
              : "radial-gradient(circle at 30% 30%, #4D94FF, #003366)",
          boxShadow:
            color === "orange"
              ? "0 0 60px 30px rgba(255, 122, 0, 0.6), 0 0 100px 60px rgba(255, 122, 0, 0.3)"
              : "0 0 60px 30px rgba(0, 51, 102, 0.6), 0 0 100px 60px rgba(0, 51, 102, 0.3)",
        }}
      />
    </div>
  )
}
