import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { FaTimes, FaSpinner } from 'react-icons/fa'
import Container from '../../components/Container'
import { useAuth } from '../../hooks/auth'
import ErrorMessage from '../../components/ErrorMessage'
import ErrorMessageBox from '../../components/ErrorMessageBox'
import { api } from '../../hooks/fetch'
import { normalizeCpf, normalizeDate } from '../../helpers'

interface FormCPFValues {
  cpf: string
  birth_date: string
}

interface FormValues {
  oab: string
  oab_uf: string
  profile_type: string
  profile_name: string
  schoolarity: string
  acting_state: string
  acting_city: string
  acting_instances: string[]
  curriculum: string
  gender: string
  has_certificate: string
  profile_link: string
  phone_type: string
  phone_ddd: string
  phone_number: string
  phone_contact: string
}

interface City {
  city_code: string
  city_id: string
  city_name: string
  district_code: string
  district_id: number
  district_name: string
  immediateregion_id: string
  immediateregion_name: string
  intermediateregion_id: string
  intermediateregion_name: string
  mesoregion_id: string
  microregion_id: string
  microregion_name: string
  uf_id: string
  uf_name: string
}

interface Person {
  id: number
  user_id: string
  cpf: string
  rg: string
  rg_exp: string
  rg_uf: string
  oab: string
  oab_uf: string
  gender: string
  created_at: string
  updated_at: string
  profile_type: string
  profile_name: string
  profile_link: string
  birth_date: null
  curriculum: string
  schoolarity: string
  has_certificate: boolean
  register_finish: boolean
}

interface JuridicalArea {
  id: number
  name: string
}

export default function Painel() {
  const router = useRouter()

  const [msg, setMsg] = useState('')
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [submitError, setSubmitError] = useState('')
  const [person, setPerson] = useState<Person>({} as Person)
  const [cities, setCities] = useState([])
  const [stateSelected, setStateSelected] = useState('')
  const [citiesData, setCitiesData] = useState([])
  const [legalInstances, setLegalInstances] = useState([])
  const [legalInstancesOptions, setLegalInstancesOptions] = useState([])
  const [juridicalAreas, setJuridicalAreas] = useState([])
  const [juridicalAreasOptions, setJuridicalAreasOptions] = useState<
    JuridicalArea[]
  >([] as JuridicalArea[])
  const [phonesTypes, setPhonesTypes] = useState([])

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

  useEffect(() => {
    async function loadTypes() {
      try {
        const { data } = await api.get(`/comercial/phonetypes`)
        setPhonesTypes(data)
      } catch (err) {
        //
      }
    }
    loadTypes()
  }, [])

  useEffect(() => {
    async function loadData() {
      try {
        const { data: areas } = await api.get(`/comercial/juridical-areas`)
        const { data: person_areas } = await api.get(
          `/comercial/person-juridical-areas/${person?.id}`
        )

        setJuridicalAreas(person_areas)
        setJuridicalAreasOptions(areas)
      } catch (err) {
        //
      }
    }
    if (person?.id) {
      loadData()
    }
  }, [person?.id])

  async function handleAddJuridicalArea(id, name) {
    try {
      const { data } = await api.post(`/comercial/person-juridical-areas`, {
        person_id: person?.id,
        juridical_area_id: id
      })
      setJuridicalAreas([...juridicalAreas, { ...data, area: { name } }])
    } catch (err) {
      //
    }
  }

  async function handleRemoveJuridicalArea(id) {
    try {
      await api.delete(`/comercial/person-juridical-areas/${id}`)

      setJuridicalAreas(juridicalAreas.filter(l => l.id !== id))
    } catch (err) {
      //
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const { data: instances } = await api.get<JuridicalArea[]>(
          `/comercial/legal-instances`
        )
        const { data: person_instances } = await api.get(
          `/comercial/person-legal-instances/${person?.id}`
        )

        setLegalInstances(person_instances)
        setLegalInstancesOptions(instances)
      } catch (err) {
        //
      }
    }

    if (person?.id) {
      loadData()
    }
  }, [person?.id])

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get(`/comercial/people/user/${user?.id}`)

        if (response.status === 200) {
          setPerson(response.data)
          setStep(2)
        }
      } catch (error) {
        //
      }
    }

    loadData()
  }, [user?.id])

  async function loadCities(city) {
    setCities([])
    const { data } = await api.get(
      `/comercial/ibgedistricts/uf/${stateSelected}/district/${city}`
    )
    setCities(data)
  }

  async function loadCitiesData() {
    try {
      const { data } = await api.get(`/comercial/personcities/${person.id}`)
      setCitiesData(data)
    } catch (err) {
      //
    }
  }

  useEffect(() => {
    loadCitiesData()
  }, [person.id]) //eslint-disable-line

  function resetForm() {
    setCities([])
  }

  async function handleAddCity(city: City) {
    setMsg('')
    const { data, status } = await api.post(`/comercial/personcities`, {
      person_id: person.id,
      city_name: city.city_name,
      city_id_ibge: city.city_id,
      district_name: city.district_name,
      district_id_ibge: city.district_id,
      uf_id_ibge: city.uf_id
    })

    if (status === 201) {
      loadCitiesData()
      resetForm()
    } else {
      setMsg(data.msg)
    }
  }

  async function handleRemoveCity(id) {
    try {
      await api.delete(`/comercial/personcities/${id}`)
      setCitiesData(citiesData.filter(city => city.id !== id))
    } catch (err) {
      //
    }
  }

  async function handleAddLegalInstance(id, name) {
    try {
      const { data } = await api.post(`/comercial/person-legal-instances`, {
        person_id: person.id,
        legal_instance_id: id
      })
      setLegalInstances([...legalInstances, { ...data, instance: { name } }])
    } catch (error) {
      //
    }
  }

  async function handleRemoveLegalInstance(id) {
    try {
      await api.delete(`/comercial/person-legal-instances/${id}`)

      setLegalInstances(legalInstances.filter(instance => instance.id !== id))
    } catch (error) {
      //
    }
  }

  const handleAvatarChange = useCallback(async e => {
    const { files } = e.target

    if (files) {
      const data = new FormData()
      data.append('avatar', files[0])
      // TODO: Request para atualizar o avatar
    }
  }, [])

  const formattedActingInstances = useMemo(
    () =>
      legalInstances.map(instance => {
        return instance.instance.name
      }),
    [legalInstances]
  )

  const formattedJuridicalAreas = useMemo(
    () =>
      juridicalAreas.map(area => {
        return area.area.name
      }),
    [juridicalAreas]
  )

  return (
    <Container>
      <div className="flex flex-col my-10">
        {person.register_finish ? (
          <h2 className="text-2xl font-semibold">Editar Perfil</h2>
        ) : (
          <h2 className="text-2xl font-semibold">Cadastrar Perfil</h2>
        )}
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
                  birth_date: ''
                }}
                validationSchema={Yup.object({
                  cpf: Yup.string().required('Número do CPF obrigatório'),
                  birth_date: Yup.date().required(
                    'Data de nascimento obrigátorio'
                  )
                })}
                onSubmit={async (
                  values: FormCPFValues,
                  { setSubmitting }: FormikHelpers<FormCPFValues>
                ) => {
                  const { cpf, birth_date } = values

                  setSubmitError('')

                  try {
                    const response = await api.post<Person>(
                      '/comercial/people',
                      {
                        user_id: user.id,
                        cpf,
                        birth_date
                      }
                    )

                    setPerson(response.data)

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
                          id="birth_date"
                          name="birth_date"
                          type="birth_date"
                          value={normalizeDate(values.birth_date)}
                          className={
                            errors.birth_date && touched.birth_date
                              ? 'input mt-2 border-red-500'
                              : 'input mt-2'
                          }
                        />
                        {errors.birth_date && touched.birth_date && (
                          <ErrorMessage>{errors.birth_date}</ErrorMessage>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="mt-6 primary-btn w-40"
                      >
                        {isSubmitting ? <FaSpinner size={24} /> : 'CONTINUAR'}
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
            {!person.register_finish && (
              <div className="mt-6 bg-indigo-200 p-6 text-center rounded-lg text-blue-500">
                <strong>{user?.username}, estamos quase lá!</strong>
                <p className="mt-2">
                  Agora, só falta preencher seu perfil com as suas informações
                  profissionais para começar.
                </p>
              </div>
            )}

            <div className="bg-white shadow-md rounded-md p-6 mt-10">
              <Formik
                initialValues={
                  {
                    oab: person?.oab || '',
                    oab_uf: person?.oab_uf || '',
                    acting_city: '',
                    acting_state: '',
                    acting_instances: [],
                    curriculum: person?.curriculum || '',
                    gender: person?.gender || '',
                    has_certificate: person?.has_certificate ? 'Sim' : 'Não',
                    profile_type: person?.profile_type || '',
                    profile_link: person?.profile_link || '',
                    profile_name: person?.profile_name || '',
                    schoolarity: person?.schoolarity || '',
                    phone_type: '',
                    phone_ddd: '',
                    phone_number: '',
                    phone_contact: ''
                  } as FormValues
                }
                validationSchema={Yup.object({
                  oab: Yup.string().required('Registro obrigatório'),
                  oab_uf: Yup.string().required('Estado obrigatório'),
                  gender: Yup.string().required('Gênero obrigatório'),
                  profile_link: Yup.string().required(
                    'Escolha um link para seu perfil'
                  ),
                  profile_name: Yup.string().required(
                    'Nome do perfil obrigatório'
                  ),
                  profile_type: Yup.string().required(
                    'Tipo de perfil obrigatório'
                  ),
                  curriculum: Yup.string().required(
                    'Minicurrículo obrigatório'
                  ),
                  schoolarity: Yup.string().required(
                    'Nivel de escolaridade obrigatória'
                  )
                })}
                onSubmit={async (
                  values: FormValues,
                  { setSubmitting }: FormikHelpers<FormValues>
                ) => {
                  setSubmitError('')

                  const {
                    profile_type,
                    profile_link,
                    profile_name,
                    oab,
                    oab_uf,
                    gender,
                    has_certificate,
                    schoolarity,
                    curriculum
                  } = values

                  try {
                    await api.put(`/comercial/people/${person.id}`, {
                      profile_type,
                      profile_link,
                      profile_name,
                      curriculum,
                      schoolarity,
                      has_certificate: has_certificate === 'Sim',
                      oab,
                      oab_uf,
                      gender,
                      register_finish: true
                    })

                    router.push('/painel')
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
                  handleChange,
                  setFieldValue
                }) => (
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
                              ? 'select-input mt-2 border-red-500'
                              : 'select-input mt-2'
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
                          Registro da OAB
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
                              ? 'select-input mt-2 border-red-500'
                              : 'select-input mt-2'
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
                            htmlFor="gender"
                          >
                            Gênero
                          </label>
                          <Field
                            id="gender"
                            name="gender"
                            type="gender"
                            as="select"
                            className={
                              errors.gender && touched.gender
                                ? 'select-input mt-2 border-red-500'
                                : 'select-input mt-2'
                            }
                          >
                            <option className="text-gray-100" disabled value="">
                              Selecione...
                            </option>
                            <option className="text-gray-100" value="Masculino">
                              Masculino
                            </option>
                            <option className="text-gray-100" value="Feminino">
                              Feminino
                            </option>
                          </Field>
                          {errors.gender && touched.gender && (
                            <ErrorMessage>{errors.gender}</ErrorMessage>
                          )}
                        </div>
                        <div className="flex-1">
                          <label
                            className="text-black-400 font-semibold"
                            htmlFor="schoolarity"
                          >
                            Escolaridade
                          </label>
                          <Field
                            id="schoolarity"
                            name="schoolarity"
                            type="schoolarity"
                            as="select"
                            className={
                              errors.schoolarity && touched.schoolarity
                                ? 'select-input mt-2 border-red-500'
                                : 'select-input mt-2'
                            }
                          >
                            <option className="text-gray-100" disabled value="">
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
                          {errors.schoolarity && touched.schoolarity && (
                            <ErrorMessage>{errors.schoolarity}</ErrorMessage>
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
                            errors.phone_type && touched.phone_type
                              ? 'select-input border-red-500'
                              : 'select-input'
                          }
                        >
                          <option className="text-gray-100" disabled value="">
                            Selecione o tipo
                          </option>
                          {phonesTypes.map(type => (
                            <option
                              className="text-gray-100"
                              key={type.id}
                              value={type.id}
                            >
                              {type.name}
                            </option>
                          ))}
                        </Field>
                        {errors.phone_type && touched.phone_type && (
                          <ErrorMessage>{errors.phone_type}</ErrorMessage>
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
                            errors.phone_ddd && touched.phone_ddd
                              ? 'input border-red-500'
                              : 'input'
                          }
                        />
                        {errors.phone_ddd && touched.phone_ddd && (
                          <ErrorMessage>{errors.phone_ddd}</ErrorMessage>
                        )}
                      </div>

                      <div className="flex-1 lg:mr-2">
                        <label htmlFor="phone_number" className="sr-only">
                          DDD
                        </label>
                        <Field
                          id="phone_number"
                          name="phone_number"
                          type="phone_number"
                          value={values.phone_number}
                          placeholder="Número"
                          className={
                            errors.phone_number && touched.phone_number
                              ? 'input border-red-500'
                              : 'input'
                          }
                        />
                        {errors.phone_number && touched.phone_number && (
                          <ErrorMessage>{errors.phone_number}</ErrorMessage>
                        )}
                      </div>
                    </div>

                    <div className="py-4 border-b-2 border-gray-100">
                      <h2 className="text-2xl font-semibold">
                        Cidades de atuação
                      </h2>
                    </div>

                    {msg && <ErrorMessageBox>{msg}</ErrorMessageBox>}

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
                            setMsg('')
                            setStateSelected(e.target.value)
                          }}
                          className={
                            errors.acting_state && touched.acting_state
                              ? 'select-input mt-2 border-red-500'
                              : 'select-input mt-2'
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
                        {errors.acting_state && touched.acting_state && (
                          <ErrorMessage>{errors.acting_state}</ErrorMessage>
                        )}
                      </div>
                      <div className="relative flex-1">
                        <label
                          className="text-black-400 font-semibold"
                          htmlFor="acting_city"
                        >
                          Cidade
                        </label>
                        <Field
                          id="acting_city"
                          name="acting_city"
                          type="text"
                          onChange={e => {
                            handleChange(e)
                            setMsg('')
                            if (e.target.value.length >= 3) {
                              loadCities(e.target.value)
                            }
                            if (e.target.value.length < 3) {
                              setCities([])
                            }
                          }}
                          autoComplete="off"
                          disabled={!values.acting_state}
                          placeholder={`${
                            !values.acting_state
                              ? 'Selecione o estado'
                              : 'Digite para buscar'
                          }`}
                          className="input mt-2"
                        />

                        {cities.length > 0 && (
                          <ul className="absolute divide-y-2 flex flex-col top-20 right-0 left-0 bg-white rounded-md shadow-lg z-10 max-h-60 overflow-auto">
                            {cities.map(city => (
                              <li
                                key={city.district_id}
                                className="hover:bg-gray-100 cursor-pointer"
                              >
                                <button
                                  type="button"
                                  className="focus:outline-none py-3 flex items-center justify-center w-full h-full"
                                  onClick={() => {
                                    handleAddCity(city)
                                    setFieldValue('acting_city', '')
                                    setCities([])
                                  }}
                                >
                                  {city.district_name === city.city_name
                                    ? city.city_name
                                    : `${city.district_name} - ${city.city_name}`}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}

                        {errors.acting_city && touched.acting_city && (
                          <ErrorMessage>{errors.acting_city}</ErrorMessage>
                        )}
                      </div>
                    </div>

                    {citiesData.length > 0 && (
                      <div>
                        {citiesData.map(city => (
                          <p
                            key={city.id}
                            className="mt-2 flex items-center bg-blue-500 py-1 px-2 mr-2 text-white rounded max-w-max"
                          >
                            {city.city.name} - {city.city.state.uf}
                            <button
                              type="button"
                              className="flex items-center ml-2 h-full outline-none focus:outline-none"
                              onClick={() => handleRemoveCity(city.id)}
                            >
                              <FaTimes />
                            </button>
                          </p>
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
                        {juridicalAreasOptions
                          .slice(0, juridicalAreasOptions.length / 3)
                          .map(option => {
                            const juridicalArea = juridicalAreas.find(
                              area => area.juridical_area_id === option.id
                            )

                            return (
                              <li key={option.name}>
                                <label className="inline-flex items-center mt-3">
                                  <Field
                                    className="h-5 w-5 text-blue-500 rounded"
                                    type="checkbox"
                                    name="juridical_areas"
                                    checked={formattedJuridicalAreas.includes(
                                      option.name
                                    )}
                                    onChange={e => {
                                      handleChange(e)

                                      if (!e.target.checked) {
                                        handleRemoveJuridicalArea(
                                          juridicalArea.id
                                        )
                                      } else {
                                        handleAddJuridicalArea(
                                          option.id,
                                          option.name
                                        )
                                      }
                                    }}
                                    value={option.name}
                                  />
                                  <span className="ml-2 text-gray-700">
                                    {option.name}
                                  </span>
                                </label>
                              </li>
                            )
                          })}
                      </ul>

                      <ul className="lg:w-1/3 w-full">
                        {juridicalAreasOptions
                          .slice(
                            juridicalAreasOptions.length / 3,
                            2 * (juridicalAreasOptions.length / 3)
                          )
                          .map(option => {
                            const juridicalArea = juridicalAreas.find(
                              area => area.juridical_area_id === option.id
                            )

                            return (
                              <li key={option.name}>
                                <label className="inline-flex items-center mt-3">
                                  <Field
                                    className="h-5 w-5 text-blue-500 rounded"
                                    type="checkbox"
                                    name="juridical_areas"
                                    checked={formattedJuridicalAreas.includes(
                                      option.name
                                    )}
                                    onChange={e => {
                                      handleChange(e)

                                      if (!e.target.checked) {
                                        handleRemoveJuridicalArea(
                                          juridicalArea.id
                                        )
                                      } else {
                                        handleAddJuridicalArea(
                                          option.id,
                                          option.name
                                        )
                                      }
                                    }}
                                    value={option.name}
                                  />
                                  <span className="ml-2 text-gray-700">
                                    {option.name}
                                  </span>
                                </label>
                              </li>
                            )
                          })}
                      </ul>

                      <ul className="lg:w-1/3 sm:w-1/2 w-full">
                        {juridicalAreasOptions
                          .slice(
                            2 * (juridicalAreasOptions.length / 3),
                            juridicalAreasOptions.length
                          )
                          .map(option => {
                            const juridicalArea = juridicalAreas.find(
                              area => area.juridical_area_id === option.id
                            )

                            return (
                              <li key={option.name}>
                                <label className="inline-flex items-center mt-3">
                                  <Field
                                    className="h-5 w-5 text-blue-500 rounded"
                                    type="checkbox"
                                    name="juridical_areas"
                                    checked={formattedJuridicalAreas.includes(
                                      option.name
                                    )}
                                    onChange={e => {
                                      handleChange(e)

                                      if (!e.target.checked) {
                                        handleRemoveJuridicalArea(
                                          juridicalArea.id
                                        )
                                      } else {
                                        handleAddJuridicalArea(
                                          option.id,
                                          option.name
                                        )
                                      }
                                    }}
                                    value={option.name}
                                  />
                                  <span className="ml-2 text-gray-700">
                                    {option.name}
                                  </span>
                                </label>
                              </li>
                            )
                          })}
                      </ul>
                    </div>

                    <div className="py-4 border-b-2 border-gray-100">
                      <h2 className="text-2xl font-semibold">
                        Instâncias de atuação
                      </h2>
                    </div>

                    <div
                      className="flex flex-wrap"
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      <ul className="w-full">
                        {legalInstancesOptions.length > 0 &&
                          legalInstancesOptions.map(option => {
                            const legalInstance = legalInstances.find(
                              instance =>
                                instance.legal_instance_id === option.id
                            )

                            return (
                              <li key={option.id}>
                                <label className="inline-flex items-center mt-3">
                                  <Field
                                    className="h-5 w-5 text-blue-500 rounded"
                                    type="checkbox"
                                    checked={formattedActingInstances.includes(
                                      option.name
                                    )}
                                    name="acting_instances"
                                    onChange={e => {
                                      handleChange(e)

                                      if (!e.target.checked) {
                                        handleRemoveLegalInstance(
                                          legalInstance.id
                                        )
                                      } else {
                                        handleAddLegalInstance(
                                          option.id,
                                          option.name
                                        )
                                      }
                                    }}
                                    value={option.name}
                                  />
                                  <span className="ml-2 text-gray-700">
                                    {option.name}
                                  </span>
                                </label>
                              </li>
                            )
                          })}
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
                            ? 'select-input mt-2 border-red-500'
                            : 'select-input mt-2'
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
                        id="curriculum"
                        name="curriculum"
                        rows={10}
                        className="block w-full border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="flex justify-center">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="mt-6 primary-btn w-40"
                      >
                        {isSubmitting ? <FaSpinner size={24} /> : 'CONTINUAR'}
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
