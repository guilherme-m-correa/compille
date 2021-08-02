import Link from 'next/link'
import Container from '../components/Container'
import ContactUs from '../components/ContactUs'

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
  <div className="relative lg:max-w-md z-10 flex flex-col justify-between p-12 bg-white shadow-xl rounded-md">
    <div>
      <h3 className="text-xl lg:text-2xl tracking-wide font-semibold text-blue-500">
        {headingText}
      </h3>
      <p className="mt-4 leading-6 text-sm lg:text-base text-gray-400">
        {paragraphText}
      </p>
    </div>
    <Link href={link}>
      <button type="button" className="primary-btn mt-6 max-w-72">
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
  <div className="flex flex-col justify-between bg-white shadow-xl rounded-md">
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
              Compille: Ressignificando a Advocacia
            </h1>
            <p className="mt-2 font-light text-gray-50 text-2xl">
              Conexão jurídica - Agenda - Contabilidade - Shopping de documentos
              (em breve) - Cursos jurídicos (em breve). Tudo em um só lugar!
              Cadastre-se e faça parte da nossa comunidade.
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
            headingText="Para Advogados Autônomos"
            paragraphText="Cadastre-se como advogado autônomo ou correspondente jurídico."
            buttonText="CADASTRE-SE AGORA"
            link="/cadastro-advogados-correspondentes-juridicos"
          />
          <Card
            headingText="Para Escritórios de Advocacia"
            paragraphText="Cadastre-se como escritório de advocacia e tenha acesso aos profissionais."
            buttonText="CADASTRE SEU ESCRITÓRIO"
            link="/cadastro-advogados-correspondentes-juridicos"
          />
          <Card
            headingText="Para Departamentos Jurídicos"
            paragraphText="Encontre agora profissionais qualificados para sua demanda jurídica."
            buttonText="CADASTRE SUA EMPRESA"
            link="/cadastro-departamentos-juridico"
          />
        </section>
      </Container>

      <section id="sobre-nos" className="mt-6 py-20 bg-blue-500">
        <Container>
          <div className="flex flex-col justify-between items-center">
            <h2 className="text-white font-semibold text-4xl">Sobre Nós</h2>
          </div>

          <p className="mt-12 text-white text-lg">
            A compile nasce com o propósito de encurtar distâncias e criar uma{' '}
            <strong>grande</strong> rede de profissionais da área jurídica.
          </p>
          <p className="mt-4 text-white text-lg">
            Não pretendemos ser mais um site de correspondentes jurídicos, mas
            sim, uma comunidade jurídica voltada a oferecer aos profissionais
            ferramentas para facilitação de sua atividade profissional.
          </p>
          <p className="mt-4 text-white text-lg">
            <strong>Interligando</strong> advogados, por meio de sistema de
            busca de profissionais em diferentes regiões, buscamos encurtar
            caminhos. Disponibilizando <strong>agenda</strong> com possibilidade
            de cadastramento de eventos com geolocalização, pretendemos otimizar
            o tempo do profissional. Oferecendo serviço de{' '}
            <strong>contabilidade</strong>, procuramos ser um facilitador da
            gestão financeira. <strong>Viabilizando</strong> um shopping de
            documentos garantiremos a obtenção de um amplo leque de documentos,
            sem a necessidade de deslocamento do profissional.
          </p>
          <p className="mt-4 text-white text-lg">E muito mais!</p>
        </Container>
      </section>
      <section id="como-funciona" className="mt-6 py-20">
        <Container>
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="text-blue-500 font-semibold text-4xl">
              Como Funciona
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 h-full rounded-lg">
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-4">
                  Interligando profissionais
                </h2>
                <p className="leading-relaxed text-base">
                  A conexão entre profissionais cadastrados em nosso banco de
                  dados serve como ferramenta de conexão jurídica. Solicite
                  serviços de profissionais em regiões fora de sua área de
                  atuação de forma rápida. Saiba mais clicando aqui.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 h-full rounded-lg">
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-4">
                  Agenda profissional com geolocalização
                </h2>
                <p className="leading-relaxed text-base">
                  Sabemos que o profissional da área jurídica possui uma vasta
                  quantidade de compromissos. Pensando nisso, disponibilizamos
                  uma agenda com geolocalização. A vantagem da sua utilização é
                  que o nosso buscador de profissionais priorizará aquele que
                  esteja com compromisso próximo à diligência necessária,
                  otimizando o seu tempo. Saiba mais clicando aqui.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 h-full rounded-lg">
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-4">
                  Contabilidade
                </h2>
                <p className="leading-relaxed text-base">
                  Serviço essencial e necessário a todo profissional, é a
                  contabilidade. Disponibilizamos, de forma integrada à
                  plataforma, diversos pacotes de contabilidade, com custo bem
                  reduzido. Saiba mais clicando aqui.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 h-full rounded-lg">
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-4">
                  Shopping de documentos (em breve)
                </h2>
                <p className="leading-relaxed text-base">
                  Sabe aquele rol de documentos que seu cliente precisará para
                  adquirir um imóvel. Adquira todos diretamente da nossa
                  plataforma! Saiba mais clicando aqui.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 h-full rounded-lg">
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-4">
                  Capacitação jurídica (em breve)
                </h2>
                <p className="leading-relaxed text-base">
                  Disponibilizaremos na nossa plataforma uma diversa gama de
                  artigos e cursos jurídicos, de modo a manter uma capacitação
                  constante dos profissionais cadastrados. Saiba mais clicando
                  aqui.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 h-full rounded-lg">
                <h2 className="text-lg text-gray-900 font-semibold title-font mb-4">
                  Notícias jurídicas
                </h2>
                <p className="leading-relaxed text-base">
                  Compilaremos notícias jurídicas disponibilizadas pelos mais
                  diversos sites, de modo a manter os profissionais sempre
                  atualizados com a cena jurídica.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-6 py-20 bg-blue-500">
        <Container>
          <div className="flex flex-col justify-between items-center">
            <h2 className="text-white font-semibold text-4xl">
              Interligando profissionais
            </h2>
          </div>

          <p className="mt-12 text-white text-lg">
            Cadastrando-se como <strong>profissional autônomo </strong>no nosso
            site você estará disponível para formar novas conexões, podendo ser
            contactado para realizar diligência de um escritório ou departamento
            jurídico de grandes empresas, localizados em outra região.
          </p>
          <p className="mt-4 text-white text-lg">
            A diligência será paga diretamente através da nossa plataforma e os
            valores serão transferidos assim que houver a confirmação da
            realização da diligência.
          </p>
          <p className="mt-4 text-white text-lg">E o melhor!</p>
          <p className="mt-4 text-white text-lg">
            O cadastramento para recebimento de diligência não tem qualquer
            custo! Será cobrada apenas uma taxa, após cada diligência.
          </p>
          <p className="mt-4 text-white text-lg">
            Já, se você é um <strong>escritório de advocacia</strong> ou{' '}
            <strong>departamento jurídico</strong> e deseja ter acesso aos
            profissionais cadastrados, basta que preencha as necessidades que
            buscaremos, dentro do nosso rol de profissionais, aqueles que
            mostrem um perfil mais próximo do desejado.
          </p>
        </Container>
      </section>

      <section className="py-20  h-4/5">
        <Container>
          <div className="flex flex-col justify-between items-center">
            <h2 className="text-blue-500 font-semibold text-4xl">
              Agenda profissional com geolocalização
            </h2>

            <p className="mt-4 text-lg">
              Sabemos que tempo é hoje um dos bens mais valiosos que podemos
              ter. Na medida em que o profissional passa a se utilizar da agenda
              disponibilizada na plataforma, cadastrando regularmente seus
              compromissos, ao ser feita uma busca de profissionais para
              realizar uma determinada diligência, observaremos aqueles
              profissionais que estarão mais próximos da diligência a ser
              cumprida, minimizando deslocamentos e otimizando o tempo.
            </p>
          </div>
        </Container>
      </section>

      <section id="blog" className="py-20 bg-blue-500 h-4/5">
        <Container>
          <div className="flex flex-col justify-between items-center">
            <h2 className="text-white font-semibold text-4xl">
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
      <ContactUs />
    </div>
  )
}
