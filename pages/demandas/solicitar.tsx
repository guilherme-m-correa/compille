import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaSearch, FaSpinner } from 'react-icons/fa'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage'
// import ErrorMessageBox from '../../components/ErrorMessageBox'
import { api } from '../../hooks/fetch'
import { normalizeDate } from '../../helpers'

interface Values {
  city: string
  area: string
  tipo_audiencia: string
  audience_local: string
  audience_date: string
  professional_type: string
  process_number: string
  certificate_required: string
  username: string
  email: string
}

interface CityData {
  uf_id: string
  city: string
}

interface GoogleResult {
  place_id: string
  formatted_address: string
  name: string
}

interface GooglePlacesResponse {
  results: GoogleResult[]
}

export default function CadastroAdvogadosCorrespondentesJuridicos() {
  const router = useRouter()
  const [cities, setCities] = useState<CityData[]>([])
  const [googleResponse, setGoogleResponse] = useState<GooglePlacesResponse>({
    results: []
  })
  const [cityFilter, setCityFilter] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
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
      if (!selectedCity) {
        return
      }

      setLoading(true)
      setToogleAudienceLocalSearch(true)

      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}+em+${selectedCity}&language=pt_br&key=AIzaSyDAjRSRcacpQCEROGB9ZvGztaBdMi7V6n4`
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
            <h2 className="mt-6 self-center text-center text-3xl font-extrabold text-blue-500">
              Encontre Advogados e Profissionais Jurídicos Qualificados
            </h2>
          </div>

          <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
            <Formik
              initialValues={{
                city: '',
                area: '',
                tipo_audiencia: '',
                audience_local: '',
                professional_type: '',
                process_number: '',
                certificate_required: '',
                username: '',
                email: '',
                audience_date: ''
              }}
              validationSchema={Yup.object({
                username: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                  .email('Endereço de email inválido')
                  .required('Email obrigátorio')
              })}
              onSubmit={async (
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
              ) => {
                const { username, email } = values

                try {
                  const { data } = await api.post('/authperm/register', {
                    username,
                    email,
                    type: 'E'
                  })

                  router.push({
                    pathname: '/verificar-email',
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
                            setSelectedCity(city)
                            setToogleCitiesSearch(false)
                          }

                          if (e.key === 'ArrowDown') {
                            city = formattedCities[cursor + 1]
                            setFieldValue('city', city, false)
                            setSelectedCity(city)
                            if (cursor < formattedCities.length) {
                              setCursor(state => state + 1)
                            }
                          }
                          if (e.key === 'ArrowUp') {
                            city = formattedCities[cursor - 1]
                            setFieldValue('city', city, false)
                            setSelectedCity(city)
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
                                setSelectedCity(city)
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
                    </div>
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="tipo_audiencia"
                      >
                        Tipo de audiência
                      </label>
                      <Field
                        as="select"
                        className="mt-2 select-input"
                        id="tipo_audiencia"
                        name="tipo_audiencia"
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
                    </div>
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="audience_local"
                      >
                        Local do serviço (fórum, tribunal, etc)
                      </label>
                      <div className="flex  mt-2">
                        <Field
                          id="audience_local"
                          name="audience_local"
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
                          onClick={() =>
                            handleSearchGoogle(values.audience_local)
                          }
                        >
                          <FaSearch className="text-white mr-2" /> PESQUISAR
                        </button>
                      </div>

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
                                  onClick={e => {
                                    setFieldValue(
                                      'audience_local',
                                      local.name,
                                      false
                                    )
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
                            htmlFor="audience_date"
                          >
                            Data da audiência
                          </label>
                          <Field
                            id="audience_date"
                            name="audience_date"
                            value={normalizeDate(values.audience_date)}
                            type="text"
                            className="appearance-none mt-2 input"
                          />
                        </div>

                        <div>
                          <label
                            className="text-gray-500 font-medium text-sm"
                            htmlFor="audience_hour"
                          >
                            Hora
                          </label>
                          <Field
                            as="select"
                            className="mt-2 select-input"
                            id="audience_hour"
                            name="audience_hour"
                          >
                            <option value="" disabled>
                              --
                            </option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">11</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                          </Field>
                        </div>

                        <div>
                          <label
                            className="text-gray-500 font-medium text-sm"
                            htmlFor="audience_minutes"
                          >
                            Minutos
                          </label>
                          <Field
                            as="select"
                            className="mt-2 select-input"
                            id="audience_minutes"
                            name="audience_minutes"
                          >
                            <option value="" disabled>
                              --
                            </option>
                            <option value="05">05</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                            <option value="45">45</option>
                            <option value="50">50</option>
                            <option value="55">55</option>
                          </Field>
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
                    </div>
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="process_type"
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
                    </div>
                    <div className="mt-4">
                      <label
                        className="text-gray-500 font-medium text-sm"
                        htmlFor="process_number"
                      >
                        Observações
                      </label>
                      <Field
                        id="process_number"
                        name="process_number"
                        as="textarea"
                        placeholder="Escreva aqui outras informações relevantes..."
                        className="mt-2 h-40 input"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link href="/profissionais">
                      <a>
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="primary-btn w-full"
                        >
                          CONTINUAR
                        </button>
                      </a>
                    </Link>
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
