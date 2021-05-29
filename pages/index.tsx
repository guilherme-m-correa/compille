import Link from 'next/link'
import Container from '../components/Container'
import ContactUs from '../components/ContactUs'
import AboutUs from '../components/AboutUs'
import BlogSection from '../components/BlogSection'
import HowItWorks from '../components/HowItWorks'

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
              Encontre agora Advogados e Correspondentes Jurídicos para suas
              Audiências
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
            headingText="Para Correspondentes Autônomos"
            paragraphText="Cadastre-se como Advogado ou Correspondente Jurídico e receba diligências e audiências na sua cidade."
            buttonText="CADASTRE-SE AGORA"
            link="/cadastro-advogados-correspondentes-juridicos"
          />
          <Card
            headingText="Para Escritórios de Advocacia"
            paragraphText="Cadastre-se como Escritório e receba diligências e audiências na sua cidade."
            buttonText="CADASTRE SEU ESCRITÓRIO"
            link="/cadastro-advogados-correspondentes-juridicos"
          />
          <Card
            headingText="Para Departamentos Jurídicos"
            paragraphText="Encontre agora Advogados e Correspondentes Jurídicos qualificados para a sua demanda jurídica."
            buttonText="CADASTRE SUA EMPRESA"
            link="/cadastro-departamentos-juridico"
          />
        </section>
      </Container>

      <AboutUs />
      <HowItWorks />
      <BlogSection />
      <ContactUs />
    </div>
  )
}
