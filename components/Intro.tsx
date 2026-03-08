"use client"

import { useEffect, useState } from "react"

export default function Intro({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 2000)
    const t3 = setTimeout(() => onFinish(), 3200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden
      transition-all duration-1000 ${
        phase === 2 ? "opacity-0 scale-110" : "opacity-100"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-orange-500/20 blur-[200px] rounded-full"></div>

      {/* Text */}
      <h1
        className={`text-white text-7xl md:text-[8rem] font-body tracking-[0.3em]
        transition-all duration-1000
        ${
          phase === 0
            ? "opacity-0 translate-y-10"
            : phase === 1
            ? "opacity-100 translate-y-0 scale-100"
            : "scale-125 blur-md"
        }`}
      >
        ALFA
      </h1>

      {/* Bottom line animation */}
      <div
        className={`absolute bottom-24 h-[2px] bg-white transition-all duration-1000 ${
          phase >= 1 ? "w-40 opacity-100" : "w-0 opacity-0"
        }`}
      />
    </div>
  )
}