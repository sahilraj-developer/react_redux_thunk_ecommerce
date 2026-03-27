import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api'
import { useAppSelector } from '../../store/hooks'
import type { Product } from '../../types'

const AdminOverview = () => {
  const token = useAppSelector((state) => state.auth.token)
  const [pending, setPending] = useState<Product[]>([])

  useEffect(() => {
    const load = async () => {
      if (!token) return
      const result = await apiRequest<{ items: Product[] }>('/products?status=pending', { token, toastOnSuccess: false })
      setPending(result.data?.items ?? [])
    }
    load()
  }, [token])

  return (
    <div className="portal__content">
      <section className="section">
        <div className="section__header">
          <div>
            <p className="eyebrow">Admin overview</p>
            <h1>Command center</h1>
            <p className="muted">Review vendor submissions and keep customers informed.</p>
          </div>
        </div>
        <div className="stat-grid">
          <div className="stat">
            <h3>{pending.length}</h3>
            <p className="muted">Pending product approvals</p>
          </div>
          <div className="stat">
            <h3>Live</h3>
            <p className="muted">Notifications + reviews enabled</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminOverview
