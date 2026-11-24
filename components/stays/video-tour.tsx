'use client'

import { useState } from 'react'
import { Play, X, Box, Video, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface VideoTourProps {
  videoUrl?: string
  walkthroughUrl?: string // Property walkthrough video
  droneUrl?: string // Aerial/drone flyover video
  matterportUrl?: string
  title: string
}

export function VideoTour({
  videoUrl,
  walkthroughUrl,
  droneUrl,
  matterportUrl,
  title,
}: VideoTourProps) {
  const [activeModal, setActiveModal] = useState<
    'walkthrough' | 'drone' | '3d' | null
  >(null)

  // Priority: walkthroughUrl > videoUrl (legacy)
  const mainVideoUrl = walkthroughUrl || videoUrl

  const hasTour = mainVideoUrl || droneUrl || matterportUrl

  if (!hasTour) return null

  const closeModal = () => {
    setActiveModal(null)
    document.body.style.overflow = ''
  }

  const openModal = (type: 'walkthrough' | 'drone' | '3d') => {
    setActiveModal(type)
    document.body.style.overflow = 'hidden'
  }

  // Extract YouTube/Vimeo embed URL
  const getEmbedUrl = (url: string): string => {
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v')
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    }
    // Direct video file
    return url
  }

  const isDirectVideo = (url: string) =>
    url.endsWith('.mp4') ||
    url.endsWith('.mov') ||
    url.endsWith('.webm') ||
    url.endsWith('.m4v')

  return (
    <>
      {/* Tour Buttons */}
      <div className="flex flex-wrap gap-3">
        {mainVideoUrl && (
          <Button
            onClick={() => openModal('walkthrough')}
            variant="outline"
            className="gap-2 border-accent text-accent hover:bg-accent hover:text-white"
          >
            <Video className="size-4" />
            Property Walkthrough
          </Button>
        )}
        {droneUrl && (
          <Button
            onClick={() => openModal('drone')}
            variant="outline"
            className="gap-2 border-accent text-accent hover:bg-accent hover:text-white"
          >
            <Plane className="size-4" />
            Aerial View
          </Button>
        )}
        {matterportUrl && (
          <Button
            onClick={() => openModal('3d')}
            variant="outline"
            className="gap-2 border-accent text-accent hover:bg-accent hover:text-white"
          >
            <Box className="size-4" />
            3D Tour
          </Button>
        )}
      </div>

      {/* Walkthrough Video Modal */}
      {activeModal === 'walkthrough' && mainVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close video"
          >
            <X className="size-6 text-white" />
          </button>

          <div className="relative w-full max-w-5xl aspect-video">
            {isDirectVideo(mainVideoUrl) ? (
              <video
                src={mainVideoUrl}
                controls
                autoPlay
                className="w-full h-full rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={getEmbedUrl(mainVideoUrl)}
                title={`${title} - Property Walkthrough`}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
        </div>
      )}

      {/* Drone Video Modal */}
      {activeModal === 'drone' && droneUrl && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close video"
          >
            <X className="size-6 text-white" />
          </button>

          <div className="relative w-full max-w-5xl aspect-video">
            {isDirectVideo(droneUrl) ? (
              <video
                src={droneUrl}
                controls
                autoPlay
                className="w-full h-full rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={getEmbedUrl(droneUrl)}
                title={`${title} - Aerial View`}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
        </div>
      )}

      {/* 3D Tour Modal */}
      {activeModal === '3d' && matterportUrl && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close 3D tour"
          >
            <X className="size-6 text-white" />
          </button>

          <div className="relative w-full max-w-6xl h-[80vh]">
            <iframe
              src={matterportUrl}
              title={`${title} - 3D Tour`}
              className="w-full h-full rounded-lg"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  )
}
