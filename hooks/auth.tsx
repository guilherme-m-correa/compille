import { createContext, useCallback, useState, useContext } from 'react'

import { useRouter } from 'next/router'
import { useAudience } from './audience'
import { api } from './fetch'

interface User {
  id: string
  email: string
  username: string
  type: string
  active: boolean
  avatar_url: string
}

interface AuthResponse {
  token: {
    type: string
    token: string
  }
  user: User
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
  const { reset } = useAudience()

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
      const response = await api.post<AuthResponse>('/authperm/authenticate', {
        email,
        password
      })
      const { token: tokenObject, user } = response.data

      const { token } = tokenObject

      if (typeof window !== 'undefined') {
        localStorage.setItem('@Compille:token', token)
        localStorage.setItem('@Compille:user', JSON.stringify(user))
      }

      api.defaults.headers.authorization = `Bearer ${token}`

      try {
        const { data: person } = await api.get(
          `/comercial/people/user/${user.id}`
        )

        if (person.register_finish) {
          router.push('/painel')
        } else {
          router.push('/painel/editar-perfil')
        }
      } catch (error) {
        if (error.response.status === 404) {
          router.push('/painel/editar-perfil')
        }
      }

      reset()
      setData({ token, user })
    },
    [router, reset]
  )

  const signOut = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('@Compille:token')
      localStorage.removeItem('@Compille:user')
    }

    reset()
    router.push('/')
    setData({} as AuthState)
  }, [router, reset])

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
