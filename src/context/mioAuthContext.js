/* eslint-disable no-undef */
import { createContext, useContext, useEffect, useState } from 'react'
// firebase
import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'
// services
import AuthService from 'services/auth.service'

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}
const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_APIKEY,
  authDomain: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_PROJECTID,
  storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_PUBLIC_FIREBASE_CONFIG_APPID
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const authContext = createContext()

const mapUserFromFirebaseAuthToUser = (user, token) => {
  const { email, photoURL, uid, displayName } = user
  const name = (displayName) || ''
  return {
    avatar: photoURL,
    userName: email,
    name,
    token,
    uid
  }
}

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('There is no Auth provider')
  return context
}

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  const logout = () => signOut(auth)

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email)

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      // The signed-in user info.
      let normalizedUser = currentUser ? mapUserFromFirebaseAuthToUser(currentUser, currentUser.accessToken) : null
      // Add rol and fields specific for user from DB
      if (normalizedUser) {
        AuthService.create(normalizedUser, currentUser.accessToken)
          .then((response) => {
            normalizedUser = { ...normalizedUser, rol: response.data.user.rol }
            setUser(normalizedUser)
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubuscribe()
  }, [])

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        resetPassword,
        loginWithGoogle
      }}
    >
      {children}
    </authContext.Provider>
  )
}
