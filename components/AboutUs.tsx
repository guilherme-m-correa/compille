import Container from './Container'

const AboutUsSection = () => {
  return (
    <section id="sobre-nos" className="mt-6 py-36">
      <Container>
        <div className="flex flex-col justify-between items-center">
          <h2 className="text-blue-500 font-semibold text-4xl">Sobre Nós</h2>
        </div>

        <p className="mt-12 text-gray-400 text-lg">
          A Compille é fruto de uma necessidade eminente da sociedade em
          otimizar as relações negociais de forma segura, bem como da
          democratização do acesso a serviços jurídicos e de contabilidade.
        </p>
        <p className="mt-4 text-gray-400 text-lg">
          Nesse primeiro momento nos apresentamos como uma empresa digital e com
          ferramentas de tecnologia que possibilitam o encontro das sociedades
          empresariais, das sociedades de advocacia, da sociedade civil com um
          nicho de serviços especializados no âmbito jurídico e contábil.
        </p>
        <p className="mt-4 text-gray-400 text-lg">
          A nossa missão é facilitar o acesso de forma ágil, segura e eficiente
          a uma gama de serviços ainda muito incipiente nesse novo mundo
          digital.
        </p>
      </Container>
    </section>
  )
}

export default AboutUsSection
