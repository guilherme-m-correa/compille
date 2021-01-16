import useSWR from 'swr'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://gateway.compille.com.br/'
})

export function useFetch<Data = any, Error = any>(url: string) { //eslint-disable-line
  const { data, error } = useSWR<Data, Error>(url, async key => {
    const response = await api.get(key)

    return response.data
  })

  return { data, error }
}
