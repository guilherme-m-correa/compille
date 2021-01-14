import { useState } from 'react'

import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { api } from '../hooks/fetch'

function ModalAddVara({ onAdd, open, setOpen, forun_id }) {
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    descricao: '',
    localizacao: ''
  })

  function resetForm() {
    setValues({
      descricao: '',
      localizacao: ''
    })
    setLoading(false)
    setOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post(`/comercial/varas`, {
        ...values,
        forun_id
      })
      onAdd(data)
      resetForm()
    } catch (err) {
      //
    }
    setLoading(false)
  }

  return (
    <Modal show={open}>
      <Modal.Header>Adicionar Vara</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={12}>
              <Form.Group>
                <Form.Label className="text-black-400 font-semibold">
                  Descrição
                </Form.Label>
                <Form.Control
                  value={values.descricao}
                  className="input"
                  onChange={e =>
                    setValues({ ...values, descricao: e.target.value })
                  }
                  disabled={loading}
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={12}>
              <Form.Group>
                <Form.Label className="text-black-400 font-semibold">
                  Localização
                </Form.Label>
                <Form.Control
                  value={values.localizacao}
                  className="input"
                  onChange={e =>
                    setValues({ ...values, localizacao: e.target.value })
                  }
                  disabled={loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-6 flex justify-center items-center space-x-4">
            <button type="submit" className="primary-btn" disabled={loading}>
              Salvar
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

export default ModalAddVara
