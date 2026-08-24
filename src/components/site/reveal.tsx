"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"

/**
 * Scroll reveal, MOTION_INTENSITY 4.
 *
 * What it communicates: storytelling. Content arrives as the reader reaches it,
 * once, and never again. Reduced motion renders the final state immediately
 * rather than a shortened animation.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

/** Staggers its direct children. Same reveal, one wrapper per row. */
export function RevealGroup({
  children,
  className,
  step = 0.06,
}: {
  children: React.ReactNode
  className?: string
  step?: number
}) {
  const reduce = useReducedMotion()
  const items = React.Children.toArray(children)

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={className}>
      {items.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: i * step }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
