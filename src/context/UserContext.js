/* eslint-disable no-undef */
import { createContext, useContext, useState } from 'react'
import usersService from 'services/users.service'
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

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(getUserFromLocalStore())
  const [loading, setLoading] = useState(false)
  const [fetchingUserProfile, setfetchingUserProfile] = useState(true)
  const [actualModalOpen, setActualModalOpen] = useState(false)

  const getUserProfile = async (id) => {
    try {
      setLoading(true)
      if (fetchingUserProfile) {
        const response = await usersService.getUserRequest(id)
        const userFounded = response.data
        return userFounded[0]
      }
      setfetchingUserProfile(false)
    } catch (error) {
      console.log({ error })
    } finally {
      setfetchingUserProfile(true)
      setLoading(false)
    }
  }


  const login = async (email, password) => {

    try {
      setLoading(true)
      const { user: userLogged, session, error } = await supabase.auth.signIn({ email, password })

      if (error) throw error

      userLogged.isLogged = true
      userLogged.token = session.access_token
      const profile = await getUserProfile(userLogged.id)

      userLogged.rol = profile.rol

      localStorage.setItem('user', JSON.stringify(userLogged));
      setUser(userLogged)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }


  const logout = async () => await supabase.auth.signOut()

  const signup = async (email, password) => {
    try {
      setLoading(true)
      const { user: userLogged, session, error } = await supabase.auth.signUp({ email, password })

      if (error) throw error

      userLogged.isLogged = true
      userLogged.token = session.access_token

      userLogged.rol = 'user'
      await usersService.createProfileRequest(userLogged)

      localStorage.setItem('user', JSON.stringify(userLogged));
      setUser(userLogged)
    } catch (error) {
      console.error(error)
    }finally {
      setLoading(false)
    }
  }

  return (
    <userContext.Provider
      value={{
        actualModalOpen,
        setActualModalOpen,
        login,
        logout,
        loading,
        setUser,
        signup,
        user,
      }}
    >
      {children}
    </userContext.Provider>
  )
}
