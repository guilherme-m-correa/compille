import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Container from '../components/Container'

import { api } from '../hooks/fetch'
import { useAuth } from '../hooks/auth'

export default function AtivarConta() {
  const { updateUser } = useAuth()
  const [error, setError] = useState('')
  const router = useRouter()

  const { token } = router.query

  useEffect(() => {
    async function loadData() {
      try {
        api.defaults.headers.authorization = `Bearer ${token}`

        const { data: user } = await api.post('/authperm/user/activate')

        if (typeof window !== 'undefined') {
          localStorage.setItem('@Compille:token', token as string)
        }

        updateUser(user)

        router.push('/painel/editar-perfil')
      } catch (err) {
        setError(err.message)
      }
    }

    loadData()
  }, [token, router, updateUser])

  return <Container>{error && <h2>{error}</h2>}</Container>
}
