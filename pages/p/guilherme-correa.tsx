import { FaStar, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import Container from '../../components/Container'

export default function SignIn() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-blue-500 w-full flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col justify-center items-center">
            <div className="bg-white flex-shrink-0 flex-grow-0 w-32 h-32 rounded-full mr-6 border border-gray-200">
              <img
                className="w-32 h-32 rounded-full"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                alt=""
              />
            </div>

            <h2 className="mt-8  text-white text-3xl font-medium">
              Guilherme Corrêa
            </h2>

            <div className="bg-yellow-400 mt-2 px-2 py-1 flex justify-center items-center rounded-sm text-white">
              <FaStar /> <span className="ml-2 leading-tight">5,0</span>
            </div>

            <p className="mt-4 text-white text-sm">Advogado, PE</p>

            <div className="mt-4 flex space-x-2">
              <button
                type="button"
                className="bg-white hover:bg-gray-200 rounded-full shadow-lg h-12 w-12 flex justify-center items-center text-blue-500 hover:text-blue-500"
              >
                <div>
                  <FaEnvelope />
                </div>
              </button>

              <button
                type="button"
                className="bg-white hover:bg-gray-200 rounded-full shadow-lg h-12 w-12 flex justify-center items-center text-blue-500 hover:text-blue-500"
              >
                <div>
                  <FaPhoneAlt />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <div className="mt-10 divide-y md:flex flex-col bg-white w-full p-6 rounded-md">
          <h3 className="py-4 px-2 text-xl text-blue-500 font-medium">Sobre</h3>

          <p className="py-4 px-2  leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            vitae pulvinar nisi, vel elementum nisl. Phasellus vitae tincidunt
            orci. Phasellus vel dolor mauris. Nullam lacus augue, consequat ut
            tortor et, viverra fermentum mauris. Proin quis velit sagittis nisl
            faucibus efficitur ac at arcu.
          </p>
        </div>

        <div className="mt-10 divide-y md:flex flex-col bg-white w-full p-6 rounded-md">
          <h3 className="py-4 px-2 text-xl text-blue-500 font-medium">
            Cidades de Atuação
          </h3>

          <div className="flex flex-wrap py-4">
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
            </ul>
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
            </ul>
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
            </ul>
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Cidade
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 divide-y md:flex flex-col bg-white w-full p-6 rounded-md">
          <h3 className="py-4 px-2 text-xl text-blue-500 font-medium">
            Serviços Prestados
          </h3>

          <div className="flex flex-wrap py-4">
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
            </ul>
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
            </ul>
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
            </ul>
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Serviço
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 divide-y md:flex flex-col bg-white w-full p-6 rounded-md">
          <h3 className="py-4 px-2 text-xl text-blue-500 font-medium">
            Áreas de Atuação
          </h3>

          <div className="flex flex-wrap py-4">
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
            </ul>
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
            </ul>
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
            </ul>
            <ul className="lg:w-1/4 sm:w-1/2 w-full">
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
              <li>
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                Área de atuação
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
