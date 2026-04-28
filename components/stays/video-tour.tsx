'use client'

import { useState } from 'react'
import { Play, X, Box, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface VideoTourProps {
  videoUrl?: string
  matterportUrl?: string
  title: string
}

export function VideoTour({ videoUrl, matterportUrl, title }: VideoTourProps) {
  const [activeModal, setActiveModal] = useState<'video' | '3d' | null>(null)

  const hasTour = videoUrl || matterportUrl

  if (!hasTour) return null

  const closeModal = () => {
    setActiveModal(null)
    document.body.style.overflow = ''
  }

  const openModal = (type: 'video' | '3d') => {
    setActiveModal(type)
    document.body.style.overflow = 'hidden'
  }

  // Extract YouTube/Vimeo embed URL
  const getEmbedUrl = (url: string): string => {
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v')
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    }
    // Direct video file
    return url
  }

  const isDirectVideo = videoUrl && (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.mov') || videoUrl.endsWith('.webm'))

  return (
    <>
      {/* Tour Buttons */}
      <div className="flex flex-wrap gap-3">
        {videoUrl && (
          <Button
            onClick={() => openModal('video')}
            variant="outline"
            className="gap-2 border-accent text-accent hover:bg-accent hover:text-white"
          >
            <Video className="size-4" />
            Watch Video Tour
          </Button>
        )}
        {matterportUrl && (
          <Button
            onClick={() => openModal('3d')}
            variant="outline"
            className="gap-2 border-accent text-accent hover:bg-accent hover:text-white"
          >
            <Box className="size-4" />
            Explore 3D Tour
          </Button>
        )}
      </div>

      {/* Video Modal */}
      {activeModal === 'video' && videoUrl && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="size-6 text-white" />
          </button>

          <div className="relative w-full max-w-5xl aspect-video">
            {isDirectVideo ? (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={getEmbedUrl(videoUrl)}
                title={`${title} - Video Tour`}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
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
          >
            <X className="size-6 text-white" />
          </button>

          <div className="relative w-full max-w-6xl h-[80vh]">
            <iframe
              src={matterportUrl}
              title={`${title} - 3D Tour`}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}
