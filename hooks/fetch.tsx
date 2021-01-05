import useSWR from 'swr'
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GAYEWAY_URL || 'http://localhost:5000'
})

export function useFetch<Data = any, Error = any>(url: string) { //eslint-disable-line
  const { data, error } = useSWR<Data, Error>(url, async key => {
    const response = await api.get(key)

    return response.data
  })

  return { data, error }
}
