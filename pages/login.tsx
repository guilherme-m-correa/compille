import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import ErrorMessage from '../components/ErrorMessage'
import ErrorMessageBox from '../components/ErrorMessageBox'

import { useAuth } from '../hooks/auth'

interface FormValues {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState('')
  const { signIn } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
            Login
          </h2>
          <p className="mt-6 text-center text-gray-400">
            Digite os dados e acesse a sua conta
          </p>
        </div>

        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Endereço de email inválido')
              .required('Email obrigátorio'),
            password: Yup.string().required('Senha obrigátoria')
          })}
          onSubmit={async (
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            const { email, password } = values

            setSubmitError('')

            try {
              await signIn({ email, password })
            } catch (error) {
              setSubmitError(error.message)
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mt-8 space-y-6">
              {submitError && (
                <ErrorMessageBox>
                  E-mail ou senha inválidos. Caso tenha problemas para efetuar o
                  login, acesse nossa seção de{' '}
                  <Link href="#">
                    <a className="font-semibold hover:text-red-800">Dúvidas</a>
                  </Link>
                  .
                </ErrorMessageBox>
              )}

              <div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={
                      errors.email && touched.email
                        ? 'input border-red-500'
                        : 'input'
                    }
                    placeholder="Email"
                  />
                  {errors.email && touched.email && (
                    <ErrorMessage>{errors.email}</ErrorMessage>
                  )}
                </div>

                <div className="mt-6">
                  <label htmlFor="password" className="sr-only">
                    Senha
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
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
              </div>

              <div className="flex items-center justify-center">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Esqueceu a senha? Clique Aqui.
                  </a>
                </div>
              </div>

              <div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="primary-btn w-full"
                >
                  ENTRAR
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-14">
          <h2 className="mb-4 text-center text-sm text-gray-400">
            Advogado ou Correspondente Jurídico?
          </h2>

          <button type="button" className="primary-btn w-full">
            <Link href="/cadastro-advogados-correspondentes-juridicos">
              <a>CADASTRE-SE AGORA</a>
            </Link>
          </button>
        </div>

        <div className="mt-6 ">
          <h2 className="mb-4 text-center text-sm text-gray-400">
            Escritório de Advocacia ou Empresa?
          </h2>

          <button type="button" className="primary-btn w-full">
            ENCONTRE PROFISSIONAIS
          </button>
        </div>
      </div>
    </div>
  )
}
