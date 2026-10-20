import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Login } from '../pages/Login'
import { LoadingSpinner } from './LoadingSpinner'

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Login />
  }

  return <>{children}</>
}
