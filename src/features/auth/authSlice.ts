import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { apiRequest } from '../../lib/api'

export type UserRole = 'guest' | 'customer' | 'admin' | 'vendor'

export type AuthUser = {
  id: string
  name: string
  role: UserRole
  email: string
}

type AuthState = {
  user: AuthUser | null
  token: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const STORAGE_KEY = 'shopswift_auth'
type StoredAuth = {
  user: AuthUser
  token: string
}

const loadStoredAuth = (): StoredAuth | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredAuth
    if (parsed?.user && parsed?.token) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

const saveStoredAuth = (payload: StoredAuth | null) => {
  try {
    if (!payload) {
      localStorage.removeItem(STORAGE_KEY)
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Ignore storage errors (private mode, disabled storage, etc.)
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; role: UserRole; password: string }) => {
    const data = await apiRequest<{ user: AuthUser; token: string }>('/auth/login', {
      method: 'POST',
      body: payload,
      toastOnSuccess: true,
    })

    return data.data as { user: AuthUser; token: string }
  }
)

const storedAuth = loadStoredAuth()

const initialState: AuthState = {
  user: storedAuth?.user ?? null,
  token: storedAuth?.token ?? null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null
      saveStoredAuth(null)
    },
    setUser(state, action: PayloadAction<{ user: AuthUser | null; token?: string | null }>) {
      state.user = action.payload.user
      state.token = action.payload.token ?? null
      if (action.payload.user && action.payload.token) {
        saveStoredAuth({ user: action.payload.user, token: action.payload.token })
      } else {
        saveStoredAuth(null)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        saveStoredAuth({ user: action.payload.user, token: action.payload.token })
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Login failed'
      })
  },
})

export const { logout, setUser } = authSlice.actions
export default authSlice.reducer
