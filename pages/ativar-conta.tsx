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
        delete api.defaults.headers.authorization

        const { data: user } = await api.post(
          '/authperm/user/activate',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (typeof window !== 'undefined') {
          localStorage.setItem('@Compille:token', token as string)
        }

        api.defaults.headers.authorization = `Bearer ${token}`

        updateUser(user)

        router.push('/painel/editar-perfil')
      } catch (err) {
        setError(err.message)
      }
    }

    loadData()
  }, [router, updateUser, token])

  return <Container>{!token && 'CARREGANDO'}</Container>
}
