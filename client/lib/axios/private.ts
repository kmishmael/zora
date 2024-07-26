import axios from 'axios'
import { getSession } from 'next-auth/react'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(async (config: any) => {
    const session = await getSession();
    config.headers.Authorization = `Bearer ${session?.accessToken}`
    return config
})

export default api;