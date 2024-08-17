import axios from 'axios'
import { auth } from '../auth/auth'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(async (config: any) => {
    const session = await auth()

    config.headers['Access-Control-Allow-Credentials'] = true;
    return config
})

export default api;
