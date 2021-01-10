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

  const handleSignOut = useCallback(() => {
    signOut()
    router.push('/')
  }, [router, signOut])

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

          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => {
                setOpenMenu(!openMenu)
              }}
              className="secondary-btn max-w-max"
            >
              CENTRAL DO CORRESPONDENTE
            </button>

            <div
              className={`${
                openMenu
                  ? 'absolute bg-white top-12 py-6 rounded w-full flex justify-center items-center'
                  : 'hidden'
              }`}
            >
              <button
                type="button"
                onClick={() => handleSignOut()}
                className="primary-btn"
              >
                LOGOUT
              </button>
            </div>
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

          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => {
                setOpenMenu(!openMenu)
              }}
              className="secondary-btn max-w-max"
            >
              CENTRAL DO SOLICITANTE
            </button>

            <div
              className={`${
                openMenu
                  ? 'absolute bg-white top-12 py-6 rounded w-full flex justify-center items-center'
                  : 'hidden'
              }`}
            >
              <button
                type="button"
                onClick={() => handleSignOut()}
                className="primary-btn"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </Container>
    )
  }

  const LogoHeader: React.FC = () => {
    console.log(user)
    return (
      <Container>
        <div className="flex justify-center items-center">
          <Image src="/img/logo.png" alt="Logo" width={200} height={60} />
        </div>
      </Container>
    )
  }

  return (
    <header className="relative z-10 flex h-20 bg-black-500 justify-between items-center">
      {!user ? (
        <LoggedOutHeader />
      ) : user.type === 'P' && person.register_finish ? (
        <CorrespondenteHeader />
      ) : user.type === 'E' ? (
        <SolicitanteHeader />
      ) : (
        <LogoHeader />
      )}
    </header>
  )
}

export default Header
