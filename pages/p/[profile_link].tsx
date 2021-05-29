import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { FaMapMarkerAlt, FaCheckSquare, FaStar } from 'react-icons/fa'
import Container from '../../components/Container'
import { api } from '../../hooks/fetch'

export default function PublicProfile() {
  const [person, setPerson] = useState<Person>(null)
  const [legalInstances, setLegalInstances] = useState([])
  const [ratings, setRatings] = useState([])
  const [juridicalAreas, setJuridicalAreas] = useState([])
  const [citiesData, setCitiesData] = useState([])
  const router = useRouter()
  const { profile_link } = router.query

  const states = [
    { cod: 12, name: 'Acre', uf: 'AC' },
    { cod: 27, name: 'Alagoas', uf: 'AL' },
    { cod: 16, name: 'Amapá', uf: 'AP' },
    { cod: 13, name: 'Amazonas', uf: 'AM' },
    { cod: 29, name: 'Bahia', uf: 'BA' },
    { cod: 23, name: 'Ceará', uf: 'CE' },
    { cod: 53, name: 'Distrito Federal', uf: 'DF' },
    { cod: 32, name: 'Espírito Santo', uf: 'ES' },
    { cod: 52, name: 'Goiás', uf: 'GO' },
    { cod: 21, name: 'Maranhão', uf: 'MA' },
    { cod: 51, name: 'Mato Grosso', uf: 'MT' },
    { cod: 50, name: 'Mato Grosso do Sul', uf: 'MS' },
    { cod: 31, name: 'Minas Gerais', uf: 'MG' },
    { cod: 15, name: 'Pará', uf: 'PA' },
    { cod: 25, name: 'Paraíba', uf: 'PB' },
    { cod: 41, name: 'Paraná', uf: 'PR' },
    { cod: 26, name: 'Pernambuco', uf: 'PE' },
    { cod: 22, name: 'Piauí', uf: 'PI' },
    { cod: 33, name: 'Rio de Janeiro', uf: 'RJ' },
    { cod: 24, name: 'Rio Grande do Norte', uf: 'RN' },
    { cod: 43, name: 'Rio Grande do Sul', uf: 'RS' },
    { cod: 11, name: 'Rondônia', uf: 'RO' },
    { cod: 14, name: 'Roraima', uf: 'RR' },
    { cod: 42, name: 'Santa Catarina', uf: 'SC' },
    { cod: 35, name: 'São Paulo', uf: 'SP' },
    { cod: 28, name: 'Sergipe', uf: 'SE' },
    { cod: 17, name: 'Tocantins', uf: 'TO' }
  ]

  useEffect(() => {
    async function loadData() {
      try {
        const { data: personData } = await api.get<Person>(
          `/comercial/people/link/${profile_link}`
        )

        setPerson(personData)

        const { data: person_instances } = await api.get(
          `/comercial/person-legal-instances/${personData.id}`
        )

        setLegalInstances(person_instances)

        const { data: person_areas } = await api.get(
          `/comercial/person-juridical-areas/${personData.id}`
        )

        setJuridicalAreas(person_areas)

        const { data } = await api.get(
          `/comercial/personcities/${personData.id}`
        )
        setCitiesData(data)

        const { data: ratingsData } = await api.get(
          `/comercial/ratings?person_id=${personData.id}`
        )
        setRatings(ratingsData)
      } catch (error) {
        if (error.response.status === 404) {
          router.push('/404')
        }
      }
    }

    if (!profile_link) {
      return
    }

    loadData()
  }, [profile_link, router])

  const ratingAverage = useMemo(() => {
    const sum = ratings.reduce((accumulator, rating) => {
      return accumulator + rating.value
    }, 0)

    const average = sum / ratings.length

    return average.toFixed(1).replace('.', ',')
  }, [ratings])

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-blue-500 w-full flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col justify-center items-center">
            <div className="mt-6 h-32 w-32 rounded-full overflow-hidden bg-gray-100">
              {person?.avatar_url ? (
                <img
                  className="h-full w-full"
                  src={person.avatar_url}
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
            </div>

            <h2 className="mt-8  text-white text-3xl font-medium">
              {person?.profile_name}
            </h2>

            {ratings.length > 0 && (
              <div className="mt-2 flex items-center justify-center space-x-2 px-2 py-1 rounded bg-yellow-500 text-white">
                <FaStar />
                <strong>{ratingAverage}</strong>
              </div>
            )}

            <div className="mt-4 flex space-x-4">
              {person?.oab && person?.oab_uf && (
                <span className="text-white border-2 border-white rounded-md px-2 py-1 text-xs tracking-wide">
                  OAB: {person.oab} /{' '}
                  {
                    states.find(state => state.cod === Number(person.oab_uf))
                      ?.uf
                  }
                </span>
              )}

              {person?.has_certificate ? (
                <span className="text-white border-2 border-white rounded-md px-2 py-1 text-xs tracking-wide">
                  CERTIFICADO DIGITAL
                </span>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>

      <Container>
        <div className="mt-10 divide-y md:flex flex-col bg-white w-full p-6 rounded-md shadow-lg">
          <h3 className="py-4 px-2 text-xl text-gray-700 font-bold">Sobre</h3>

          <p className="py-4 px-2 text-gray-500  leading-relaxed">
            {person?.curriculum}
          </p>
        </div>

        <div className="mt-10 divide-y md:flex flex-col bg-white w-full p-6 rounded-md shadow-lg">
          <h3 className="py-4 px-2 text-xl text-gray-700 font-bold">
            Cidades de Atuação
          </h3>

          <ul className="flex flex-col flex-wrap py-4">
            {citiesData.map(city => (
              <li key={city.id}>
                <div className="flex items-center text-blue-500">
                  <FaMapMarkerAlt />
                  <span className="ml-2">
                    {city.city.name} - {city.city.state.uf}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 divide-y md:flex flex-col bg-white w-full p-6 rounded-md shadow-lg">
          <h3 className="py-4 px-2 text-xl text-gray-700 font-bold">
            Instâncias de Atuação
          </h3>

          <ul className="flex flex-col flex-wrap py-4">
            {legalInstances.map(instance => {
              return (
                <li key={instance.instance.name}>
                  <div className="flex items-center">
                    <FaCheckSquare className="text-green-500" />
                    <span className="ml-2">{instance.instance.name}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="my-10 divide-y md:flex flex-col bg-white w-full p-6 rounded-md shadow-lg">
          <h3 className="py-4 px-2 text-xl text-gray-700 font-bold">
            Áreas de Atuação
          </h3>

          <ul className="flex flex-col flex-wrap py-4">
            {juridicalAreas.map(area => {
              return (
                <li key={area.area.name}>
                  <div className="flex items-center">
                    <FaCheckSquare className="text-green-500" />
                    <span className="ml-2">{area.area.name}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </>
  )
}
