import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import axios from 'axios'
import Container from '../components/Container'
import ErrorMessage from '../components/ErrorMessage'
import ErrorMessageBox from '../components/ErrorMessageBox'
import { api } from '../hooks/fetch'
import { useAuth } from '../hooks/auth'
import { normalizeCnpj, normalizeCep } from '../helpers'

interface FormValues {
  address_zip_code: string
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

interface FormCNPJValues {
  cnpj: string
  social_reason: string
  fantasy_name: string
  uf: string
}

interface User {
  id: string
  email: string
  username: string
  type: string
  active: boolean
}

interface Company {
  id: string
}

export default function ConfirmarDemanda() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [cities, setCities] = useState([])
  const [step, setStep] = useState(1)
  const [submitError, setSubmitError] = useState('')
  const [user, setUser] = useState({} as User)
  const [company, setCompany] = useState<Company>({} as Company)
  const [ibgeAddress, setIbgeAddress] = useState('')
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

  async function handleCep(address_zip_code, setFieldValue) {
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${address_zip_code.replace(
          /[^\d]/g,
          ''
        )}/json/`
      )

      if (data.erro) {
        // document.getElementById('street_form').focus()
      } else {
        const { bairro, localidade, uf, logradouro, ibge } = data

        setIbgeAddress(ibge)

        setFieldValue('address_street', logradouro)
        setFieldValue('address_neighborhood', bairro)
        setFieldValue('address_state', uf)
        setFieldValue('address_city', localidade)
      }
    } catch (err) {
      //
    }
  }

  return (
    <Container>
      <div className="flex flex-col my-10">
        <h2 className="text-2xl font-semibold">Confirmar Demanda</h2>

        {step === 1 && (
          <>
            <div className="mt-6 bg-indigo-200 p-6 text-center rounded-lg text-blue-500">
              <strong>{user?.username}, bem-vindo ao Compille!</strong>
              <p className="mt-2 text-base">
                Preencha os seus dados para enviar demandas aos profissionais.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-md p-6 mt-10">
              <div className="py-4 border-b-2 border-gray-100">
                <h2 className="text-2xl font-semibold">
                  Comece preechendo os dados da empresa
                </h2>
              </div>

              <Formik
                initialValues={{
                  cnpj: '',
                  social_reason: '',
                  fantasy_name: '',
                  uf: ''
                }}
                validationSchema={Yup.object({
                  cnpj: Yup.string().required('Número do CNPJ obrigatório'),
                  social_reason: Yup.string().required(
                    'Razão social obrigátorio'
                  ),
                  fantasy_name: Yup.string().required(
                    'Nome fantasia obrigátorio'
                  ),
                  uf: Yup.string().required('Estado obrigátorio')
                })}
                onSubmit={async (
                  values: FormCNPJValues,
                  { setSubmitting }: FormikHelpers<FormCNPJValues>
                ) => {
                  const { cnpj, social_reason, fantasy_name } = values

                  setSubmitError('')

                  try {
                    const response = await api.post(
                      `/comercial/companies`,
                      {
                        user_id: user.id,
                        commercial_name: fantasy_name,
                        social_name: social_reason,
                        cnpj: cnpj.replace(/[^\d]/g, '')
                      },
                      {
                        headers: {
                          Authorization: process.env.REACT_APP_PUBLIC_TOKEN
                        }
                      }
                    )

                    setCompany(response.data)

                    setStep(2)
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
                {({ isSubmitting, errors, touched, values }) => (
                  <Form className="mt-8 space-y-6">
                    {submitError && (
                      <ErrorMessageBox>{submitError}</ErrorMessageBox>
                    )}

                    <div className="flex flex-col lg:flex-row">
                      <div className="flex-1 mr-2">
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

                      <div className="mr-2">
                        <label
                          className="text-black-400 font-semibold"
                          htmlFor="password"
                        >
                          Razão Social
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

                      <div className="mr-2">
                        <label
                          className="text-black-400 font-semibold"
                          htmlFor="password"
                        >
                          Nome Fantasia
                        </label>
                        <Field
                          id="fantasy_name"
                          name="fantasy_name"
                          type="text"
                          className={
                            errors.fantasy_name && touched.fantasy_name
                              ? 'input mt-2 border-red-500'
                              : 'input mt-2'
                          }
                        />
                        {errors.fantasy_name && touched.fantasy_name && (
                          <ErrorMessage>{errors.fantasy_name}</ErrorMessage>
                        )}
                      </div>

                      <div>
                        <label
                          className="text-black-400 font-semibold"
                          htmlFor="uf"
                        >
                          Estado
                        </label>
                        <Field
                          id="uf"
                          name="uf"
                          as="select"
                          className={
                            errors.uf && touched.uf
                              ? 'input mt-2 border-red-500'
                              : 'input mt-2'
                          }
                        >
                          <option value="" disabled>
                            Selecione...
                          </option>
                          {states.map(state => (
                            <option key={state.cod} value={state.cod}>
                              {state.uf}
                            </option>
                          ))}
                        </Field>
                        {errors.uf && touched.uf && (
                          <ErrorMessage>{errors.uf}</ErrorMessage>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="mt-6 primary-btn flex justify-center items-center w-40"
                      >
                        {isSubmitting ? (
                          <FaSpinner className="animate-spin" size={24} />
                        ) : (
                          'CONTINUAR'
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="flex flex-col my-10">
            <h2 className="text-2xl font-semibold">
              {user?.username}, seja bem-vindo ao Compille!
            </h2>
            <p className="mt-2 text-base">
              Preencha o seus dados para enviar demandas aos profissionais.
            </p>

            <Formik
              initialValues={{
                address_zip_code: '',
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
              validationSchema={Yup.object({})}
              onSubmit={async (
                values: FormValues,
                { setSubmitting }: FormikHelpers<FormValues>
              ) => {
                setSubmitError('')

                try {
                  const {
                    password,
                    address_zip_code,
                    address_city,
                    address_complement,
                    address_neighborhood,
                    address_number,
                    address_state,
                    address_street,
                    phone_ddd,
                    phone_number
                  } = values

                  await api.put(
                    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/authperm/users/${user.id}`,
                    {
                      password
                    }
                  )
                  await api.post('/authperm/user/activate')

                  const { data, status } = await api.post(
                    `/comercial/companyaddresses`,
                    {
                      company_id: company.id,
                      label: '',
                      zip_code: address_zip_code.replace(/[^\d]/g, ''),
                      street: address_street,
                      street_number: address_number,
                      street_complement: address_complement,
                      neighborhood: address_neighborhood,
                      city: address_city,
                      ibge: ibgeAddress,
                      uf: address_state,
                      latitude: 0,
                      longitude: 0,
                      is_billing_address: false,
                      is_main_address: true
                    }
                  )

                  await signIn({ email: user.email, password })
                } catch (error) {
                  setSubmitError(error.message)
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              {({
                isSubmitting,
                errors,
                touched,
                values,
                setFieldValue,
                // handleChange,
                handleBlur
              }) => (
                <Form className="mt-8 space-y-6">
                  <div className="flex flex-col lg:flex-row w-full">
                    <div>
                      <label
                        className="text-black-400 font-semibold"
                        htmlFor="address_zip_code"
                      >
                        CEP
                      </label>
                      <Field
                        id="address_zip_code"
                        name="address_zip_code"
                        type="text"
                        value={normalizeCep(values.address_zip_code)}
                        onBlur={e => {
                          handleBlur(e)
                          handleCep(e.target.value, setFieldValue)
                        }}
                        className={
                          errors.address_zip_code && touched.address_zip_code
                            ? 'input mt-2 border-red-500'
                            : 'input mt-2'
                        }
                      />
                      {errors.address_zip_code && touched.address_zip_code && (
                        <ErrorMessage>{errors.address_zip_code}</ErrorMessage>
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
                          <ErrorMessage>
                            {errors.address_neighborhood}
                          </ErrorMessage>
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
                        className={
                          errors.address_state && touched.address_state
                            ? 'input mt-2 border-red-500'
                            : 'input mt-2'
                        }
                      >
                        <option value="" disabled>
                          Selecione...
                        </option>
                        {states.map(state => (
                          <option key={state.cod} value={state.cod}>
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
                        type="text"
                        className={
                          errors.address_city && touched.address_city
                            ? 'input mt-2 border-red-500'
                            : 'input mt-2'
                        }
                      />
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

                  <div className="flex justify-center">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="mt-6 primary-btn  flex justify-center items-center w-40 "
                    >
                      {isSubmitting ? (
                        <FaSpinner className="animate-spin" size={24} />
                      ) : (
                        'SALVAR'
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </Container>
  )
}
