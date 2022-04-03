import axios from 'axios'
const HOST = 'https://vemmgkfadvuhcdezrdax.supabase.co/rest/v1/'
const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY
const API_URL = `${HOST}`

class UsersService {
 

   getUserRequest (id) {
    return  axios.get(`${API_URL}profiles?select=id=eq.${id}`, 
      { headers: { 'apikey': API_KEY} })
  }

  createProfileRequest (user) {
    return  axios.post(`${API_URL}profiles`, {id:user.id, rol:'admin',username:'kaka'},
      { headers: { 'apikey': API_KEY} })
  }

}

export default new UsersService()
