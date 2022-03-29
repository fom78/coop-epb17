/* eslint-disable no-undef */
import { createContext, useContext, useEffect, useState } from 'react'
// supabase
import { supabase } from 'utils/supabaseClient'



export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}


const userContext = createContext()



export const useUser = () => {
  const context = useContext(userContext)
  if (!context) throw new Error('There is no Auth provider')
  return context
}

export function UserContextProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (email, password) => {
    try {
      setLoading(true)
      const { user, error } = await supabase.auth.signIn({ email, password })
      if (error) throw error
      setUser(user)
      console.log('el user: ',user);
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }
  // const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  

  // useEffect(() => {
  //   const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
  //     // The signed-in user info.
  //     let normalizedUser = currentUser ? mapUserFromFirebaseAuthToUser(currentUser, currentUser.accessToken) : null
  //     // Add rol and fields specific for user from DB
  //     if (normalizedUser) {
  //       AuthService.create(normalizedUser, currentUser.accessToken)
  //         .then((response) => {
  //           normalizedUser = { ...normalizedUser, rol: response.data.user.rol }
  //           setUser(normalizedUser)
  //         })
  //         .catch((e) => {
  //           console.log(e)
  //         })
  //     } else {
  //       setUser(null)
  //     }
  //     setLoading(false)
  //   })
  //   return () => unsubuscribe()
  // }, [])

  return (
    <userContext.Provider
      value={{
        login,
        user,
        loading,
      }}
    >
      {children}
    </userContext.Provider>
  )
}
