import type { OrderItem, Product } from '../types'

const CART_KEY = 'shopswift_cart'

export const getCart = (): OrderItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    return JSON.parse(raw) as OrderItem[]
  } catch {
    return []
  }
}

export const saveCart = (items: OrderItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export const addToCart = (product: Product, quantity = 1) => {
  const cart = getCart()
  const existing = cart.find((item) => item.productId === product._id)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
    })
  }
  saveCart(cart)
  return cart
}

export const removeFromCart = (productId: string) => {
  const cart = getCart().filter((item) => item.productId !== productId)
  saveCart(cart)
  return cart
}

export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart = getCart().map((item) => (item.productId === productId ? { ...item, quantity } : item))
  saveCart(cart)
  return cart
}

export const clearCart = () => {
  saveCart([])
}
