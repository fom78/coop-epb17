/* eslint-disable no-undef */
import { createContext, useContext, useEffect, useState } from 'react'
import sociosService from 'services/socios.service'

const sociosRecordsContext = createContext()

export const useSociosRecords = () => {
  const context = useContext(sociosRecordsContext)
  if (!context) throw new Error('There is no SociosRecords provider')
  return context
}

const getSociosRecordsFromLocalStore = () => {
  if (localStorage.getItem('sociosRecords')) {
    return JSON.parse(localStorage.getItem('sociosRecords'));
  }
  return [];
};

export function SociosRecordsContextProvider ({ children }) {
  const [sociosRecords, setSociosRecords] = useState(getSociosRecordsFromLocalStore())
  const [fetchingSocios, setfetchingSocios] = useState(true)
  const [noError, setNoError] = useState(true)

  

  const getSocios = async () => {
    try {
      if (fetchingSocios) {
        const response = await sociosService.getAll()
        const sociosFounded = response.data
        setSociosRecords(sociosFounded)
      }
      setfetchingSocios(false)
    } catch (error) {
      console.log({ error })
      setNoError(false)
    }
  }

  useEffect(() => {
    getSocios()
  
    return () => {
      
    }
  }, [])
  
  
  return (
    <sociosRecordsContext.Provider
      value={{
        fetchingSocios,
        noError,
        setSociosRecords,
        sociosRecords,
      }}
    >
      {children}
    </sociosRecordsContext.Provider>
  )
}
