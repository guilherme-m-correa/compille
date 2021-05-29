import { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAuth } from '../hooks/auth'
import { api } from '../hooks/fetch'

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

const contentVariant = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

interface IProps {
  toggle: () => void
}

const LoggedOutMenuItems: React.FC<IProps> = ({ toggle }) => {
  return (
    <div className="text-white">
      <h1 className="text-xl">Institucional</h1>

      <hr className="mb-4" />

      <ul className="space-y-3 font-light mb-4">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/#sobre-nos">
            <a>Sobre nós</a>
          </Link>
        </li>
        <li>
          <Link href="/#blog">
            <a>Blog</a>
          </Link>
        </li>
        <li>
          <Link href="/#fale-conosco">
            <a>Fale Conosco</a>
          </Link>
        </li>
      </ul>

      <h1 className="text-xl">Soluções</h1>

      <hr className="mb-4" />

      <ul className="space-y-3 font-light">
        <li>
          <Link href="/#como-funciona">
            <a>Como Funciona</a>
          </Link>
        </li>
        <li>
          <Link href="/cadastro-advogados-correspondentes-juridicos">
            <a>Para Correspondentes</a>
          </Link>
        </li>
        <li>
          <Link href="/cadastro-departamentos-juridico">
            <a>Para Departamentos Jurídicos</a>
          </Link>
        </li>
      </ul>

      <Link href="/login">
        <button
          type="button"
          onClick={toggle}
          className="mt-4 secondary-btn w-full"
        >
          LOGIN
        </button>
      </Link>
    </div>
  )
}

const CorrespondenteMenuItems: React.FC<IProps> = ({ toggle }) => {
  const { user, signOut } = useAuth()
  const [person, setPerson] = useState<Person>({} as Person)

  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get(`/comercial/people/user/${user.id}`)

        if (response.status === 200) {
          setPerson(response.data)
        }
      } catch (error) {
        //
      }
    }

    loadData()
  }, [user?.id])

  async function handleLogout() {
    signOut()
  }

  return (
    <div className="text-white">
      <div className="flex gap-4 ">
        <div className="rounded-full bg-black-400 h-8 w-8 flex justify-center items-center text-white">
          {user.avatar_url ? (
            <img
              className="h-full w-full rounded-full"
              src={user.avatar_url}
              alt="Foto do perfil"
            />
          ) : (
            <svg
              className="h-full w-full rounded-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </div>

        <div className="flex flex-col">
          <span>{user.username}</span>
          <Link href={`/p/${person.profile_link}`}>
            <a className="text-sm">Acessar meu perfil</a>
          </Link>
        </div>
      </div>

      <hr className="my-6" />

      <ul className="space-y-3 font-light">
        <li>
          <Link href="/painel/demandas">
            <a>Demandas</a>
          </Link>
        </li>
        <li>
          <Link href="/painel/agenda-juridica">
            <a>Agenda Jurídica</a>
          </Link>
        </li>
        <li>
          <Link href="/painel/empresas">
            <a>Empresas</a>
          </Link>
        </li>
        <li>
          <Link href="/painel/contabilidade">
            <a>Contabilidade</a>
          </Link>
        </li>
        <li>
          <Link href="/painel/editar-perfil">
            <a>Editar Perfil</a>
          </Link>
        </li>

        <li>
          <button type="button" onClick={handleLogout} className="font-light">
            Sair
          </button>
        </li>
      </ul>
    </div>
  )
}

const SolicitanteMenuItems: React.FC<IProps> = ({ toggle }) => {
  const { user, signOut } = useAuth()

  async function handleLogout() {
    signOut()
  }

  return (
    <div className="text-white">
      <div className="flex gap-4 ">
        <div className="rounded-full bg-black-400 h-8 w-8 flex justify-center items-center text-white">
          {user.avatar_url ? (
            <img
              className="h-full w-full rounded-full"
              src={user.avatar_url}
              alt="Foto do perfil"
            />
          ) : (
            <svg
              className="h-full w-full rounded-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </div>

        <div className="flex flex-col">
          <span>{user.username}</span>
        </div>
      </div>

      <hr className="my-6" />

      <ul className="space-y-3 font-light">
        <li>
          <Link href="/painel/demandas">
            <a>Demandas</a>
          </Link>
        </li>
        <li>
          <Link href="/painel/agenda-juridica">
            <a>Agenda Jurídica</a>
          </Link>
        </li>
        <li>
          <Link href="/painel/empresas">
            <a>Empresas</a>
          </Link>
        </li>
        <li>
          <Link href="/painel/contabilidade">
            <a>Contabilidade</a>
          </Link>
        </li>
        <li>
          <Link href="/painel/editar-perfil">
            <a>Editar Perfil</a>
          </Link>
        </li>

        <li>
          <button type="button" onClick={handleLogout} className="font-light">
            Sair
          </button>
        </li>
      </ul>
    </div>
  )
}

export const Navigation = ({ isOpen, toggle }) => {
  const { user } = useAuth()

  return (
    <motion.div
      className={
        isOpen
          ? 'absolute left-0 right-0 top-20 min-h-screen flex flex-col'
          : 'hidden'
      }
      variants={variants}
    >
      <motion.div
        variants={contentVariant}
        className="bg-black-500 flex-1 px-4"
      >
        {!user && <LoggedOutMenuItems toggle={toggle} />}

        {user?.type === 'P' && <CorrespondenteMenuItems toggle={toggle} />}

        {user?.type === 'E' && <SolicitanteMenuItems toggle={toggle} />}
      </motion.div>
    </motion.div>
  )
}
