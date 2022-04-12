/* eslint-disable no-undef */
import { createContext, useContext, useEffect, useState } from 'react'
import sociosService from 'services/socios.service'
import { useConfig } from './ConfigContext'

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

  const {putUltimoUpdate} = useConfig()
  const [sociosRecords, setSociosRecords] = useState(getSociosRecordsFromLocalStore())
  const [fetchingSocios, setfetchingSocios] = useState(true)
  const [loading, setLoading] = useState(false)
  const [noError, setNoError] = useState(true)

  
const getSocios = async () => {

    try {
      setLoading(true)
      if (fetchingSocios) {
        const response = await sociosService.getAll()
        const sociosFounded = response.data.sort((a,b)=>a.id-b.id)
        setSociosRecords(sociosFounded)
        localStorage.setItem('sociosRecords', JSON.stringify(sociosFounded));
      }
      setfetchingSocios(false)
    } catch (error) {
      console.log({ error })
      setNoError(false)
    } finally {
      setfetchingSocios(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    getSocios()

    return () => {

    }
  }, [])


  // Socios
  const createSocio = async (socio) => {
    try {
      setLoading(true)
      await sociosService.createSocioRequest(socio);
      await getSocios()
      await putUltimoUpdate()
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  const editSocio = async (socioId, data) => {
    try {
      const res = await sociosService.editSocioRequest(socioId, data);

      if (res.status === 204) {
        setSociosRecords(sociosRecords.map(s => s.id === socioId ? { ...s, ...data } : s))
        await putUltimoUpdate()
      }

    } catch (error) {
      console.error(error);
    }
  };

  const deleteLogicalSocio = async (socioId) => {
    try {
      await sociosService.deleteLogicalSocioRequest(socioId);

      setSociosRecords(sociosRecords.filter(s => s.id !== socioId))
      await putUltimoUpdate()
    } catch (error) {
      console.error(error);
    }
  };
  // Pagos de los Socios

  const createPago = async (pago) => {
    try {
      await sociosService.createPagoRequest(pago);
      // Al no tener el id del ultimo pago agregado, para actualizar el estado correctamente debemos obtener los usuarios.
      await getSocios()
      await putUltimoUpdate()
      
    } catch (error) {
      console.error(error);
    }
  };

  const deletePago = async (pagoId, socioId) => {
    try {
      const res = await sociosService.deletePagoRequest(pagoId);

      let socioFounded = sociosRecords.filter(s => s.id === socioId)[0]
      socioFounded.pagos = socioFounded.pagos.filter(p => p.id !== pagoId)
      setSociosRecords(sociosRecords.map(s => s.id === socioId ? socioFounded : s))
      await putUltimoUpdate()

    } catch (error) {
      console.error(error);
    }
  };

  const editPago = async (pagoId, socioId, data) => {
    try {
      const res = await sociosService.editPagoRequest(pagoId, data);

      let socioFounded = sociosRecords.filter(s => s.id === socioId)[0]

      data.monto = parseInt(data.monto)
      data.mes = parseInt(data.mes)

      socioFounded.pagos = socioFounded.pagos.map(p => p.id === pagoId ? data : p)
      setSociosRecords(sociosRecords.map(s => s.id === socioId ? socioFounded : s))
      await putUltimoUpdate()

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <sociosRecordsContext.Provider
      value={{
        createSocio,
        editSocio,
        deleteLogicalSocio,
        createPago,
        deletePago,
        editPago,
        loading,
        getSocios,
        noError,
        setSociosRecords,
        sociosRecords,
      }}
    >
      {children}
    </sociosRecordsContext.Provider>
  )
}
