import axios from 'axios'
// import { HOST } from 'config'
const HOST = 'https://vemmgkfadvuhcdezrdax.supabase.co/rest/v1/'
const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY
const API_URL = `${HOST}`

class SociosService {


  getAll () {
    return  axios.get(`${API_URL}socios?deleted=eq.false&select=*,pagos(id,periodo,tipo,mes,monto,nota)`, 
      { headers: { 'apikey': API_KEY} })
  }

  createSocioRequest (socio) {
    return  axios.post(`${API_URL}socios`, socio,
      { headers: { 'apikey': API_KEY} })
  }

  editSocioRequest  (id,socio) {
    return  axios.patch(`${API_URL}socios?id=eq.${id}`, socio,
      { headers: { 'apikey': API_KEY} })
  }
  deleteLogicalSocioRequest (id) {
    return  axios.patch(`${API_URL}socios?id=eq.${id}`, {deleted:true},
      { headers: { 'apikey': API_KEY} })
  }
  deleteSocioRequest (id) {
    return  axios.delete(`${API_URL}socios?id=eq.${id}`,
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
