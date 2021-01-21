import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { FaSpinner } from 'react-icons/fa'
import ErrorMessage from '../components/ErrorMessage'
import Container from '../components/Container'
import ErrorMessageBox from '../components/ErrorMessageBox'
import SuccessMessageBox from '../components/SuccessMessageBox'

import { api } from '../hooks/fetch'
import { useAuth } from '../hooks/auth'

interface FormValues {
  password: string
  confirm_password: string
}

interface User {
  id: string
  email: string
  username: string
  type: string
  active: boolean
}

export default function ResetarSenha() {
  const router = useRouter()
  const [user, setUser] = useState({} as User)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { token } = router.query

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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
            Resetar minha senha
          </h2>
          <p className="mt-6 text-center text-gray-400">
            Crie uma nova senha para seu login
          </p>
        </div>

        <Formik
          initialValues={{
            password: '',
            confirm_password: ''
          }}
          validationSchema={Yup.object({
            password: Yup.string()
              .min(6, 'A senha deve conter no mínimo 6 dígitos')
              .required('Senha obrigátoria'),
            confirm_password: Yup.string().oneOf(
              [Yup.ref('password'), null],
              'As senhas devem conhecidir'
            )
          })}
          onSubmit={async (
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            const { password } = values

            setErrorMsg('')

            try {
              await api.post(
                `/authperm/user/mine/reset-password`,
                {
                  password
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              )

              setSuccessMsg('Sua senha foi alterada com sucesso!')
            } catch (error) {
              setErrorMsg(
                'Ocorreu um erro ao tentar resetar a senha. Por favor, contate o suporte'
              )
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mt-8 space-y-6">
              {errorMsg && <ErrorMessageBox>{errorMsg}</ErrorMessageBox>}

              {successMsg && (
                <SuccessMessageBox>
                  <div className="flex flex-col">
                    {successMsg}
                    <Link href="/login">
                      <a className="font-semibold text-center cursor-pointer hover:text-green-400">
                        {' '}
                        Ir para o Login
                      </a>
                    </Link>
                  </div>
                </SuccessMessageBox>
              )}

              <div>
                <div>
                  <label className="sr-only" htmlFor="password">
                    Senha
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className={
                      errors.password && touched.password
                        ? 'input border-red-500'
                        : 'input'
                    }
                    placeholder="Senha"
                  />
                  {errors.password && touched.password && (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                  )}
                </div>

                <div className="mt-6">
                  <label className="sr-only" htmlFor="confirm_password">
                    Confirmar Senha
                  </label>
                  <Field
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    className={
                      errors.confirm_password && touched.confirm_password
                        ? 'input border-red-500'
                        : 'input'
                    }
                    placeholder="Confirmar Senha"
                  />
                  {errors.confirm_password && touched.confirm_password && (
                    <ErrorMessage>{errors.confirm_password}</ErrorMessage>
                  )}
                </div>
              </div>

              <div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="mt-6 primary-btn w-full flex justify-center items-center "
                >
                  {isSubmitting ? (
                    <FaSpinner className="animate-spin" size={24} />
                  ) : (
                    'RESETAR SENHA'
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
