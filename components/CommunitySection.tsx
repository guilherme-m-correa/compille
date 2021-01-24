import Link from 'next/link'
import { FaStar } from 'react-icons/fa'

import Container from './Container'

const CommunitySection = () => {
  return (
    <section className="mt-6 bg-gradient-to-b from-blue-500 to-indigo-600 w-full py-36 h-4/5">
      <Container>
        <div className="flex flex-col justify-between items-center">
          <h2 className="text-white font-medium text-4xl">
            Comunidade Compille
          </h2>
          <p className="mt-4 text-white font-light text-lg">
            Os Advogados e Correspondentes Jurídicos mais bem avaliados na nossa
            comunidade são destacados.
          </p>

          <div className="mt-6 w-4/6">
            <div className="mb-4 bg-white flex items-center rounded-lg p-6 w-full">
              <img
                className="flex-shrink-0 flex-grow-0 w-14 h-14 rounded-full mr-4 border border-gray-200"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=256&amp;h=256"
                alt=""
              />
              <div>
                <a className="text-blue-500 font-medium" href="#">
                  Guilherme Corrêa
                </a>
                <p className="text-gray-400 text-sm">Advogado, PE</p>
                <div className="flex">
                  <FaStar className="text-yellow-400" />
                  <p className="ml-1 text-yellow-400 text-sm">
                    5,0 - 99+ Avaliaçoes
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-4 bg-white flex rounded-lg p-6 w-full">
              <img
                className="flex-shrink-0 flex-grow-0 w-14 h-14 rounded-full mr-4 border border-gray-200"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=256&amp;h=256"
                alt=""
              />
              <div>
                <a className="text-blue-500 font-medium" href="#">
                  Guilherme Corrêa
                </a>
                <p className="text-gray-400 text-sm">Advogado, PE</p>
                <div className="flex">
                  <FaStar className="text-yellow-400" />
                  <p className="ml-1 text-yellow-400 text-sm">
                    5,0 - 99+ Avaliaçoes
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-4 bg-white flex rounded-lg p-6 w-full">
              <img
                className="flex-shrink-0 flex-grow-0 w-14 h-14 rounded-full mr-4 border border-gray-200"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=256&amp;h=256"
                alt=""
              />
              <div>
                <a className="text-blue-500 font-medium" href="#">
                  Guilherme Corrêa
                </a>
                <p className="text-gray-400 text-sm">Advogado, PE</p>
                <div className="flex">
                  <FaStar className="text-yellow-400" />
                  <p className="ml-1 text-yellow-400 text-sm">
                    5,0 - 99+ Avaliaçoes
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link href="/profissionais">
            <button type="button" className="mt-10 secondary-btn">
              VEJA MAIS PROFISSIONAIS
            </button>
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default CommunitySection
