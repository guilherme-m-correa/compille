import { useState, useEffect } from 'react'

import { Form, Spinner } from 'react-bootstrap'
import { api } from '../hooks/fetch'

import { normalizeCnpj } from '../helpers'

function CompanyForm({ type, user_id, onFinish, person_id }) {
  const [loading, setLoading] = useState<any>(false)
  const [values, setValues] = useState<any>({
    commercial_name: '',
    social_name: '',
    cnpj: '',
    uf: '',
    position: ''
  })
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })

  const [alreadyExists, setAlreadyExists] = useState<any>(null)
  const [company, setCompany] = useState<any>({})

  const [positionOptions, setPositionOptions] = useState<any[]>([])
  const [states, setStates] = useState<any[]>([])

  useEffect(() => {
    async function loadStates() {
      try {
        const { data } = await api.get(`/comercial/states`)
        setStates(data)
      } catch (err) {
        //
      }
    }
    loadStates()
  }, [])

  useEffect(() => {
    async function loadPositions() {
      try {
        const { data } = await api.get(`/comercial/positions`)
        setPositionOptions(data)
      } catch (err) {
        //
      }
    }
    loadPositions()
  }, [])

  async function searchCompany() {
    try {
      const { data } = await api.get(
        `/comercial/companies/cnpj/${values.cnpj.replace(/[^\d]/g, '')}`
      )
      if (!data.cnpj) {
        setAlreadyExists(false)
      } else {
        setAlreadyExists(true)
        setCompany(data)
        if (type === 'Advogado') {
          await addPersonCompanie(data.id)
        }
      }
    } catch (err) {
      //
    }
  }

  async function addPersonCompanie(company_id) {
    try {
      const response = await api.post(
        `/comercial/personcompanies`,
        {
          person_id,
          company_id,
          position_id: type === 'Advogado' ? 9 : values.position,
          condition:
            type === 'Advogado'
              ? 'C'
              : values.position === 1 || values.position === 2
              ? 'S'
              : 'C'
        },
        {
          headers: {
            Authorization: process.env.REACT_APP_PUBLIC_TOKEN
          }
        }
      )
      if (response.status === 203) {
        setMsg({
          type: 'warning',
          text: response.data.msg
        })
      } else {
        setValues({
          commercial_name: '',
          social_name: '',
          cnpj: '',
          uf: '',
          position: ''
        })
        onFinish()
      }
    } catch (err) {
      //
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post(
        `/comercial/companies`,
        {
          user_id,
          commercial_name: values.commercial_name,
          social_name: values.social_name,
          cnpj: values.cnpj.replace(/[^\d]/g, ''),
          uf: values.uf,
          position: type === 'Advogado' ? 9 : values.position,
          condition:
            type === 'Advogado'
              ? 'C'
              : values.position === 1 || values.position === 2
              ? 'S'
              : 'C'
        },
        {
          headers: {
            Authorization: process.env.REACT_APP_PUBLIC_TOKEN
          }
        }
      )
      if (response.status === 203) {
        setMsg({
          type: 'warning',
          text: response.data.msg
        })
      } else {
        setCompany(response.data)
        await addPersonCompanie(response.data.id)
      }
    } catch (err) {
      if (err.response && err.response.status === 500) {
      } else {
      }
    }
    setLoading(false)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        {alreadyExists === null ? (
          <div className="mt-6 flex space-x-4 items-center">
            <label className="text-black-400 font-semibold" htmlFor="cnpj">
              CNPJ
            </label>
            <Form.Control
              name="cnpj"
              className="input"
              type="text"
              value={values.cnpj}
              onChange={e => {
                setValues({ ...values, cnpj: normalizeCnpj(e.target.value) })
                setMsg({
                  type: '',
                  text: ''
                })
              }}
              disabled={loading}
            />
            <button
              type="button"
              className="primary-btn"
              disabled={values.cnpj.length < 18 || loading}
              onClick={searchCompany}
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Buscar'}
            </button>
          </div>
        ) : (
          <>
            {alreadyExists === true && (
              <>
                <Form.Group className="mt-2 flex flex-col">
                  <Form.Label className="text-black-400 font-semibold">
                    Qual a sua relação com esta empresa?
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    className="mt-2 select-input w-full "
                    as="select"
                    style={{ width: '100%', maxWidth: '500px' }}
                    value={values.position}
                    onChange={e => {
                      setValues({ ...values, position: e.target.value })
                      setMsg({
                        type: '',
                        text: ''
                      })
                    }}
                    required={type === 'Empresa'}
                  >
                    <option disabled selected value="">
                      Selecione...
                    </option>
                    {positionOptions
                      .filter(position => position.id !== 9)
                      .map(position => (
                        <option key={position.id} value={position.id}>
                          {position.name}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
                {msg.type !== '' && msg.text !== '' && (
                  <h5 className={`text-${msg.type} text-center`}>{msg.text}</h5>
                )}
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => addPersonCompanie(company.id)}
                    disabled={values.position === ''}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      'Salvar'
                    )}
                  </button>
                </div>
              </>
            )}
            {alreadyExists === false && (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mt-2">
                      <Form.Label className="text-black-400 font-semibold">
                        Nome Fantasia
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        className="input"
                        type="text"
                        value={values.commercial_name}
                        onChange={e => {
                          setValues({
                            ...values,
                            commercial_name: e.target.value
                          })
                          setMsg({
                            type: '',
                            text: ''
                          })
                        }}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mt-2">
                      <Form.Label className="text-black-400 font-semibold">
                        Razão Social
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        className="input"
                        type="text"
                        value={values.social_name}
                        onChange={e => {
                          setValues({ ...values, social_name: e.target.value })
                          setMsg({
                            type: '',
                            text: ''
                          })
                        }}
                        required
                      />
                    </Form.Group>
                  </div>
                </div>
                <Form.Group className="mt-2">
                  <Form.Label className="text-black-400 font-semibold">
                    CNPJ
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    className="input"
                    type="text"
                    value={values.cnpj}
                    onChange={e => {
                      setValues({
                        ...values,
                        cnpj: normalizeCnpj(e.target.value)
                      })
                      setMsg({
                        type: '',
                        text: ''
                      })
                    }}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mt-2 flex flex-col">
                  <Form.Label className="text-black-400 font-semibold">
                    Estado
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    as="select"
                    className="select-input"
                    value={values.uf}
                    style={{ width: '100%', maxWidth: '500px' }}
                    onChange={e => {
                      setValues({ ...values, uf: e.target.value })
                      setMsg({
                        type: '',
                        text: ''
                      })
                    }}
                    required
                  >
                    <option disabled selected value="">
                      Selecione...
                    </option>
                    {states.map(state => (
                      <option key={state.uf} value={state.uf}>
                        {state.uf}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {type === 'Empresa' && (
                  <Form.Group className="mt-2 flex flex-col">
                    <Form.Label className="text-black-400 font-semibold">
                      Qual a sua relação com esta empresa?
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      className="select-input mt-2"
                      style={{ width: '100%', maxWidth: '500px' }}
                      value={values.position}
                      onChange={e => {
                        setValues({ ...values, position: e.target.value })
                        setMsg({
                          type: '',
                          text: ''
                        })
                      }}
                      required={type === 'Empresa'}
                    >
                      <option disabled selected value="">
                        Selecione...
                      </option>
                      {positionOptions
                        .filter(position => position.id !== 9)
                        .map(position => (
                          <option key={position.id} value={position.id}>
                            {position.name}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                )}
                {msg.type !== '' && msg.text !== '' && (
                  <h5 className={`text-${msg.type} text-center`}>{msg.text}</h5>
                )}
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="primary-btn"
                    disabled={
                      values.commercial_name === '' ||
                      values.social_name === '' ||
                      values.cnpj.length < 18 ||
                      values.uf.length === 0 ||
                      (type === 'Empresa' && values.position === '')
                    }
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      'Salvar'
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Form>
  )
}

export default CompanyForm
