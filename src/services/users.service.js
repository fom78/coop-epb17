import axios from 'axios'
const HOST = `${process.env.REACT_APP_SUPABASE_URL}`
const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY
const API_URL = `${HOST}/rest/v1/`

class UsersService {
 

   getUserRequest (id) {
    return  axios.get(`${API_URL}profiles?id=eq.${id}`, 
      { headers: { 'apikey': API_KEY} })
  }

  createProfileRequest (user) {
    return  axios.post(`${API_URL}profiles`, {id:user.id, rol:user.rol,username:user.email},
      { headers: { 'apikey': API_KEY} })
  }

}

export default new UsersService()
