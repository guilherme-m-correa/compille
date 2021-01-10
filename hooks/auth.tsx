import { createContext, useCallback, useState, useContext } from 'react'

import { useRouter } from 'next/router'
import { api } from './fetch'

interface User {
  id: string
  email: string
  username: string
  type: string
  active: boolean
}

interface AuthState {
  token: string
  user: User
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): void
}

const Auth = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter()

  const [data, setData] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@Compille:token')
      const user = localStorage.getItem('@Compille:user')

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`

        return { token, user: JSON.parse(user) }
      }
    }

    return {} as AuthState
  })

  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post<AuthState>('/authperm/authenticate', {
        email,
        password
      })
      const { token, user } = response.data

      if (typeof window !== 'undefined') {
        localStorage.setItem('@Compille:token', token)
        localStorage.setItem('@Compille:user', JSON.stringify(user))
      }

      api.defaults.headers.authorization = `Bearer ${token}`

      if (user.type === 'P') {
        const { data: person } = await api.get(
          `/comercial/people/user/${user.id}`
        )

        if (person.register_finish) {
          router.push('/painel')
        } else {
          router.push('/painel/editar-perfil')
        }
      }

      if (user.type === 'E') {
        router.push('/painel')
      }

      setData({ token, user })
    },
    [router]
  )

  const signOut = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('@Compille:token')
      localStorage.removeItem('@Compille:user')
    }

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Compille:user', JSON.stringify(user))
      setData({ token: data.token, user })
    },
    [setData, data.token]
  )

  return (
    <Auth.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
      {children}
    </Auth.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const context = useContext(Auth)

  if (!context) {
    throw new Error('The hook useAuth must be used within an AuthProvider')
  }

  return context
}
