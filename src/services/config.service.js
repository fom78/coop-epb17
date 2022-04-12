import axios from 'axios'
const HOST = `${process.env.REACT_APP_SUPABASE_URL}`
const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY
const API_URL = `${HOST}/rest/v1/`

class ConfigService {

  getAll () {
    return  axios.get(`${API_URL}config?select=*`, 
      { headers: { 'apikey': API_KEY} })
  }

  editConfigRequest  (item,valor) {
    return  axios.patch(`${API_URL}config?item=eq.${item}`, {valor},
      { headers: { 'apikey': API_KEY} })
  }

}

export default new ConfigService()
