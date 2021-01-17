import { useState, useEffect } from 'react'

import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import { FaTimes, FaPlus } from 'react-icons/fa'
import { isBefore } from 'date-fns'
import { IoIosReturnRight } from 'react-icons/io'
import { api } from '../hooks/fetch'
import { useAuth } from '../hooks/auth'

import ModalAddForun from './ModalAddForun'
import ModalAddVara from './ModalAddVara'
import ErrorMessageBox from './ErrorMessageBox'

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
      setErrorMessage('')

      if (!type || type === 0) {
        setErrorMessage('Selecione um tipo')
        return
      }

      if (dataInicial === '') {
        setErrorMessage('Selecione a data inicial')
        return
      }

      if (dataFinal === '') {
        setErrorMessage('Selecione a data final')
        return
      }
      if (
        dataInicial !== '' &&
        dataFinal !== '' &&
        isBefore(new Date(dataFinal), new Date(dataInicial))
      ) {
        setErrorMessage('Data final não pode ser depois da data inicial')
        return
      }

      if (
        (type === 1 || type === 2) &&
        (Object.keys(forumSelected).length === 0 ||
          Object.keys(varaSelected).length === 0)
      ) {
        setErrorMessage('Selecione um fórum e uma vara')
        return
      }

      const { data } = await api.post(`/agenda/compromisses`, {
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function loadTypes() {
      try {
        const { data } = await api.get(`/agenda/compromisse-types`)
        console.log(data)
        setTypesOptions(data.filter(d => d.type === user.type))
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
            <div className="my-2">
              {errorMessage && (
                <ErrorMessageBox>{errorMessage}</ErrorMessageBox>
              )}
            </div>

            <Form.Group>
              <Form.Label className="text-black-400 font-semibold">
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
                    {o.descricao}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col lg={6}>
                  <Form.Label className="text-black-400 font-semibold">
                    Data de Início
                  </Form.Label>
                  <Form.Control
                    className="input"
                    type="datetime-local"
                    onChange={e => setDataInicial(new Date(e.target.value))}
                  />
                </Col>
                <Col lg={6}>
                  <Form.Label className="text-black-400 font-semibold">
                    Data de Término
                  </Form.Label>
                  <Form.Control
                    className="input"
                    type="datetime-local"
                    onChange={e => setDataFinal(new Date(e.target.value))}
                  />
                </Col>
              </Row>
            </Form.Group>
            {(type === 1 || type === 2) && (
              <Form.Group>
                <Form.Label className="text-black-400 font-semibold">
                  Descrição
                </Form.Label>
                <Form.Control
                  as="textarea"
                  className="input"
                  rows={3}
                  value={descricao}
                  onChange={e => setDescricao(e.target.value)}
                />
              </Form.Group>
            )}
            {(type === 1 || type === 2) && (
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Form.Group>
                    <Form.Label className="text-black-400 font-semibold">
                      Fórum
                    </Form.Label>
                    <div className="flex">
                      <Form.Control
                        className="input"
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
                </div>
                <div className="flex-1">
                  <Form.Group>
                    <Form.Label className="text-black-400 font-semibold">
                      Vara
                    </Form.Label>
                    <div className="flex">
                      <Form.Control
                        as="select"
                        className="select-input"
                        value={varaSelected}
                        onChange={e => setVaraSelected(e.target.value)}
                      >
                        <option disabled selected value="">
                          Selecione...
                        </option>
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
                </div>
              </div>
            )}
            <div className="mt-6 flex justify-center items-center space-x-4">
              <button
                type="button"
                className="primary-btn"
                disabled={loading}
                onClick={handleSubmit}
              >
                Salvar
              </button>
              <button
                type="button"
                className="secondary-btn border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 hover:bg-gray-100hover:bg-gray-100"
                onClick={resetForm}
              >
                Cancelar
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalAddCompromiss
