import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import axios from 'axios'
import Container from '../../components/Container'
import ErrorMessage from '../../components/ErrorMessage'
// import ErrorMessageBox from '../../components/ErrorMessageBox'
import { api } from '../../hooks/fetch'
import { useAuth } from '../../hooks/auth'
import { normalizeCpf, normalizeCep } from '../../helpers'

interface FormDadosDeAcessoValues {
  email: string
  username: string
  cpf: string
  password: string
  confirm_password: string
}

interface FormDadosRecebimentoValues {
  bank: string
  agency: string
  account: string
  digit: string
  address_zip_code: string
  address_street: string
  address_number: string
  address_neighborhood: string
  address_complement: string
  address_state: string
  address_city: string
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
  const [menuItem, setMenuItem] = useState(1)
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
    <>
      <div className="flex flex-col pt-10 bg-white">
        <Container>
          <h2 className="text-2xl font-semibold">Minha Conta</h2>

          <p className="mt-2 text-base">
            Gerencie as informações da sua conta de correspondente.
          </p>
        </Container>

        <div className="mt-4 shadow-lg border-2 pt-1 border-gray-100">
          <Container>
            <div className="flex space-x-4 items-center flex-col lg:flex-row">
              <div>
                <button
                  className={
                    menuItem === 1
                      ? `font-semibold tracking-wider p-3 border-b-4 focus:outline-none  border-blue-500 text-blue-500`
                      : `font-semibold focus:outline-none tracking-wider p-3`
                  }
                  type="button"
                  onClick={() => setMenuItem(1)}
                >
                  DADOS DE ACESSO
                </button>
              </div>

              <div>
                <button
                  className={
                    menuItem === 2
                      ? `font-semibold tracking-wider p-3 border-b-4 focus:outline-none border-blue-500 text-blue-500`
                      : `font-semibold focus:outline-none tracking-wider p-3`
                  }
                  type="button"
                  onClick={() => setMenuItem(2)}
                >
                  DADOS DE RECEBIMENTO
                </button>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Container>
        {menuItem === 1 && (
          <Formik
            initialValues={{
              email: '',
              cpf: '',
              username: '',
              password: '',
              confirm_password: ''
            }}
            validationSchema={Yup.object({})}
            onSubmit={async (
              values: FormDadosDeAcessoValues,
              { setSubmitting }: FormikHelpers<FormDadosDeAcessoValues>
            ) => {
              setSubmitError('')

              try {
                //
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
                <div className="py-4 border-b-2 border-gray-200">
                  <h2 className="text-2xl font-semibold">Dados de acesso</h2>
                </div>

                <div>
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="password"
                  >
                    CPF
                  </label>
                  <Field
                    id="cpf"
                    name="cpf"
                    type="text"
                    className={
                      errors.cpf && touched.cpf
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  />
                  {errors.cpf && touched.cpf && (
                    <ErrorMessage>{errors.cpf}</ErrorMessage>
                  )}
                </div>

                <div>
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="password"
                  >
                    Nome Completo
                  </label>
                  <Field
                    id="cpf"
                    name="cpf"
                    type="text"
                    className={
                      errors.cpf && touched.cpf
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  />
                  {errors.cpf && touched.cpf && (
                    <ErrorMessage>{errors.cpf}</ErrorMessage>
                  )}
                </div>

                <div>
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="password"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    className={
                      errors.email && touched.email
                        ? 'input mt-2 border-red-500'
                        : 'input mt-2'
                    }
                  />
                  {errors.email && touched.email && (
                    <ErrorMessage>{errors.email}</ErrorMessage>
                  )}
                </div>

                <div>
                  <label
                    className="text-black-400 font-semibold"
                    htmlFor="password"
                  >
                    Senha (mantenha a senha em branco para não alterar)
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
                    Confirme a senha (mantenha a senha em branco para não
                    alterar)
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
        )}

        {menuItem === 2 && (
          <Formik
            initialValues={{
              address_zip_code: '',
              address_street: '',
              address_number: '',
              address_neighborhood: '',
              address_complement: '',
              address_state: '',
              address_city: '',
              bank: '',
              agency: '',
              account: '',
              digit: ''
            }}
            validationSchema={Yup.object({})}
            onSubmit={async (
              values: FormDadosRecebimentoValues,
              { setSubmitting }: FormikHelpers<FormDadosRecebimentoValues>
            ) => {
              setSubmitError('')

              try {
                //
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
                <div className="py-4 border-b-2 border-gray-200">
                  <h2 className="text-2xl font-semibold">Dados bancários</h2>
                </div>

                <div className="flex flex-col lg:flex-row w-full">
                  <div className="flex-1 lg:mr-2">
                    <label
                      className="text-black-400 font-semibold"
                      htmlFor="address_state"
                    >
                      Banco
                    </label>
                    <Field
                      id="address_state"
                      name="address_state"
                      as="select"
                      className={
                        errors.bank && touched.bank
                          ? 'select-input mt-2 border-red-500'
                          : 'select-input mt-2'
                      }
                    >
                      <option value="" disabled>
                        Selecione...
                      </option>
                      ))
                    </Field>
                    {errors.bank && touched.bank && (
                      <ErrorMessage>{errors.bank}</ErrorMessage>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row w-full">
                  <div className="flex-1 lg:mr-2">
                    <label
                      className="text-black-400 font-semibold"
                      htmlFor="agency"
                    >
                      Agência
                    </label>
                    <Field
                      id="agency"
                      name="agency"
                      type="text"
                      className={
                        errors.agency && touched.agency
                          ? 'input mt-2 border-red-500'
                          : 'input mt-2'
                      }
                    />
                    {errors.agency && touched.agency && (
                      <ErrorMessage>{errors.agency}</ErrorMessage>
                    )}
                  </div>
                  <div className="flex-1 lg:mr-2">
                    <label
                      className="text-black-400 font-semibold"
                      htmlFor="account"
                    >
                      Conta corrente
                    </label>
                    <Field
                      id="account"
                      name="account"
                      type="text"
                      className={
                        errors.account && touched.account
                          ? 'input mt-2 border-red-500'
                          : 'input mt-2'
                      }
                    />
                    {errors.account && touched.account && (
                      <ErrorMessage>{errors.account}</ErrorMessage>
                    )}
                  </div>
                  <div className="flex-1 ">
                    <label
                      className="text-black-400 font-semibold"
                      htmlFor="digit"
                    >
                      Dígito
                    </label>
                    <Field
                      id="digit"
                      name="digit"
                      type="text"
                      className={
                        errors.digit && touched.digit
                          ? 'input mt-2 border-red-500'
                          : 'input mt-2'
                      }
                    />
                    {errors.digit && touched.digit && (
                      <ErrorMessage>{errors.digit}</ErrorMessage>
                    )}
                  </div>
                </div>

                <div className="py-4 border-b-2 border-gray-200">
                  <h2 className="text-2xl font-semibold">Endereço</h2>
                </div>

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
                          ? 'select-input mt-2 border-red-500'
                          : 'select-input mt-2'
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
        )}
      </Container>
    </>
  )
}
