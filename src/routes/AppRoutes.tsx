import { createHashRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import {
  FeaturesPage,
  HomePage,
  NotFoundPage,
  ResultPage,
  UploadPage,
} from '../pages'
import { ROUTE_SEGMENTS, ROUTES } from './paths'

export const router = createHashRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTE_SEGMENTS.FEATURES, element: <FeaturesPage /> },
      { path: ROUTE_SEGMENTS.UPLOAD, element: <UploadPage /> },
      { path: ROUTE_SEGMENTS.RESULT, element: <ResultPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
