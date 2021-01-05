import Link from 'next/link'
import Container from '../../../components/Container'

export default function Demandas() {
  return (
    <Container>
      <div className="mt-10">
        <h2 className="text-3xl font-medium">Demandas</h2>
        <p className="text-sm text-gray-400">
          Administre as solicitações de serviços.
        </p>
      </div>

      <div className="mt-6 flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-100">
                    <td className="px-6 py-12 whitespace-nowrap">
                      <Link href="/painel/demandas/demanda0001">
                        <a>
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-24 w-24 mr-2">
                              <img
                                className="h-24 w-24 rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Jane Cooper
                              </div>
                              <div className="text-sm text-gray-500">
                                Audiência
                              </div>
                              <div className="text-sm text-gray-500">
                                Recife, PE
                              </div>
                              <div className="text-sm text-gray-500">
                                Código 0001
                              </div>
                              <div className="text-sm text-gray-500">
                                Recebida em 26/12/2020 às 16h:00
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Aguardando sua proposta
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="px-6 py-12 whitespace-nowrap">
                      <Link href="#">
                        <a>
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-24 w-24 mr-2">
                              <img
                                className="h-24 w-24 rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Jane Cooper
                              </div>
                              <div className="text-sm text-gray-500">
                                Audiência
                              </div>
                              <div className="text-sm text-gray-500">
                                Recife, PE
                              </div>
                              <div className="text-sm text-gray-500">
                                Código 0001
                              </div>
                              <div className="text-sm text-gray-500">
                                Recebida em 26/12/2020 às 16h:00
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Aguardando sua proposta
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="px-6 py-12 whitespace-nowrap">
                      <Link href="#">
                        <a>
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-24 w-24 mr-2">
                              <img
                                className="h-24 w-24 rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Jane Cooper
                              </div>
                              <div className="text-sm text-gray-500">
                                Audiência
                              </div>
                              <div className="text-sm text-gray-500">
                                Recife, PE
                              </div>
                              <div className="text-sm text-gray-500">
                                Código 0001
                              </div>
                              <div className="text-sm text-gray-500">
                                Recebida em 26/12/2020 às 16h:00
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Aguardando sua proposta
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
