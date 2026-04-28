'use client'

import { motion, type Variant } from 'motion/react'
import type { ReactNode } from 'react'

type AnimateOnScrollProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
}

const directionMap: Record<string, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 32,
}: AnimateOnScrollProps) {
  const offset = directionMap[direction]
  const scaledOffset: Record<string, number> = {}
  if (offset.x) scaledOffset.x = (offset.x / 32) * distance
  if (offset.y) scaledOffset.y = (offset.y / 32) * distance

  const hidden: Variant = { opacity: 0, ...scaledOffset }
  const visible: Variant = { opacity: 1, x: 0, y: 0 }

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
