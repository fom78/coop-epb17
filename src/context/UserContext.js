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

export function UserContextProvider ({ children }) {
  const [user, setUser] = useState(getUserFromLocalStore())
  const [loading, setLoading] = useState(false)
  const [fetchingUserProfile, setfetchingUserProfile] = useState(true)
  const [actualModalOpen, setActualModalOpen] = useState(false)
  
  const getUserProfile = async () => {
    try {
      setLoading(true)
      if (fetchingUserProfile) {
        const response = await usersService.getUserRequest(id)
        const userFounded = response.data
        console.log(userFounded);
        // setSociosRecords(sociosFounded)
        // localStorage.setItem('user', JSON.stringify(userLogged));
      }
      setfetchingUserProfile(false)
    } catch (error) {
      console.log({ error })
    } finally {
      setfetchingUserProfile(true)
      setLoading(false)
    }
  }


  const login = (email, password) => supabase.auth.signIn({ email, password })
  const logout = () => supabase.auth.signOut()
  const signup = (email, password) => supabase.auth.signUp({ email, password })

  const createProfile = async (user) => {
    try {
      console.log('###01');
      await usersService.createProfileRequest(user);
      console.log('###02');

      await getUserProfile(user.id)
      console.log('###03');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <userContext.Provider
      value={{
        actualModalOpen,
        setActualModalOpen,
        createProfile,
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
