import { useState, useEffect } from 'react'
import Container from '../../components/Container'
import Companies from '../../components/Companies'

import { api } from '../../hooks/fetch'
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

export default function Contabilidade() {
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
    <Container>
      <h2 className="text-2xl font-semibold my-6">Empresas</h2>
      {person && <Companies person_id={person.id} />}
      <div className="mb-72" />
    </Container>
  )
}
