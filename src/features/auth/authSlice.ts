import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type UserRole = 'guest' | 'customer' | 'admin' | 'vendor'

export type AuthUser = {
  name: string
  role: UserRole
}

type AuthState = {
  user: AuthUser | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const STORAGE_KEY = 'shopswift_auth'

const loadStoredUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

const saveStoredUser = (user: AuthUser | null) => {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_KEY)
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch {
    // Ignore storage errors (private mode, disabled storage, etc.)
  }
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { name: string; role: UserRole; password: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 650))

    if (payload.password.trim().length < 4) {
      throw new Error('Password must be at least 4 characters')
    }

    if (payload.role === 'admin' && payload.password !== 'admin123') {
      throw new Error('Invalid admin credentials')
    }

    if (payload.role === 'vendor' && payload.password !== 'vendor123') {
      throw new Error('Invalid vendor credentials')
    }

    return {
      name: payload.name || (payload.role === 'admin' ? 'Admin User' : payload.role === 'vendor' ? 'Vendor' : 'Customer'),
      role: payload.role,
    } as AuthUser
  }
)

const initialState: AuthState = {
  user: loadStoredUser(),
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.status = 'idle'
      state.error = null
      saveStoredUser(null)
    },
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload
      saveStoredUser(action.payload)
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
        state.user = action.payload
        saveStoredUser(action.payload)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Login failed'
      })
  },
})

export const { logout, setUser } = authSlice.actions
export default authSlice.reducer
