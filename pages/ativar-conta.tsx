import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
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
      if (!token) {
        return
      }

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
  return (
    <Container>
      {error === '' && (
        <div className="min-h-screen flex justify-center items-center animate-spin text-blue-500">
          <FaSpinner className="h-16 w-16" />
        </div>
      )}

      {error !== '' && (
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-xl text-blue-500">
            Oops, um erro ocorreu ao tentar ativar o seu cadastro. Qualquer
            dúvida entre em{' '}
            <a className="font-semibold" href="/fale-conosco">
              contato conosco
            </a>
          </p>
        </div>
      )}
    </Container>
  )
}
