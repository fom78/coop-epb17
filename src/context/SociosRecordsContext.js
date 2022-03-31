/* eslint-disable no-undef */
import { createContext, useContext, useState } from 'react'

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
  
  return (
    <sociosRecordsContext.Provider
      value={{
        setSociosRecords,
        sociosRecords,
      }}
    >
      {children}
    </sociosRecordsContext.Provider>
  )
}
