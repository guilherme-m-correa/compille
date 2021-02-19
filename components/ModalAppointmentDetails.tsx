import {
  FaTimes,
  FaMapMarkerAlt,
  FaRegCalendar,
  FaListUl
} from 'react-icons/fa'
import { format } from 'date-fns'

interface ModalAppointmentDetailsProps {
  open: boolean
  setOpen: (state: boolean) => void
  appointment: Appointment
}

const ModalAppointmentDetails = ({
  open,
  setOpen,
  appointment
}: ModalAppointmentDetailsProps) => {
  if (!open) {
    return <></>
  }
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
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
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-gray-500"
            >
              <FaTimes />
            </button>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-center items-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="secondary-btn border-blue-500 text-blue-500  hover:border-blue-500 hover:text-blue-500"
            >
              VOLTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAppointmentDetails
