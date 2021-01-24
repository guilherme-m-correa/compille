import { useState, useEffect } from 'react'
import Container from '../../components/Container'
import Companies from '../../components/Companies'

import { api } from '../../hooks/fetch'
import { useAuth } from '../../hooks/auth'
import CompanyForm from '../../components/CompanyForm'

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
  const [openAddCompany, setOpenAddCompany] = useState(false)

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

  useEffect(() => {
    loadData()
  }, [user?.id]) // es-lint-disable-line

  return (
    <Container>
      <div className="min-h-screen">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
          Empresas
        </h2>

        {!openAddCompany &&
          person.profile_type ===
            'Faço parte de um escritório de advocacia' && (
            <button
              type="button"
              onClick={() => setOpenAddCompany(true)}
              className="mt-10 primary-btn"
            >
              ADICIONAR NOVA EMPRESA
            </button>
          )}

        {!openAddCompany && person && <Companies person_id={person.id} />}

        {openAddCompany && (
          <div className="bg-white shadow-md rounded-md p-6 mt-10">
            <div className="py-4 border-b-2 border-gray-100">
              <h2 className="text-2xl font-semibold">
                Preencha os dados relacionados a empresa
              </h2>
            </div>

            <CompanyForm
              type="Advogado"
              user_id={user.id}
              onFinish={() => {
                setOpenAddCompany(false)
                loadData()
              }}
              person_id={person.id}
            />
          </div>
        )}
      </div>
    </Container>
  )
}
