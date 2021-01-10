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
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  value={values.descricao}
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
                <Form.Label>Localização</Form.Label>
                <Form.Control
                  value={values.localizacao}
                  onChange={e =>
                    setValues({ ...values, localizacao: e.target.value })
                  }
                  disabled={loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Button
                type="submit"
                variant="primary"
                className="d-block btn-block"
                disabled={loading}
              >
                Salvar
              </Button>
            </Col>
            <Col lg={6}>
              <Button
                type="button"
                variant="outline-primary"
                className="d-block btn-block"
                onClick={resetForm}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalAddVara
