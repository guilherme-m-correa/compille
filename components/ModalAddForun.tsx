import { useState } from 'react'

import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import { api } from '../hooks/fetch'

import { normalizeCep } from '../helpers'

function ModalAddForun({ onAdd, open, setOpen }) {
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    descricao: '',
    zip_code: '',
    street: '',
    street_number: '',
    street_complement: '',
    neighborhood: '',
    city: '',
    latitude: '',
    longitude: '',
    ibge: '',
    uf: ''
  })

  async function handleCep() {
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${values.zip_code.replace(
          /[^\d]/g,
          ''
        )}/json/`
      )
      setValues({
        ...values,
        neighborhood: data.bairro,
        city: data.localidade,
        uf: data.uf,
        street: data.logradouro,
        ibge: data.ibge
      })
      document.getElementById('number_form').focus()
    } catch (err) {
      setValues({
        ...values,
        neighborhood: '',
        city: '',
        uf: '',
        street: '',
        ibge: ''
      })
    }
  }

  const [states] = useState([
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

  function resetForm() {
    setValues({
      descricao: '',
      zip_code: '',
      street: '',
      street_number: '',
      street_complement: '',
      neighborhood: '',
      city: '',
      latitude: '',
      longitude: '',
      ibge: '',
      uf: ''
    })
    setLoading(false)
    setOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post(`/comercial/foruns`, {
        ...values,
        zip_code: values.zip_code.replace('-', '')
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
      <Modal.Header>Adicionar Fórum</Modal.Header>
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
            <Col lg={4}>
              <Form.Group>
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  value={values.zip_code}
                  onBlur={handleCep}
                  onChange={e =>
                    setValues({
                      ...values,
                      zip_code: normalizeCep(e.target.value)
                    })
                  }
                  disabled={loading}
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={8}>
              <Form.Group>
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  value={values.street}
                  onChange={e =>
                    setValues({ ...values, street: e.target.value })
                  }
                  disabled={loading}
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group>
                <Form.Label>Número</Form.Label>
                <Form.Control
                  id="number_form"
                  value={values.street_number}
                  onChange={e =>
                    setValues({ ...values, street_number: e.target.value })
                  }
                  disabled={loading}
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group>
                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  value={values.street_complement}
                  onChange={e =>
                    setValues({ ...values, street_complement: e.target.value })
                  }
                  disabled={loading}
                />
              </Form.Group>
            </Col>
            <Col lg={5}>
              <Form.Group>
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  value={values.neighborhood}
                  onChange={e =>
                    setValues({ ...values, neighborhood: e.target.value })
                  }
                  disabled={loading}
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={5}>
              <Form.Group>
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  value={values.city}
                  onChange={e => setValues({ ...values, city: e.target.value })}
                  disabled={loading}
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={2}>
              <Form.Group>
                <Form.Label>UF</Form.Label>
                <Form.Control
                  value={values.uf}
                  onChange={e => setValues({ ...values, uf: e.target.value })}
                  as="select"
                  disabled={loading}
                  required
                >
                  {states.map(state => (
                    <option key={state.cod} value={state.uf}>
                      {state.uf}
                    </option>
                  ))}
                </Form.Control>
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

export default ModalAddForun
