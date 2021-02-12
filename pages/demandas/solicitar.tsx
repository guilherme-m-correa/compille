import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
// import Link from 'next/link'
import { FaSearch, FaSpinner } from 'react-icons/fa'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage'
// import ErrorMessageBox from '../../components/ErrorMessageBox'
import { api } from '../../hooks/fetch'
import { useAudience } from '../../hooks/audience'
import { useAuth } from '../../hooks/auth'
import { normalizeDate, normalizeHour } from '../../helpers'

interface Values {
  city: string
  area: string
  type: string
  local: string
  date: string
  hour_start: string
  hour_end: string
  process_number: string
  process_type: string
  certificate_required: string
  observations: string
}

interface CityData {
  uf_id: string
  city: string
}

interface GoogleResult {
  place_id: string
  formatted_address: string
  name: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
    viewport: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    }
  }
}

interface GooglePlacesResponse {
  results: GoogleResult[]
}

export default function CadastroAdvogadosCorrespondentesJuridicos() {
  const { audience, updateAudience, reset } = useAudience()
  const { user } = useAuth()
  const router = useRouter()
  const [cities, setCities] = useState<CityData[]>([])
  const [googleResponse, setGoogleResponse] = useState<GooglePlacesResponse>({
    results: []
  })
  const [cityFilter, setCityFilter] = useState('')
  const [toogleCitiesSearch, setToogleCitiesSearch] = useState(false)
  const [toogleAudienceLocalSearch, setToogleAudienceLocalSearch] = useState(
    false
  )
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)
  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get<CityData[]>(
          '/comercial/ibgedistricts/cities'
        )

        setCities(data)
      } catch (error) {
        console.log(error)
      }
    }

    loadData()
  }, [])

  async function handleSearchGoogle(address: string) {
    try {
      if (!audience.city) {
        return
      }

      setLoading(true)
      setToogleAudienceLocalSearch(true)

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/google-places`,
        {
          params: {
            address,
            city: audience.city
          }
        }
      )

      setGoogleResponse(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const formattedCities = useMemo(() => {
    return cities
      .map(cityData => {
        const { uf_id, city } = cityData

        switch (uf_id) {
          case '12':
            return `${city}, AC`
          case '27':
            return `${city}, AL`
          case '16':
            return `${city}, AP`
          case '13':
            return `${city}, AM`
          case '29':
            return `${city}, BA`
          case '23':
            return `${city}, CE`
          case '53':
            return `${city}, DF`
          case '32':
            return `${city}, ES`
          case '52':
            return `${city}, GO`
          case '21':
            return `${city}, MA`
          case '51':
            return `${city}, MT`
          case '50':
            return `${city}, MS`
          case '31':
            return `${city}, MG`
          case '15':
            return `${city}, PA`
          case '25':
            return `${city}, PB`
          case '41':
            return `${city}, PR`
          case '26':
            return `${city}, PE`
          case '22':
            return `${city}, PI`
          case '33':
            return `${city}, RJ`
          case '24':
            return `${city}, RN`
          case '43':
            return `${city}, RS`
          case '11':
            return `${city}, RO`
          case '14':
            return `${city}, RR`
          case '42':
            return `${city}, SC`
          case '35':
            return `${city}, SP`
          case '28':
            return `${city}, SE`
          case '17':
            return `${city}, TO`
          default:
            throw new Error('Unhandled UF')
        }
      })
      .filter(city => {
        const regex = new RegExp(cityFilter, 'gi')
        return regex.test(city)
      })
  }, [cities, cityFilter])

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div>
            <h2 className="mb-6 text-center text-3xl font-extrabold text-blue-500">
              Solicitar Audiência
            </h2>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 bg-white shadow-lg rounded-md p-6">
            <Formik
              initialValues={{
                city: audience?.city ? audience?.city : '',
                area: audience?.area ? audience?.area : '',
                type: audience?.type ? audience?.type : '',
                local: audience?.local ? audience?.local : '',
                process_number: audience?.process_number
                  ? audience?.process_number
                  : '',
                process_type: audience?.process_type
                  ? audience?.process_type
                  : '',
                certificate_required: audience?.certificate_required
                  ? audience?.certificate_required
                  : '',
                date: audience?.date ? audience?.date : '',
                hour_start: audience?.hour_start ? audience?.hour_start : '',
                hour_end: audience?.hour_end ? audience?.hour_end : '',
                observations: audience?.observations
                  ? audience?.observations
                  : ''
              }}
              validationSchema={Yup.object({
                city: Yup.string().required('Cidade obrigatória'),
                area: Yup.string().required('Área obrigatória'),
                type: Yup.string().required('Tipo obrigatório'),
                local: Yup.string().required('Local obrigatório'),
                date: Yup.string().required('Data obrigatória'),
                hour_start: Yup.string().required(
                  'Horário inicial obrigatório'
                ),
                hour_end: Yup.string().required('Horário final obrigatório'),
                process_number: Yup.string(),
                process_type: Yup.string(),
                certificate_required: Yup.string(),
                observations: Yup.string()
              })}
              onSubmit={async (
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
              ) => {
                try {
                  Object.assign(audience, values)

                  updateAudience(audience)

                  if (!audience.lawyer) {
                    router.push('/profissionais')
                  }

                  const {
                    date,
                    hour_start: hour_start_string,
                    hour_end: hour_end_string
                  } = values

                  const [day, month, year] = date.split('/')

                  const [hour_start, minutes_start] = hour_start_string
                    .replace(/\s/g, '')
                    .split(':')
                  const [hour_end, minutes_end] = hour_end_string
                    .replace(/\s/g, '')
                    .split(':')

                  const start_date = new Date(
                    Number(year),
                    Number(month) + 1,
                    Number(day),
                    Number(hour_start),
                    Number(minutes_start),
                    0,
                    0
                  )
                  const end_date = new Date(
                    Number(year),
                    Number(month) + 1,
                    Number(day),
                    Number(hour_end),
                    Number(minutes_end),
                    0,
                    0
                  )

                  await api.post(
                    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/appointments`,
                    {
                      correspondent_id: audience.lawyer.id,
                      requester_id: user.id,
                      forum_address: audience.forum.formatted_address,
                      forum_name: audience.forum.name,
                      forum_lat: audience.forum.geometry.location.lat,
                      forum_lng: audience.forum.geometry.location.lng,
                      start_date,
                      end_date,
                      area: audience.area,
                      type: audience.type,
                      process_type: audience.process_type,
                      process_number: audience.process_number,
                      observations: audience.observations
                    }
                  )

                  reset()
                  router.push('/painel')
                } catch (err) {
                  console.log(err)
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
              {({
                values,
                errors,
                touched,
                isSubmitting,
                handleChange,
                handleBlur,
                setFieldValue
              }) => (
                <Form className="mt-8 space-y-8">
                  <div>
                    {audience?.lawyer && (
                      <div>
                        <span className="text-gray-500 font-medium text-sm">
                          Enviar solicitação para:
                        </span>
                        <div className="mt-2 flex space-x-4 items-center">
                          <a
                            href={`/p/${audience.lawyer.profile_link}`}
                            target="_blank"
                            rel="noreferrer"
                            className="h-16 w-16 rounded-full overflow-hidden bg-gray-100"
                          >
                            {audience.lawyer.avatar_url ? (
                              <img
                                className="h-full w-full"
                                src={audience.lawyer.avatar_url}
                                alt="Foto do perfil"
                              />
                            ) : (
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            )}
                          </a>
                          <div>
                            <a
                              href={`/p/${audience.lawyer.profile_link}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-500 hover:text-blue-700 font-bold"
                            >
                              {audience.lawyer.profile_name}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="city"
                      >
                        Em qual cidade será realizado a audiência?
                      </label>
                      <Field
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="off"
                        onBlur={e => {
                          handleBlur(e)
                        }}
                        onChange={e => {
                          handleChange(e)
                          if (e.target.value.length > 2) {
                            setCityFilter(e.target.value)
                            setToogleCitiesSearch(true)
                            setCursor(0)
                          } else {
                            setToogleCitiesSearch(false)
                          }
                        }}
                        onKeyDown={e => {
                          let city = formattedCities[cursor]

                          if (e.key === 'Enter') {
                            setFieldValue('city', city, false)
                            updateAudience({ ...audience, city })
                            setToogleCitiesSearch(false)
                          }

                          if (e.key === 'ArrowDown') {
                            city = formattedCities[cursor + 1]
                            setFieldValue('city', city, false)
                            updateAudience({ ...audience, city })
                            if (cursor < formattedCities.length) {
                              setCursor(state => state + 1)
                            }
                          }
                          if (e.key === 'ArrowUp') {
                            city = formattedCities[cursor - 1]
                            setFieldValue('city', city, false)
                            updateAudience({ ...audience, city })
                            if (cursor > 0) {
                              setCursor(state => state - 1)
                            }
                          }
                        }}
                        className={
                          errors.city && touched.city
                            ? 'mt-2 input border-red-500'
                            : 'mt-2 input'
                        }
                        placeholder="Digite a cidade para buscar"
                      />
                    </div>
                    {errors.city && touched.city && (
                      <ErrorMessage>{errors.city}</ErrorMessage>
                    )}
                    {toogleCitiesSearch && (
                      <ul className="mt-1 bg-white rounded-md shadow-lg z-10 max-h-60 overflow-auto">
                        {formattedCities.map((city, i) => (
                          <li
                            className={`hover:bg-gray-100 overflow-auto p-2 ${
                              cursor === i && `bg-gray-100`
                            }`}
                            key={city}
                          >
                            <button
                              className="w-full h-full text-left outline-none focus:outline-none"
                              onClick={e => {
                                setFieldValue('city', city, false)
                                updateAudience({ ...audience, city })
                                setToogleCitiesSearch(false)
                              }}
                              type="button"
                            >
                              {city}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="area"
                      >
                        Área
                      </label>
                      <Field
                        as="select"
                        className="mt-2 select-input"
                        id="area"
                        name="area"
                      >
                        <option value="" disabled>
                          Selecione...
                        </option>
                        <option value="Cívil">Cívil</option>
                        <option value="Criminal">Criminal</option>
                        <option value="Trabalhista">Trabalhista</option>
                        <option value="Tributária">Tributária</option>
                      </Field>
                      {errors.area && touched.area && (
                        <ErrorMessage>{errors.area}</ErrorMessage>
                      )}
                    </div>
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="type"
                      >
                        Tipo de audiência
                      </label>
                      <Field
                        as="select"
                        className="mt-2 select-input"
                        id="type"
                        name="type"
                      >
                        <option value="" disabled>
                          Selecione...
                        </option>
                        <option value="Conciliação">Conciliação</option>
                        <option value="Inicial">Inicial</option>
                        <option value="Instrução">Instrução</option>
                        <option value="Instrução e Julgamento">
                          Instrução e Julgamento
                        </option>
                        <option value="Julgamento">Julgamento</option>
                        <option value="Una">Una</option>
                      </Field>
                      {errors.type && touched.type && (
                        <ErrorMessage>{errors.type}</ErrorMessage>
                      )}
                    </div>
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="local"
                      >
                        Local do serviço (fórum, tribunal, etc)
                      </label>
                      <div className="flex mt-2">
                        <Field
                          id="local"
                          name="local"
                          type="text"
                          className="input"
                          placeholder={
                            values.city
                              ? 'Exemplo: Forúm Guilherme Corrêa'
                              : 'Primeiro selecione uma cidade'
                          }
                        />

                        <button
                          type="button"
                          className="flex justify-center items-center primary-btn focus:border-none focus:outline-none rounded-none"
                          onClick={() => handleSearchGoogle(values.local)}
                        >
                          <FaSearch className="text-white mr-2" /> PESQUISAR
                        </button>
                      </div>

                      {errors.local && touched.local && (
                        <ErrorMessage>{errors.local}</ErrorMessage>
                      )}

                      {toogleAudienceLocalSearch && (
                        <ul className="mt-1 bg-gray-100 rounded-b-md shadow-lg z-10 max-h-60 overflow-auto divide-y-2 px-2">
                          {loading && (
                            <div className="flex flex-col text-blue-500 space-y-4 h-60 justify-center items-center">
                              <FaSpinner className="animate-spin h-8 w-8" />
                              <span className="font-semibold tracking-wide">
                                Carregando...
                              </span>
                            </div>
                          )}

                          {googleResponse.results.length > 0 ? (
                            googleResponse.results.map(local => (
                              <li className="p-2" key={local.place_id}>
                                <button
                                  className="w-full flex h-full  items-center justify-between outline-none focus:outline-none"
                                  onClick={() => {
                                    updateAudience({
                                      ...audience,
                                      forum: local
                                    })
                                    setFieldValue('local', local.name, false)
                                    setToogleAudienceLocalSearch(false)
                                  }}
                                  type="button"
                                >
                                  <div className="flex text-left flex-col">
                                    <span className="text-blue-500 hover:text-blue-700 text-sm font-semibold">
                                      {local.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {local.formatted_address}
                                    </span>
                                  </div>
                                  <span className="text-blue-500 hover:text-blue-700 font-semibold tracking-wide">
                                    SELECIONAR
                                  </span>
                                </button>
                              </li>
                            ))
                          ) : (
                            <div className="flex flex-col text-blue-500 space-y-4 h-60 justify-center items-center">
                              <span className="font-semibold tracking-wide">
                                Nenhum resultado encontrado
                              </span>
                            </div>
                          )}
                        </ul>
                      )}
                    </div>
                    <div className="mt-4">
                      <div className="grid grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-3 lg:grid-rows-1">
                        <div>
                          <label
                            className="text-gray-500 font-medium text-sm"
                            htmlFor="date"
                          >
                            Data da audiência
                          </label>
                          <Field
                            id="date"
                            name="date"
                            value={normalizeDate(values.date)}
                            type="text"
                            className="appearance-none mt-2 input"
                          />
                          {errors.date && touched.date && (
                            <ErrorMessage>{errors.date}</ErrorMessage>
                          )}
                        </div>

                        <div>
                          <label
                            className="text-gray-500 font-medium text-sm"
                            htmlFor="hour"
                          >
                            Horário de ínício
                          </label>
                          <Field
                            className="mt-2 input"
                            id="hour"
                            placeholder="hora : minutos"
                            name="hour_start"
                            value={normalizeHour(values.hour_start)}
                          />
                          {errors.hour_start && touched.hour_start && (
                            <ErrorMessage>{errors.hour_start}</ErrorMessage>
                          )}
                        </div>

                        <div>
                          <label
                            className="text-gray-500 font-medium text-sm"
                            htmlFor="minutes"
                          >
                            Horário de término
                          </label>
                          <Field
                            className="mt-2 input"
                            id="hour_end"
                            placeholder="hora : minutos"
                            name="hour_end"
                            value={normalizeHour(values.hour_end)}
                          />
                          {errors.hour_end && touched.hour_end && (
                            <ErrorMessage>{errors.hour_end}</ErrorMessage>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="process_type"
                      >
                        Tipo de processo (opcional)
                      </label>
                      <Field
                        as="select"
                        className="mt-2 select-input"
                        id="process_type"
                        name="process_type"
                      >
                        <option value="" disabled>
                          Selecione...
                        </option>
                        <option value="Eletrônico">Eletrônico</option>
                        <option value="Físico">Físico</option>
                      </Field>
                      {errors.process_type && touched.process_type && (
                        <ErrorMessage>{errors.process_type}</ErrorMessage>
                      )}
                    </div>
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="certificate_required"
                      >
                        Profissional com certificado digital? (opcional)
                      </label>
                      <Field
                        as="select"
                        className="mt-2 select-input"
                        id="certificate_required"
                        name="certificate_required"
                      >
                        <option value="" disabled>
                          Indiferente
                        </option>
                        <option value="Não">Não</option>
                        <option value="Sim">Sim</option>
                      </Field>
                      {errors.certificate_required &&
                        touched.certificate_required && (
                          <ErrorMessage>
                            {errors.certificate_required}
                          </ErrorMessage>
                        )}
                    </div>
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="process_number"
                      >
                        Número do processo (será exibido somente ao profissional
                        contratado)
                      </label>
                      <Field
                        id="process_number"
                        name="process_number"
                        type="text"
                        className="mt-2 input"
                      />
                      {errors.process_number && touched.process_number && (
                        <ErrorMessage>{errors.process_number}</ErrorMessage>
                      )}
                    </div>
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="observations"
                      >
                        Observações
                      </label>
                      <Field
                        id="observations"
                        name="observations"
                        as="textarea"
                        placeholder="Escreva aqui outras informações relevantes..."
                        className="mt-2 h-40 input"
                      />
                    </div>
                    {errors.observations && touched.observations && (
                      <ErrorMessage>{errors.observations}</ErrorMessage>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="primary-btn w-full"
                    >
                      {audience?.lawyer ? 'CONFIRMAR SOLICITAÇÃO' : 'CONTINUAR'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}
