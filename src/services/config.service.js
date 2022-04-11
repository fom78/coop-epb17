import axios from 'axios'
// import { HOST } from 'config'
const HOST = 'https://vemmgkfadvuhcdezrdax.supabase.co/rest/v1/'
const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY
const API_URL = `${HOST}`

class ConfigService {

  getAll () {
    return  axios.get(`${API_URL}config?select=*`, 
      { headers: { 'apikey': API_KEY} })
  }

}

export default new ConfigService()
