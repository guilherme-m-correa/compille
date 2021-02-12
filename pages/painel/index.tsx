import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { format } from 'date-fns'
import { api } from '../../hooks/fetch'
import { useAuth } from '../../hooks/auth'

interface Person {
  id: number
  user_id: string
  cpf: string
  rg: string
  rg_exp: string
  rg_uf: string
  oab: string
  oab_uf: string
  gender: string
  created_at: string
  updated_at: string
  profile_type: string
  profile_name: string
  profile_link: string
  birth_date: null
  curriculum: string
  schoolarity: string
  has_certificate: boolean
  register_finish: boolean
}

const PainelCorrespondente: React.FC = () => {
  const { user } = useAuth()
  const [person, setPerson] = useState<Person>({} as Person)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get(`/comercial/people/user/${user?.id}`)

        if (response.status === 200) {
          setPerson(response.data)
        }
      } catch (error) {
        //
      }
    }

    loadData()
  }, [user?.id])

  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
          Painel do correspondente
        </h2>
        <p className="mt-6 lg:w-2/3 mx-auto leading-relaxed text-base">
          Olá, {user?.username}, seja bem-vindo ao seu painel.{' '}
          <Link href={`/p/${person?.profile_link}`}>
            <a className="text-blue-500 hover:text-blue-700">
              Acesse o seu perfil online
            </a>
          </Link>
          .
        </p>
      </div>
      <div className="flex-col space-y-4">
        <Link href="/painel/demandas">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-800 text-xl font-semibold trackin-wide px-3 py-12 h-full flex justify-center items-center flex-col rounded-md w-full cursor-pointer">
            <h3>Demandas</h3>
            <p className="text-base tracking-wide font-normal text-gray-500">
              Demandas recebidas de clientes.
            </p>
          </a>
        </Link>
        <Link href="/painel/agenda-juridica">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-800 text-xl font-semibold trackin-wide px-3 py-12 h-full flex justify-center items-center flex-col rounded-md w-full cursor-pointer">
            <h3>Agenda Júridica</h3>
            <p className="text-base tracking-wide font-normal text-gray-500">
              Seus compromissos profissionais.
            </p>
          </a>
        </Link>
        {person?.profile_type ===
          'Faço parte de um escritório de advocacia' && (
          <Link href="/painel/empresas">
            <a className="bg-white hover:bg-gray-100 shadow-md text-gray-800 text-xl font-semibold trackin-wide px-3 py-12 h-full flex justify-center items-center flex-col rounded-md w-full cursor-pointer">
              <h3>Empresas</h3>
              <p className="text-base tracking-wide font-normal text-gray-500">
                Empresas que você participa.
              </p>
            </a>
          </Link>
        )}

        <Link href="/painel/contabilidade">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-800 text-xl font-semibold trackin-wide px-3 py-12 h-full flex justify-center items-center flex-col rounded-md w-full cursor-pointer">
            <h3>Contabilidade</h3>
            <p className="text-base tracking-wide font-normal text-gray-500">
              Gestão contábil de suas empresas.
            </p>
          </a>
        </Link>
        <Link href="/painel/editar-perfil">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-800 text-xl font-semibold trackin-wide px-3 py-12 h-full flex justify-center items-center flex-col rounded-md w-full cursor-pointer">
            <h3>Editar Perfil</h3>
            <p className="text-base tracking-wide font-normal text-gray-500">
              Informações do seu perfil.
            </p>
          </a>
        </Link>
        <Link href="/painel/minha-assinatura">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-800 text-xl font-semibold trackin-wide px-3 py-12 h-full flex justify-center items-center flex-col rounded-md w-full cursor-pointer">
            <h3>Minha assinatura</h3>
            <p className="text-base tracking-wide font-normal text-gray-500">
              Detalhes da sua assinatura.
            </p>
          </a>
        </Link>
        {/* <Link href="/painel/minha-conta">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-800 text-xl font-semibold trackin-wide px-3 py-12 h-full flex justify-center items-center flex-col rounded-md w-full cursor-pointer">
            <h3>Minha Conta</h3>
            <p className="text-base tracking-wide font-normal text-gray-500">Loren ipsum Lorem ipsum.</p>
          </a>
        </Link> */}
      </div>
    </div>
  )
}

const PainelSolicitante: React.FC = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get(
          `/comercial/requesters/${user.id}/appointments`
        )

        setAppointments(data)
      } catch (error) {
        console.log(error)
      }
    }

    loadData()
  }, [user.id])

  return (
    <div className="flex flex-col mx-auto">
      <div className="flex justify-between items-center w-full bg-white p-10">
        <div className="flex flex-col">
          <h2 className="text-3xl text-blue-500 font-extrabold text-brack-500">
            Painel do solicitante
          </h2>
          <p>Resumo dos indicadores das suas demandas.</p>
        </div>

        <Link href="/demandas/solicitar">
          <a>
            <button type="button" className="primary-btn">
              SOLICITAR NOVA AUDIÊNCIA
            </button>
          </a>
        </Link>
      </div>

      <div className="py-20 px-10">
        <h2 className="text-center text-2xl font-extrabold text-gray-700">
          Suas demandas recentes
        </h2>

        <div className="mt-10 flex justify-center space-x-4">
          <div className="bg-white rounded-mb shadow-lg px-6 py-4 w-80">
            <h3 className="text-center text-lg tracking-wide font-semibold text-gray-700 py-6 border-gray-200 border-b-2">
              Aguardando propostas
            </h3>

            <div className="mt-4 text-gray-700">
              {appointments.length > 0 ? (
                <ul className="space-y-4">
                  {appointments
                    .filter(a => a.appointment_status_id === 1)
                    .map(appointment => (
                      <Link href={`/painel/demandas/${appointment.id}`}>
                        <a
                          key={appointment.id}
                          className="bg-white shadow-md  hover:shadow-xl rounded-md flex flex-col"
                        >
                          <div className="bg-gray-100 px-4 py-2 flex flex-col">
                            <span className="font-semibold">Audiência</span>
                            <span className="text-xs">
                              Em {appointment.forum.city.name}
                            </span>
                          </div>
                          <div className="flex p-4 items-center space-x-4 text-xs font-light">
                            <div className="rounded-full bg-blue-500 h-8 w-8 flex justify-center items-center text-white">
                              <FaCalendarAlt />
                            </div>
                            <div className="flex flex-col">
                              <span>Prazo:</span>
                              <span className="font-semibold">
                                {format(
                                  new Date(appointment.start_date),
                                  `dd/MM/yyyy 'às' HH':'mm`
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="flex p-4 items-center space-x-4 text-xs font-light">
                            <div className="rounded-full h-8 w-8 flex justify-center items-center text-white">
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
                              <span>Advogado:</span>
                              <span className="font-semibold">
                                {appointment.correspondent.profile_name}
                              </span>
                            </div>
                          </div>
                          {/* <div className="px-4 py-2">
                          <Link href="#">
                            <a className="text-blue-500 hover:text-blue-700 text-xs font-light tracking-wide">
                              Ver Detalhes
                            </a>
                          </Link>
                        </div> */}
                        </a>
                      </Link>
                    ))}
                </ul>
              ) : (
                <div className="flex flex-col justify-center items-center text-center py-32">
                  <p className="text-gray-500">
                    Não encontramos nenhuma demanda.
                  </p>
                  <Link href="/demandas/solicitar">
                    <a className="text-blue-500">Solicitar nova audiência</a>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-mb shadow-lg px-6 py-4 w-80">
            <h3 className="text-center text-lg tracking-wide font-semibold text-gray-700 py-6 border-gray-200 border-b-2">
              Aguardando contratação
            </h3>

            <div className="mt-4 text-gray-700">
              {appointments.length > 0 ? (
                <ul className="space-y-4">
                  {appointments
                    .filter(a => a.appointment_status_id === 2)
                    .map(appointment => (
                      <li
                        key={appointment.id}
                        className="bg-white shadow-md  hover:shadow-xl rounded-md flex flex-col"
                      >
                        <div className="bg-gray-100 px-4 py-2 flex flex-col">
                          <span className="font-semibold">Audiência</span>
                          <span className="text-xs">Em Recife</span>
                        </div>
                        <div className="flex p-4 items-center space-x-4 text-xs font-light">
                          <div className="rounded-full bg-blue-500 h-8 w-8 flex justify-center items-center text-white">
                            <FaCalendarAlt />
                          </div>
                          <div className="flex flex-col">
                            <span>Prazo:</span>
                            <span className="font-semibold">
                              {format(
                                new Date(appointment.start_date),
                                `dd/MM/yyyy 'às' HH':'mm`
                              )}
                            </span>
                          </div>
                        </div>
                        {/* <div className="px-4 py-2">
                          <Link href="#">
                            <a className="text-blue-500 hover:text-blue-700 text-xs font-light tracking-wide">
                              Ver Detalhes
                            </a>
                          </Link>
                        </div> */}
                      </li>
                    ))}
                </ul>
              ) : (
                <div className="flex flex-col justify-center items-center text-center py-32">
                  <p className="text-gray-500">
                    Não encontramos nenhuma demanda.
                  </p>
                  <Link href="/demandas/solicitar">
                    <a className="text-blue-500">Solicitar nova audiência</a>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-mb shadow-lg px-6 py-4 w-80">
            <h3 className="text-center text-lg tracking-wide font-semibold text-gray-700 py-6 border-gray-200 border-b-2">
              Aguardando aprovação
            </h3>

            <div className="mt-4 text-gray-700">
              {appointments.length > 0 ? (
                <ul className="space-y-4">
                  {appointments
                    .filter(a => a.appointment_status_id === 3)
                    .map(appointment => (
                      <li
                        key={appointment.id}
                        className="bg-white shadow-md  hover:shadow-xl rounded-md flex flex-col"
                      >
                        <div className="bg-gray-100 px-4 py-2 flex flex-col">
                          <span className="font-semibold">Audiência</span>
                          <span className="text-xs">Em Recife</span>
                        </div>
                        <div className="flex p-4 items-center space-x-4 text-xs font-light">
                          <div className="rounded-full bg-blue-500 h-8 w-8 flex justify-center items-center text-white">
                            <FaCalendarAlt />
                          </div>
                          <div className="flex flex-col">
                            <span>Prazo:</span>
                            <span className="font-semibold">
                              {format(
                                new Date(appointment.start_date),
                                `dd/MM/yyyy 'às' HH':'mm`
                              )}
                            </span>
                          </div>
                        </div>
                        {/* <div className="px-4 py-2">
                          <Link href="#">
                            <a className="text-blue-500 hover:text-blue-700 text-xs font-light tracking-wide">
                              Ver Detalhes
                            </a>
                          </Link>
                        </div> */}
                      </li>
                    ))}
                </ul>
              ) : (
                <div className="flex flex-col justify-center items-center text-center py-32">
                  <p className="text-gray-500">
                    Não encontramos nenhuma demanda.
                  </p>
                  <Link href="/demandas/solicitar">
                    <a className="text-blue-500">Solicitar nova audiência</a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Painel() {
  const { user } = useAuth()

  return (
    <>
      {user?.type === 'P' && <PainelCorrespondente />}
      {user?.type === 'E' && <PainelSolicitante />}
    </>
  )
}
