import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from '../hooks/fetch'
import { useAudience } from '../hooks/audience'
import Container from '../components/Container'
import { Person } from '../@types/person'

export default function Profissionais() {
  const [lawyers, setLawyers] = useState<Person[]>([] as Person[])
  const { audience, updateAudience } = useAudience()
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        const {
          date,
          hour_start: hour_start_string,
          hour_end: hour_end_string
        } = audience

        const [day, month, year] = date.split('/')

        const [hour_start, minutes_start] = hour_start_string
          .replace(/\s/g, '')
          .split(':')
        const [hour_end, minutes_end] = hour_end_string
          .replace(/\s/g, '')
          .split(':')

        const start_date = new Date(
          Number(year),
          Number(month) + 1,
          Number(day),
          Number(hour_start),
          Number(minutes_start),
          0,
          0
        )
        const end_date = new Date(
          Number(year),
          Number(month) + 1,
          Number(day),
          Number(hour_end),
          Number(minutes_end),
          0,
          0
        )

        const { data } = await api.get(`/comercial/available-lawyers`, {
          params: {
            start_date,
            end_date,
            latitude: audience.forum.geometry.location.lat,
            longitude: audience.forum.geometry.location.lng,
            certificate_required: audience.certificate_required
          }
        })

        setLawyers(data)
      } catch (error) {
        console.log(error)
      }
    }

    if (!audience) {
      return
    }

    loadData()
  }, [audience])

  async function handleSelectLawyer(lawyer: Person) {
    Object.assign(audience, { lawyer })
    updateAudience(audience)
    router.push('/demandas/solicitar')
  }

  return (
    <Container>
      <h2 className="mt-10 text-3xl text-center font-semibold text-blue-500">
        Profissionais
      </h2>

      <ul className="mt-8 mb-56 divide-y flex flex-col items-center">
        {lawyers.length === 0 && (
          <li>
            <div className="flex h-screen justify-center items-center">
              <strong className="text-xl">
                {' '}
                Nenhum profissional encontrado
              </strong>
            </div>
          </li>
        )}
        {lawyers.length > 0 &&
          lawyers.map(lawyer => (
            <li
              key={lawyer.id}
              className="flex justify-between items-center bg-white w-full p-6 rounded-md"
            >
              <div className="flex justify-center space-x-4 items-center">
                <a
                  href={`/p/${lawyer.profile_link}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 h-24 w-24 rounded-full overflow-hidden bg-gray-100"
                >
                  {lawyer.avatar_url ? (
                    <img
                      className="h-full w-full"
                      src={lawyer.avatar_url}
                      alt="Foto do perfil"
                    />
                  ) : (
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </a>
                <div>
                  <a
                    href={`/p/${lawyer.profile_link}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:text-blue-700 font-bold"
                  >
                    {lawyer.profile_name}
                  </a>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <button
                  type="button"
                  onClick={() => handleSelectLawyer(lawyer)}
                  className="primary-btn"
                >
                  ENVIAR DEMANDA
                </button>

                <a
                  href={`/p/${lawyer.profile_link}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button
                    type="button"
                    className="secondary-btn w-full text-blue-500 border-blue-500 border-2 bg-transparent hover:text-blue-700 hover:border-blue-700"
                  >
                    VER PERFIL
                  </button>
                </a>
              </div>
            </li>
          ))}
      </ul>
      {/*
         <div className="bg-white  mb-10 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
           <div className="flex-1 flex justify-between sm:hidden">
             <a
               href="#"
               className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
             >
               Anterior
             </a>
             <a
               href="#"
               className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
             >
               Próximo
             </a>
           </div>
           <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
             <div>
               <p className="text-sm text-gray-700">
                 <span className="font-medium">10</span> de{' '}
                 <span className="font-medium">97</span> resultados
               </p>
             </div>
             <div>
               <nav
                 className="relative z-0 inline-flex shadow-sm -space-x-px"
                 aria-label="Pagination"
               >
                 <a
                   href="#"
                   className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                 >
                   <span className="sr-only">Previous</span>
                   <svg
                     className="h-5 w-5"
                     xmlns="http:www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                     aria-hidden="true"
                   >
                     <path
                       fillRule="evenodd"
                       d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                       clipRule="evenodd"
                     />
                   </svg>
                 </a>
                 <a
                   href="#"
                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                 >
                   1
                 </a>
                 <a
                   href="#"
                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                 >
                   2
                 </a>
                 <a
                   href="#"
                   className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                 >
                   3
                 </a>
                 <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                   ...
                 </span>
                 <a
                   href="#"
                   className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                 >
                   8
                 </a>
                 <a
                   href="#"
                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                 >
                   9
                 </a>
                 <a
                   href="#"
                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                 >
                   10
                 </a>
                 <a
                   href="#"
                   className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                 >
                   <span className="sr-only">Next</span>
                   <svg
                     className="h-5 w-5"
                     xmlns="http:www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                     aria-hidden="true"
                   >
                     <path
                       fillRule="evenodd"
                       d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                       clipRule="evenodd"
                     />
                   </svg>
                 </a>
               </nav>
             </div>
           </div>
         </div> */}
    </Container>
  )
}
