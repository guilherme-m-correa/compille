import { useRouter } from 'next/router'

import { useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useAuth } from '../hooks/auth'
import Container from '../components/Container'

export default function Logout() {
  const router = useRouter()
  const { signOut } = useAuth()

  useEffect(() => {
    signOut()
    router.push('/')
  }, [router, signOut])

  return (
    <Container>
      <div className="min-h-screen flex justify-center items-center animate-spin text-blue-500">
        <FaSpinner className="h-16 w-16" />
      </div>
    </Container>
  )
}
