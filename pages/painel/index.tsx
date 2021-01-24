import Link from 'next/link'
import Container from '../../components/Container'
import { useAuth } from '../../hooks/auth'

const PainelCorrespondente: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
          Painel do correspondente
        </h2>
        <p className="mt-6 lg:w-2/3 mx-auto leading-relaxed text-base">
          Olá, {user?.username}, seja bem-vindo ao seu painel
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
        <Link href="/painel/empresas">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-800 text-xl font-semibold trackin-wide px-3 py-12 h-full flex justify-center items-center flex-col rounded-md w-full cursor-pointer">
            <h3>Empresas</h3>
            <p className="text-base tracking-wide font-normal text-gray-500">
              Empresas que você participa.
            </p>
          </a>
        </Link>
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

  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
          Painel do solicitante
        </h2>
        <p className="mt-6 lg:w-2/3 mx-auto leading-relaxed text-base">
          Olá, {user?.username}, seja bem-vindo ao seu painel
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
        <Link href="/painel/empresas">
          <a className="bg-white hover:bg-gray-100 shadow-md text-gray-800 text-xl font-semibold trackin-wide px-3 py-12 h-full flex justify-center items-center flex-col rounded-md w-full cursor-pointer">
            <h3>Empresas</h3>
            <p className="text-base tracking-wide font-normal text-gray-500">
              Empresas que você participa.
            </p>
          </a>
        </Link>
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

export default function Painel() {
  const { user } = useAuth()

  return (
    <Container>
      {user?.type === 'P' && <PainelCorrespondente />}
      {user?.type === 'E' && <PainelSolicitante />}
    </Container>
  )
}
