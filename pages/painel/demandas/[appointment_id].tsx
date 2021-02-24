import { useEffect, useState, useCallback } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import {
  FaMapMarkerAlt,
  FaArrowDown,
  FaRegCalendar,
  FaListUl,
  FaPaperclip
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import Container from '../../../components/Container'
import ModalConfirmOffer from '../../../components/ModalConfirmOffer'
import ModalAcceptOffer from '../../../components/ModalAcceptOffer'
import ModalCancelAppointment from '../../../components/ModalCancelAppointment'
import { api } from '../../../hooks/fetch'
import { useAuth } from '../../../hooks/auth'
import { useSocket } from '../../../hooks/socket'

export interface IMessageData {
  appointment_id: number
  correspondent_id: number
  requester_id: string
  message: string
  message_sender: string
  message_type: string
  file_url: string
}

export default function AppointmentChat() {
  const router = useRouter()
  const { socket } = useSocket()
  const { user } = useAuth()
  const { appointment_id } = router.query
  const [appointment, setAppointment] = useState<Appointment>(null)
  const [message, setMessage] = useState('')
  const [messagesData, setMessagesData] = useState<IMessageData[]>([])
  const [inputMoneyValue, setInputMoneyValue] = useState('0,00')
  const [modalConfirmOfferOpen, setModalConfirmOfferOpen] = useState(false)
  const [modalAcceptOfferOpen, setModalAcceptOfferOpen] = useState(false)
  const [modalCancelAppointmentOpen, setModalCancelAppointmentOpen] = useState(
    false
  )

  const states = [
    { cod: 12, name: 'Acre', uf: 'AC' },
    { cod: 27, name: 'Alagoas', uf: 'AL' },
    { cod: 16, name: 'Amapá', uf: 'AP' },
    { cod: 13, name: 'Amazonas', uf: 'AM' },
    { cod: 29, name: 'Bahia', uf: 'BA' },
    { cod: 23, name: 'Ceará', uf: 'CE' },
    { cod: 53, name: 'Distrito Federal', uf: 'DF' },
    { cod: 32, name: 'Espírito Santo', uf: 'ES' },
    { cod: 52, name: 'Goiás', uf: 'GO' },
    { cod: 21, name: 'Maranhão', uf: 'MA' },
    { cod: 51, name: 'Mato Grosso', uf: 'MT' },
    { cod: 50, name: 'Mato Grosso do Sul', uf: 'MS' },
    { cod: 31, name: 'Minas Gerais', uf: 'MG' },
    { cod: 15, name: 'Pará', uf: 'PA' },
    { cod: 25, name: 'Paraíba', uf: 'PB' },
    { cod: 41, name: 'Paraná', uf: 'PR' },
    { cod: 26, name: 'Pernambuco', uf: 'PE' },
    { cod: 22, name: 'Piauí', uf: 'PI' },
    { cod: 33, name: 'Rio de Janeiro', uf: 'RJ' },
    { cod: 24, name: 'Rio Grande do Norte', uf: 'RN' },
    { cod: 43, name: 'Rio Grande do Sul', uf: 'RS' },
    { cod: 11, name: 'Rondônia', uf: 'RO' },
    { cod: 14, name: 'Roraima', uf: 'RR' },
    { cod: 42, name: 'Santa Catarina', uf: 'SC' },
    { cod: 35, name: 'São Paulo', uf: 'SP' },
    { cod: 28, name: 'Sergipe', uf: 'SE' },
    { cod: 17, name: 'Tocantins', uf: 'TO' }
  ]

  useEffect(() => {
    if (!appointment_id) {
      return
    }

    if (!user.id) {
      return
    }

    socket.on(`previousMessages_${user.id}`, data => {
      setMessagesData([
        ...messagesData,
        ...data.filter(msg => msg.appointment_id === Number(appointment_id))
      ])

      const messagesList = document.getElementById('messages')
      const items = document.querySelectorAll('.chat-message')

      if (items.length > 5) {
        const last = items[items.length - 1]
        const topPos = (last as any).offsetTop
        messagesList.scrollTop = topPos
      }
    })

    socket.on(`appointment_${appointment_id}`, data => {
      setMessagesData([...messagesData, data])

      const messagesList = document.getElementById('messages')
      const items = document.querySelectorAll('.chat-message')

      if (items.length > 5) {
        const last = items[items.length - 1]
        const topPos = (last as any).offsetTop
        messagesList.scrollTop = topPos
      }
    })

    return () => {//eslint-disable-line
      socket.off(`appointment_${appointment_id}`)//eslint-disable-line
    } //eslint-disable-line
  }, [messagesData, appointment_id]) //eslint-disable-line

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get(
          `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/appointments/${appointment_id}`
        )

        setAppointment(data)
        const { value } = data
        const formattedValue = value.toLocaleString('pt-br', {
          minimumFractionDigits: 2
        })
        setInputMoneyValue(formattedValue)
      } catch (error) {
        if (error.response.status === 404) {
          router.push('/404')
        }
        console.log(error)
      }
    }

    if (!appointment_id) {
      return
    }

    socket.on('receivedOffer', data => {
      if (Number(data.appointment_id) === Number(appointment_id)) {
        loadData()
      }
    })

    loadData()
  }, [appointment_id, router, socket])

  async function handleCancelAppointment() {
    try {
      await api.put(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/appointments/${appointment_id}`,
        {
          appointment_status_id: 4
        }
      )

      setModalCancelAppointmentOpen(false)
      router.push('/painel')
    } catch (error) {
      console.log(error)
    }
  }

  async function handleAcceptOffer() {
    try {
      await api.put(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/appointments/${appointment_id}`,
        {
          appointment_status_id: 3
        }
      )

      setModalAcceptOfferOpen(false)
      router.push('/painel')
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdateOffer() {
    try {
      const parsedValue = Number(inputMoneyValue.replace(/\D/g, '')) / 100

      await api.put(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/comercial/appointments/${appointment_id}`,
        {
          appointment_status_id: 2,
          value: parsedValue
        }
      )

      setModalConfirmOfferOpen(false)
      toast.success('Sua proposta foi enviada com sucesso!')

      const offerObject = {
        appointment_id: appointment.id,
        correspondent_id: appointment.correspondent_id,
        requester_id: appointment.requester_id,
        value: Number(inputMoneyValue.replace(/\D/g, '')) / 100
      }

      socket.emit('sendOffer', offerObject)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSendMessage() {
    if (!message) {
      return
    }

    const messageObject = {
      appointment_id: appointment.id,
      correspondent_id: appointment.correspondent_id,
      requester_id: appointment.requester_id,
      message_type: 'text',
      message_sender: '',
      message
    }

    if (user?.type === 'E') {
      Object.assign(messageObject, { message_sender: 'requester' })

      socket.emit('sendMessage', messageObject)
    } else {
      Object.assign(messageObject, { message_sender: 'correspondent' })

      socket.emit('sendMessage', messageObject)
    }

    setMessage('')
  }

  const handleUploadFile = useCallback(
    async e => {
      try {
        const { files } = e.target

        console.log(files)

        if (files) {
          const data = new FormData()
          data.append('file', files[0])

          const response = await api.post(`/documentos`, data)

          if (response.status === 200) {
            const { filename } = response.data

            const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/documentos/${filename}`

            const messageObject = {
              appointment_id: appointment.id,
              correspondent_id: appointment.correspondent_id,
              requester_id: appointment.requester_id,
              message_type: 'file',
              message_sender: '',
              message: files[0].name,
              file_url: url
            }

            if (user?.type === 'E') {
              Object.assign(messageObject, { message_sender: 'requester' })

              socket.emit('sendMessage', messageObject)
            } else {
              Object.assign(messageObject, { message_sender: 'correspondent' })

              socket.emit('sendMessage', messageObject)
            }
          }
        }
      } catch (err) {
        //
      }
    },
    [appointment, socket, user?.type]
  )

  if (user?.type === 'E') {
    return (
      <Container>
        <ModalCancelAppointment
          open={modalCancelAppointmentOpen}
          setOpen={setModalCancelAppointmentOpen}
          handleCancelAppointment={handleCancelAppointment}
        />
        <ModalAcceptOffer
          open={modalAcceptOfferOpen}
          value={inputMoneyValue}
          setOpen={setModalAcceptOfferOpen}
          handleAcceptOffer={handleAcceptOffer}
        />
        {appointment && (
          <div className="flex text-base my-10" style={{ height: '80vh' }}>
            <div className="hidden lg:block w-1/3 bg-white mr-4 overflow-auto">
              <div className="bg-blue-500">
                <h3 className="flex justify-center items-center text-white font-medium py-3">
                  Demanda #{appointment_id}
                </h3>

                <div className="w-full h-72 bg-gray-300 overflow-hidden relative">
                  <iframe
                    width="100%"
                    height="100%"
                    className="absolute inset-0"
                    frameBorder="0"
                    title="map"
                    marginHeight={0}
                    marginWidth={0}
                    scrolling="no"
                    src={`https://maps.google.com/maps?width=100%&height=600&q=${encodeURIComponent(
                      appointment?.forum?.address
                    )}J&hl=pt_br&ie=UTF8&t=&z=14&iwloc=B&output=embed`}
                  />
                </div>

                <ul className="px-6 divide-y divide-white">
                  <li className="text-white flex flex-col font-medium py-4">
                    <strong>Audiência</strong>
                    <span>
                      {appointment?.forum?.city?.name},{' '}
                      {appointment?.forum?.city?.state?.uf}
                    </span>
                  </li>
                  <li className="text-white flex flex-col font-medium py-4">
                    <strong className="font-bold">Status</strong>
                    <span>{appointment?.status?.description}</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 px-6">
                <ul>
                  <li className="text-gray-400 py-2">
                    <p className="flex items-center space-x-4">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <span className="text-gray-700 font-semibold">
                        Local do serviço:
                      </span>
                    </p>
                    <p className="pl-8 text-sm">
                      {appointment?.forum?.descricao}
                    </p>
                    <p className="pl-8 text-sm">
                      {appointment?.forum?.address}
                    </p>
                  </li>

                  <li className="text-gray-400 py-2">
                    <p className="flex items-center space-x-4">
                      <FaRegCalendar className="text-blue-500" />
                      <span className="text-gray-700 font-semibold">
                        Prazo:
                      </span>
                    </p>
                    <p className="pl-8 text-sm">
                      {format(
                        new Date(appointment?.start_date),
                        `dd/MM/yyyy 'às' HH':'mm`
                      )}
                    </p>
                  </li>
                  <li className="text-gray-400 py-2">
                    <p className="flex items-center space-x-4">
                      <FaListUl className="text-blue-500" />
                      <span className="text-gray-700 font-semibold">
                        Detalhes do serviço:
                      </span>
                    </p>
                    <p className="pl-8 text-sm">
                      <strong>Tipo de audiência:</strong> {appointment.type}
                    </p>
                    <p className="pl-8 text-sm">
                      <strong>Área:</strong> {appointment.area}
                    </p>
                    <p className="pl-8 text-sm">
                      <strong>Tipo de processo:</strong>{' '}
                      {appointment.process_type}
                    </p>
                    <p className="pl-8 text-sm">
                      <strong>Número de processo:</strong>{' '}
                      {appointment.process_number}
                    </p>
                  </li>
                </ul>
              </div>

              <div className="flex px-6 justify-center">
                <button
                  type="button"
                  onClick={() => setModalCancelAppointmentOpen(true)}
                  className="mt-10 tertiary-btn w-full"
                >
                  CANCELAR DEMANDA
                </button>
              </div>
            </div>

            <div className="flex-1 justify-between flex flex-col  bg-white">
              <div className="flex p-4 items-center justify-between">
                <div className="flex items-center space-x-4 text-xs font-light">
                  <div className="rounded-full h-14 w-14 flex justify-center items-center text-white">
                    {appointment.correspondent.avatar_url ? (
                      <img
                        className="h-full w-full rounded-full"
                        src={appointment.correspondent.avatar_url}
                        alt="Foto do perfil"
                      />
                    ) : (
                      <svg
                        className="h-full w-full rounded-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {appointment.correspondent.profile_name}
                    </span>
                    <span>
                      OAB: {appointment.correspondent.oab}/
                      {
                        states.find(
                          state =>
                            state.cod ===
                            Number(appointment.correspondent.oab_uf)
                        )?.uf
                      }
                    </span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  {appointment.appointment_status_id === 2 &&
                    appointment.value > 0 && (
                      <button
                        type="button"
                        onClick={() => setModalAcceptOfferOpen(true)}
                        className="primary-btn"
                      >
                        ACEITAR PROPOSTA
                      </button>
                    )}
                </div>
              </div>

              <div className="flex p-6 bg-gray-100 sm:items-center justify-between py-3">
                <div className="flex items-center space-x-4">
                  <h2 className="text-base text-gray-700 text-center font-medium">
                    Chat
                  </h2>
                </div>
              </div>

              <div
                id="messages"
                className="h-full flex flex-col space-y-4 p-6 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              >
                {appointment.appointment_status_id === 2 &&
                  appointment.value > 0 && (
                    <p className="text-gray-500 text-center mb-4">
                      {appointment.correspondent.profile_name} enviou uma
                      proposta no valor de{' '}
                      {appointment.value.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </p>
                  )}
                {messagesData.map(
                  ({
                    message: msg,
                    message_sender,
                    message_type,
                    file_url
                  }: IMessageData) =>
                    message_sender === 'correspondent' ? (
                      <div className="chat-message">
                        <div className="flex items-end">
                          <div className="flex flex-col space-y-2 text-sm font-normal max-w-xs mx-2 order-2 items-start">
                            <div>
                              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                {message_type === 'text' ? (
                                  <span className="max-w-sm break-words">
                                    {msg}
                                  </span>
                                ) : (
                                  <a
                                    href={file_url}
                                    className="flex items-center space-x-2 font-extrabold hover:underline"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    <FaPaperclip className="flex-shrink-0" />{' '}
                                    <span className="max-w-sm break-words">
                                      {msg}
                                    </span>
                                  </a>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="chat-message">
                        <div className="flex items-end justify-end">
                          <div className="flex flex-col space-y-2 text-sm font-normal max-w-xs mx-2 order-1 items-end">
                            <div>
                              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-500 text-white ">
                                {message_type === 'text' ? (
                                  <span className="max-w-sm break-words">
                                    {msg}
                                  </span>
                                ) : (
                                  <a
                                    href={file_url}
                                    className="flex items-center space-x-2 font-extrabold hover:underline"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    <FaPaperclip />{' '}
                                    <span className="max-w-sm break-words">
                                      {msg}
                                    </span>
                                  </a>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
              <div className="border-t-2 rounded-b-lg border-gray-200 p-4 mb-4 sm:mb-0">
                <div className="relative flex">
                  <input
                    type="text"
                    placeholder="Escreva algo..."
                    value={message}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleSendMessage()
                      }
                    }}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-full py-3"
                  />
                  <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                    <input
                      id="uploadFileInput"
                      className="hidden"
                      type="file"
                      // accept="image/x-png,image/jpeg"
                      onChange={handleUploadFile}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById('uploadFileInput').click()
                      }}
                      className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendMessage}
                      className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-6 w-6 transform rotate-90"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    )
  }
  return (
    <Container>
      <ModalConfirmOffer
        open={modalConfirmOfferOpen}
        value={inputMoneyValue}
        setOpen={setModalConfirmOfferOpen}
        handleConfirmOffer={handleUpdateOffer}
      />
      {appointment && (
        <div className="flex text-base my-10" style={{ height: '80vh' }}>
          <div className="hidden lg:block w-1/3 bg-white mr-4 overflow-auto">
            <div className="bg-blue-500">
              <h3 className="flex justify-center items-center text-white font-medium py-3">
                Demanda #{appointment_id}
              </h3>

              <div className="w-full h-72 bg-gray-300 overflow-hidden relative">
                <iframe
                  width="100%"
                  height="100%"
                  className="absolute inset-0"
                  frameBorder="0"
                  title="map"
                  marginHeight={0}
                  marginWidth={0}
                  scrolling="no"
                  src={`https://maps.google.com/maps?width=100%&height=600&q=${encodeURIComponent(
                    appointment?.forum?.address
                  )}J&hl=pt_br&ie=UTF8&t=&z=14&iwloc=B&output=embed`}
                />
              </div>

              <ul className="px-6 divide-y divide-white">
                <li className="text-white font-bold py-4">
                  {appointment?.requester?.profile_name}
                </li>
                <li className="text-white flex flex-col font-medium py-4">
                  <strong>Audiência</strong>
                  <span>
                    {appointment?.forum?.city?.name},{' '}
                    {appointment?.forum?.city?.state?.uf}
                  </span>
                </li>
                <li className="text-white flex flex-col font-medium py-4">
                  <strong className="font-bold">Status</strong>
                  <span>{appointment?.status?.description}</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 px-6">
              <ul>
                <li className="text-gray-400 py-2">
                  <p className="flex items-center space-x-4">
                    <FaArrowDown className="text-blue-500" />
                    <span className="text-gray-700 font-semibold">
                      Recebida em:
                    </span>
                  </p>
                  <p className="pl-8 text-sm">
                    {format(
                      new Date(appointment?.created_at),
                      `dd/MM/yyyy 'às' HH':'mm`
                    )}
                  </p>
                </li>

                <li className="text-gray-400 py-2">
                  <p className="flex items-center space-x-4">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span className="text-gray-700 font-semibold">
                      Local do serviço:
                    </span>
                  </p>
                  <p className="pl-8 text-sm">
                    {appointment?.forum?.descricao}
                  </p>
                  <p className="pl-8 text-sm">{appointment?.forum?.address}</p>
                </li>

                <li className="text-gray-400 py-2">
                  <p className="flex items-center space-x-4">
                    <FaRegCalendar className="text-blue-500" />
                    <span className="text-gray-700 font-semibold">Prazo:</span>
                  </p>
                  <p className="pl-8 text-sm">
                    {format(
                      new Date(appointment?.start_date),
                      `dd/MM/yyyy 'às' HH':'mm`
                    )}
                  </p>
                </li>
                <li className="text-gray-400 py-2">
                  <p className="flex items-center space-x-4">
                    <FaListUl className="text-blue-500" />
                    <span className="text-gray-700 font-semibold">
                      Detalhes do serviço:
                    </span>
                  </p>
                  <p className="pl-8 text-sm">
                    <strong>Tipo de audiência:</strong> {appointment.type}
                  </p>
                  <p className="pl-8 text-sm">
                    <strong>Área:</strong> {appointment.area}
                  </p>
                  <p className="pl-8 text-sm">
                    <strong>Tipo de processo:</strong>{' '}
                    {appointment.process_type}
                  </p>
                  <p className="pl-8 text-sm">
                    <strong>Número de processo:</strong>{' '}
                    {appointment.process_number}
                  </p>
                </li>
              </ul>
            </div>

            <div className="flex px-6 justify-center">
              <button
                type="button"
                onClick={() => setModalCancelAppointmentOpen(true)}
                className="mt-10 tertiary-btn w-full"
              >
                CANCELAR DEMANDA
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-white">
            <div className="flex p-6 bg-blue-500 items-center justify-between py-3">
              <div className="flex items-center space-x-4">
                <h2 className="text-base text-white text-center font-medium">
                  Negociação
                </h2>
              </div>
              <div className="flex space-x-4">
                <div>
                  <span className="text-white font-bold mr-2">R$</span>
                  <input
                    type="text"
                    className="input w-24"
                    value={inputMoneyValue}
                    onChange={e => {
                      const value =
                        Number(e.target.value.replace(/\D/g, '')) / 100
                      const formattedValue = value.toLocaleString('pt-br', {
                        minimumFractionDigits: 2
                      })
                      setInputMoneyValue(formattedValue)
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setModalConfirmOfferOpen(true)}
                  className="secondary-btn"
                >
                  ENVIAR PROPOSTA
                </button>
              </div>
            </div>

            <div
              id="messages"
              className="h-full flex flex-col space-y-4 p-6 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
              {appointment.appointment_status_id === 2 &&
                appointment.value > 0 && (
                  <p className="text-gray-500 text-center mb-4">
                    Você enviou uma proposta no valor de{' '}
                    {appointment.value.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                )}
              {messagesData.map(
                ({
                  message: msg,
                  message_sender,
                  message_type,
                  file_url
                }: IMessageData) =>
                  message_sender === 'requester' ? (
                    <div className="chat-message">
                      <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-sm font-normal max-w-xs mx-2 order-2 items-start">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                              {message_type === 'text' ? (
                                msg
                              ) : (
                                <a
                                  href={file_url}
                                  className="flex items-center space-x-2 font-extrabold"
                                  target="_blank"
                                  rel="noreferrer noopener"
                                >
                                  <FaPaperclip />{' '}
                                  <span className="max-w-sm break-words">
                                    {msg}
                                  </span>
                                </a>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="chat-message">
                      <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-sm font-normal max-w-xs mx-2 order-1 items-end">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-500 text-white ">
                              {message_type === 'text' ? (
                                msg
                              ) : (
                                <a
                                  href={file_url}
                                  className="flex items-center space-x-2 font-extrabold"
                                  target="_blank"
                                  rel="noreferrer noopener"
                                >
                                  <FaPaperclip />{' '}
                                  <span className="max-w-sm break-words">
                                    {msg}
                                  </span>
                                </a>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
            <div className="border-t-2 rounded-b-lg border-gray-200 p-4 mb-4 sm:mb-0">
              <div className="relative flex">
                <input
                  type="text"
                  placeholder="Escreva algo..."
                  value={message}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-full py-3"
                />
                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                  <input
                    id="uploadFileInput"
                    className="hidden"
                    type="file"
                    // accept="image/x-png,image/jpeg"
                    onChange={handleUploadFile}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('uploadFileInput').click()
                    }}
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}
