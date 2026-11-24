/**
 * Property Video URL Configuration
 * 
 * Override or supplement video URLs from Guesty for specific properties.
 * This provides a local fallback when Guesty custom fields aren't set up yet.
 * 
 * Priority order for video URLs:
 * 1. This local config (highest priority)
 * 2. Guesty custom fields (walkthrough_video, drone_video)
 * 3. Legacy Guesty videoTourUrl field
 * 
 * To add videos for a property:
 * 1. Find the property slug (e.g., "hollywood-hills-luxury-estate")
 * 2. Add YouTube/Vimeo URLs or direct video file URLs (.mp4, .mov, .webm)
 * 3. Test on /stays/[slug] to ensure they render properly
 * 
 * Production recommendation: Add these URLs as custom fields in Guesty
 * so they're managed in the PMS, not hardcoded here.
 */

export interface PropertyVideoConfig {
  walkthroughUrl?: string // Indoor property tour
  droneUrl?: string // Aerial/exterior flyover
  matterportUrl?: string // 3D tour URL
}

export const VIDEO_CONFIGS: Record<string, PropertyVideoConfig> = {
  // Example configuration (replace with real property slugs and URLs)
  
  // 'hollywood-hills-luxury-estate': {
  //   walkthroughUrl: 'https://www.youtube.com/watch?v=EXAMPLE_ID',
  //   droneUrl: 'https://www.youtube.com/watch?v=DRONE_ID',
  //   matterportUrl: 'https://my.matterport.com/show/?m=EXAMPLE_ID',
  // },
  
  // 'temecula-wine-country-villa': {
  //   walkthroughUrl: 'https://vimeo.com/123456789',
  //   droneUrl: 'https://cdn.allurahomes.com/videos/temecula-aerial.mp4',
  // },
}

/**
 * Get video configuration for a property by slug
 * This supplements/overrides what comes from Guesty
 */
export function getPropertyVideos(slug: string): PropertyVideoConfig {
  return VIDEO_CONFIGS[slug] || {}
}

/**
 * Merge Guesty videos with local config (local config wins)
 */
export function mergeVideoConfig(
  slug: string,
  guestyVideos: {
    videoTourUrl?: string
    walkthroughUrl?: string
    droneUrl?: string
    matterportUrl?: string
  }
): {
  walkthroughUrl?: string
  droneUrl?: string
  matterportUrl?: string
} {
  const localConfig = getPropertyVideos(slug)

  return {
    walkthroughUrl:
      localConfig.walkthroughUrl ||
      guestyVideos.walkthroughUrl ||
      guestyVideos.videoTourUrl, // Legacy fallback
    droneUrl: localConfig.droneUrl || guestyVideos.droneUrl,
    matterportUrl: localConfig.matterportUrl || guestyVideos.matterportUrl,
  }
}
