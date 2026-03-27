export type Product = {
  _id: string
  name: string
  description: string
  price: number
  inventory: number
  vendorId: string
  status: 'pending' | 'approved' | 'rejected'
  images: string[]
  approvalNote?: string
}

export type Review = {
  _id: string
  productId: string
  customerId: string
  rating: number
  comment: string
  createdAt: string
}

export type NotificationItem = {
  _id: string
  title: string
  message: string
  read: boolean
  createdAt: string
}

export type OrderItem = {
  productId: string
  name: string
  price: number
  quantity: number
}

export type Order = {
  _id: string
  items: OrderItem[]
  total: number
  status: string
  createdAt: string
}
