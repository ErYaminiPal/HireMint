export const ROUTE_SEGMENTS = {
  FEATURES: 'features',
  UPLOAD: 'upload',
  RESULT: 'result',
} as const

export const ROUTES = {
  HOME: '/',
  FEATURES: `/${ROUTE_SEGMENTS.FEATURES}`,
  UPLOAD: `/${ROUTE_SEGMENTS.UPLOAD}`,
  RESULT: `/${ROUTE_SEGMENTS.RESULT}`,
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
