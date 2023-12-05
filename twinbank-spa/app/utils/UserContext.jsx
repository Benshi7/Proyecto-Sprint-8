'use client'
import { React, createContext, useContext, useState } from 'react'

const UserContext = createContext()

// eslint-disable-next-line react/prop-types
export function UserProvider ({ children }) {
  const [user, setUser] = useState(
    {
      logged: false,
      username: '',
      saldo: 0,
      fotoUrl: '',
    }
  )

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser () {
  return useContext(UserContext)
}
