import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { apiRequest } from '../lib/api'
import { addToCart } from '../lib/cart'
import { useAppSelector } from '../store/hooks'
import type { Order, Product, Review } from '../types'

const ProductDetails = () => {
  const { id } = useParams()
  const token = useAppSelector((state) => state.auth.token)
  const user = useAppSelector((state) => state.auth.user)
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [activeImage, setActiveImage] = useState(0)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [hasPurchased, setHasPurchased] = useState(false)
  const existingReview = reviews.find((review) => review.customerId === user?.id)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const products = await apiRequest<{ items: Product[] }>(`/products?status=approved`, { toastOnSuccess: false })
      const current = products.data?.items.find((item) => item._id === id) ?? null
      setProduct(current)

      const reviewData = await apiRequest<Review[]>(`/products/${id}/reviews`, { toastOnSuccess: false })
      setReviews(reviewData.data ?? [])

      if (token && user?.role === 'customer') {
        const orders = await apiRequest<Order[]>('/orders', { token, toastOnSuccess: false })
        const purchased = (orders.data ?? []).some((order) =>
          order.items.some((item) => item.productId === id)
        )
        setHasPurchased(purchased)
      }
    }
    load()
  }, [id, token, user?.role])

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating)
      setComment(existingReview.comment)
    }
  }, [existingReview])

  const submitReview = async () => {
    if (!id || !token) return
    if (existingReview) {
      await apiRequest(`/reviews/${existingReview._id}`, {
        method: 'PATCH',
        body: { rating, comment },
        token,
      })
    } else {
      await apiRequest(`/products/${id}/reviews`, {
        method: 'POST',
        body: { rating, comment },
        token,
      })
    }
    const reviewData = await apiRequest<Review[]>(`/products/${id}/reviews`, { toastOnSuccess: false })
    setReviews(reviewData.data ?? [])
  }

  if (!product) {
    return (
      <main className="page">
        <p className="muted">Product not found.</p>
      </main>
    )
  }

  return (
    <main className="page">
      <section className="product-detail">
        <div className="product-detail__gallery">
          <div className="gallery__main">
            {product.images?.[activeImage] ? (
              <img src={product.images[activeImage]} alt={product.name} />
            ) : (
              <div className="placeholder">No image</div>
            )}
          </div>
          <div className="gallery__thumbs">
            {product.images?.length ? (
              product.images.map((img, index) => (
                <button
                  key={img}
                  className={index === activeImage ? 'thumb thumb--active' : 'thumb'}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))
            ) : (
              <span className="muted">Add images to view gallery.</span>
            )}
          </div>
        </div>
        <div className="product-detail__info">
          <p className="eyebrow">Vendor verified</p>
          <h1>{product.name}</h1>
          <p className="muted">{product.description}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <div className="product-detail__actions">
            <button
              className="btn btn--primary"
              onClick={() => {
                addToCart(product)
                toast.success('Added to cart')
              }}
            >
              Add to cart
            </button>
            <Link className="btn btn--ghost" to="/checkout">
              Go to checkout
            </Link>
          </div>
          <div className="product-detail__meta">
            <span>Inventory: {product.inventory}</span>
            <span>Status: {product.status}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <div>
            <h2>Customer reviews</h2>
            <p className="muted">Verified buyers only.</p>
          </div>
        </div>

        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review" key={review._id}>
              <div className="review__rating">{review.rating} / 5</div>
              <p>{review.comment}</p>
            </article>
          ))}
        </div>

        {user?.role === 'customer' && hasPurchased && (
          <div className="review-form">
            <h3>{existingReview ? 'Update your review' : 'Leave a review'}</h3>
            <label>
              Rating
              <input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
              />
            </label>
            <label>
              Comment
              <textarea value={comment} onChange={(event) => setComment(event.target.value)} />
            </label>
            <button className="btn btn--primary" onClick={submitReview}>
              {existingReview ? 'Update review' : 'Submit review'}
            </button>
          </div>
        )}

        {user?.role === 'customer' && !hasPurchased && (
          <p className="muted">Purchase this product to leave a review.</p>
        )}
      </section>
    </main>
  )
}

export default ProductDetails
