import { FaTimes } from 'react-icons/fa'

interface ModalAcceptOfferProps {
  open: boolean
  value: string
  setOpen: (state: boolean) => void
  handleAcceptOffer: () => Promise<void>
}

const ModalAcceptOffer = ({
  value,
  open,
  setOpen,
  handleAcceptOffer
}: ModalAcceptOfferProps) => {
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
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Aceitar proposta
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Deseja aceitar a proposta no valor de R$ {value}? Após
                    aceitar sua demanda irá para aba Aguardando execução.
                  </p>
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
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="secondary-btn border-blue-500 text-blue-500  hover:border-blue-500 hover:text-blue-500"
            >
              CANCELAR
            </button>
            <button
              type="button"
              onClick={() => handleAcceptOffer()}
              className="primary-btn"
            >
              CONFIRMAR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAcceptOffer
