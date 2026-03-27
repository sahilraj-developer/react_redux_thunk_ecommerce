import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api'
import { useAppSelector } from '../../store/hooks'
import type { Product } from '../../types'

const VendorOverview = () => {
  const token = useAppSelector((state) => state.auth.token)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const load = async () => {
      if (!token) return
      const result = await apiRequest<{ items: Product[] }>('/products/vendor', { token, toastOnSuccess: false })
      setProducts(result.data?.items ?? [])
    }
    load()
  }, [token])

  const pending = products.filter((item) => item.status === 'pending').length

  return (
    <div className="portal__content">
      <section className="section">
        <div className="section__header">
          <div>
            <p className="eyebrow">Vendor HQ</p>
            <h1>Product pipeline</h1>
            <p className="muted">Submit products and track approval status.</p>
          </div>
        </div>
        <div className="stat-grid">
          <div className="stat">
            <h3>{products.length}</h3>
            <p className="muted">Total submissions</p>
          </div>
          <div className="stat">
            <h3>{pending}</h3>
            <p className="muted">Pending approval</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VendorOverview
