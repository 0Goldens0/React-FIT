import type { Brand, BrandProduct } from './brandsData'
import { BrandCategoriesCatalog } from '../BrandCategoriesCatalog/BrandCategoriesCatalog'

type BrandSlideProps = {
  brand: Brand
  products: BrandProduct[]
  /** standalone = для страницы бренда (без full-screen геометрии и скрытия контента) */
  standalone?: boolean
}

export default function BrandSlide({ brand, products, standalone }: BrandSlideProps) {
  const bgText = encodeURIComponent(brand.displayName)

  return (
    <section className={`brand-section ${standalone ? 'standalone' : ''}`} id={`brand-${brand.id}`}>
      <div
        className="parallax-bg"
        style={{
          backgroundImage: `url('https://placehold.co/1920x1080/${brand.parallaxBgColor.substring(1)}/${brand.parallaxFgColor.substring(1)}?text=${bgText}&font=Inter')`,
        }}
      />

      <div className="brand-content">
        <div className="brand-logo-journey">
          <img src={brand.logo} alt={`Логотип ${brand.id}`} />
        </div>
        <p className="brand-description">{brand.description}</p>
      </div>

      <div className="journey-brand-products">
        {products.map((product) => (
          <div key={product.article} className="journey-product-card product-card-slider-item">
            <div className="journey-product-card-image-container">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info-container">
              <div className="product-category">{product.category}</div>
              <h4 className="product-name" style={{ textTransform: 'none' }}>
                {product.name}
              </h4>
              <div className="product-article">Артикул: {product.article}</div>
              <button className="product-detail-btn" style={{ backgroundColor: brand.primaryColor }}>
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>

      {standalone && (
        <div className="brand-catalog-wrapper">
          <h2 className="brand-catalog-title">Каталог товаров {brand.displayName}</h2>
          <p className="brand-catalog-subtitle">Выберите категорию для просмотра ассортимента</p>
          <BrandCategoriesCatalog
            brandId={brand.id}
            brandDisplayName={brand.displayName}
            brandPrimaryColor={brand.primaryColor}
            compact
          />
        </div>
      )}
    </section>
  )
}


