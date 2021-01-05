import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import Container from '../components/Container'
import ErrorMessage from '../components/ErrorMessage'
// import ErrorMessageBox from '../components/ErrorMessageBox'
import { api } from '../hooks/fetch'
import { useAuth } from '../hooks/auth'
import { normalizeCnpj } from '../helpers'

interface FormValues {
  cnpj: string
  social_reason: string
  address_cep: string
  address_street: string
  address_number: string
  address_neighborhood: string
  address_complement: string
  address_state: string
  address_city: string
  phone_type: string
  phone_ddd: string
  phone_number: string
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

export default function ConfirmarDemanda() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [cities, setCities] = useState([])
  const [submitError, setSubmitError] = useState('')

  const [user, setUser] = useState({} as User)

  const { token } = router.query

  useEffect(() => {
    async function loadData() {
      try {
        api.defaults.headers.authorization = `Bearer ${token}`

        const { data } = await api.get<User>('/authperm/user/mine')

        setUser(data)
      } catch (error) {
        // TODO:
      }
    }

    loadData()
  }, [token])

  const states = [
    { cod: 12, name: 'Acre', uf: 'AC' },
    { cod: 27, name: 'Alagoas', uf: 'AL' },
    { cod: 16, name: 'Amapá', uf: 'AP' },
    { cod: 13, name: 'Amazonas', uf: 'AM' },
    { cod: 29, name: 'Bahia', uf: 'BA' },
    { cod: 23, name: 'Ceará', uf: 'CE' },
    { cod: 53, name: 'Distrito Federal', uf: 'DF' },
    { cod: 32, name: 'Espírito Santo', uf: 'ES' },
    { cod: 52, name: 'Goiás', uf: 'GO' },
    { cod: 21, name: 'Maranhão', uf: 'MA' },
    { cod: 51, name: 'Mato Grosso', uf: 'MT' },
    { cod: 50, name: 'Mato Grosso do Sul', uf: 'MS' },
    { cod: 31, name: 'Minas Gerais', uf: 'MG' },
    { cod: 15, name: 'Pará', uf: 'PA' },
    { cod: 25, name: 'Paraíba', uf: 'PB' },
    { cod: 41, name: 'Paraná', uf: 'PR' },
    { cod: 26, name: 'Pernambuco', uf: 'PE' },
    { cod: 22, name: 'Piauí', uf: 'PI' },
    { cod: 33, name: 'Rio de Janeiro', uf: 'RJ' },
    { cod: 24, name: 'Rio Grande do Norte', uf: 'RN' },
    { cod: 43, name: 'Rio Grande do Sul', uf: 'RS' },
    { cod: 11, name: 'Rondônia', uf: 'RO' },
    { cod: 14, name: 'Roraima', uf: 'RR' },
    { cod: 42, name: 'Santa Catarina', uf: 'SC' },
    { cod: 35, name: 'São Paulo', uf: 'SP' },
    { cod: 28, name: 'Sergipe', uf: 'SE' },
    { cod: 17, name: 'Tocantins', uf: 'TO' }
  ]

  async function loadCities(uf: string) {
    setCities([])

    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/ibgedistricts/uf/${uf}/cities`
    )

    setCities(data)
  }

  return (
    <Container>
      <div className="flex flex-col my-10">
        <h2 className="text-2xl font-semibold">
          {user?.username}, seja bem-vindo ao Compille!
        </h2>
        <p className="mt-2 text-base">
          Preencha o seus dados para enviar demandas aos profissionais.
        </p>

        <Formik
          initialValues={{
            cnpj: '',
            social_reason: '',
            address_cep: '',
            address_street: '',
            address_number: '',
            address_neighborhood: '',
            address_complement: '',
            address_state: '',
            address_city: '',
            phone_type: '',
            phone_ddd: '',
            phone_number: '',
            password: '',
            confirm_password: ''
          }}
          validationSchema={Yup.object({
            // cnpj: Yup.string().required('Número do CNPJ obrigatório')
            password: Yup.string().required('Senha obrigatória')
          })}
          onSubmit={async (
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            setSubmitError('')

            try {
              const { password } = values

              await api.put(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/authperm/users/${user.id}`,
                {
                  password
                }
              )
              await api.post('/authperm/user/activate')

              await signIn({ email: user.email, password })

              // TODO: Rediredionar para o painel de solicitante
              router.push('/demandas/propostas0001')
            } catch (error) {
              setSubmitError(error.message)
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, errors, touched, values, handleChange }) => (
            <Form className="mt-8 space-y-6">
              <div className="flex flex-col">
                <div>
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="cnpj"
                  >
                    CNPJ
                  </label>
                  <Field
                    id="cnpj"
                    name="cnpj"
                    type="text"
                    value={normalizeCnpj(values.cnpj)}
                    className={
                      errors.cnpj && touched.cnpj
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  />
                  {errors.cnpj && touched.cnpj && (
                    <ErrorMessage>{errors.cnpj}</ErrorMessage>
                  )}
                </div>

                <div className="mt-2">
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="social_reason"
                  >
                    Razão social
                  </label>
                  <Field
                    id="social_reason"
                    name="social_reason"
                    type="text"
                    className={
                      errors.social_reason && touched.social_reason
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  />
                  {errors.social_reason && touched.social_reason && (
                    <ErrorMessage>{errors.social_reason}</ErrorMessage>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full">
                <div>
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="address_cep"
                  >
                    CEP
                  </label>
                  <Field
                    id="address_cep"
                    name="address_cep"
                    type="text"
                    className={
                      errors.address_cep && touched.address_cep
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  />
                  {errors.address_cep && touched.address_cep && (
                    <ErrorMessage>{errors.address_cep}</ErrorMessage>
                  )}
                </div>
                <div className="flex-1 lg:ml-2">
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="address_street"
                  >
                    Endereço
                  </label>
                  <Field
                    id="address_street"
                    name="address_street"
                    type="text"
                    className={
                      errors.address_street && touched.address_street
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  />
                  {errors.address_street && touched.address_street && (
                    <ErrorMessage>{errors.address_street}</ErrorMessage>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full">
                <div>
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="address_number"
                  >
                    Número
                  </label>
                  <Field
                    id="address_number"
                    name="address_number"
                    type="text"
                    className={
                      errors.address_number && touched.address_number
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  />
                  {errors.address_number && touched.address_number && (
                    <ErrorMessage>{errors.address_number}</ErrorMessage>
                  )}
                </div>
                <div className="flex-1 lg:ml-2">
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="address_street"
                  >
                    Complemento
                  </label>
                  <Field
                    id="address_street"
                    name="address_street"
                    type="address_street"
                    className={
                      errors.address_street && touched.address_street
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  />
                  {errors.address_street && touched.address_street && (
                    <ErrorMessage>{errors.address_street}</ErrorMessage>
                  )}
                </div>
                <div className="flex-1 lg:ml-2">
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="address_neighborhood"
                  >
                    Bairro
                  </label>
                  <Field
                    id="address_neighborhood"
                    name="address_neighborhood"
                    type="address_neighborhood"
                    className={
                      errors.address_neighborhood &&
                      touched.address_neighborhood
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  />
                  {errors.address_neighborhood &&
                    touched.address_neighborhood && (
                      <ErrorMessage>{errors.address_neighborhood}</ErrorMessage>
                    )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full">
                <div className="flex-1 lg:mr-2">
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="address_state"
                  >
                    Estado
                  </label>
                  <Field
                    id="address_state"
                    name="address_state"
                    as="select"
                    onChange={e => {
                      handleChange(e)
                      loadCities(e.target.value)
                    }}
                    className={
                      errors.address_state && touched.address_state
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  >
                    <option className="text-gray-100" value="" disabled>
                      Selecione...
                    </option>
                    {states.map(state => (
                      <option
                        key={state.cod}
                        className="text-gray-100"
                        value={state.cod}
                      >
                        {state.uf}
                      </option>
                    ))}
                  </Field>
                  {errors.address_state && touched.address_state && (
                    <ErrorMessage>{errors.address_state}</ErrorMessage>
                  )}
                </div>

                <div className="flex-1">
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="address_city"
                  >
                    Cidade
                  </label>
                  <Field
                    id="address_city"
                    name="address_city"
                    as="select"
                    className={
                      errors.address_city && touched.address_city
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  >
                    <option
                      className="text-gray-100"
                      value=""
                      selected
                      disabled
                    >
                      {values.address_state
                        ? 'Selecione o estado...'
                        : 'Selecione...'}
                    </option>
                    {cities?.map(city => (
                      <option key={city} className="text-gray-100" value={city}>
                        {city}
                      </option>
                    ))}
                  </Field>
                  {errors.address_city && touched.address_city && (
                    <ErrorMessage>{errors.address_city}</ErrorMessage>
                  )}
                </div>
              </div>

              <div>
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
                  className={
                    errors.password && touched.password
                      ? 'input mt-2 border-red-500'
                      : 'input mt-2'
                  }
                />
                {errors.password && touched.password && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
              </div>

              <div>
                <label
                  className="text-black-400 font-semibold"
                  htmlFor="confirm_password"
                >
                  Confirme a senha
                </label>
                <Field
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  className={
                    errors.confirm_password && touched.confirm_password
                      ? 'input mt-2 border-red-500'
                      : 'input mt-2'
                  }
                />
                {errors.confirm_password && touched.confirm_password && (
                  <ErrorMessage>{errors.confirm_password}</ErrorMessage>
                )}
              </div>

              <div className="mt-10">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="primary-btn max-w-max"
                >
                  SALVAR
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}
