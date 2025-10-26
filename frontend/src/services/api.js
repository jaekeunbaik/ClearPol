import axios from 'axios'
const api = axios.create({
  baseURL: 'https://clearpol.onrender.com', // 백엔드 주소
})
export default api
