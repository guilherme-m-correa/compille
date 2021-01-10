import { useState, useEffect } from 'react'

import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { FaTimes, FaPlus } from 'react-icons/fa'
import axios from 'axios'
import { isBefore } from 'date-fns'
import { api } from '../hooks/fetch'
import { useAuth } from '../hooks/auth'

import ModalAddForun from './ModalAddForun'
import ModalAddVara from './ModalAddVara'

function ModalAddCompromiss({ open, setOpen, onAdd }) {
  const [type, setType] = useState(null)
  const [dataInicial, setDataInicial] = useState<string | Date>('')
  const [dataFinal, setDataFinal] = useState<string | Date>('')
  const [descricao, setDescricao] = useState('')
  const [typesOptions, setTypesOptions] = useState([] as any[])

  const [forumValue, setForumValue] = useState('')
  const [forumSelected, setForumSelected] = useState({} as any)
  const [forumOptions, setForumOptions] = useState([] as any[])

  const [forumAdd, setForumAdd] = useState(false)

  const [varaSelected, setVaraSelected] = useState({} as any)
  const [varaOptions, setVaraOptions] = useState([] as any[])

  const [varaAdd, setVaraAdd] = useState(false)

  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  function resetForm() {
    setLoading(false)
    setType(null)
    setDataInicial('')
    setDataFinal('')
    setDescricao('')
    setOpen(false)
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      const { data } = await api.post(`/comercial/compromisses`, {
        id_user: user.id,
        compromisse_type_id: type,
        dataInicial,
        dataFinal,
        descricao: descricao || null,
        id_forum: forumSelected.id,
        descricao_forum: forumSelected.descricao,
        endereco_forum: `${forumSelected.street}, ${
          forumSelected.street_number
        } - ${forumSelected.street_complement || '-'}, ${
          forumSelected.neighbouhood
        }, ${forumSelected.city} - ${forumSelected.uf}, ${
          forumSelected.zip_code
        }`,
        id_vara: varaSelected.id,
        descricao_vara: varaSelected.descricao
      })
      const typeOpt = typesOptions.find(e => e.id === type)
      onAdd({
        ...data,
        type: { descricao: typeOpt.descricao, cor: typeOpt.cor }
      })
      resetForm()
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    async function loadTypes() {
      try {
        const { data } = await axios.get(`/agenda/compromisse-types`)
        setTypesOptions(data)
      } catch (error) {
        console.log(error)
      }
    }
    loadTypes()
  }, [])

  async function handleSelectForum(f) {
    setForumSelected(f)
    setForumValue(f.descricao)
    setForumOptions([])
    try {
      const { data } = await api.get(`/comercial/varas?forun_id=${f.id}`)
      setVaraOptions(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleLoadForum(e) {
    try {
      setForumValue(e.target.value)
      const { data } = await api.get(
        `/comercial/foruns?descricao=${e.target.value.toUpperCase()}`
      )
      setForumOptions(data)
    } catch (err) {
      console.log(err)
    }
  }

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
          <Form>
            <Form.Group>
              <Form.Label>Tipo de Compromisso</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={e => setType(Number(e.target.value))}
              >
                {typesOptions.map(o => (
                  <option value={o.id} key={o.id}>
                    {o.descricao}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col lg={6}>
                  <Form.Label>Data de Início</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    onChange={e => setDataInicial(new Date(e.target.value))}
                  />
                </Col>
                <Col lg={6}>
                  <Form.Label>Data de Término</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    onChange={e => setDataFinal(new Date(e.target.value))}
                  />
                  {dataInicial !== '' &&
                    dataFinal !== '' &&
                    isBefore(new Date(dataFinal), new Date(dataInicial)) && (
                      <small className="text-danger">
                        Data final não pode ser depois da data inicial
                      </small>
                    )}
                </Col>
              </Row>
            </Form.Group>
            {(type === 1 || type === 2) && (
              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={descricao}
                  onChange={e => setDescricao(e.target.value)}
                />
              </Form.Group>
            )}
            {(type === 1 || type === 2) && (
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Fórum</Form.Label>
                    <div className="d-flex align-items">
                      <Form.Control
                        value={forumValue}
                        onChange={handleLoadForum}
                        disabled={Object.keys(forumSelected).length > 0}
                      />
                      {Object.keys(forumSelected).length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setForumSelected({})
                            setForumValue('')
                          }}
                          style={{ background: 'none', border: 'none' }}
                        >
                          <FaTimes />
                        </button>
                      )}
                      {Object.keys(forumSelected).length === 0 && (
                        <button
                          type="button"
                          style={{ background: 'none', border: 'none' }}
                          onClick={() => setForumAdd(true)}
                        >
                          <FaPlus />
                        </button>
                      )}
                    </div>

                    {forumOptions.length > 0 && (
                      <div>
                        {forumOptions.map(f => (
                          <button
                            type="button"
                            key={f.id}
                            onClick={() => {
                              handleSelectForum(f)
                            }}
                          >
                            {f.descricao}
                          </button>
                        ))}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Label>Vara</Form.Label>
                    <div className="d-flex align-items">
                      <Form.Control
                        as="select"
                        value={varaSelected}
                        onChange={e => setVaraSelected(e.target.value)}
                      >
                        {varaOptions.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.descricao}
                          </option>
                        ))}
                      </Form.Control>
                      {Object.keys(forumSelected).length > 0 && (
                        <button
                          type="button"
                          style={{ background: 'none', border: 'none' }}
                          onClick={() => setVaraAdd(true)}
                        >
                          <FaPlus />
                        </button>
                      )}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            )}
            <Row>
              <Col lg={6}>
                <Button
                  type="button"
                  variant="primary"
                  className="d-block btn-block"
                  disabled={
                    !type ||
                    type === 0 ||
                    dataInicial === '' ||
                    dataFinal === '' ||
                    (dataInicial !== '' &&
                      dataFinal !== '' &&
                      isBefore(new Date(dataFinal), new Date(dataInicial))) ||
                    loading ||
                    ((type === 1 || type === 2) &&
                      (Object.keys(forumSelected).length === 0 ||
                        Object.keys(varaSelected).length === 0))
                  }
                  onClick={handleSubmit}
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
    </>
  )
}

export default ModalAddCompromiss
