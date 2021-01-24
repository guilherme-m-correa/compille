import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { useState, useCallback, useEffect } from 'react'
import { Menu } from './Menu'
import { useAuth } from '../hooks/auth'
import { api } from '../hooks/fetch'
import Container from './Container'

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

const Header: React.FC = () => {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [openMenu, setOpenMenu] = useState(false)
  const [person, setPerson] = useState<Person>({} as Person)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showDropdownSolutions, setShowDropdownSolutions] = useState(false)

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

  const menuItems = [
    // { name: 'Home', link: '/' },
    { name: 'Sobre Nós', link: '/#sobre-nos' },

    { name: 'Blog', link: '/#blog' },
    { name: 'Fale Conosco', link: '/#fale-conosco' }
    // { name: 'Diretório', link: '/profissionais' }
  ]

  const [state, setState] = useState({ active: 'Home' })

  const handleMenuItemChange = useCallback(menuItem => {
    setState({ active: menuItem.name })
  }, [])

  const LoggedOutHeader: React.FC = () => {
    return (
      <>
        <Link href="/">
          <button
            type="button"
            className="ml-4 h-full focus:border-none focus:outline-none"
          >
            <Image src="/img/logo.png" alt="Logo" width={200} height={60} />
          </button>
        </Link>

        <Menu />

        <nav className="hidden lg:block lg:h-full space-x-6">
          <div className="h-full px-2 py-1 float-left relative flex items-center">
            <div>
              <button
                type="button"
                onClick={() => setShowDropdownSolutions(s => !s)}
                id="options-menu"
                className="flex items-center text-white hover:text-gray-100 focus:outline-none"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Soluções{' '}
                {!showDropdownSolutions ? (
                  <FaAngleDown className="ml-1" />
                ) : (
                  <FaAngleUp className="ml-1" />
                )}
              </button>
            </div>
            {showDropdownSolutions && (
              <div
                className="absolute animate whitespace-nowrap left-1/2 transform -translate-x-1/2 top-0 mt-20 rounded-sm bg-black-500 divide-y divide-white"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1">
                  <Link href="#">
                    <button
                      type="button"
                      onClick={e => setShowDropdownSolutions(false)}
                      className="block p-4 text-white hover:text-gray-200 w-full"
                      role="menuitem"
                    >
                      Como Funciona
                    </button>
                  </Link>
                </div>
                <div className="py-1">
                  <Link href="/cadastro-advogados-correspondentes-juridicos">
                    <button
                      type="button"
                      onClick={e => setShowDropdownSolutions(false)}
                      className="block p-4 text-white hover:text-gray-200 w-full"
                      role="menuitem"
                    >
                      Para Correspondentes
                    </button>
                  </Link>
                </div>
                <div className="py-1">
                  <Link href="/cadastro-departamentos-juridico">
                    <button
                      type="button"
                      onClick={e => setShowDropdownSolutions(false)}
                      className="block p-4 text-white hover:text-gray-200 w-full"
                      role="menuitem"
                    >
                      Para Departamentos Jurídicos
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
          {menuItems.map(menuItem => (
            <Link key={menuItem.name} href={menuItem.link}>
              <button
                className="outline-none border-none focus:outline-none focus:border-none"
                type="button"
                onClick={() => handleMenuItemChange(menuItem)}
              >
                <a
                  className={
                    state.active === menuItem.name
                      ? 'tracking-wide text-white'
                      : 'tracking-wide text-white hover:text-gray-100'
                  }
                >
                  {menuItem.name}
                </a>
              </button>
            </Link>
          ))}

          <Link href="/login">
            <button
              type="button"
              className="primary-btn focus:border-none focus:outline-none rounded-none p-4 h-full w-28"
            >
              Login
            </button>
          </Link>
        </nav>
      </>
    )
  }

  const CorrespondenteHeader: React.FC = () => {
    return (
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/painel">
            <button
              type="button"
              className="ml-4 h-full focus:border-none focus:outline-none"
            >
              <Image src="/img/logo.png" alt="Logo" width={200} height={60} />
            </button>
          </Link>

          <Menu />
          <div className="hidden relative lg:inline-block text-left">
            <div>
              <button
                type="button"
                className="secondary-btn max-w-max"
                onClick={() => setShowDropdown(s => !s)}
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
              >
                CENTRAL DO CORRESPONDENTE
              </button>
            </div>
            {showDropdown && (
              <div
                className="absolute left-0 right-0 mt-2 w-full rounded-md shadow-lg bg-white divide-y divide-gray-100"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1">
                  <Link href="/painel">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Painel do correspondente
                    </button>
                  </Link>
                </div>
                <div className="py-1">
                  <Link href="/painel/demandas">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Demandas
                    </button>
                  </Link>

                  <Link href="/painel/agenda-juridica">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Agenda Jurídica
                    </button>
                  </Link>
                  <Link href="/painel/empresas">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Empresas
                    </button>
                  </Link>
                  <Link href="/painel/contabilidade">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Contabilidade
                    </button>
                  </Link>
                  {/* <Link href="/painel/minha-conta">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Minha Conta
                    </button>
                  </Link> */}
                  <Link href="/painel/minha-assinatura">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Minha Assinatura
                    </button>
                  </Link>
                  <Link href="/painel/editar-perfil">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Editar Perfil
                    </button>
                  </Link>
                  <Link href="/logout">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Sair
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    )
  }

  const SolicitanteHeader: React.FC = () => {
    return (
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/painel">
            <button
              type="button"
              className="ml-4 h-full focus:border-none focus:outline-none"
            >
              <Image src="/img/logo.png" alt="Logo" width={200} height={60} />
            </button>
          </Link>

          <Menu />
          <div className="hidden relative lg:inline-block text-left">
            <div>
              <button
                type="button"
                className="secondary-btn max-w-max"
                onClick={() => setShowDropdown(s => !s)}
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
              >
                CENTRAL DO SOLICITANTE
              </button>
            </div>
            {showDropdown && (
              <div
                className="absolute left-0 right-0 mt-2 w-full rounded-md shadow-lg bg-white divide-y divide-gray-100"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1">
                  <Link href="/painel">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Painel do solicitante
                    </button>
                  </Link>
                </div>
                <div className="py-1">
                  <Link href="/painel/demandas">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Demandas
                    </button>
                  </Link>
                  <Link href="/painel/agenda-juridica">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Agenda Jurídica
                    </button>
                  </Link>
                  <Link href="/painel/empresas">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Empresas
                    </button>
                  </Link>
                  <Link href="/painel/contabilidade">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Contabilidade
                    </button>
                  </Link>
                  {/* <Link href="/painel/minha-conta">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Minha Conta
                    </button>
                  </Link> */}
                  <Link href="/painel/editar-perfil">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Editar Perfil
                    </button>
                  </Link>
                  <Link href="/logout">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full"
                      role="menuitem"
                    >
                      Sair
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    )
  }

  // const LogoHeader: React.FC = () => {
  //   return (
  //     <Container>
  //       <div className="flex justify-center items-center">
  //         <Image src="/img/logo.png" alt="Logo" width={200} height={60} />
  //       </div>
  //     </Container>
  //   )
  // }

  return (
    <header className="relative z-10 flex h-20 bg-black-500 justify-between items-center">
      {!user && <LoggedOutHeader />}

      {user?.type === 'P' && <CorrespondenteHeader />}

      {user?.type === 'E' && <SolicitanteHeader />}
    </header>
  )
}

export default Header
