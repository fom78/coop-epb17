import axios from 'axios'
// import { HOST } from 'config'
const HOST = 'https://vemmgkfadvuhcdezrdax.supabase.co/rest/v1/'
const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY
const API_URL = `${HOST}`

class SociosService {
  create (data, accessToken) {
    return axios.post(API_URL, data, { headers: { 'x-access-token': accessToken } })
  }

  update (id, data, accessToken) {
    return axios.put(API_URL + id, data, { headers: { 'x-access-token': accessToken } })
  }

  delete (id, accessToken) {
    return axios.delete(API_URL + id, { headers: { 'x-access-token': accessToken } })
  }

  get (id, accessToken) {
    return axios.get(API_URL + id, { headers: { 'x-access-token': accessToken } })
  }

  // getAll (accessToken) {
  //   return axios.get(API_URL, 
  //     { headers: { 
  //       'apikey': process.env.REACT_APP_SUPABASE_ANON_KEY,
  //       'Authorization': `Bearer ${accessToken}`  } })
  // }

  getAll () {
    return  axios.get(`${API_URL}socios?select=*,pagos(id,periodo,tipo,mes,monto,nota)`, 
      { headers: { 'apikey': API_KEY} })
  }

  createSocioRequest (socio) {
    return  axios.post(`${API_URL}socios`, socio,
      { headers: { 'apikey': API_KEY} })
  }

  createPagoRequest (pago) {
    return  axios.post(`${API_URL}pagos`, pago,
      { headers: { 'apikey': API_KEY} })
  }

  deletePagoRequest (id) {
    return  axios.delete(`${API_URL}pagos?id=eq.${id}`,
      { headers: { 'apikey': API_KEY} })
  }

  editPagoRequest (id, data) {
    return  axios.patch(`${API_URL}pagos?id=eq.${id}`, data,
      { headers: { 'apikey': API_KEY} })
  }

}

export default new SociosService()
