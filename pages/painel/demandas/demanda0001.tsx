import Container from '../../../components/Container'

export default function Demanda0001() {
  return (
    <Container>
      <div className="flex my-10" style={{ height: '80vh' }}>
        <div className="hidden lg:block w-1/3 bg-white mr-4 rounded-lg overflow-auto">
          <div className="bg-blue-500 rounded-t-lg">
            <h3 className="flex justify-center items-center text-xl text-white font-medium py-3">
              Demanda 0001
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
                src="https://maps.google.com/maps?width=100%&height=600&q=JUCEPE-JUNTA&hl=pt_br&ie=UTF8&t=&z=14&iwloc=B&output=embed"
              />
            </div>

            <ul className="p-6 divide-y divide-white">
              <li className="text-white font-medium py-6">Jane Cooper</li>
              <li className="text-white font-medium py-6">Recife, PE</li>
              <li className="text-white font-medium py-6">Audiência</li>
              <li className="text-white font-medium py-6">Status</li>
            </ul>
          </div>

          <div className="mt-4 p-6">
            <ul>
              <li className="text-gray-400 py-2">
                Recebida em: 28/12/2020 às 16:00
              </li>

              <li className="text-gray-400 py-2">
                Local do serviço: Jucepe-Junta
              </li>

              <li className="text-gray-400 py-2">
                Comercial do Estado de Pernambuco R. Imperial, 1600 - São José,
              </li>

              <li className="text-gray-400 py-2">
                Recife - PE, 50090-000, Brasil
              </li>

              <li className="text-gray-400 py-2">Prazo: 30/12/2020 às 18:00</li>
            </ul>
          </div>
        </div>

        <div className="flex-1 justify-between flex flex-col  bg-white rounded-lg">
          <div className="flex p-6 bg-blue-500 rounded-t-lg sm:items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl text-white text-center font-medium">
                Negociação
              </h2>
            </div>
          </div>
          <div
            id="messages"
            className="h-full flex flex-col space-y-4 p-6 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      Estou a disposição para o serviço
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-500 text-white ">
                      Vou enviar os arquivos com mais detalhes do processo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 rounded-b-lg border-gray-200 px-4 pt-4 mb-4 sm:mb-0">
            <div className="relative flex">
              <span className="absolute inset-y-0 flex items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
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
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </button>
              </span>
              <input
                type="text"
                placeholder="Escreva algo..."
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
              />
              <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button
                  type="button"
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
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
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
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
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
    </Container>
  )
}
