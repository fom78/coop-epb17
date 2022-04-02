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

export function SociosRecordsContextProvider({ children }) {
  const [sociosRecords, setSociosRecords] = useState(getSociosRecordsFromLocalStore())
  const [fetchingSocios, setfetchingSocios] = useState(true)
  const [noError, setNoError] = useState(true)



  const getSocios = async () => {
    try {
      if (fetchingSocios) {
        const response = await sociosService.getAll()
        const sociosFounded = response.data
        setSociosRecords(sociosFounded)
        localStorage.setItem('sociosRecords', JSON.stringify(sociosFounded));
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

  const createPago = async (pago) => {
    try {
      const res = await sociosService.createPagoRequest(pago);
      // Buscar el socio pagante y actualizarle el pago en el estado

      let socioFounded = sociosRecords.filter(s => s.id === pago.socio_id)
      delete pago.socio_id
      socioFounded[0].pagos.push(pago)

      setSociosRecords([...sociosRecords, socioFounded[0]])
    } catch (error) {
      console.error(error);
    }
  };

  const deletePago = async (pagoId, socioId) => {
    try {
      const res = await sociosService.deletePagoRequest(pagoId);

      let socioFounded = sociosRecords.filter(s =>  s.id === socioId)[0]
      socioFounded.pagos = socioFounded.pagos.filter(p => p.id !== pagoId)
      setSociosRecords([...sociosRecords, socioFounded])

    } catch (error) {
      console.error(error);
    }
  };

  const editPago = async (pagoId, socioId, data) => {
    try {
      const res = await sociosService.editPagoRequest(pagoId, data);

      let socioFounded = sociosRecords.filter(s =>  s.id === socioId)[0]

      data.monto = parseInt(data.monto)
      data.mes = parseInt(data.mes)
      
      socioFounded.pagos = [...socioFounded.pagos.filter(p => p.id !== pagoId), data]
      setSociosRecords([...sociosRecords.filter(s =>  s.id !== socioId), socioFounded])

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <sociosRecordsContext.Provider
      value={{
        createPago,
        deletePago,
        editPago,
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
