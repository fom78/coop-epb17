import axios from 'axios'
// import { HOST } from 'config'
const HOST = 'https://vemmgkfadvuhcdezrdax.supabase.co/rest/v1/'

const API_URL = `${HOST}socios?select=*`

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
    console.log('apikey: ',process.env.REACT_APP_SUPABASE_ANON_KEY);
    return axios.get(API_URL, 
      { headers: { 'apikey': process.env.REACT_APP_SUPABASE_ANON_KEY} })
  }
}

export default new SociosService()
