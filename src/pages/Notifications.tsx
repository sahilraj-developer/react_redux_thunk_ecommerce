import { useEffect, useState } from 'react'
import { apiRequest } from '../lib/api'
import { useAppSelector } from '../store/hooks'
import type { NotificationItem } from '../types'

const Notifications = () => {
  const token = useAppSelector((state) => state.auth.token)
  const [items, setItems] = useState<NotificationItem[]>([])

  useEffect(() => {
    const load = async () => {
      if (!token) return
      const response = await apiRequest<NotificationItem[]>('/notifications', { token, toastOnSuccess: false })
      setItems(response.data ?? [])
    }
    load()
  }, [token])

  const markRead = async (id: string) => {
    if (!token) return
    const response = await apiRequest<NotificationItem>(`/notifications/${id}/read`, {
      method: 'PATCH',
      token,
    })
    setItems((prev) => prev.map((item) => (item._id === id ? response.data! : item)))
  }

  return (
    <main className="page">
      <section className="section">
        <div className="section__header">
          <div>
            <h1>Notifications</h1>
            <p className="muted">Updates from admin and order confirmations.</p>
          </div>
        </div>
        <div className="notification-grid">
          {items.map((item) => (
            <article className={item.read ? 'notification notification--read' : 'notification'} key={item._id}>
              <div>
                <h4>{item.title}</h4>
                <p>{item.message}</p>
              </div>
              {!item.read && (
                <button className="btn btn--mini" onClick={() => markRead(item._id)}>
                  Mark read
                </button>
              )}
            </article>
          ))}
          {!items.length && <p className="muted">No notifications yet.</p>}
        </div>
      </section>
    </main>
  )
}

export default Notifications
