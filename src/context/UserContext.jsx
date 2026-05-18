import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('ratio-kitchen-user') || null
  })

  const login = (username) => {
    const clean = username.trim().toLowerCase()
    localStorage.setItem('ratio-kitchen-user', clean)
    setCurrentUser(clean)
  }

  const logout = () => {
    localStorage.removeItem('ratio-kitchen-user')
    setCurrentUser(null)
  }

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
