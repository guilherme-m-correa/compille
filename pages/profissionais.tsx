import Link from 'next/link'
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import Container from '../components/Container'

export default function Profissionais() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-full flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl flex flex-col items-center mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl text-center font-semibold text-white">
            Diretório de Advogados e Correspondentes Jurídicos em todo o Brasil
          </h2>
          <div className="mt-8 grid grid-rows-2 gap-4 grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 lg:gap-0 w-full">
            <div className="lg:col-span-2">
              <label htmlFor="email" className="sr-only">
                Digite uma cidade ou nome do profissional
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input"
                placeholder="Digite uma cidade ou nome do profissional"
              />
            </div>
            <button
              type="button"
              className="flex justify-center items-center primary-btn focus:border-none focus:outline-none rounded-none "
            >
              PESQUISAR
            </button>
          </div>

          <Link href="/cadastro-advogados-correspondentes-juridicos">
            <a className="mt-6 text-center text-sm text-white hover:text-gray-200">
              Advogado ou Correspondente Jurídico? Cadastre-se e seja
              encontrado.
            </a>
          </Link>
        </div>
      </div>

      <Container>
        <ul className="mt-8 divide-y flex flex-col items-center">
          <li className="flex justify-between items-center bg-white w-full p-6 rounded-md">
            <div className="flex justify-center items-center">
              <img
                className="flex-shrink-0 flex-grow-0 w-24 h-24 rounded-full mr-6 border border-gray-200"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                alt=""
              />
              <div>
                <Link href="/p/guilherme-correa">
                  <a className="text-blue-500 hover:text-blue-700 font-medium">
                    Guilherme Corrêa
                  </a>
                </Link>
                <p className="text-gray-400 text-sm">Advogado, PE</p>
              </div>
            </div>
            <div className="hidden lg:flex space-x-2">
              <button
                type="button"
                className="bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-lg h-16 w-16 flex justify-center items-center text-white hover:text-gray-200"
              >
                <div>
                  <FaEnvelope />
                </div>
              </button>

              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 rounded-full shadow-lg h-16 w-16 flex justify-center items-center text-white hover:text-gray-200"
              >
                <div>
                  <FaPhoneAlt />
                </div>
              </button>
            </div>
          </li>
          <li className="flex justify-between items-center bg-white w-full p-6 rounded-md">
            <div className="flex justify-center items-center">
              <img
                className="flex-shrink-0 flex-grow-0 w-24 h-24 rounded-full mr-6 border border-gray-200"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                alt=""
              />
              <div>
                <Link href="/p/guilherme-correa">
                  <a className="text-blue-500 hover:text-blue-700 font-medium">
                    Guilherme Corrêa
                  </a>
                </Link>
                <p className="text-gray-400 text-sm">Advogado, PE</p>
              </div>
            </div>

            <div className="hidden lg:flex space-x-2">
              <button
                type="button"
                className="bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-lg h-16 w-16 flex justify-center items-center text-white hover:text-gray-200"
              >
                <div>
                  <FaEnvelope />
                </div>
              </button>

              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 rounded-full shadow-lg h-16 w-16 flex justify-center items-center text-white hover:text-gray-200"
              >
                <div>
                  <FaPhoneAlt />
                </div>
              </button>
            </div>
          </li>
          <li className="flex justify-between items-center bg-white w-full p-6 rounded-md">
            <div className="flex justify-center items-center">
              <img
                className="flex-shrink-0 flex-grow-0 w-24 h-24 rounded-full mr-6 border border-gray-200"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                alt=""
              />
              <div>
                <Link href="/p/guilherme-correa">
                  <a className="text-blue-500 hover:text-blue-700 font-medium">
                    Guilherme Corrêa
                  </a>
                </Link>
                <p className="text-gray-400 text-sm">Advogado, PE</p>
              </div>
            </div>

            <div className="hidden lg:flex space-x-2">
              <button
                type="button"
                className="bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-lg h-16 w-16 flex justify-center items-center text-white hover:text-gray-200"
              >
                <div>
                  <FaEnvelope />
                </div>
              </button>

              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 rounded-full shadow-lg h-16 w-16 flex justify-center items-center text-white hover:text-gray-200"
              >
                <div>
                  <FaPhoneAlt />
                </div>
              </button>
            </div>
          </li>
          <li className="flex justify-between items-center bg-white w-full p-6 rounded-md">
            <div className="flex justify-center items-center">
              <img
                className="flex-shrink-0 flex-grow-0 w-24 h-24 rounded-full mr-6 border border-gray-200"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                alt=""
              />
              <div>
                <Link href="/p/guilherme-correa">
                  <a className="text-blue-500 hover:text-blue-700 font-medium">
                    Guilherme Corrêa
                  </a>
                </Link>
                <p className="text-gray-400 text-sm">Advogado, PE</p>
              </div>
            </div>

            <div className="hidden lg:flex space-x-2">
              <button
                type="button"
                className="bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-lg h-16 w-16 flex justify-center items-center text-white hover:text-gray-200"
              >
                <div>
                  <FaEnvelope />
                </div>
              </button>

              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 rounded-full shadow-lg h-16 w-16 flex justify-center items-center text-white hover:text-gray-200"
              >
                <div>
                  <FaPhoneAlt />
                </div>
              </button>
            </div>
          </li>
          <li className="flex justify-between items-center bg-white w-full p-6 rounded-md">
            <div className="flex justify-center items-center">
              <img
                className="flex-shrink-0 flex-grow-0 w-24 h-24 rounded-full mr-6 border border-gray-200"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                alt=""
              />
              <div>
                <Link href="/p/guilherme-correa">
                  <a className="text-blue-500 hover:text-blue-700 font-medium">
                    Guilherme Corrêa
                  </a>
                </Link>
                <p className="text-gray-400 text-sm">Advogado, PE</p>
              </div>
            </div>

            <div className="hidden lg:flex space-x-2">
              <button
                type="button"
                className="bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-lg h-16 w-16 flex justify-center items-center text-white hover:text-gray-200"
              >
                <div>
                  <FaEnvelope />
                </div>
              </button>

              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 rounded-full shadow-lg h-16 w-16 flex justify-center items-center text-white hover:text-gray-200"
              >
                <div>
                  <FaPhoneAlt />
                </div>
              </button>
            </div>
          </li>
        </ul>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Anterior
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Próximo
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">10</span> de{' '}
                <span className="font-medium">97</span> resultados
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  2
                </a>
                <a
                  href="#"
                  className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a
                  href="#"
                  className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  8
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  9
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  10
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
