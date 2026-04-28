'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  watermarkLogo: string
  roomName: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  watermarkLogo,
  roomName,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(percentage)
    },
    []
  )

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <div className="space-y-4">
      <h3 
        className="text-2xl font-medium text-white tracking-wide"
        style={{ fontFamily: 'var(--font-oswald)' }}
      >
        {roomName}
      </h3>
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] overflow-hidden rounded-lg cursor-ew-resize select-none shadow-2xl"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Watermark on After */}
          <div className="absolute bottom-4 right-4 opacity-60">
            <Image
              src={watermarkLogo}
              alt="Allura Homes"
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
          {/* After Label */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded">
            <span className="text-white text-sm font-medium tracking-wider uppercase">After</span>
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Watermark on Before */}
          <div className="absolute bottom-4 right-4 opacity-40">
            <Image
              src={watermarkLogo}
              alt="Allura Homes"
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
          {/* Before Label */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded">
            <span className="text-white text-sm font-medium tracking-wider uppercase">Before</span>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Handle Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-800"
            >
              <path d="m9 18 6-6-6-6" />
              <path d="m15 18-6-6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
