import { useState } from 'react'

import { Form, Modal } from 'react-bootstrap'
import axios from 'axios'

import { normalizeCep } from '../helpers'

function Address({ company_id, open, setOpen, onAdd }) {
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
    setOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMsg('')
    setLoading(true)
    try {
      const { data, status } = await axios.post(
        `https://gateway.compille.com.br/comercial/companyaddresses`,
        {
          company_id,
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
        }
      )
      if (status === 203) {
        setMsg(data.msg)
      } else {
        onAdd()
        resetForm()
      }
    } catch (err) {}
    setLoading(false)
  }

  async function handleCep() {
    const api = axios.create({
      baseURL: 'https://viacep.com.br/ws'
    })
    delete api.defaults.headers.Authorization
    try {
      const { data } = await api.get(
        `/${dataAddress.zip_code.replace(/[^\d]/g, '')}/json/`
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

  return (
    <Modal
      show={open}
      onHide={() => setOpen(false)}
      backdrop="static"
      size="lg"
      centered
    >
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
                  Rua
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
                    setDataAddress({ ...dataAddress, state: e.target.value })
                  }
                >
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
                <div className="my-2">
                  <Form.Check
                    disabled={loading}
                    className="checkbox"
                    name="type"
                    label="Endereço Principal"
                    checked={dataAddress.is_main_address}
                    onChange={e =>
                      setDataAddress({
                        ...dataAddress,
                        is_main_address: true
                      })
                    }
                  />
                  <Form.Check
                    disabled={loading}
                    className="checkbox"
                    name="type"
                    label="Endereço de Cobrança"
                    checked={dataAddress.is_billing_address}
                    onChange={e =>
                      setDataAddress({
                        ...dataAddress,
                        is_billing_address: true
                      })
                    }
                  />
                </div>
              </Form.Group>
            </div>
          </div>
          <hr />
          <div className="flex justify-center mt-6 space-x-4">
            <button
              type="submit"
              className="primary-btn "
              disabled={
                dataAddress.city === '' ||
                dataAddress.label === '' ||
                dataAddress.neighborhood === '' ||
                dataAddress.street === '' ||
                dataAddress.street_number === '' ||
                dataAddress.zip_code === '' ||
                (!dataAddress.is_billing_address &&
                  !dataAddress.is_main_address) ||
                loading
              }
            >
              Salvar
            </button>
            <button
              type="button"
              className="secondary-btn border-blue-500 text-blue-500 hover:border-blue-500 hover:text-blue-500"
              disabled={loading}
              onClick={resetForm}
            >
              Cancelar
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Address
