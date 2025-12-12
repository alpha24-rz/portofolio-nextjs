"use client"

import dynamic from "next/dynamic"
import React from "react"

const ClientMotion = dynamic(async () => {
  const mod = await import("framer-motion")
  const MotionDiv: React.FC<any> = (props) => {
    const { children, ...rest } = props
    // @ts-ignore
    return React.createElement(mod.motion.div, rest, children)
  }
  return MotionDiv
}, { ssr: false })

export default ClientMotion
