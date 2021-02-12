import { useState, useEffect } from 'react'

import { Form } from 'react-bootstrap'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'
import { api } from '../hooks/fetch'
import { Container } from './styles'

import { normalizeCep } from '../helpers'

function Address({ person_id }) {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [states] = useState<any[]>([
    { cod: 11, name: 'Rondônia', uf: 'RO' },
    { cod: 12, name: 'Acre', uf: 'AC' },
    { cod: 13, name: 'Amazonas', uf: 'AM' },
    { cod: 14, name: 'Roraima', uf: 'RR' },
    { cod: 15, name: 'Pará', uf: 'PA' },
    { cod: 16, name: 'Amapá', uf: 'AP' },
    { cod: 17, name: 'Tocantins', uf: 'TO' },
    { cod: 21, name: 'Maranhão', uf: 'MA' },
    { cod: 22, name: 'Piauí', uf: 'PI' },
    { cod: 23, name: 'Ceará', uf: 'CE' },
    { cod: 24, name: 'Rio Grande do Norte', uf: 'RN' },
    { cod: 25, name: 'Paraíba', uf: 'PB' },
    { cod: 26, name: 'Pernambuco', uf: 'PE' },
    { cod: 27, name: 'Alagoas', uf: 'AL' },
    { cod: 28, name: 'Sergipe', uf: 'SE' },
    { cod: 29, name: 'Bahia', uf: 'BA' },
    { cod: 31, name: 'Minas Gerais', uf: 'MG' },
    { cod: 32, name: 'Espírito Santo', uf: 'ES' },
    { cod: 33, name: 'Rio de Janeiro', uf: 'RJ' },
    { cod: 35, name: 'São Paulo', uf: 'SP' },
    { cod: 41, name: 'Paraná', uf: 'PR' },
    { cod: 42, name: 'Santa Catarina', uf: 'SC' },
    { cod: 43, name: 'Rio Grande do Sul', uf: 'RS' },
    { cod: 50, name: 'Mato Grosso do Sul', uf: 'MS' },
    { cod: 51, name: 'Mato Grosso', uf: 'MT' },
    { cod: 52, name: 'Goiás', uf: 'GO' },
    { cod: 53, name: 'Distrito Federal', uf: 'DF' }
  ])

  const [addresses, setAddresses] = useState<any[]>([])

  useEffect(() => {
    async function loadAddresses() {
      setLoading(true)
      try {
        const { data } = await api.get(
          `/comercial/personaddresses/${person_id}`
        )
        setAddresses(data)
      } catch (err) {
        //
      }
      setLoading(false)
    }
    loadAddresses()
  }, [person_id])

  const [addAddress, setAddAddress] = useState(false)
  const [dataAddress, setDataAddress] = useState<any>({
    label: '',
    street: '',
    street_number: '',
    street_complement: '',
    zip_code: '',
    neighborhood: '',
    city: '',
    ibge: '',
    state: '',
    is_billing_address: false,
    is_main_address: false
  })

  function resetForm() {
    setDataAddress({
      label: '',
      street: '',
      street_number: '',
      street_complement: '',
      zip_code: '',
      neighborhood: '',
      city: '',
      ibge: '',
      is_billing_address: false,
      is_main_address: false
    })
    setAddAddress(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMsg('')
    setLoading(true)
    try {
      const { data, status } = await api.post(`/comercial/personaddresses`, {
        person_id,
        label: dataAddress.label,
        zip_code: dataAddress.zip_code.replace(/[^\d]/g, ''),
        street: dataAddress.street,
        street_number: dataAddress.street_number,
        street_complement: dataAddress.street_complement,
        neighborhood: dataAddress.neighborhood,
        city: dataAddress.city,
        ibge: dataAddress.ibge,
        uf: dataAddress.state,
        latitude: 0,
        longitude: 0,
        is_billing_address: dataAddress.is_billing_address,
        is_main_address: dataAddress.is_main_address
      })
      if (status === 203) {
        setMsg(data.msg)
      } else {
        resetForm()
        setAddresses([...addresses, { ...data }])
      }
    } catch (err) {
      //
    }
    setLoading(false)
  }

  async function handleCep() {
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${dataAddress.zip_code.replace(
          /[^\d]/g,
          ''
        )}/json/`
      )
      setDataAddress({
        ...dataAddress,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
        street: data.logradouro,
        ibge: data.ibge
      })
      document.getElementById('number_form').focus()
    } catch (err) {
      setDataAddress({
        ...dataAddress,
        neighborhood: '',
        city: '',
        state: '',
        street: '',
        ibge: ''
      })
    }
  }

  async function handleDelete(id) {
    setLoading(true)
    try {
      await api.delete(`/comercial/personaddresses/${id}`)
      setAddresses(addresses.filter(p => p.id !== id))
    } catch (err) {
      //
    }
    setLoading(false)
  }

  return (
    <>
      {!addAddress && (
        <button
          type="button"
          className="primary-btn max-w-max mb-6"
          onClick={() => setAddAddress(true)}
        >
          ADICIONAR NOVO ENDEREÇO
        </button>
      )}
      <Container>
        <div id="add_item">
          {addAddress && (
            <Form>
              {msg !== '' && <h5 className="text-danger text-center">{msg}</h5>}
              <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-4">
                <div className="col-span-4">
                  <Form.Group>
                    <Form.Label className="text-black-400 font-semibold">
                      Rótulo
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      className="input"
                      disabled={loading}
                      type="text"
                      value={dataAddress.label}
                      onChange={e =>
                        setDataAddress({
                          ...dataAddress,
                          label: e.target.value
                        })
                      }
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-span-1">
                  <Form.Group>
                    <Form.Label className="text-black-400 font-semibold">
                      CEP
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      className="input"
                      disabled={loading}
                      value={dataAddress.zip_code}
                      type="text"
                      onChange={e =>
                        setDataAddress({
                          ...dataAddress,
                          zip_code: normalizeCep(e.target.value)
                        })
                      }
                      onBlur={handleCep}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-span-3">
                  <Form.Group>
                    <Form.Label className="text-black-400 font-semibold">
                      Logradouro
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      className="input"
                      disabled={loading}
                      value={dataAddress.street}
                      type="text"
                      onChange={e =>
                        setDataAddress({
                          ...dataAddress,
                          street: e.target.value
                        })
                      }
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-span-1">
                  <Form.Group>
                    <Form.Label className="text-black-400 font-semibold">
                      Número
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      className="input"
                      disabled={loading}
                      type="text"
                      value={dataAddress.street_number}
                      id="number_form"
                      onChange={e =>
                        setDataAddress({
                          ...dataAddress,
                          street_number: e.target.value
                        })
                      }
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-span-1">
                  <Form.Group>
                    <Form.Label className="text-black-400 font-semibold">
                      Complemento
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      className="input"
                      disabled={loading}
                      value={dataAddress.street_complement}
                      type="text"
                      onChange={e =>
                        setDataAddress({
                          ...dataAddress,
                          street_complement: e.target.value
                        })
                      }
                    />
                  </Form.Group>
                </div>
                <div className="col-span-2">
                  <Form.Group>
                    <Form.Label className="text-black-400 font-semibold">
                      Bairro
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      className="input"
                      disabled={loading}
                      type="text"
                      value={dataAddress.neighborhood}
                      onChange={e =>
                        setDataAddress({
                          ...dataAddress,
                          neighborhood: e.target.value
                        })
                      }
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-span-2">
                  <Form.Group style={{ position: 'relative' }}>
                    <Form.Label className="text-black-400 font-semibold">
                      Cidade
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      className="input"
                      disabled={loading}
                      type="text"
                      value={dataAddress.city}
                      onChange={e => {
                        setDataAddress({
                          ...dataAddress,
                          city: e.target.value
                        })
                      }}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-span-2">
                  <Form.Group>
                    <Form.Label className="text-black-400 font-semibold">
                      Estado
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      className="select-input"
                      as="select"
                      value={dataAddress.state}
                      onChange={e =>
                        setDataAddress({
                          ...dataAddress,
                          state: e.target.value
                        })
                      }
                    >
                      <option disabled selected value="">
                        Selecione...
                      </option>
                      {states.map(state => (
                        <option key={state.cod} value={state.uf}>
                          {state.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className="col-span-4">
                  <Form.Group>
                    <Form.Label className="text-black-400 font-semibold">
                      Tipo
                    </Form.Label>
                    <div>
                      <Form.Check
                        disabled={loading}
                        name="type"
                        className="mt-2"
                        label="Endereço Principal"
                        checked={dataAddress.is_main_address}
                        onChange={e =>
                          setDataAddress({
                            ...dataAddress,
                            is_main_address: !dataAddress.is_main_address
                          })
                        }
                      />
                      <Form.Check
                        disabled={loading}
                        name="type"
                        className="mt-2"
                        label="Endereço de Cobrança"
                        checked={dataAddress.is_billing_address}
                        onChange={e =>
                          setDataAddress({
                            ...dataAddress,
                            is_billing_address: !dataAddress.is_billing_address
                          })
                        }
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  type="button"
                  className="primary-btn"
                  onClick={e => handleSubmit(e)}
                  disabled={
                    dataAddress.city === '' ||
                    dataAddress.label === '' ||
                    dataAddress.neighborhood === '' ||
                    dataAddress.street === '' ||
                    dataAddress.street_number === '' ||
                    dataAddress.zip_code === '' ||
                    loading
                  }
                >
                  SALVAR ENDEREÇO
                </button>
                <button
                  type="button"
                  className="secondary-btn border-blue-500 text-blue-500 hover:border-blue-500 hover:text-blue-500"
                  disabled={loading}
                  onClick={resetForm}
                >
                  CANCELAR
                </button>
              </div>
            </Form>
          )}
        </div>
        <hr />
        <div id="list">
          {addresses.map(address => (
            <div className="item" key={address.id}>
              <h4>{address.label}</h4>
              <p>
                {address.street}, {address.street_number}{' '}
                {address.street_complement}, {address.zip_code},{' '}
                {address.neighborhood}, {address.city && address.city.name} -{' '}
                {address.city && address.city.state && address.city.state.uf}
              </p>
              {(address.is_billing_address === 1 ||
                address.is_billing_address === true) &&
              (address.is_main_address === 1 ||
                address.is_main_address === true) ? (
                <span>Endereço Principal e Cobrança</span>
              ) : (
                <>
                  {(address.is_billing_address === 1 ||
                    address.is_billing_address === true) && (
                    <span>Endereço de Cobrança</span>
                  )}
                  {(address.is_main_address === 1 ||
                    address.is_main_address === true) && (
                    <span>Endereço Principal</span>
                  )}
                </>
              )}
              <button
                type="button"
                className="ml-auto d-block"
                disabled={loading}
                onClick={() => handleDelete(address.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

export default Address
