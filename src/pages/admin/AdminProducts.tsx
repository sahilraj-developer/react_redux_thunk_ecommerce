import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api'
import { useAppSelector } from '../../store/hooks'
import type { Product } from '../../types'

const AdminProducts = () => {
  const token = useAppSelector((state) => state.auth.token)
  const [pending, setPending] = useState<Product[]>([])
  const [note, setNote] = useState('')

  const load = async () => {
    if (!token) return
    const result = await apiRequest<{ items: Product[] }>('/products?status=pending', { token, toastOnSuccess: false })
    setPending(result.data?.items ?? [])
  }

  useEffect(() => {
    load()
  }, [token])

  const approve = async (id: string) => {
    if (!token) return
    await apiRequest(`/products/${id}/approve`, { method: 'PATCH', body: { note }, token })
    await load()
  }

  const reject = async (id: string) => {
    if (!token) return
    await apiRequest(`/products/${id}/reject`, { method: 'PATCH', body: { note }, token })
    await load()
  }

  return (
    <div className="portal__content">
      <section className="section">
        <div className="section__header">
          <div>
            <p className="eyebrow">Catalog control</p>
            <h1>Pending products</h1>
            <p className="muted">Approve vendor listings before they appear in the storefront.</p>
          </div>
        </div>

        <label className="field">
          Admin note (optional)
          <input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add feedback for vendor" />
        </label>

        <div className="card-grid">
          {pending.map((product) => (
            <article className="card" key={product._id}>
              <h4>{product.name}</h4>
              <p className="muted">{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <div className="card__actions">
                <button className="btn btn--mini" onClick={() => approve(product._id)}>
                  Approve
                </button>
                <button className="btn btn--ghost" onClick={() => reject(product._id)}>
                  Reject
                </button>
              </div>
            </article>
          ))}
          {!pending.length && <p className="muted">No pending products right now.</p>}
        </div>
      </section>
    </div>
  )
}

export default AdminProducts
