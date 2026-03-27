import { useEffect, useState } from 'react'
import { apiRequest } from '../../lib/api'
import { useAppSelector } from '../../store/hooks'
import type { Product } from '../../types'

const VendorProducts = () => {
  const token = useAppSelector((state) => state.auth.token)
  const [products, setProducts] = useState<Product[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [inventory, setInventory] = useState(0)
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const load = async () => {
    if (!token) return
    const result = await apiRequest<{ items: Product[] }>('/products/vendor', { token, toastOnSuccess: false })
    setProducts(result.data?.items ?? [])
  }

  useEffect(() => {
    load()
  }, [token])

  const uploadImage = async (file: File): Promise<string> => {
    if (!token) {
      throw new Error('Please log in to upload images')
    }
    const signatureResponse = await apiRequest<{
      timestamp: number
      signature: string
      cloudName: string
      apiKey: string
    }>('/uploads/signature', { method: 'POST', token })

    const data = new FormData()
    data.append('file', file)
    data.append('api_key', signatureResponse.data!.apiKey)
    data.append('timestamp', signatureResponse.data!.timestamp.toString())
    data.append('signature', signatureResponse.data!.signature)

    const upload = await fetch(
      `https://api.cloudinary.com/v1_1/${signatureResponse.data!.cloudName}/image/upload`,
      {
        method: 'POST',
        body: data,
      }
    )

    const payload = (await upload.json()) as { secure_url?: string; error?: { message?: string } }
    if (!upload.ok) {
      throw new Error(payload?.error?.message ?? 'Upload failed')
    }

    if (!payload.secure_url) {
      throw new Error('Upload failed')
    }

    return payload.secure_url
  }

  const handleFiles = async (files: FileList | null) => {
    if (!files || !token) return
    try {
      setUploading(true)
      const uploaded: string[] = []
      for (const file of Array.from(files)) {
        const url = await uploadImage(file)
        uploaded.push(url)
      }
      setImages((prev) => [...prev, ...uploaded])
    } finally {
      setUploading(false)
    }
  }

  const submit = async () => {
    if (!token) return
    if (editingId) {
      await apiRequest(`/products/${editingId}`, {
        method: 'PATCH',
        token,
        body: { name, description, price, inventory, images },
      })
    } else {
      await apiRequest('/products', {
        method: 'POST',
        token,
        body: { name, description, price, inventory, images },
      })
    }
    setName('')
    setDescription('')
    setPrice(0)
    setInventory(0)
    setImages([])
    setEditingId(null)
    await load()
  }

  return (
    <div className="portal__content">
      <section className="section">
        <div className="section__header">
          <div>
            <p className="eyebrow">Vendor catalog</p>
            <h1>{editingId ? 'Update product' : 'Submit products'}</h1>
            <p className="muted">Uploads go through admin approval before going live.</p>
          </div>
        </div>
        <div className="form-grid">
          <label>
            Product name
            <input value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            Description
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
          </label>
          <label>
            Price
            <input type="number" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
          </label>
          <label>
            Inventory
            <input type="number" value={inventory} onChange={(event) => setInventory(Number(event.target.value))} />
          </label>
          <label>
            Upload images
            <input type="file" multiple onChange={(event) => handleFiles(event.target.files)} />
            {uploading && <p className="muted">Uploading to Cloudinary...</p>}
          </label>
          <div className="image-grid">
            {images.map((img) => (
              <img key={img} src={img} alt="Uploaded" />
            ))}
          </div>
          <button className="btn btn--primary" onClick={submit}>
            {editingId ? 'Request update' : 'Submit for approval'}
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <div>
            <h2>Your products</h2>
            <p className="muted">Track approval status and admin notes.</p>
          </div>
        </div>
        <div className="card-grid">
          {products.map((product) => (
            <article className="card" key={product._id}>
              <h4>{product.name}</h4>
              <p className="muted">Status: {product.status}</p>
              {product.approvalNote && <p className="muted">Admin note: {product.approvalNote}</p>}
              <p className="price">${product.price.toFixed(2)}</p>
              <button
                className="btn btn--mini"
                onClick={() => {
                  setEditingId(product._id)
                  setName(product.name)
                  setDescription(product.description)
                  setPrice(product.price)
                  setInventory(product.inventory)
                  setImages(product.images ?? [])
                }}
              >
                Request update
              </button>
            </article>
          ))}
          {!products.length && <p className="muted">No products yet.</p>}
        </div>
      </section>
    </div>
  )
}

export default VendorProducts
