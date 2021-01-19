import { FaStar } from 'react-icons/fa'
import Link from 'next/link'
import Container from '../components/Container'

interface CardProps {
  headingText: string
  paragraphText: string
  buttonText: string
  link: string
}

const Card: React.FC<CardProps> = ({
  headingText,
  paragraphText,
  buttonText,
  link
}) => (
  <div className="relative lg:max-w-md z-10 flex flex-col justify-between p-12 bg-white shadow-xl rounded-xl">
    <div>
      <h3 className="text-xl lg:text-2xl tracking-wide font-semibold text-blue-500">
        {headingText}
      </h3>
      <p className="mt-4 leading-6 text-sm lg:text-base text-gray-400">
        {paragraphText}
      </p>
    </div>
    <Link href={link}>
      <button type="button" className="primary-btn mt-6 max-w-72 ">
        {buttonText}
      </button>
    </Link>
  </div>
)

interface BlogArticleCardProps {
  articleImage: string
  articleTitle: string
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({
  articleImage,
  articleTitle
}) => (
  <div className="flex flex-col justify-between bg-white shadow-xl rounded-xl">
    <img src={articleImage} alt="Imagem do Artigo" />
    <div className="flex flex-col justify-between flex-1 p-12">
      <div>
        <h3 className="text-xl lg:text-2xl tracking-wide font-semibold text-black-500">
          {articleTitle}
        </h3>
        <p className="mt-4 leading-6 text-xs font-extralight lg:text-base text-gray-400">
          Por Compille
        </p>
      </div>
      <button type="button" className="primary-btn mt-6 w-36">
        Leia Mais
      </button>
    </div>
  </div>
)

export default function Home() {
  return (
    <div>
      <section
        className="py-24 bg-local bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.5) 100%), url('/img/hero.jpg')"
        }}
      >
        <Container>
          <div className="w-1/2 py-12 px-12 flex-col">
            <h1 className="text-gray-50 leading-tight font-bold text-5xl">
              Encontre agora Advogados e Correspondentes Júridicos para suas
              audiências
            </h1>
            <p className="mt-2 font-extralight text-gray-50 text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              vitae pulvinar nisi, vel elementum nisl. Phasellus vitae tincidunt
              orci.
            </p>
            {/* <Link href="/cadastro-departamentos-juridico">
              <button type="button" className="primary-btn mt-6 ">
                ENCONTRE AGORA
              </button>
            </Link> */}
          </div>
        </Container>
      </section>

      <Container>
        <section className="lg:mt-6 xl:-mt-24 w-full grid grid-cols-1 grid-rows-3 gap-4 mt-10 lg:grid-cols-3 lg:grid-rows-1">
          <Card
            headingText="Para correspondentes jurídicos"
            paragraphText="Cadastre-se como Advogado ou Correspondente Jurídico e receba diligências e audiências na sua cidade."
            buttonText="CADASTRE-SE AGORA"
            link="/cadastro-advogados-correspondentes-juridicos"
          />
          <Card
            headingText="Para departamentos jurídicos"
            paragraphText="Encontre agora Advogados e Correspondentes Jurídicos qualificados para a sua demanda jurídica."
            buttonText="CADASTRE SEU ESCRITÓRIO"
            link="/cadastro-departamentos-juridico"
          />
          <Card
            headingText="Para quem busca orientação jurídica"
            paragraphText="Conecte-se aos advogados da sua cidade."
            buttonText="CADASTRE SUA EMPRESA"
            link="/cadastro-departamentos-juridico"
          />
        </section>
      </Container>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-2  text-blue-500">
              Pitchfork Kickstarter Taxidermy
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Shooting Stars
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  The Catalyzer
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Neptune
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Melanchole
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Bunker
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Ramona Falls
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="mt-6 bg-gradient-to-b from-blue-500 to-indigo-600 w-full py-36 h-4/5">
        <Container>
          <div className="flex flex-col justify-between items-center">
            <h2 className="text-white font-medium text-4xl">
              Comunidade Compille
            </h2>
            <p className="mt-4 text-white font-light text-lg">
              Os Advogados e Correspondentes Jurídicos mais bem avaliados na
              nossa comunidade são destacados.
            </p>

            <div className="mt-6 w-4/6">
              <div className="mb-4 bg-white flex items-center rounded-lg p-6 w-full">
                <img
                  className="flex-shrink-0 flex-grow-0 w-14 h-14 rounded-full mr-4 border border-gray-200"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=256&amp;h=256"
                  alt=""
                />
                <div>
                  <a className="text-blue-500 font-medium" href="#">
                    Guilherme Corrêa
                  </a>
                  <p className="text-gray-400 text-sm">Advogado, PE</p>
                  <div className="flex">
                    <FaStar className="text-yellow-400" />
                    <p className="ml-1 text-yellow-400 text-sm">
                      5,0 - 99+ Avaliaçoes
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4 bg-white flex rounded-lg p-6 w-full">
                <img
                  className="flex-shrink-0 flex-grow-0 w-14 h-14 rounded-full mr-4 border border-gray-200"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=256&amp;h=256"
                  alt=""
                />
                <div>
                  <a className="text-blue-500 font-medium" href="#">
                    Guilherme Corrêa
                  </a>
                  <p className="text-gray-400 text-sm">Advogado, PE</p>
                  <div className="flex">
                    <FaStar className="text-yellow-400" />
                    <p className="ml-1 text-yellow-400 text-sm">
                      5,0 - 99+ Avaliaçoes
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4 bg-white flex rounded-lg p-6 w-full">
                <img
                  className="flex-shrink-0 flex-grow-0 w-14 h-14 rounded-full mr-4 border border-gray-200"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=256&amp;h=256"
                  alt=""
                />
                <div>
                  <a className="text-blue-500 font-medium" href="#">
                    Guilherme Corrêa
                  </a>
                  <p className="text-gray-400 text-sm">Advogado, PE</p>
                  <div className="flex">
                    <FaStar className="text-yellow-400" />
                    <p className="ml-1 text-yellow-400 text-sm">
                      5,0 - 99+ Avaliaçoes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/profissionais">
              <button type="button" className="mt-10 secondary-btn">
                VEJA MAIS PROFISSIONAIS
              </button>
            </Link>
          </div>
        </Container>
      </section> */}

      <section className="py-36 h-4/5">
        <Container>
          <div className="flex flex-col justify-between items-center">
            <h2 className="text-blue-500 font-semibold text-4xl">
              Artigos do Blog
            </h2>

            <div className="mt-16 w-full grid grid-cols-1 grid-rows-3 gap-4 lg:grid-cols-3 lg:grid-rows-1">
              <BlogArticleCard
                articleImage="/img/hero.jpg"
                articleTitle="Título do Artigo 1"
              />
              <BlogArticleCard
                articleImage="/img/hero.jpg"
                articleTitle="Título do Artigo 2"
              />
              <BlogArticleCard
                articleImage="/img/hero.jpg"
                articleTitle="Título do Artigo 3"
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
