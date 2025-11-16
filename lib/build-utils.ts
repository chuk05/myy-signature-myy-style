// Check if we're in a build environment
export const isBuilding = process.env.npm_lifecycle_event === 'build' || process.env.NODE_ENV === 'production'

// Check if we're on the server side
export const isServer = typeof window === 'undefined'

// Check if we can safely use cookies
export const canUseCookies = !isBuilding && isServer