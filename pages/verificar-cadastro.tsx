import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'
import Container from '../components/Container'
import ErrorMessageBox from '../components/ErrorMessageBox'
import SuccessMessageBox from '../components/SuccessMessageBox'

import { api } from '../hooks/fetch'

interface User {
  id: string
  email: string
  username: string
  type: string
  active: boolean
}

export default function VerificarCadastro() {
  const router = useRouter()
  const [user, setUser] = useState({} as User)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { token } = router.query

  async function handleClick() {
    setIsSubmitting(true)
    setErrorMsg('')

    const { email, username: name } = user

    try {
      await api.post(`/sendmail/activate-account`, {
        email,
        name,
        token
      })

      setSuccessMsg(`Email de verificação reenviado para ${email}.`)
    } catch (error) {
      setErrorMsg(
        'Ocorreu um erro ao tentar reenviar o email de verificação, tente novamente mais tarde'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    async function loadData() {
      delete api.defaults.headers.authorization

      try {
        const { data } = await api.get<User>('/authperm/user/mine', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setUser(data)
      } catch (error) {
        //
      }
    }

    loadData()
  }, [token])

  return (
    <div className=" min-h-screen  flex flex-col bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="mt-6  text-3xl font-extrabold text-blue-500">
        Verificação de cadastro
      </h2>
      <h3 className="mt-6 text-2xl font-medium text-gray-900">
        Seu cadastro ainda não foi verificado!
      </h3>
      <p className="mt-6 text-gray-900">
        Enviamos uma mensagem de verificação para seu e-mail{' '}
        <strong>{user?.email}</strong>.
      </p>
      <p className="mt-6 text-gray-900">
        O seu acesso será liberado assim que seu cadastro for verificado.
      </p>

      {errorMsg && (
        <div className="my-6 max-w-lg">
          <ErrorMessageBox>{errorMsg}</ErrorMessageBox>
        </div>
      )}

      {successMsg && (
        <div className="my-6 max-w-lg">
          <SuccessMessageBox>{successMsg}</SuccessMessageBox>
        </div>
      )}

      <button
        type="button"
        onClick={() => handleClick()}
        className="primary-btn mt-6 max-w-sm flex justify-center items-center"
      >
        {isSubmitting ? (
          <FaSpinner className="animate-spin" size={24} />
        ) : (
          'REENVIAR VERIFICAÇÃO'
        )}
      </button>
    </div>
  )
}
