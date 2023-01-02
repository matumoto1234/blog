import { useLocation } from 'react-router-dom'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage'
import { ArticlePage } from './pages/ArticlePage'
import { HomePage } from './pages/HomePage'

export enum routes {
  HOME = '/home',
  ABOUT = '/about',
  ARTICLE = '/article/:articleId',
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={routes.HOME} />,
  },
  {
    path: routes.HOME,
    element: <HomePage />,
  },
  {
    path: routes.ABOUT,
    element: <AboutPage />,
  },
  {
    path: routes.ARTICLE,
    element: <ArticlePage />,
  },
])

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}

const getPathName = (): string => {
  return useLocation().pathname
}

export const isInHome = (): boolean => {
  const path = getPathName()
  return path.slice(0, 5) === routes.HOME
}

export const isInAbout = (): boolean => {
  const path = getPathName()
  return path.slice(0, 6) === routes.ABOUT
}
