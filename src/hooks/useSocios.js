import { useEffect, useState } from 'react'
// contexts
import { useUser } from 'context/UserContext'

// services
import SociosService from 'services/socios.service'

export default function useSocios () {
  const {user} = useUser()
  console.log('useSocios!!!!');
  const [noError, setNoError] = useState(true)
  const [fetchingSocios, setfetchingSocios] = useState(true)
  const [socios, setSocios] = useState([])


  const fetchSocios = async () => {
    try {
      if (fetchingSocios) {
        const response = await SociosService.getAll()
        console.log('los socios', response.data)
        const sociosFounded = response.data
        setSocios(sociosFounded)
      }
      setfetchingSocios(false)
    } catch (error) {
      console.log({ error })
      setNoError(false)
    }
  }

  // useEffect(() => {
  //   fetchCategories()
  // }, [])

  // Get all Operations when refresh list
  useEffect(() => {
    fetchSocios()

    // if (user) {
    //   fetchSocios()
    // }
    return () => { setfetchingSocios(false) }
  }, [])

  return { socios, noError, fetchingSocios, setfetchingSocios, fetchSocios }
}
