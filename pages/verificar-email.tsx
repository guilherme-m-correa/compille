import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Container from '../components/Container'

import { api } from '../hooks/fetch'

export default function TermosDeUso() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const { token } = router.query

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get('/authperm/user/mine', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setEmail(data.email)
      } catch (error) {
        // TODO:
      }
    }

    loadData()
  }, [token])

  return (
    <Container>
      <div className="flex flex-col py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
          Confirmar demanda
        </h2>
        <h3 className="mt-6 text-2xl font-medium text-gray-900">
          Seu email ainda não foi verificado!
        </h3>
        <p className="mt-6 text-gray-900">
          Enviamos uma mensagem de verificação para seu e-mail{' '}
          <strong>{email}</strong>.
        </p>
        <p className="mt-6 text-gray-900">
          A sua demanda será confirmada assim que seu email for verificado
        </p>
        <button type="button" className="primary-btn my-16 max-w-max">
          REENVIAR VERIFICAÇÃO
        </button>
      </div>
    </Container>
  )
}
