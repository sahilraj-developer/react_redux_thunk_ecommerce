import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { apiRequest } from '../lib/api'
import { addToCart } from '../lib/cart'
import type { Product } from '../types'

const CustomerHome = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await apiRequest<{ items: Product[] }>('/products?status=approved', { toastOnSuccess: false })
        setProducts(result.data?.items ?? [])
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <main className="page">
      <section className="hero hero--store">
        <div>
          <p className="eyebrow">ShopSwift storefront</p>
          <h1>Discover products curated by verified vendors.</h1>
          <p className="muted">
            Browse approved listings, check real reviews, and check out in a few clicks.
          </p>
        </div>
        <div className="hero__panel">
          <div className="panel">
            <p className="panel__label">Live catalog</p>
            <h3>{products.length} products ready to ship</h3>
            <p className="muted">Only admin-approved items are visible.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <div>
            <h2>Customer picks</h2>
            <p className="muted">Tap a product to view details, images, and reviews.</p>
          </div>
        </div>

        {loading ? (
          <p className="muted">Loading products...</p>
        ) : (
          <div className="card-grid">
            {products.map((product) => (
              <article className="card product" key={product._id}>
                <div className="product__image">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} />
                  ) : (
                    <div className="placeholder">No image</div>
                  )}
                </div>
                <div>
                  <h4>{product.name}</h4>
                  <p className="muted">{product.description}</p>
                  <p className="price">${product.price.toFixed(2)}</p>
                </div>
                <div className="product__actions">
                  <Link className="btn btn--mini" to={`/products/${product._id}`}>
                    View
                  </Link>
                  <button
                    className="btn btn--ghost"
                    onClick={() => {
                      addToCart(product)
                      toast.success('Added to cart')
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default CustomerHome
