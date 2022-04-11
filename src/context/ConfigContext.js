/* eslint-disable no-undef */
import { createContext, useContext, useEffect, useState } from 'react'
import configService from 'services/config.service'

const configContext = createContext()

export const useConfig = () => {
  const context = useContext(configContext)
  if (!context) throw new Error('There is no Config provider')
  return context
}

const getConfigFromLocalStore = () => {
  if (localStorage.getItem('config')) {
    return JSON.parse(localStorage.getItem('config'));
  }
  return {};
};

export function ConfigContextProvider({ children }) {
  const [config, setConfig] = useState(getConfigFromLocalStore())
  const [fetchingConfig, setFetchingConfig] = useState(true)
  const [loading, setLoading] = useState(false)

  const getConfig = async () => {

    try {
      setLoading(true)
      if (fetchingConfig) {
        const response = await configService.getAll()
        const configFounded = response.data
          .sort((a, b) => a.id - b.id)
          .map(e => {
            if (e.item === 'periodos') {
              const periodos = e.valor.split('-')
              e.valor = periodos
            }
            return { item: e.item, valor: e.valor }
          })
        // const obj = Object.fromEntries(configFounded);
        let objConfig = {}
        for (let i = 0; i < configFounded.length; i++) {
          objConfig[configFounded[i].item] = configFounded[i].valor;
        }
        setConfig(objConfig)
        localStorage.setItem('config', JSON.stringify(objConfig));
      }
      setFetchingConfig(false)
    } catch (error) {
      console.log({ error })
    } finally {
      setFetchingConfig(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    getConfig()

    return () => {

    }
  }, [])


  return (
    <configContext.Provider
      value={{
        loading,
        getConfig,
        config,
        setConfig,
      }}
    >
      {children}
    </configContext.Provider>
  )
}
