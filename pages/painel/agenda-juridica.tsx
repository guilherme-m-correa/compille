import { useState, useEffect } from 'react'

import { Modal, Button, Form, Row, Col } from 'react-bootstrap'

import { FaUser, FaPen, FaTrash } from 'react-icons/fa'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, isBefore, getDay } from 'date-fns' //eslint-disable-line
import pt_BR from 'date-fns/locale/pt-BR' //eslint-disable-line
import { api } from '../../hooks/fetch'
import { useAuth } from '../../hooks/auth'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import Container from '../../components/Container'
import ModalAddCompromiss from '../../components/ModalAddCompromiss'

const locales = {
  'pt-BR': pt_BR
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

export default function Agenda() {
  const [events, setEvents] = useState<any[]>([] as any[])
  const [add, setAdd] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [editActive, setEditActive] = useState(false)

  const [editData, setEditData] = useState<any>({
    id: '',
    title: '',
    start: '',
    end: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  const [detail, setDetail] = useState<any>({
    open: false,
    data: {}
  } as any)

  useEffect(() => {
    async function loadEvents() {
      try {
        const { data: eventData } = await api.get(
          `/agenda/compromisses/${user?.id}`
        )
        const data = []
        eventData.forEach(e => {
          data.push({
            title: e.type.descricao,
            start: new Date(e.dataInicial),
            end: new Date(e.dataFinal),
            allDay: false,
            resources: {
              id: e.id,
              advogado: e.id_advogado
                ? {
                    name: e.nome_advogado
                  }
                : undefined,
              description: e.descricao,
              cor: e.type.cor,
              ...e
            }
          })
        })
        setEvents(data)
      } catch (err) {
        //
      }
    }
    if (user?.id) {
      loadEvents()
    }
  }, [user?.id])

  async function handleEdit() {
    setLoading(true)
    try {
      console.log(editData.start)
      await api.put(`/agenda/compromisses/${detail.data.resources.id}`, {
        compromisse_type_id: detail.data.resources.type.id,
        dataInicial: editData.start,
        dataFinal: editData.end,
        descricao: editData.description,
        id_user: detail.data.resources.user_id
      })
      setEvents(
        events.map(e => {
          if (e.resources.id === editData.id) {
            return {
              title: e.title,
              start: new Date(editData.start),
              end: new Date(editData.end),
              allDay: false,
              resources: {
                ...e.resources,
                description: editData.description
              }
            }
          }
          return e
        })
      )
      setEditData({
        id: '',
        title: '',
        start: '',
        end: '',
        description: ''
      })
      setDetail({
        data: {
          title: detail.data.title,
          start: new Date(editData.start),
          end: new Date(editData.end),
          allDay: false,
          resources: {
            ...detail.data.resources,
            description: editData.description
          }
        },
        open: true
      })
      setEditActive(false)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }
  async function handleDelete() {
    setLoading(true)
    try {
      await api.delete(`/agenda/compromisses/${detail.data.resources.id}`)
      setEditData({
        id: '',
        title: '',
        start: '',
        end: '',
        description: ''
      })
      setEvents(events.filter(e => e.resources.id !== detail.data.resources.id))
      setConfirmDelete(false)
      setDetail({
        open: false,
        data: {}
      })
    } catch (err) {
      //
    }
    setLoading(false)
  }

  return (
    <Container>
      <div className="local-bootstrap py-10">
        <ModalAddCompromiss
          open={add}
          setOpen={() => setAdd(false)}
          onAdd={e => {
            setEvents([
              ...events,
              {
                title: e.type.descricao,
                start: new Date(e.dataInicial),
                end: new Date(e.dataFinal),
                allDay: false,
                resources: {
                  id: e.id,
                  advogado: e.id_advogado
                    ? {
                        name: e.nome_advogado
                      }
                    : undefined,
                  description: e.descricao,
                  cor: e.type.cor,
                  ...e
                }
              }
            ])
          }}
        />
        <Modal
          show={detail.open}
          onHide={() => {
            setDetail({
              open: false,
              data: {}
            })
            setEditData({
              id: '',
              title: '',
              start: '',
              end: '',
              description: ''
            })
          }}
        >
          <Modal.Header closeButton />
          {!editActive && (
            <Modal.Body>
              <h6>{detail.data.title}</h6>
              <small>
                {(detail.data.resources && detail.data.resources.description) ||
                  'Nenhuma descrição informada'}
              </small>
              <div className="flex justify-between items-center mt-3">
                <small>
                  Início:{' '}
                  {detail.data.start &&
                    format(detail.data.start, 'dd/MM/yyyy - HH:mm')}
                </small>
                <small>
                  Fim:{' '}
                  {detail.data.end &&
                    format(detail.data.end, 'dd/MM/yyyy - HH:mm')}
                </small>
              </div>
            </Modal.Body>
          )}
          {editActive && (
            <Modal.Body>
              <Form.Group>
                <Form.Label className="text-black-400 font-semibold">
                  Título
                </Form.Label>
                <Form.Control
                  className="input"
                  value={editData.title}
                  onChange={e =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-black-400 font-semibold">
                  Descrição
                </Form.Label>
                <Form.Control
                  className="input"
                  disabled={loading}
                  value={editData.description}
                  as="textarea"
                  onChange={e =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
              </Form.Group>
              <Row className="mt-3">
                <Col lg={6}>
                  <Form.Label className="text-black-400 font-semibold">
                    Início
                  </Form.Label>
                  <Form.Control
                    disabled={loading}
                    className="input"
                    type="datetime-local"
                    value={editData.start}
                    onChange={e =>
                      setEditData({ ...editData, start: e.target.value })
                    }
                  />
                </Col>
                <Col lg={6}>
                  <Form.Label className="text-black-400 font-semibold">
                    Término
                  </Form.Label>
                  <Form.Control
                    disabled={loading}
                    className="input"
                    type="datetime-local"
                    value={editData.end}
                    onChange={e =>
                      setEditData({ ...editData, end: e.target.value })
                    }
                  />
                  {editData.start !== '' &&
                    editData.end !== '' &&
                    isBefore(
                      new Date(editData.end),
                      new Date(editData.start)
                    ) && (
                      <small className="text-danger">
                        Data final não pode ser depois da data inicial
                      </small>
                    )}
                </Col>
              </Row>
            </Modal.Body>
          )}
          <Modal.Body className="flex-column align-items-start">
            <h6>Advogado:</h6>
            {detail.data.resources && detail.data.resources.advogado ? (
              <div className="flex items-center">
                <FaUser className="mr-3 ml-2" style={{ fontSize: '20px' }} />
                <div>
                  <small className="block mb-0">
                    {detail.data.resources.advogado.name}
                    <br />
                    OAB/PE {detail.data.resources.advogado.oab}
                  </small>
                </div>
              </div>
            ) : (
              <div>
                <p>Nenhum advogado relacionado</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="align-items-center">
            {!confirmDelete && !editActive && (
              <>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    outline: 'none'
                  }}
                  onClick={() => setEditActive(true)}
                  disabled={loading}
                >
                  <FaPen />
                </button>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    outline: 'none'
                  }}
                  onClick={() => setConfirmDelete(true)}
                  disabled={loading}
                >
                  <FaTrash />
                </button>
              </>
            )}
            {confirmDelete && (
              <>
                <div className="flex justify-center items-center w-full">
                  <span>Tem certeza que deseja excluir?</span>
                </div>

                <div className="mt-6 flex justify-center items-center space-x-4 w-full">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="primary-btn"
                    disabled={loading}
                  >
                    SIM, EXCLUIR
                  </button>
                  <button
                    type="button"
                    className="secondary-btn border-blue-500 text-blue-500"
                    onClick={() => setConfirmDelete(false)}
                  >
                    CANCELAR
                  </button>
                </div>
              </>
            )}
            {editActive && (
              <>
                <div className="mt-6 flex justify-center items-center space-x-4 w-full">
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="primary-btn"
                    disabled={loading}
                  >
                    SALVAR
                  </button>
                  <button
                    type="button"
                    className="secondary-btn border-blue-500 text-blue-500  hover:border-blue-500 hover:text-blue-500"
                    onClick={() => {
                      setEditActive(false)
                      setEditData({
                        title: detail.data.title,
                        start: format(detail.data.start, "yyyy-MM-dd'T'HH:mm"),
                        end: format(detail.data.end, "yyyy-MM-dd'T'HH:mm"),
                        id: detail.data.resources.id,
                        description: detail.data.resources.descricao
                      })
                    }}
                  >
                    CANCELAR
                  </button>
                </div>
              </>
            )}
          </Modal.Footer>
        </Modal>
        <div className="primary-btn max-w-max mb-4">
          <button type="button" id="att_button" onClick={() => setAdd(true)}>
            Adicionar compromisso
          </button>
        </div>
        <Calendar
          style={{ height: '100%', minHeight: '500px' }}
          localizer={localizer}
          events={events}
          messages={
            {
              allDay: 'Dia todo',
              day: 'Dia',
              date: 'Data',
              event: 'Evento',
              month: 'Mês',
              next: 'Próximo',
              noEventsInRange: 'Nenhum evento neste período',
              previous: 'Anterior',
              showMore: () => 'Ver mais',
              time: 'Tempo',
              today: 'Hoje',
              tomorrow: 'Amanhã',
              week: 'Semana',
              yesterday: 'Ontem'
            } as any
          }
          startAccessor="start"
          endAccessor="end"
          culture="pt-BR"
          selectable
          eventPropGetter={event => {
            return {
              style: {
                fontSize: '12px',
                backgroundColor: event.resources.cor || '#0540F2'
              }
            }
          }}
          onSelectEvent={e => {
            setDetail({
              open: true,
              data: e
            })
            setEditData({
              title: e.title,
              start: format(e.start, "yyyy-MM-dd'T'HH:mm"),
              end: format(e.end, "yyyy-MM-dd'T'HH:mm"),
              id: e.resources.id,
              description: e.resources.descricao
            })
          }}
        />
      </div>
    </Container>
  )
}
