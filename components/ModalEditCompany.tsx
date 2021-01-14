import { useState, useEffect } from 'react'

import { Modal, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'

import { normalizeCnpj } from '../helpers'

function ModalEditCompany({ company, open, setOpen, onUpdate }) {
  const [companyData, setCompanyData] = useState(company)
  const [states, setStates] = useState([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadStates() {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/comercial/states`
        )
        setStates(data)
      } catch (err) {}
    }
    loadStates()
  }, [])

  async function handleUpdate(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.put(
        `http://localhost:5000/comercial/companies/${company.id}`,
        {
          ...companyData
        }
      )
      onUpdate()
      resetForm()
    } catch (err) {}
    setLoading(false)
  }

  function resetForm() {
    setOpen(false)
  }

  return (
    <Modal show={open} onHide={resetForm}>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group>
            <Form.Label className="text-black-400 font-semibold">
              Razão Social
            </Form.Label>
            <Form.Control
              value={companyData.social_name}
              className="input"
              onChange={e =>
                setCompanyData({ ...companyData, social_name: e.target.value })
              }
              disabled={loading}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-black-400 font-semibold">
              Nome Fantasia
            </Form.Label>
            <Form.Control
              value={companyData.commercial_name}
              className="input"
              onChange={e =>
                setCompanyData({
                  ...companyData,
                  commercial_name: e.target.value
                })
              }
              disabled={loading}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-black-400 font-semibold">
              CNPJ
            </Form.Label>
            <Form.Control
              className="input"
              value={normalizeCnpj(companyData.cnpj)}
              readOnly
            />
          </Form.Group>
          <div className="row">
            <div className="col-md-8">
              <Form.Group>
                <Form.Label className="text-black-400 font-semibold">
                  Inscrição Estadual
                </Form.Label>
                <Form.Control
                  value={companyData.ie}
                  className="input"
                  onChange={e =>
                    setCompanyData({ ...companyData, ie: e.target.value })
                  }
                  disabled={loading}
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group>
                <Form.Label className="text-black-400 font-semibold">
                  Estado
                </Form.Label>
                <Form.Control
                  size="sm"
                  as="select"
                  className="select-input"
                  value={companyData.uf}
                  onChange={e => {
                    setCompanyData({ ...companyData, uf: e.target.value })
                  }}
                  disabled={loading}
                  required
                >
                  {states.map(state => (
                    <option key={state.uf} value={state.uf}>
                      {state.uf}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="submit"
              disabled={
                companyData.commercial_name.length === 0 ||
                companyData.social_name.length === 0 ||
                companyData.uf.length === 0
              }
              className="primary-btn"
            >
              {loading && <Spinner animation="border" size="sm" />} Salvar
            </button>
            <button
              type="button"
              className="secondary-btn border-blue-500 text-blue-500 hover:border-blue-500 hover:text-blue-500"
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

export default ModalEditCompany
