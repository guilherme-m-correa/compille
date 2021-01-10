import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
    { name: 'Home', link: '/' },
    {
      name: 'Para correspondentes',
      link: '/cadastro-advogados-correspondentes-juridicos'
    },
    { name: 'Para departamentos jurídico', link: '/demandas/solicitar' },
    { name: 'Blog', link: '/' },
    { name: 'Diretório', link: '/profissionais' }
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
                      ? 'tracking-wide text-blue-500'
                      : 'tracking-wide text-gray-50 hover:text-blue-500'
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
          <div className="relative inline-block text-left">
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
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Demandas
                    </button>
                  </Link>

                  <Link href="/painel/agenda-juridica">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Agenda Jurídica
                    </button>
                  </Link>
                  <Link href="/painel/minha-conta">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Contabilidade
                    </button>
                  </Link>
                  <Link href="/painel/minha-conta">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Minha Conta
                    </button>
                  </Link>
                  <Link href="/painel/editar-perfil">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Editar Perfil
                    </button>
                  </Link>
                  <Link href="/logout">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
          <div className="relative inline-block text-left">
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
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Demandas
                    </button>
                  </Link>
                  <Link href="/painel/agenda-juridica">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Agenda Jurídica
                    </button>
                  </Link>
                  <Link href="/painel/contabilidade">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Contabilidade
                    </button>
                  </Link>
                  <Link href="/painel/minha-conta">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Minha Conta
                    </button>
                  </Link>
                  <Link href="/painel/editar-perfil">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Editar Perfil
                    </button>
                  </Link>
                  <Link href="/logout">
                    <button
                      type="button"
                      onClick={e => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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