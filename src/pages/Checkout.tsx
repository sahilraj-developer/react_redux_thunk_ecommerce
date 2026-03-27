import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { apiRequest } from '../lib/api'
import { clearCart, getCart, removeFromCart, updateCartQuantity } from '../lib/cart'
import { useAppSelector } from '../store/hooks'
import type { OrderItem } from '../types'

const Checkout = () => {
  const token = useAppSelector((state) => state.auth.token)
  const user = useAppSelector((state) => state.auth.user)
  const [items, setItems] = useState<OrderItem[]>([])
  const [email, setEmail] = useState('')

  useEffect(() => {
    setItems(getCart())
  }, [])

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  )

  const submitOrder = async () => {
    if (!token) {
      toast.error('Please log in to complete purchase')
      return
    }
    if (!items.length) {
      toast.error('Cart is empty')
      return
    }
    await apiRequest('/orders', {
      method: 'POST',
      body: { items, email: email || user?.email },
      token,
    })
    clearCart()
    setItems([])
  }

  return (
    <main className="page">
      <section className="section">
        <div className="section__header">
          <div>
            <h1>Checkout</h1>
            <p className="muted">Review your cart and place the order.</p>
          </div>
        </div>

        <div className="cart">
          <div className="cart__items">
            {items.map((item) => (
              <div className="cart__item" key={item.productId}>
                <div>
                  <h4>{item.name}</h4>
                  <p className="muted">${item.price.toFixed(2)} each</p>
                </div>
                <div className="cart__controls">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) => {
                      const next = Number(event.target.value)
                      const updated = updateCartQuantity(item.productId, next)
                      setItems(updated)
                    }}
                  />
                  <button
                    className="btn btn--ghost"
                    onClick={() => {
                      const updated = removeFromCart(item.productId)
                      setItems(updated)
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {!items.length && <p className="muted">Your cart is empty.</p>}
          </div>
          <div className="cart__summary">
            <h3>Order summary</h3>
            <p className="muted">Total items: {items.length}</p>
            <p className="price">${total.toFixed(2)}</p>
            <label>
              Receipt email
              <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" />
            </label>
            <button className="btn btn--primary" onClick={submitOrder}>
              Place order
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Checkout
