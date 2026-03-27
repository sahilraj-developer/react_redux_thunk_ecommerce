import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api'
import { useAppSelector } from '../../store/hooks'

type UserSummary = {
  id: string
  name: string
  email: string
  role: string
}

const AdminReports = () => {
  const token = useAppSelector((state) => state.auth.token)
  const [users, setUsers] = useState<UserSummary[]>([])
  const [recipientId, setRecipientId] = useState('')
  const [recipientRole, setRecipientRole] = useState<'vendor' | 'customer'>('vendor')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!token) return
      const vendorData = await apiRequest<UserSummary[]>('/users?role=vendor', { token, toastOnSuccess: false })
      const customerData = await apiRequest<UserSummary[]>('/users?role=customer', { token, toastOnSuccess: false })
      setUsers([...(vendorData.data ?? []), ...(customerData.data ?? [])])
    }
    load()
  }, [token])

  const send = async () => {
    if (!token) return
    await apiRequest('/notifications', {
      method: 'POST',
      body: { recipientId, recipientRole, title, message },
      token,
    })
    setTitle('')
    setMessage('')
  }

  return (
    <div className="portal__content">
      <section className="section">
        <div className="section__header">
          <div>
            <p className="eyebrow">Admin comms</p>
            <h1>Notifications</h1>
            <p className="muted">Send targeted messages to customers and vendors.</p>
          </div>
        </div>
        <div className="form-grid">
          <label>
            Recipient
            <select
              value={recipientId}
              onChange={(event) => {
                const value = event.target.value
                setRecipientId(value)
                const selected = users.find((user) => user.id === value)
                if (selected && (selected.role === 'vendor' || selected.role === 'customer')) {
                  setRecipientRole(selected.role)
                }
              }}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
          </label>
          <label>
            Role
            <select value={recipientRole} onChange={(event) => setRecipientRole(event.target.value as 'vendor' | 'customer')}>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </select>
          </label>
          <label>
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Message title" />
          </label>
          <label>
            Message
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
          </label>
          <button
            className="btn btn--primary"
            onClick={send}
            disabled={!recipientId || !title || !message}
          >
            Send notification
          </button>
        </div>
      </section>
    </div>
  )
}

export default AdminReports
