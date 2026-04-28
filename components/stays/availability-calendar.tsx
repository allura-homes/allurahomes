'use client'

import { useState, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AvailabilityDay {
  date: string
  status: 'available' | 'booked' | 'blocked'
  price?: number
}

interface AvailabilityCalendarProps {
  propertyId: string
  selectedCheckIn: string | null
  selectedCheckOut: string | null
  onSelectCheckIn: (date: string) => void
  onSelectCheckOut: (date: string) => void
  onAvailabilityLoaded?: (days: AvailabilityDay[]) => void
  minNights?: number
}

export function AvailabilityCalendar({
  propertyId,
  selectedCheckIn,
  selectedCheckOut,
  onSelectCheckIn,
  onSelectCheckOut,
  onAvailabilityLoaded,
  minNights = 1,
}: AvailabilityCalendarProps) {
  const [availability, setAvailability] = useState<AvailabilityDay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectingCheckOut, setSelectingCheckOut] = useState(false)

  // Fetch 6 months of availability
  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true)
      try {
        const fromDate = new Date()
        const toDate = new Date()
        toDate.setMonth(toDate.getMonth() + 6)

        const res = await fetch(
          `/api/guesty/availability/${propertyId}?from=${fromDate.toISOString().split('T')[0]}&to=${toDate.toISOString().split('T')[0]}`
        )

        if (res.ok) {
          const data = await res.json()
          const days = data.days || []
          setAvailability(days)
          onAvailabilityLoaded?.(days)
        }
      } catch (error) {
        console.error('Failed to fetch availability:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailability()
  }, [propertyId])

  // Build a map of date -> status for quick lookup
  const availabilityMap = useMemo(() => {
    const map = new Map<string, 'available' | 'booked' | 'blocked'>()
    availability.forEach((day) => {
      map.set(day.date, day.status)
    })
    return map
  }, [availability])

  // Check if a date is available
  const isDateAvailable = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0]
    const status = availabilityMap.get(dateStr)
    // If we don't have availability data, assume available (Guesty will validate)
    return status === 'available' || status === undefined
  }

  // Check if a date is in the past
  const isDatePast = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  // Check if selecting this checkout date would span any unavailable dates
  const isValidCheckoutDate = (date: Date): boolean => {
    if (!selectedCheckIn) return false
    
    const checkInDate = new Date(selectedCheckIn)
    const current = new Date(checkInDate)
    current.setDate(current.getDate() + 1)

    while (current <= date) {
      if (!isDateAvailable(current)) {
        return false
      }
      current.setDate(current.getDate() + 1)
    }

    // Check minimum nights
    const nights = Math.ceil((date.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    return nights >= minNights
  }

  // Handle date click
  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]

    if (!selectingCheckOut || !selectedCheckIn) {
      // Selecting check-in
      onSelectCheckIn(dateStr)
      onSelectCheckOut('')
      setSelectingCheckOut(true)
    } else {
      // Selecting check-out
      if (date <= new Date(selectedCheckIn)) {
        // Clicked before check-in, reset to new check-in
        onSelectCheckIn(dateStr)
        onSelectCheckOut('')
      } else if (isValidCheckoutDate(date)) {
        onSelectCheckOut(dateStr)
        setSelectingCheckOut(false)
      }
    }
  }

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Navigate months
  const prevMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    const today = new Date()
    if (newMonth.getFullYear() > today.getFullYear() ||
        (newMonth.getFullYear() === today.getFullYear() && newMonth.getMonth() >= today.getMonth())) {
      setCurrentMonth(newMonth)
    }
  }

  const nextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 6)
    if (newMonth <= maxDate) {
      setCurrentMonth(newMonth)
    }
  }

  // Render calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days: React.ReactNode[] = []

    // Empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateStr = date.toISOString().split('T')[0]
      const isPast = isDatePast(date)
      const isAvailable = isDateAvailable(date)
      const isBooked = !isAvailable && !isPast
      const isCheckIn = selectedCheckIn === dateStr
      const isCheckOut = selectedCheckOut === dateStr
      const isInRange =
        selectedCheckIn &&
        selectedCheckOut &&
        date > new Date(selectedCheckIn) &&
        date < new Date(selectedCheckOut)

      const isDisabled =
        isPast ||
        isBooked ||
        (selectingCheckOut && selectedCheckIn && (
          date <= new Date(selectedCheckIn) ||
          !isValidCheckoutDate(date)
        ))

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateClick(date)}
          disabled={isDisabled}
          className={cn(
            'h-10 w-full rounded-md text-sm font-medium transition-colors',
            'hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1',
            isPast && 'text-muted-foreground/40 cursor-not-allowed hover:bg-transparent',
            isBooked && 'bg-red-100 text-red-400 line-through cursor-not-allowed hover:bg-red-100',
            isAvailable && !isPast && !isCheckIn && !isCheckOut && !isInRange && 'text-foreground',
            isCheckIn && 'bg-accent text-accent-foreground rounded-r-none',
            isCheckOut && 'bg-accent text-accent-foreground rounded-l-none',
            isInRange && 'bg-accent/20 rounded-none',
            selectingCheckOut && selectedCheckIn && date > new Date(selectedCheckIn) && isAvailable && !isValidCheckoutDate(date) && 'text-muted-foreground/40 cursor-not-allowed'
          )}
        >
          {day}
        </button>
      )
    }

    return days
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="p-1 rounded-md hover:bg-muted transition-colors"
        >
          <ChevronLeft className="size-5" />
        </button>
        <h3 className="font-semibold text-foreground">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={nextMonth}
          className="p-1 rounded-md hover:bg-muted transition-colors"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      {isLoading ? (
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="h-10 bg-muted/30 rounded-md animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-accent" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-red-100 border border-red-200" />
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-muted" />
          <span>Available</span>
        </div>
      </div>

      {/* Selection info */}
      {selectingCheckOut && selectedCheckIn && (
        <p className="text-sm text-accent font-medium">
          Select your check-out date
        </p>
      )}
    </div>
  )
}
