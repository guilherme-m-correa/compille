import Container from './Container'

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

const BlogSection = () => {
  return (
    <section id="blog" className="py-20 bg-blue-500 h-4/5">
      <Container>
        <div className="flex flex-col justify-between items-center">
          <h2 className="text-white font-semibold text-4xl">Artigos do Blog</h2>

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
  )
}

export default BlogSection
