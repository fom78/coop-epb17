/* eslint-disable no-undef */
import { createContext, useContext, useState } from 'react'
// supabase
import { supabase } from 'utils/supabaseClient'

const userContext = createContext()

export const useUser = () => {
  const context = useContext(userContext)
  if (!context) throw new Error('There is no Auth provider')
  return context
}

const getUserFromLocalStore = () => {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'));
  }
  return {
    id: '',
    token: '',
    email: '',
    isLogged: false,
  };
};

export function UserContextProvider ({ children }) {
  const [user, setUser] = useState(getUserFromLocalStore())
  
  const login = (email, password) => supabase.auth.signIn({ email, password })
  const logout = () => supabase.auth.signOut()
  const signup = (email, password) => supabase.auth.signUp({ email, password })

  return (
    <userContext.Provider
      value={{
        login,
        logout,
        setUser,
        signup,
        user,
      }}
    >
      {children}
    </userContext.Provider>
  )
}
