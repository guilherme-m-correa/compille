import Link from 'next/link'
import { useState, useEffect } from 'react'
import { api } from '../../hooks/fetch'
import Container from '../../components/Container'
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

  return (
    <div className=" py-10 flex flex-col mx-auto">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h2 className="text-3xl text-blue-500 font-extrabold text-brack-500">
            Painel do solicitante
          </h2>
          <p>Resumo dos indicadores das suas demandas.</p>
        </div>

        <Link href="/demandas/solicitar">
          <a>
            <button type="button" className="primary-btn">
              ENVIAR NOVA DEMANDA
            </button>
          </a>
        </Link>
      </div>

      <div>
        <h2 className="mt-20 text-center text-2xl font-extrabold text-gray-700">
          Suas demandas recentes
        </h2>

        <div className="mt-10 flex space-x-4">
          <div className="bg-white rounded-mb shadow-lg divide-y-2 divider-gray-200 px-6 py-4">
            <h3 className="text-center text-lg tracking-wide font-semibold text-gray-700 py-6">
              Aguardando propostas
            </h3>

            <div className="flex flex-col justify-center items-center text-center py-32">
              <p className="text-gray-500">Não encontramos nenhuma demanda.</p>
              <Link href="/demandas/solicitar">
                <a className="text-blue-500">Enviar nova demanda</a>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-mb shadow-lg divide-y-2 divider-gray px-6 py-4">
            <h3 className="text-center text-lg tracking-wide font-semibold text-gray-700 py-6">
              Aguardando contratação
            </h3>

            <div className="flex flex-col justify-center items-center text-center py-32">
              <p className="text-gray-500">Não encontramos nenhuma demanda.</p>
              <Link href="/demandas/solicitar">
                <a className="text-blue-500">Enviar nova demanda</a>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-mb shadow-lg divide-y-2 divider-gray px-6 py-4">
            <h3 className="text-center text-lg tracking-wide font-semibold text-gray-700 py-6">
              Aguardando aprovação
            </h3>

            <div className="flex flex-col justify-center items-center text-center py-32">
              <p className="text-gray-500">Não encontramos nenhuma demanda.</p>
              <Link href="/demandas/solicitar">
                <a className="text-blue-500">Enviar nova demanda</a>
              </Link>
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
    <Container>
      {user?.type === 'P' && <PainelCorrespondente />}
      {user?.type === 'E' && <PainelSolicitante />}
    </Container>
  )
}
