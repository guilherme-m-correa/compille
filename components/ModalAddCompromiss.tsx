import { useState, useEffect, useMemo } from 'react'
import * as Yup from 'yup'
import { Formik, Form as FormikForm, Field, FormikHelpers } from 'formik'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { FaSearch, FaSpinner } from 'react-icons/fa'
import { isBefore } from 'date-fns'
import { IoIosReturnRight } from 'react-icons/io'
import axios from 'axios'
import Link from 'next/link'
import { api } from '../hooks/fetch'
import { useAuth } from '../hooks/auth'
import { useAudience } from '../hooks/audience'
import ErrorMessage from './ErrorMessage'
import ModalAddForun from './ModalAddForun'
import ModalAddVara from './ModalAddVara'
import ErrorMessageBox from './ErrorMessageBox'
import { normalizeDate, normalizeHour, parseDateString } from '../helpers'

interface Values {
  city: string
  local: string
  date: string
  hour_start: string
  hour_end: string
  observations: string
}

interface Values2 {
  start_date: string
  end_date: string
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

function ModalAddCompromiss({ open, setOpen, onAdd }) {
  const [type, setType] = useState(null)
  const [dataInicial, setDataInicial] = useState<string | Date>('')
  const [dataFinal, setDataFinal] = useState<string | Date>('')
  const [descricao, setDescricao] = useState('')
  const [typesOptions, setTypesOptions] = useState([] as any[])
  const [errorMessage, setErrorMessage] = useState('')

  const [forumValue, setForumValue] = useState('')
  const [forumSelected, setForumSelected] = useState({} as any)
  const [forumOptions, setForumOptions] = useState([] as any[])

  const [forumAdd, setForumAdd] = useState(false)

  const [varaSelected, setVaraSelected] = useState({} as any)
  const [varaOptions, setVaraOptions] = useState([] as any[])

  const [varaAdd, setVaraAdd] = useState(false)

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
  const [cities, setCities] = useState<CityData[]>([])
  const { audience, updateAudience, reset } = useAudience()
  const { user } = useAuth()

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

  function resetForm() {
    setLoading(false)
    setType(null)
    reset()
    setOpen(false)
  }

  // async function handleSubmit() {
  //   setLoading(true)
  //   try {
  //     setErrorMessage('')

  //     if (!type || type === 0) {
  //       setErrorMessage('Selecione um tipo')
  //       return
  //     }

  //     if (dataInicial === '') {
  //       setErrorMessage('Selecione a data inicial')
  //       return
  //     }

  //     if (dataFinal === '') {
  //       setErrorMessage('Selecione a data final')
  //       return
  //     }
  //     if (
  //       dataInicial !== '' &&
  //       dataFinal !== '' &&
  //       isBefore(new Date(dataFinal), new Date(dataInicial))
  //     ) {
  //       setErrorMessage('Data final não pode ser depois da data inicial')
  //       return
  //     }

  //     if (
  //       (type === 1 || type === 2) &&
  //       (Object.keys(forumSelected).length === 0 ||
  //         Object.keys(varaSelected).length === 0)
  //     ) {
  //       setErrorMessage('Selecione um fórum e uma vara')
  //       return
  //     }

  //     const { data } = await api.post(`/comercial/appointments`, {
  //       correspondent_id: user.id,
  //       compromisse_type_id: type,
  //       start_date: dataInicial,
  //       end_date: dataFinal,
  //       descricao: descricao || null,
  //       id_forum: forumSelected.id,
  //       forum_name: forumSelected.descricao,
  //       forum_address: `${forumSelected.street}, ${
  //         forumSelected.street_number
  //       } - ${forumSelected.street_complement || '-'}, ${
  //         forumSelected.neighbouhood
  //       }, ${forumSelected.city} - ${forumSelected.uf}, ${
  //         forumSelected.zip_code
  //       }`
  //     })
  //     const typeOpt = typesOptions.find(e => e.id === type)
  //     onAdd({
  //       ...data,
  //       type: { descricao: typeOpt.descricao, cor: typeOpt.cor }
  //     })
  //     resetForm()
  //   } catch (err) {
  //     console.log(err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    async function loadTypes() {
      try {
        const { data } = await api.get(`/comercial/appointment-types`)
        console.log(data)
        setTypesOptions(data.filter(d => d.type === user.type))
      } catch (error) {
        console.log(error)
      }
    }
    loadTypes()
  }, [])

  return (
    <>
      <ModalAddForun
        open={forumAdd}
        setOpen={() => setForumAdd(false)}
        onAdd={e => {
          setForumSelected(e)
          setForumValue(e.descricao)
        }}
      />
      <ModalAddVara
        open={varaAdd}
        setOpen={() => setVaraAdd(false)}
        onAdd={e => {
          setVaraOptions([...varaOptions, e])
          setVaraSelected(e)
        }}
        forun_id={forumSelected.id}
      />
      <Modal
        show={open}
        onHide={resetForm}
        style={{ opacity: forumAdd || varaAdd ? '0' : '1' }}
      >
        <Modal.Header closeButton>Adicionar Compromisso</Modal.Header>
        <Modal.Body>
          <div className="my-2">
            {errorMessage && <ErrorMessageBox>{errorMessage}</ErrorMessageBox>}
          </div>
          <Form.Group>
            <Form.Label className="text-gray-500 font-medium text-sm">
              Tipo de Compromisso
            </Form.Label>
            <Form.Control
              as="select"
              className="select-input"
              value={type}
              onChange={e => setType(Number(e.target.value))}
            >
              <option disabled selected value="">
                Selecione...
              </option>
              {typesOptions.map(o => (
                <option value={o.id} key={o.id}>
                  {o.description}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {(type === 1 || type === 2) && (
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
                area: Yup.string(),
                type: Yup.string(),
                local: Yup.string().required('Local obrigatório'),
                date: Yup.date()
                  .typeError('Data inválida')
                  .transform(parseDateString)
                  .min(new Date(), 'Data deve ser maior que hoje')
                  .required('Data obrigátoria'),
                hour_start: Yup.string().required(
                  'Horário inicial obrigatório'
                ),
                hour_end: Yup.string().required('Horário final obrigatório'),
                process_number: Yup.string(),
                observations: Yup.string()
              })}
              onSubmit={async (
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
              ) => {
                try {
                  Object.assign(audience, values)

                  updateAudience(audience)

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
                    Number(month) - 1,
                    Number(day),
                    Number(hour_start),
                    Number(minutes_start),
                    0,
                    0
                  )
                  const end_date = new Date(
                    Number(year),
                    Number(month) - 1,
                    Number(day),
                    Number(hour_end),
                    Number(minutes_end),
                    0,
                    0
                  )

                  const { data } = await api.post(
                    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/appointments/agenda`,
                    {
                      correspondent_id: user.id,
                      requester_id: user.id,
                      forum_address: audience.forum.formatted_address,
                      forum_name: audience.forum.name,
                      forum_lat: audience.forum.geometry.location.lat,
                      forum_lng: audience.forum.geometry.location.lng,
                      start_date,
                      end_date,
                      observations: audience.observations
                    }
                  )

                  reset()
                  resetForm()
                  onAdd(data)
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
                <FormikForm className="mt-8 space-y-8">
                  <div>
                    <div>
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

                  <div className="mt-6 flex justify-center items-center space-x-4">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="primary-btn"
                    >
                      SALVAR
                    </button>
                    <button
                      type="button"
                      className="secondary-btn border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 hover:bg-gray-100hover:bg-gray-100"
                      onClick={resetForm}
                    >
                      CANCELAR
                    </button>
                  </div>
                </FormikForm>
              )}
            </Formik>
          )}

          {type === 3 && (
            <Formik
              initialValues={{
                start_date: '',
                end_date: '',
                hour_end: '',
                observations: ''
              }}
              validationSchema={Yup.object({
                start_date: Yup.date()
                  .typeError('Data inválida')
                  .transform(parseDateString)
                  .min(new Date(), 'Data deve ser maior que hoje')
                  .required('Data obrigátoria'),
                end_date: Yup.date()
                  .typeError('Data inválida')
                  .transform(parseDateString)
                  .min(new Date(), 'Data deve ser maior que hoje')
                  .required('Data obrigátoria'),
                observations: Yup.string()
              })}
              onSubmit={async (
                values: Values2,
                { setSubmitting }: FormikHelpers<Values2>
              ) => {
                try {
                  const { start_date: date1, end_date: date2 } = values
                  console.log(
                    '🚀 ~ file: ModalAddCompromiss.tsx ~ line 775 ~ ModalAddCompromiss ~ values',
                    values
                  )

                  const [day, month, year] = date1.split('/')

                  const [day2, month2, year2] = date2.split('/')

                  const start_date = new Date(
                    Number(year),
                    Number(month) - 1,
                    Number(day),
                    0,
                    0,
                    0,
                    0
                  )
                  const end_date = new Date(
                    Number(year2),
                    Number(month2) - 1,
                    Number(day2),
                    0,
                    0,
                    0,
                    0
                  )

                  const { data } = await api.post(
                    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/appointments/agenda`,
                    {
                      correspondent_id: user.id,
                      requester_id: user.id,
                      start_date,
                      end_date,
                      type: 'personal',
                      observations: values.observations
                    }
                  )

                  reset()
                  resetForm()
                  onAdd(data)
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
              {({ values, errors, touched, isSubmitting }) => (
                <FormikForm className="mt-8 space-y-8">
                  <div>
                    <label
                      className="text-gray-500 font-medium text-sm"
                      htmlFor="date"
                    >
                      Data da início
                    </label>
                    <Field
                      id="start_date"
                      name="start_date"
                      value={normalizeDate(values.start_date)}
                      type="text"
                      className="appearance-none mt-2 input"
                    />
                    {errors.start_date && touched.start_date && (
                      <ErrorMessage>{errors.start_date}</ErrorMessage>
                    )}
                  </div>
                  <div className="mt-4">
                    <label
                      className="text-gray-500 font-medium text-sm"
                      htmlFor="date"
                    >
                      Data da término
                    </label>
                    <Field
                      id="end_date"
                      name="end_date"
                      value={normalizeDate(values.end_date)}
                      type="text"
                      className="appearance-none mt-2 input"
                    />
                    {errors.end_date && touched.end_date && (
                      <ErrorMessage>{errors.end_date}</ErrorMessage>
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

                  <div className="mt-6 flex justify-center items-center space-x-4">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="primary-btn"
                    >
                      SALVAR
                    </button>
                    <button
                      type="button"
                      className="secondary-btn border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 hover:bg-gray-100hover:bg-gray-100"
                      onClick={resetForm}
                    >
                      CANCELAR
                    </button>
                  </div>
                </FormikForm>
              )}
            </Formik>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalAddCompromiss
