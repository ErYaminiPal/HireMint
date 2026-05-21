import { Outlet } from 'react-router-dom'
import { SceneBackground } from '../components/3d/SceneBackground'
import { AppNav } from '../components/AppNav'

export function MainLayout() {
  return (
    <div className="relative min-h-screen bg-surface text-white antialiased">
      <SceneBackground />
      <AppNav />
      <div className="perspective-section relative">
        <Outlet />
      </div>
    </div>
  )
}
