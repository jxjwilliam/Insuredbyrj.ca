'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'

interface HeroVideoProps {
  videoSrc: string
  coverImageSrc: string
  mobileCoverImageSrc: string
  alt: string
  className?: string
}

// Global flag to track if video has been loaded in this session (SPA behavior)
const VIDEO_LOADED_KEY = 'hero-video-loaded'
const getVideoLoadedFlag = () => {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(VIDEO_LOADED_KEY) === 'true'
}
const setVideoLoadedFlag = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(VIDEO_LOADED_KEY, 'true')
  }
}

/**
 * Hero video component that displays cover image first, then loads and plays video
 * Shows cover image on mobile, video on desktop
 * Optimized for SPA: video loads only once per session
 * @param videoSrc - Path to video file
 * @param coverImageSrc - Path to cover image for desktop
 * @param mobileCoverImageSrc - Path to cover image for mobile
 * @param alt - Alt text for accessibility
 * @param className - Additional CSS classes
 */
export function HeroVideo({
  videoSrc,
  coverImageSrc,
  mobileCoverImageSrc,
  alt,
  className = '',
}: HeroVideoProps) {
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [isMobile, setIsMobile] = useState(true) // Start as true to avoid hydration issues
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasLoadedInSession = useMemo(() => getVideoLoadedFlag(), [])

  // Check if mobile on mount and resize (debounced for performance)
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024 // lg breakpoint
      setIsMobile(mobile)
    }
    
    // Check immediately on client side
    checkMobile()
    
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkMobile, 150) // Debounce resize
    }
    
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  // Load video on desktop only - optimized for SPA (loads once per session)
  useEffect(() => {
    if (isMobile) {
      setLoadingState('idle')
      return
    }

    // If video was already loaded in this session, mark as ready immediately
    if (hasLoadedInSession && videoRef.current) {
      const video = videoRef.current
      if (video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
        setLoadingState('ready')
        return
      }
    }

    let cleanup: (() => void) | null = null
    let initTimer: NodeJS.Timeout | null = null

    const initVideo = () => {
      const video = videoRef.current
      if (!video) {
        initTimer = setTimeout(initVideo, 100)
        return
      }

      // If already loaded, skip
      if (video.readyState >= 3) {
        setLoadingState('ready')
        setVideoLoadedFlag()
        return
      }

      setLoadingState('loading')

      // Optimized event handlers
      const handleCanPlay = () => {
        setLoadingState('ready')
        setVideoLoadedFlag()
      }

      const handleError = (e: Event) => {
        console.error('Video loading error:', e)
        setLoadingState('error')
        const videoEl = e.target as HTMLVideoElement
        if (videoEl.error) {
          console.error('Video error:', videoEl.error.code, videoEl.error.message)
        }
      }

      // Use most efficient events
      video.addEventListener('canplaythrough', handleCanPlay, { once: true })
      video.addEventListener('canplay', handleCanPlay, { once: true })
      video.addEventListener('error', handleError, { once: true })

      // Load video with optimized preload
      try {
        // If not already loading, trigger load
        if (video.readyState === 0) {
          video.load()
        }
      } catch (error) {
        console.error('Error loading video:', error)
        setLoadingState('error')
      }

      cleanup = () => {
        video.removeEventListener('canplaythrough', handleCanPlay)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('error', handleError)
      }
    }

    // Use requestIdleCallback for non-blocking initialization
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        initTimer = setTimeout(initVideo, 0)
      }, { timeout: 500 })
    } else {
      initTimer = setTimeout(initVideo, 0)
    }
    
    return () => {
      if (initTimer) clearTimeout(initTimer)
      if (cleanup) cleanup()
    }
  }, [isMobile, hasLoadedInSession])

  // Auto-play video when ready (optimized)
  useEffect(() => {
    if (isMobile || loadingState !== 'ready' || !videoRef.current) return

    const video = videoRef.current
    
    // Only attempt play if not already playing
    if (video.paused) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay prevented - user interaction required (expected behavior)
        })
      }
    }
  }, [loadingState, isMobile])

  // Mobile: show cover image only
  if (isMobile) {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="relative aspect-[4/3] lg:aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={mobileCoverImageSrc}
            alt={alt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    )
  }

  // Desktop: show cover first, then video when loaded
  const isVideoReady = loadingState === 'ready'
  const isLoading = loadingState === 'loading'

  return (
    <div className={`relative w-full h-full max-w-full ${className}`}>
      <div className="relative w-full h-full max-w-full rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl bg-slate-900" style={{ aspectRatio: '4/3', maxWidth: '100%' }}>
        {/* Cover image - shown until video is ready */}
        {!isVideoReady && (
          <div className="absolute inset-0">
            <Image
              src={coverImageSrc}
              alt={alt}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 40vw, 35vw"
              quality={85}
            />
          </div>
        )}

        {/* Video - always rendered, shown when ready */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
            isVideoReady ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
          playsInline
          muted
          loop
          controls={isVideoReady}
          preload={hasLoadedInSession ? 'none' : 'auto'}
          aria-label={alt}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading spinner - shown while loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-20">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-sm text-white/80 font-medium">Loading video...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {loadingState === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-20">
            <p className="text-sm text-red-400">Failed to load video</p>
          </div>
        )}
      </div>
    </div>
  )
}
