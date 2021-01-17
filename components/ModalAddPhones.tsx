import { useState, useEffect } from 'react'

import { Form, Modal } from 'react-bootstrap'
import axios from 'axios'

import { normalizeNumber } from '../helpers'

function Phones({ company_id, open, setOpen, onAdd }) {
  const [loading, setLoading] = useState(false)
  const [phonesTypes, setPhonesTypes] = useState<any[]>([])

  useEffect(() => {
    async function loadTypes() {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `https://gateway.compille.com.br/comercial/phonetypes`
        )
        setPhonesTypes(data)
      } catch (err) {}
      setLoading(false)
    }
    loadTypes()
  }, [])

  const [dataPhone, setDataPhone] = useState<any>({
    phonetype: '',
    area_code: '',
    number: '',
    contact: ''
  })

  function resetForm() {
    setDataPhone({
      phonetype: '',
      area_code: '',
      number: '',
      contact: ''
    })
    setOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(
        `https://gateway.compille.com.br/comercial/companyphones`,
        {
          company_id,
          phonetype_id: Number(dataPhone.phonetype),
          area_code: dataPhone.area_code,
          number: dataPhone.number,
          contact: dataPhone.contact
        }
      )
      resetForm()
      onAdd()
    } catch (err) {}
    setLoading(false)
  }

  return (
    <Modal show={open} onHide={resetForm} backdrop="static" centered>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-4">
            <div className="col-span-3">
              <Form.Group>
                <Form.Label className="text-black-400 font-semibold">
                  Tipo
                </Form.Label>
                <Form.Control
                  size="sm"
                  disabled={loading}
                  className="select input"
                  as="select"
                  onChange={e =>
                    setDataPhone({
                      ...dataPhone,
                      phonetype: e.target.value
                    })
                  }
                  required
                >
                  <option disabled selected value="">
                    Selecione o tipo
                  </option>
                  {phonesTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
            <div className="col-span-1">
              <Form.Group>
                <Form.Label className="text-black-400 font-semibold">
                  DDD
                </Form.Label>
                <Form.Control
                  size="sm"
                  className="input"
                  disabled={loading}
                  type="text"
                  value={dataPhone.area_code}
                  onChange={e =>
                    setDataPhone({
                      ...dataPhone,
                      area_code: normalizeNumber(e.target.value.slice(0, 2))
                    })
                  }
                  required
                />
              </Form.Group>
            </div>

            <div className="col-span-2">
              <Form.Group>
                <Form.Label className="text-black-400 font-semibold">
                  Número
                </Form.Label>
                <Form.Control
                  size="sm"
                  className="input"
                  disabled={loading}
                  type="text"
                  value={dataPhone.number}
                  onChange={e =>
                    setDataPhone({
                      ...dataPhone,
                      number: e.target.value.slice(0, 9)
                    })
                  }
                  required
                />
              </Form.Group>
            </div>
            <div className="col-span-3">
              <Form.Group>
                <Form.Label className="text-black-400 font-semibold">
                  Contato
                </Form.Label>
                <Form.Control
                  size="sm"
                  className="input"
                  disabled={loading}
                  type="text"
                  onChange={e =>
                    setDataPhone({
                      ...dataPhone,
                      contact: e.target.value
                    })
                  }
                />
              </Form.Group>
            </div>
          </div>
          <hr />
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="submit"
              className="primary-btn "
              disabled={
                dataPhone.area_code === '' ||
                dataPhone.contact === '' ||
                dataPhone.number === '' ||
                dataPhone.phonetype === '' ||
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

export default Phones
