'use client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FamilyTreePage from './pages/FamilyTreePage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/family-tree',
      element: <FamilyTreePage />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    } as any,
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
