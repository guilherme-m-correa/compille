import Link from 'next/link'
import Container from '../../components/Container'
import { useAuth } from '../../hooks/auth'

const PainelCorrespondente: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Painel do correspondente
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          Olá, {user?.username}, seja bem-vindo ao seu painel
        </p>
      </div>
      <div className="flex-col space-y-4 max-w-2xl mx-auto">
        <Link href="/painel/demandas">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Demandas
          </a>
        </Link>
        <Link href="/painel/agenda-juridica">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Agenda Júridica
          </a>
        </Link>
        <Link href="/painel/empresas">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Empresas
          </a>
        </Link>
        <Link href="/painel/contabilidade">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Contabilidade
          </a>
        </Link>
        <Link href="/painel/editar-perfil">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Editar Perfil
          </a>
        </Link>
        <Link href="/painel/minha-assinatura">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Minha assinatura
          </a>
        </Link>
        <Link href="/painel/minha-conta">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Minha Conta
          </a>
        </Link>
      </div>
    </div>
  )
}

const PainelSolicitante: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Painel do solicitante
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          Olá, {user?.username}, seja bem-vindo ao seu painel
        </p>
      </div>
      <div className="flex-col space-y-4 max-w-2xl mx-auto">
        <Link href="/painel/demandas">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Demandas
          </a>
        </Link>
        <Link href="/painel/agenda-juridica">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Agenda Júridica
          </a>
        </Link>
        <Link href="/painel/empresas">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Empresas
          </a>
        </Link>
        <Link href="/painel/contabilidade">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Contabilidade
          </a>
        </Link>
        <Link href="/painel/editar-perfil">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Editar Perfil
          </a>
        </Link>
        <Link href="/painel/minha-assinatura">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Minha assinatura
          </a>
        </Link>
        <Link href="/painel/minha-conta">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-900 text-lg font-medium px-3 py-12 h-full flex justify-center items-center border-gray-300 rounded-lg w-full cursor-pointer">
            Minha Conta
          </a>
        </Link>
      </div>
    </div>
  )
}

export default function Painel() {
  const { user } = useAuth()

  return (
    <Container>
      {user?.type === 'P' && <PainelCorrespondente />}
      {user?.type === 'E' && <PainelSolicitante />}
    </Container>
  )
}
