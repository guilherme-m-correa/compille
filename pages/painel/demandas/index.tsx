import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { format } from 'date-fns'
import { api } from '../../../hooks/fetch'
import { useAuth } from '../../../hooks/auth'
import Container from '../../../components/Container'

export default function Demandas() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get(`/comercial/people/user/${user?.id}`)

        const { data } = await api.get(
          `/comercial/correspondents/${response.data.id}/appointments`
        )

        setAppointments(data)
      } catch (error) {
        console.log(error)
      }
    }

    loadData()
  }, [user?.id])

  return (
    <Container>
      <div className="mt-10">
        <h2 className="text-3xl font-extrabold text-blue-500">Demandas</h2>
        <p className="text-sm text-gray-400 tracking-wide">
          Administre as solicitações de serviços.
        </p>
      </div>

      <div className="my-10 flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.length > 0 &&
                    appointments.map(appointment => (
                      <tr className="hover:bg-gray-100">
                        <td className="px-6 py-12 whitespace-nowrap">
                          <Link href={`/painel/demandas/${appointment.id}`}>
                            <a>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-24 w-24 mr-2">
                                  {appointment.requester.avatar_url ? (
                                    <img
                                      className="h-full w-full rounded-full"
                                      src={appointment.requester.avatar_url}
                                      alt="Foto do solicitante"
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
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {appointment.requester.profile_name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Audiência
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {appointment.forum.city.name},{' '}
                                    {appointment.forum.city.state.uf}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Recebida em:{' '}
                                    {format(
                                      new Date(appointment.created_at),
                                      `dd/MM/yyyy 'às' HH':'mm`
                                    )}
                                  </div>
                                </div>
                              </div>
                            </a>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {appointment.appointment_status_id === 1 && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Aguardando sua proposta
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
