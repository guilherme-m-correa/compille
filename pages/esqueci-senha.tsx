import { useState } from 'react'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { FaSpinner } from 'react-icons/fa'
import ErrorMessage from '../components/ErrorMessage'
import ErrorMessageBox from '../components/ErrorMessageBox'
import SuccessMessageBox from '../components/SuccessMessageBox'

import { api } from '../hooks/fetch'

interface FormValues {
  email: string
}

export default function ResetarSenha() {
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
            Esqueci minha senha
          </h2>
          <p className="mt-6 text-center text-gray-400">
            Para redefinir sua senha, informe o email cadastrado na sua conta e
            lhe enviaremos um link com as instruções
          </p>
        </div>

        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Endereço de email inválido')
              .required('Email obrigátorio')
          })}
          onSubmit={async (
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            const { email } = values

            setErrorMsg('')

            try {
              await api.post(`/authperm/forgot-password`, {
                email
              })

              setSuccessMsg(
                'Um email com instruções para resetar sua senha foi enviado.'
              )
            } catch (error) {
              if (
                error.response &&
                error.response.data.msg === 'Usuário não encontrado'
              ) {
                setErrorMsg('Nenhum cadastro foi encontrado com este email.')
              } else {
                setErrorMsg(
                  'Ocorreu um erro ao tentar enviar a solicitação. Por favor, contate o suporte.'
                )
              }
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mt-8 space-y-6">
              {errorMsg && <ErrorMessageBox>{errorMsg}</ErrorMessageBox>}

              {successMsg && (
                <SuccessMessageBox>{successMsg}</SuccessMessageBox>
              )}

              <div>
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
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
                    'ENVIAR SOLICITAÇÃO'
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
