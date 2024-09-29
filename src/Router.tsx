// import { useHref, useLocation } from 'react-router-dom'
// import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
// import { AboutPage } from './pages/AboutPage'
// import { ArticlePage } from './pages/ArticlePage'
// import { EditorPage } from './pages/EditorPage'
// import { HomePage } from './pages/HomePage'
// import { NotFoundPage } from './pages/NotFoundPage'

// export enum routes {
//   HOME = '/home',
//   ABOUT = '/about',
//   ARTICLE = '/article/:articleId',
//   EDITOR = '/editor',
//   NOT_FOUND = '*',
// }

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Navigate to={routes.HOME} />,
//   },
//   {
//     path: routes.HOME,
//     element: <HomePage />,
//   },
//   {
//     path: routes.ABOUT,
//     element: <AboutPage />,
//   },
//   {
//     path: routes.ARTICLE,
//     element: <ArticlePage />,
//   },
//   {
//     path: routes.EDITOR,
//     element: <EditorPage />,
//   },
//   {
//     path: routes.NOT_FOUND,
//     element: <NotFoundPage />,
//   },
// ])

// export const AppRouter: React.FC = () => {
//   return <RouterProvider router={router} />
// }

// export const getPathName = (): string => {
//   return useLocation().pathname
// }

// export const getOrigin = (): string => {
//   const url = new URL(window.location.href)
//   return url.origin
// }

// export const isInHome = (): boolean => {
//   const path = getPathName()
//   return path.slice(0, routes.HOME.length) === routes.HOME
// }

// export const isInAbout = (): boolean => {
//   const path = getPathName()
//   return (
//     path.slice(0, routes.ABOUT.length) === routes.ABOUT &&
//     path.split('/').length === 2 // e.g. '/hoge'.split('/') -> ['', 'hoge']
//   )
// }
