import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Container from '../../components/Container'
import ModalAddAccountEntry from '../../components/ModalAddAccountEntry'
import ModalEditAccountEntry from '../../components/ModalEditAccountEntry'
import ModalDeleteAccountEntry from '../../components/ModalDeleteAccountEntry'
import { api } from '../../hooks/fetch'
import { useAuth } from '../../hooks/auth'
import { normalizeDate, normalizeCurrency } from '../../helpers'

export default function Contabilidade() {
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)
  const [month, setMonth] = useState(new Date().getMonth())
  const [modalAddOpen, setModalAddOpen] = useState(false)
  const [modalEditOpen, setModalEditOpen] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [person, setPerson] = useState<Person>({} as Person)
  const [personAccountEntries, setPersonAccountEntries] = useState<any[]>([])
  const [
    selectedPersonAccountEntry,
    setSelectedPersonAccountEntry
  ] = useState<any>({} as any)

  async function loadData() {
    setLoading(true)
    try {
      const response = await api.get(`/comercial/people/user/${user?.id}`)

      if (response.status === 200) {
        setPerson(response.data)
      }
    } catch (error) {
      //
    }
    try {
      const { data } = await api.get(
        `/comercial/person_account_entries?person_id=${person?.id}&month=${month}`
      )
      setPersonAccountEntries(data)
    } catch (err) {
      //
    }

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [person?.id, month]) //eslint-disable-line

  async function handleDelete() {
    setLoading(true)
    try {
      await api.delete(
        `/comercial/person_account_entries/${selectedPersonAccountEntry?.id}`
      )

      loadData()
      setModalDeleteOpen(false)
    } catch (error) {
      //
    }

    setLoading(false)
  }

  async function handleExport() {
    setLoading(true)
    try {
      window.open(
        `${
          process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'https://gw.annexusapp.com'
        }/comercial/export_csv?person_id=${person?.id}&month=${month}`
      )

      setModalDeleteOpen(false)
    } catch (error) {
      //
    }

    setLoading(false)
  }

  return (
    <Container>
      <ModalAddAccountEntry
        person_id={person?.id}
        open={modalAddOpen}
        setOpen={setModalAddOpen}
        onAdd={() => loadData()}
      />

      <ModalEditAccountEntry
        personAccountEntry={selectedPersonAccountEntry}
        open={modalEditOpen}
        setOpen={setModalEditOpen}
        onAdd={() => loadData()}
      />

      <ModalDeleteAccountEntry
        open={modalDeleteOpen}
        setOpen={setModalDeleteOpen}
        handleDelete={() => handleDelete()}
      />

      <div className="min-h-screen">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
          Contabilidade
        </h2>

        <div className="my-6 flex justify-between">
          <h2 className=" text-xl font-extrabold">Meus lançamentos</h2>
        </div>
        <div className="my-6 flex items-center justify-between">
          <div className="flex items-center w-52">
            <label htmlFor="month">Mês:</label>

            <select
              value={month}
              onChange={e => setMonth(Number(e.target.value))}
              name="month"
              id="month"
              className="select-input ml-2"
            >
              <option value="0">Janeiro</option>
              <option value="1">Fevereiro</option>
              <option value="2">Março</option>
              <option value="3">Abril</option>
              <option value="4">Maio</option>
              <option value="5">Junho</option>
              <option value="6">Julho</option>
              <option value="7">Agosto</option>
              <option value="8">Setembro</option>
              <option value="9">Outubro</option>
              <option value="10">Novembro</option>
              <option value="11">Dezembro</option>
            </select>
          </div>

          <div>
            <button
              type="button"
              className="secondary-btn border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 hover:bg-gray-100hover:bg-gray-100"
              onClick={() => handleExport()}
            >
              EXPORTAR CSV
            </button>
            <button
              type="button"
              className="ml-4 primary-btn"
              onClick={() => setModalAddOpen(true)}
            >
              NOVO LANÇAMENTO
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tipo de Lançamento
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Valor
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Data
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {personAccountEntries.map(personAccountEntry => (
                      <tr key={person.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {personAccountEntry?.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {normalizeCurrency(String(personAccountEntry?.value))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {personAccountEntry?.date
                            ? format(
                                new Date(personAccountEntry.date),
                                'dd/MM/yyyy'
                              )
                            : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPersonAccountEntry(personAccountEntry)
                              setModalEditOpen(true)
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPersonAccountEntry(personAccountEntry)
                              setModalDeleteOpen(true)
                            }}
                            className="text-indigo-600 hover:text-indigo-900 ml-2"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {personAccountEntries.length === 0 && (
                  <button
                    type="button"
                    onClick={() => setModalAddOpen(true)}
                    className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none"
                  >
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                      />
                    </svg>
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Criar novo lançamento
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
