import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api'
import { useAppSelector } from '../../store/hooks'

type UserSummary = {
  id: string
  name: string
  email: string
  role: string
}

const AdminCustomers = () => {
  const token = useAppSelector((state) => state.auth.token)
  const [customers, setCustomers] = useState<UserSummary[]>([])
  const [vendors, setVendors] = useState<UserSummary[]>([])

  useEffect(() => {
    const load = async () => {
      if (!token) return
      const customerData = await apiRequest<UserSummary[]>('/users?role=customer', { token, toastOnSuccess: false })
      const vendorData = await apiRequest<UserSummary[]>('/users?role=vendor', { token, toastOnSuccess: false })
      setCustomers(customerData.data ?? [])
      setVendors(vendorData.data ?? [])
    }
    load()
  }, [token])

  return (
    <div className="portal__content">
      <section className="section">
        <div className="section__header">
          <div>
            <p className="eyebrow">People management</p>
            <h1>Customers & vendors</h1>
            <p className="muted">Monitor platform participants and send notifications from Admin Reports.</p>
          </div>
        </div>
        <div className="split">
          <div>
            <h3>Customers</h3>
            {customers.map((user) => (
              <div className="row" key={user.id}>
                <div>
                  <p>{user.name}</p>
                  <p className="muted">{user.email}</p>
                </div>
                <span className="chip">{user.role}</span>
              </div>
            ))}
            {!customers.length && <p className="muted">No customers yet.</p>}
          </div>
          <div>
            <h3>Vendors</h3>
            {vendors.map((user) => (
              <div className="row" key={user.id}>
                <div>
                  <p>{user.name}</p>
                  <p className="muted">{user.email}</p>
                </div>
                <span className="chip">{user.role}</span>
              </div>
            ))}
            {!vendors.length && <p className="muted">No vendors yet.</p>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminCustomers
