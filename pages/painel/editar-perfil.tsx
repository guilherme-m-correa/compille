import * as Yup from 'yup'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import Container from '../../components/Container'
import { useAuth } from '../../hooks/auth'
import ErrorMessage from '../../components/ErrorMessage'
// import ErrorMessageBox from '../../components/ErrorMessageBox'
import { api } from '../../hooks/fetch'
import { normalizeCpf, normalizeDate } from '../../helpers'

interface FormCPFValues {
  cpf: string
  birthdate: string
}

interface FormValues {
  oab: string
  oab_uf: string
  profile_type: string
  profile_name: string
  genre: string
  scholarity: string
  acting_state: string
  acting_city: string
  has_certificate: string
  profile_link: string
  phone_type_1: string
  phone_ddd_1: string
  phone_number_1: string
  phone_type_2: string
  phone_ddd_2: string
  phone_number_2: string
  phone_type_3: string
  phone_ddd_3: string
  phone_number_3: string
}

interface ActingCity {
  uf: string
  city: string
}

export default function Painel() {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [submitError, setSubmitError] = useState('')
  const [selectedUf, setSelectedUf] = useState(0)
  const [ufCities, setUfCities] = useState([])
  const [actingCities, setActingCities] = useState([] as ActingCity[])

  const profile_types = ['Advogado', 'Escritório de advocacia']

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

  const expertises = [
    'Direito Acidentário',
    'Direito Administrativo',
    'Direito Aeronáutico',
    'Direito Agrário',
    'Direito Ambiental',
    'Direito Bancário',
    'Direito Canônico',
    'Direito Civil',
    'Direito Constitucional',
    'Direito Consumidor',
    'Direito Contratual',
    'Direito Corporativo',
    'Direito da Informática',
    'Direito da Mulher',
    'Direito das Sucessões',
    'Direito de Família',
    'Direito de Negócios',
    'Direito de Propriedade',
    'Direito de Trânsito',
    'Direito Desportivo',
    'Direito do Petróleo',
    'Direito do Trabalho',
    'Direito Educacional',
    'Direito Eleitoral',
    'Direito Empresarial',
    'Direito Espacial',
    'Direito Financeiro',
    'Direito Imobiliário',
    'Direito Internacional',
    'Direito Marítimo',
    'Direito Médico',
    'Direito Militar',
    'Direito Minerário',
    'Direito Penal',
    'Direito Previdenciário',
    'Direito Processual Civil',
    'Direito Processual do Trabalho',
    'Direito Processual Penal',
    'Direito Sanitário',
    'Direito Securitário',
    'Direito Sindical',
    'Direito Societário',
    'Direito Tributário',
    'Direito Urbanístico',
    'Direitos Humanos'
  ]
  useEffect(() => {
    //
  }, [])

  async function loadCities(uf: string) {
    setUfCities([])

    const { data } = await api.get(
      `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/ibgedistricts/uf/${uf}/cities`
    )

    setUfCities(data)
  }

  async function handleAddActingCity(city: string) {
    const newCity = {
      uf: states.filter(state => state.cod === Number(selectedUf))[0].uf,
      city
    } as ActingCity

    setActingCities([...actingCities, newCity])
  }

  async function handleRemoveActingCity(city: ActingCity) {
    setActingCities(actingCities.filter(filterCity => filterCity !== city))
  }

  return (
    <Container>
      <div className="flex flex-col my-10">
        <h2 className="text-2xl font-semibold">Cadastrar Perfil</h2>
        <p className="mt-2 text-base">
          Preencha o seu perfil profissional e receba solicitações de serviços.
        </p>

        {step === 1 && (
          <>
            <div className="mt-6 bg-indigo-200 p-6 text-center rounded-lg text-blue-500">
              <strong>{user?.username}, bem-vindo ao Compille!</strong>
              <p className="mt-2">
                As oportunidades de serviços estão lhe esperando. Continue o
                cadastro abaixo para começar a receber as oportunidades
              </p>
            </div>

            <div className="bg-white shadow-md rounded-md p-6 mt-10">
              <div className="py-4 border-b-2 border-gray-100">
                <h2 className="text-2xl font-semibold">
                  Comece preechendo o seu CPF e data de nascimento
                </h2>
              </div>

              <Formik
                initialValues={{
                  cpf: '',
                  birthdate: ''
                }}
                validationSchema={Yup.object({
                  cpf: Yup.string().required('Número do CPF obrigatório'),
                  birthdate: Yup.date().required(
                    'Data de nascimento obrigátorio'
                  )
                })}
                onSubmit={async (
                  values: FormCPFValues,
                  { setSubmitting }: FormikHelpers<FormCPFValues>
                ) => {
                  // const { cpf, birthdate } = values

                  setSubmitError('')

                  try {
                    setStep(2)
                  } catch (error) {
                    setSubmitError(error.message)
                  } finally {
                    setSubmitting(false)
                  }
                }}
              >
                {({ isSubmitting, errors, touched, values }) => (
                  <Form className="mt-8 space-y-6">
                    <div className="flex flex-col lg:flex-row">
                      <div className="mr-2 flex-1">
                        <label
                          className="text-black-400 font-semibold"
                          htmlFor="cpf"
                        >
                          Número do CPF
                        </label>
                        <Field
                          id="cpf"
                          name="cpf"
                          type="cpf"
                          value={normalizeCpf(values.cpf)}
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
                          Data de nascimento
                        </label>
                        <Field
                          id="birthdate"
                          name="birthdate"
                          type="birthdate"
                          value={normalizeDate(values.birthdate)}
                          className={
                            errors.birthdate && touched.birthdate
                              ? 'input mt-2 border-red-500'
                              : 'input mt-2'
                          }
                        />
                        {errors.birthdate && touched.birthdate && (
                          <ErrorMessage>{errors.birthdate}</ErrorMessage>
                        )}
                      </div>
                    </div>

                    <div>
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="primary-btn max-w-max"
                      >
                        CONTINUAR
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mt-6 bg-indigo-200 p-6 text-center rounded-lg text-blue-500">
              <strong>{user?.username}, estamos quase lá!</strong>
              <p className="mt-2">
                Agora, só falta preencher seu perfil com as suas informações
                profissionais para começar.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-md p-6 mt-10">
              <Formik
                initialValues={{
                  oab: '',
                  oab_uf: '',
                  acting_city: '',
                  acting_state: '',
                  genre: '',
                  has_certificate: '',
                  profile_link: '',
                  profile_name: '',
                  profile_type: '',
                  scholarity: '',
                  phone_type_1: '',
                  phone_ddd_1: '',
                  phone_number_1: '',
                  phone_type_2: '',
                  phone_ddd_2: '',
                  phone_number_2: '',
                  phone_type_3: '',
                  phone_ddd_3: '',
                  phone_number_3: ''
                }}
                validationSchema={Yup.object({
                  oab: Yup.string().required('Registro obrigatório'),
                  oab_uf: Yup.string().required('Estado obrigatório'),
                  genre: Yup.string().required('Gênero obrigatório'),
                  profile_link: Yup.string().required(
                    'Escolha um link para seu perfil'
                  ),
                  profile_name: Yup.string().required(
                    'Nome do perfil obrigatório'
                  ),
                  profile_type: Yup.string().required(
                    'Tipo de perfil obrigatório'
                  )
                })}
                onSubmit={async (
                  values: FormValues,
                  { setSubmitting }: FormikHelpers<FormValues>
                ) => {
                  // const { oab, oab_uf } = values

                  setSubmitError('')

                  try {
                    setStep(2)
                  } catch (error) {
                    setSubmitError(error.message)
                  } finally {
                    setSubmitting(false)
                  }
                }}
              >
                {({ isSubmitting, errors, touched, values, handleChange }) => (
                  <Form className="space-y-6 flex p-6 flex-col">
                    <div className="py-4 border-b-2 border-gray-100">
                      <h2 className="text-2xl font-semibold">
                        Dados profissionais
                      </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:mr-2">
                        <label
                          className="text-black-400 font-semibold"
                          htmlFor="profile_type"
                        >
                          Tipo de perfil
                        </label>
                        <Field
                          id="profile_type"
                          name="profile_type"
                          type="profile_type"
                          as="select"
                          className={
                            errors.profile_type && touched.profile_type
                              ? 'input mt-2 border-red-500'
                              : 'input mt-2'
                          }
                        >
                          <option className="text-gray-100" value="" disabled>
                            Selecione...
                          </option>
                          {profile_types.map(type => (
                            <option
                              key={type}
                              className="text-gray-100"
                              value={type}
                            >
                              {type}
                            </option>
                          ))}
                        </Field>
                        {errors.oab_uf && touched.oab_uf && (
                          <ErrorMessage>{errors.oab_uf}</ErrorMessage>
                        )}
                      </div>

                      <div className="lg:mr-2 flex-1">
                        <label
                          className="text-black-400 font-semibold"
                          htmlFor="oab"
                        >
                          Registro
                        </label>
                        <Field
                          id="oab"
                          name="oab"
                          type="oab"
                          className={
                            errors.oab && touched.oab
                              ? 'input mt-2 border-red-500'
                              : 'input mt-2'
                          }
                        />
                        {errors.oab && touched.oab && (
                          <ErrorMessage>{errors.oab}</ErrorMessage>
                        )}
                      </div>

                      <div>
                        <label
                          className="text-black-400 font-semibold"
                          htmlFor="oab_uf"
                        >
                          Estado
                        </label>
                        <Field
                          id="oab_uf"
                          name="oab_uf"
                          type="oab_uf"
                          as="select"
                          className={
                            errors.oab_uf && touched.oab_uf
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
                        {errors.oab_uf && touched.oab_uf && (
                          <ErrorMessage>{errors.oab_uf}</ErrorMessage>
                        )}
                      </div>
                    </div>

                    <div className="py-4 border-b-2 border-gray-100">
                      <h2 className="text-2xl font-semibold">Dados pessoais</h2>
                    </div>

                    <div className="flex flex-col">
                      <div>
                        <label
                          className="text-black-400 font-semibold"
                          htmlFor="profile_name"
                        >
                          Nome para exibição no perfil{' '}
                          <span className="text-gray-400 text-sm">
                            (esse é o nome que será exibido em seu perfil
                            público. Exemplo: Guilherme e Pablo Advogados
                            Associados)
                          </span>
                        </label>
                        <Field
                          id="profile_name"
                          name="profile_name"
                          type="profile_name"
                          className={
                            errors.profile_name && touched.profile_name
                              ? 'input mt-2 border-red-500'
                              : 'input mt-2'
                          }
                        />
                        {errors.profile_name && touched.profile_name && (
                          <ErrorMessage>{errors.profile_name}</ErrorMessage>
                        )}
                      </div>

                      <div className="mt-2 flex flex-col lg:flex-row">
                        <div className="flex-1 lg:mr-2">
                          <label
                            className="text-black-400 font-semibold"
                            htmlFor="genre"
                          >
                            Gênero
                          </label>
                          <Field
                            id="genre"
                            name="genre"
                            type="genre"
                            as="select"
                            className={
                              errors.genre && touched.genre
                                ? 'input mt-2 border-red-500'
                                : 'input mt-2'
                            }
                          >
                            <option
                              className="text-gray-100"
                              selected
                              disabled
                              value=""
                            >
                              Selecione...
                            </option>
                            <option className="text-gray-100" value="Masculino">
                              Masculino
                            </option>
                            <option className="text-gray-100" value="Feminino">
                              Feminino
                            </option>
                          </Field>
                          {errors.genre && touched.genre && (
                            <ErrorMessage>{errors.genre}</ErrorMessage>
                          )}
                        </div>
                        <div className="flex-1">
                          <label
                            className="text-black-400 font-semibold"
                            htmlFor="scholarity"
                          >
                            Escolaridade
                          </label>
                          <Field
                            id="scholarity"
                            name="scholarity"
                            type="scholarity"
                            as="select"
                            className={
                              errors.scholarity && touched.scholarity
                                ? 'input mt-2 border-red-500'
                                : 'input mt-2'
                            }
                          >
                            <option
                              className="text-gray-100"
                              selected
                              disabled
                              value=""
                            >
                              Selecione...
                            </option>
                            <option
                              className="text-gray-100"
                              value="Superior Incompleto"
                            >
                              Superior Incompleto
                            </option>
                            <option
                              className="text-gray-100"
                              value="Superior Completo"
                            >
                              Superior Completo
                            </option>
                            <option
                              className="text-gray-100"
                              value="Pós-Graduação"
                            >
                              Pós-Graduação
                            </option>
                          </Field>
                          {errors.scholarity && touched.scholarity && (
                            <ErrorMessage>{errors.scholarity}</ErrorMessage>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="py-4 border-b-2 border-gray-100">
                      <h2 className="text-2xl font-semibold">Foto do perfil</h2>
                    </div>

                    <div>
                      <p className="text-sm">
                        Inclua uma foto pessoal ou do seu escritório. Perfis com
                        fotos são mais acessados pelos clientes.
                      </p>

                      <div className="mt-6 h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>

                      <button
                        type="button"
                        className="primary-btn mt-6 max-w-max"
                      >
                        ALTERAR FOTO
                      </button>
                    </div>

                    <div className="py-4 border-b-2 border-gray-100">
                      <h2 className="text-2xl font-semibold">
                        Telefones de contato
                      </h2>
                    </div>

                    <div className="mt-2 max-w-2xl flex flex-col lg:flex-row">
                      <div className="flex-1 lg:mr-2">
                        <label htmlFor="phone_type_1" className="sr-only">
                          Tipo de telefone
                        </label>
                        <Field
                          id="phone_type_1"
                          name="phone_type_1"
                          type="phone_type_1"
                          as="select"
                          className={
                            errors.phone_type_1 && touched.phone_type_1
                              ? 'input border-red-500'
                              : 'input'
                          }
                        >
                          <option
                            className="text-gray-100"
                            selected
                            disabled
                            value=""
                          >
                            Selecione o tipo
                          </option>
                          <option className="text-gray-100" value="Celular">
                            Celular
                          </option>
                          <option className="text-gray-100" value="Comercial">
                            Comercial
                          </option>
                          <option className="text-gray-100" value="Residencial">
                            Residencial
                          </option>
                        </Field>
                        {errors.phone_type_1 && touched.phone_type_1 && (
                          <ErrorMessage>{errors.phone_type_1}</ErrorMessage>
                        )}
                      </div>
                      <div className="lg:mr-2">
                        <label htmlFor="phone_ddd" className="sr-only">
                          DDD
                        </label>
                        <Field
                          id="phone_ddd_1"
                          name="phone_ddd_1"
                          type="phone_ddd_1"
                          placeholder="DDD"
                          className={
                            errors.phone_ddd_1 && touched.phone_ddd_1
                              ? 'input border-red-500'
                              : 'input'
                          }
                        />
                        {errors.phone_ddd_1 && touched.phone_ddd_1 && (
                          <ErrorMessage>{errors.phone_ddd_1}</ErrorMessage>
                        )}
                      </div>

                      <div className="flex-1 lg:mr-2">
                        <label htmlFor="phone_number_1" className="sr-only">
                          DDD
                        </label>
                        <Field
                          id="phone_number_1"
                          name="phone_number_1"
                          type="phone_number_1"
                          value={values.phone_number_1}
                          placeholder="Número"
                          className={
                            errors.phone_number_1 && touched.phone_number_1
                              ? 'input border-red-500'
                              : 'input'
                          }
                        />
                        {errors.phone_number_1 && touched.phone_number_1 && (
                          <ErrorMessage>{errors.phone_number_1}</ErrorMessage>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 max-w-2xl flex flex-col lg:flex-row">
                      <div className="flex-1 lg:mr-2">
                        <label htmlFor="phone_type_2" className="sr-only">
                          Tipo de telefone
                        </label>
                        <Field
                          id="phone_type_2"
                          name="phone_type_2"
                          type="phone_type_2"
                          as="select"
                          className={
                            errors.phone_type_2 && touched.phone_type_2
                              ? 'input border-red-500'
                              : 'input'
                          }
                        >
                          <option
                            className="text-gray-100"
                            selected
                            disabled
                            value=""
                          >
                            Selecione o tipo
                          </option>
                          <option className="text-gray-100" value="Celular">
                            Celular
                          </option>
                          <option className="text-gray-100" value="Comercial">
                            Comercial
                          </option>
                          <option className="text-gray-100" value="Residencial">
                            Residencial
                          </option>
                        </Field>
                        {errors.phone_type_2 && touched.phone_type_2 && (
                          <ErrorMessage>{errors.phone_type_2}</ErrorMessage>
                        )}
                      </div>
                      <div className="lg:mr-2">
                        <label htmlFor="phone_ddd_2" className="sr-only">
                          DDD
                        </label>
                        <Field
                          id="phone_ddd_2"
                          name="phone_ddd_2"
                          type="phone_ddd_2"
                          placeholder="DDD"
                          className={
                            errors.phone_ddd_2 && touched.phone_ddd_2
                              ? 'input border-red-500'
                              : 'input'
                          }
                        />
                        {errors.phone_ddd_2 && touched.phone_ddd_2 && (
                          <ErrorMessage>{errors.phone_ddd_2}</ErrorMessage>
                        )}
                      </div>

                      <div className="flex-1 lg:mr-2">
                        <label htmlFor="phone_number_2" className="sr-only">
                          DDD
                        </label>
                        <Field
                          id="phone_number_2"
                          name="phone_number_2"
                          type="phone_number_2"
                          value={values.phone_number_2}
                          placeholder="Número"
                          className={
                            errors.phone_number_2 && touched.phone_number_2
                              ? 'input border-red-500'
                              : 'input'
                          }
                        />
                        {errors.phone_number_2 && touched.phone_number_2 && (
                          <ErrorMessage>{errors.phone_number_2}</ErrorMessage>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 max-w-2xl flex flex-col lg:flex-row">
                      <div className="flex-1 lg:mr-2">
                        <label htmlFor="phone_type_3" className="sr-only">
                          Tipo de telefone
                        </label>
                        <Field
                          id="phone_type_3"
                          name="phone_type_3"
                          type="phone_type_3"
                          as="select"
                          className={
                            errors.phone_type_3 && touched.phone_type_3
                              ? 'input border-red-500'
                              : 'input'
                          }
                        >
                          <option
                            className="text-gray-100"
                            selected
                            disabled
                            value=""
                          >
                            Selecione o tipo
                          </option>
                          <option className="text-gray-100" value="Celular">
                            Celular
                          </option>
                          <option className="text-gray-100" value="Comercial">
                            Comercial
                          </option>
                          <option className="text-gray-100" value="Residencial">
                            Residencial
                          </option>
                        </Field>
                        {errors.phone_type_3 && touched.phone_type_3 && (
                          <ErrorMessage>{errors.phone_type_3}</ErrorMessage>
                        )}
                      </div>
                      <div className="lg:mr-2">
                        <label htmlFor="phone_ddd_3" className="sr-only">
                          DDD
                        </label>
                        <Field
                          id="phone_ddd_3"
                          name="phone_ddd_3"
                          type="phone_ddd_3"
                          placeholder="DDD"
                          className={
                            errors.phone_ddd_3 && touched.phone_ddd_3
                              ? 'input border-red-500'
                              : 'input'
                          }
                        />
                        {errors.phone_ddd_3 && touched.phone_ddd_3 && (
                          <ErrorMessage>{errors.phone_ddd_3}</ErrorMessage>
                        )}
                      </div>

                      <div className="flex-1 lg:mr-2">
                        <label htmlFor="phone_number_3" className="sr-only">
                          DDD
                        </label>
                        <Field
                          id="phone_number_3"
                          name="phone_number_3"
                          type="phone_number_3"
                          value={values.phone_number_3}
                          placeholder="Número"
                          className={
                            errors.phone_number_3 && touched.phone_number_3
                              ? 'input border-red-500'
                              : 'input'
                          }
                        />
                        {errors.phone_number_3 && touched.phone_number_3 && (
                          <ErrorMessage>{errors.phone_number_3}</ErrorMessage>
                        )}
                      </div>
                    </div>

                    <div className="py-4 border-b-2 border-gray-100">
                      <h2 className="text-2xl font-semibold">
                        Cidades de atuação
                      </h2>
                    </div>

                    <p className="text-sm">
                      Selecione o estado e cidade para adicionar
                    </p>

                    <div className="mt-2 flex flex-col lg:flex-row">
                      <div className="flex-1 lg:mr-2">
                        <label
                          className="text-black-400 font-semibold"
                          htmlFor="acting_state"
                        >
                          Estado
                        </label>
                        <Field
                          id="acting_state"
                          name="acting_state"
                          type="acting_state"
                          as="select"
                          onChange={e => {
                            handleChange(e)
                            setSelectedUf(e.target.value)
                            loadCities(e.target.value)
                          }}
                          className={
                            errors.acting_state && touched.acting_state
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
                        {errors.acting_state && touched.acting_state && (
                          <ErrorMessage>{errors.acting_state}</ErrorMessage>
                        )}
                      </div>
                      <div className="flex-1">
                        <label
                          className="text-black-400 font-semibold"
                          htmlFor="acting_city"
                        >
                          Cidade
                        </label>
                        <Field
                          id="acting_city"
                          name="acting_city"
                          type="acting_city"
                          as="select"
                          onChange={e => {
                            handleChange(e)
                            handleAddActingCity(e.target.value)
                          }}
                          className={
                            errors.acting_city && touched.acting_city
                              ? 'input mt-2 border-red-500'
                              : 'input mt-2'
                          }
                        >
                          <option
                            className="text-gray-100"
                            selected
                            disabled
                            value=""
                          >
                            {!values.acting_state
                              ? 'Selecione o estado...'
                              : 'Selecione...'}
                          </option>
                          {ufCities.length > 0 &&
                            ufCities.map(city => (
                              <option
                                key={city}
                                className="text-gray-100"
                                value={city}
                              >
                                {city}
                              </option>
                            ))}
                        </Field>
                        {errors.acting_city && touched.acting_city && (
                          <ErrorMessage>{errors.acting_city}</ErrorMessage>
                        )}
                      </div>
                    </div>

                    {actingCities.length > 0 && (
                      <div>
                        {actingCities.map(city => (
                          <span
                            key={city.city}
                            className="inline-block align-middle bg-blue-500 py-1 px-2 mr-2 text-white rounded max-w-max"
                          >
                            {city.uf} - {city.city}
                            <button
                              type="button"
                              className="inline ml-2 h-full outline-none focus:outline-none"
                              onClick={() => handleRemoveActingCity(city)}
                            >
                              <FaTimes />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="py-4 border-b-2 border-gray-100">
                      <h2 className="text-2xl font-semibold">
                        Áreas de atuação
                      </h2>
                    </div>

                    <div
                      className="flex flex-wrap"
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      <ul className="lg:w-1/3 sm:w-1/2 w-full">
                        {expertises
                          .slice(0, expertises.length / 3)
                          .map(expertise => (
                            <li key={expertise}>
                              <label className="inline-flex items-center mt-3">
                                <Field
                                  className="h-5 w-5 text-blue-500 rounded"
                                  type="checkbox"
                                  name="checked"
                                  value={expertise}
                                />
                                <span className="ml-2 text-gray-700">
                                  {expertise}
                                </span>
                              </label>
                            </li>
                          ))}
                      </ul>

                      <ul className="lg:w-1/3 w-full">
                        {expertises
                          .slice(
                            expertises.length / 3,
                            2 * (expertises.length / 3)
                          )
                          .map(expertise => (
                            <li key={expertise}>
                              <label className="inline-flex items-center mt-3">
                                <Field
                                  className="h-5 w-5 text-blue-500 rounded"
                                  type="checkbox"
                                  name="checked"
                                  value={expertise}
                                />
                                <span className="ml-2 text-gray-700">
                                  {expertise}
                                </span>
                              </label>
                            </li>
                          ))}
                      </ul>

                      <ul className="lg:w-1/3 sm:w-1/2 w-full">
                        {expertises
                          .slice(2 * (expertises.length / 3), expertises.length)
                          .map(expertise => (
                            <li key={expertise}>
                              <label className="inline-flex items-center mt-3">
                                <Field
                                  className="h-5 w-5 text-blue-500 rounded"
                                  type="checkbox"
                                  name="checked"
                                  value={expertise}
                                />
                                <span className="ml-2 text-gray-700">
                                  {expertise}
                                </span>
                              </label>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="py-4 border-b-2 border-gray-100">
                      <h2 className="text-2xl font-semibold">
                        Informações adicionais
                      </h2>
                    </div>

                    <div>
                      <label
                        className="text-black-400 font-semibold"
                        htmlFor="has_certificate"
                      >
                        Possui certificado digital?
                      </label>
                      <Field
                        id="has_certificate"
                        name="has_certificate"
                        type="has_certificate"
                        as="select"
                        className={
                          errors.has_certificate && touched.has_certificate
                            ? 'input mt-2 border-red-500'
                            : 'input mt-2'
                        }
                      >
                        <option className="text-gray-100" value="Não">
                          Não
                        </option>
                        <option className="text-gray-100" value="Sim">
                          Sim
                        </option>
                      </Field>
                      {errors.has_certificate && touched.has_certificate && (
                        <ErrorMessage>{errors.has_certificate}</ErrorMessage>
                      )}
                    </div>

                    <div>
                      <label
                        className="text-black-400 font-semibold"
                        htmlFor="profile_link"
                      >
                        Link do seu perfil
                      </label>
                      <div className="flex">
                        <Field
                          id="profile_link"
                          name="profile_link"
                          type="profile_link"
                          value="compille.com/p/"
                          className="input mt-2 max-w-max bg-gray-200"
                          disabled
                        />
                        <Field
                          id="profile_link"
                          name="profile_link"
                          type="profile_link"
                          className={
                            errors.profile_link && touched.profile_link
                              ? 'input mt-2 border-red-500'
                              : 'input mt-2'
                          }
                        />
                        {errors.profile_link && touched.profile_link && (
                          <ErrorMessage>{errors.profile_link}</ErrorMessage>
                        )}
                      </div>
                    </div>

                    <div className="py-4 border-b-2 border-gray-100">
                      <h2 className="text-2xl font-semibold">Minicurrículo</h2>
                    </div>

                    <p className="text-sm">
                      Descreva brevemente sua experiência profissional e
                      acadêmica
                    </p>

                    <div>
                      <Field
                        as="textarea"
                        id="about"
                        name="about"
                        rows={10}
                        className="block w-full border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="mt-6 primary-btn max-w-max"
                      >
                        CONTINUAR
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </>
        )}
      </div>
    </Container>
  )
}
