import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { api } from '../hooks/fetch'
import ErrorMessage from '../components/ErrorMessage'
import ErrorMessageBox from '../components/ErrorMessageBox'

interface FormValues {
  username: string
  email: string
  password: string
}

export default function CadastroAdvogadosCorrespondentesJuridicos() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
            Cadastro de Departamentos Jurídicos
          </h2>
          <div className="mt-6 text-center text-sm text-gray-400">
            <p className="mt-4">
              Já está cadastrado?{' '}
              <Link href="/login">
                <a className="text-blue-500 hover:text-blue-600">
                  Faça o login
                </a>
              </Link>
              .
            </p>
          </div>
        </div>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: ''
          }}
          validationSchema={Yup.object({
            username: Yup.string().required('Nome obrigatório'),
            email: Yup.string()
              .email('Endereço de email inválido')
              .required('Email obrigátorio'),
            password: Yup.string().required('Senha obrigátoria')
          })}
          onSubmit={async (
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            const { username, email, password } = values

            try {
              const { data } = await api.post('/authperm/register', {
                username,
                email,
                password,
                type: 'E'
              })

              await api.post(`/authperm/usercategories`, {
                user_id: data.id,
                category_id: 4
              })

              router.push({
                pathname: '/ativar-conta',
                query: { token: data.token }
              })
            } catch (err) {
              if (err.response && err.response.status === 400) {
                setSubmitError(err.response.data.msg)
              } else if (err.response && err.response.status === 500) {
                setSubmitError(
                  'Ocorreu um erro em nossos servidores, tente mais tarde.'
                )
              } else {
                setSubmitError(
                  'Ocorreu um erro em nossa aplicação, tente novamente mais tarde'
                )
              }
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mt-8 space-y-8">
              {submitError && <ErrorMessageBox>{submitError}</ErrorMessageBox>}
              <div>
                <div className="mt-4">
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="username"
                  >
                    Nome
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    className={
                      errors.username && touched.username
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                    placeholder="Digite seu nome"
                  />
                  {errors.username && touched.username && (
                    <ErrorMessage>{errors.username}</ErrorMessage>
                  )}
                </div>

                <div className="mt-4">
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="email"
                  >
                    E-mail profissional
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={
                      errors.email && touched.email
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                    placeholder="Digite seu e-mail"
                  />
                  {errors.email && touched.email && (
                    <ErrorMessage>{errors.email}</ErrorMessage>
                  )}
                </div>

                <div className="mt-4">
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="password"
                  >
                    Crie uma senha
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={
                      errors.password && touched.password
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                    placeholder="Escolha uma senha"
                  />
                  {errors.password && touched.password && (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="primary-btn w-full"
                >
                  QUERO COMEÇAR
                </button>

                <p className="mt-4 text-center text-sm text-gray-400">
                  Ao clicar em quero começar, você indica que leu e está de
                  acordo com os nossos{' '}
                  <Link href="/termos-uso">
                    <a className="text-blue-500 hover:text-blue-600">
                      Termos de Uso
                    </a>
                  </Link>
                  .
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
