import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/v1'

export type ApiResult<T> = {
  success: boolean
  message: string
  data?: T
}

export const apiRequest = async <T>(
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
    body?: unknown
    token?: string | null
    toastOnSuccess?: boolean
  } = {}
) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const payload = (await response.json()) as ApiResult<T>
  if (!response.ok) {
    toast.error(payload?.message ?? 'Something went wrong')
    throw new Error(payload?.message ?? 'Request failed')
  }

  if (options.toastOnSuccess !== false) {
    toast.success(payload?.message ?? 'Success')
  }

  return payload
}
