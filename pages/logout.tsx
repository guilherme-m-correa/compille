import { useRouter } from 'next/router'

import { useEffect } from 'react'
import { useAuth } from '../hooks/auth'
import Container from '../components/Container'

export default function Logout() {
  const router = useRouter()
  const { signOut } = useAuth()

  useEffect(() => {
    signOut()
    router.push('/')
  }, [router, signOut])

  return <Container />
}
