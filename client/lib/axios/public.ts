import axios from 'axios'
import { getSession } from 'next-auth/react'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export default api;