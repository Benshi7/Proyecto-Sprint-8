'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from './UserContext'
import Login from '../login/page'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user } = useUser()
  const router = useRouter()
/*   const isLoggedIn = localStorage.getItem('isLoggedIn')
 */
  useEffect(() => {
    if (!user?.logged) {
      router.push('/login')
    }
  }, [user, router])

  return user?.logged ? children : null
}

export default PrivateRoute