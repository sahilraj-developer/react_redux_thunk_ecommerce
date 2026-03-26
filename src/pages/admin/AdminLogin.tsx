import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const AdminLogin = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.auth.status)
  const error = useAppSelector((state) => state.auth.error)
  const navigate = useNavigate()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const result = await dispatch(login({ name, role: 'admin', password }))
    if (login.fulfilled.match(result)) {
      navigate('/admin', { replace: true })
    }
  }

  return (
    <main className="page page--center">
      <section className="auth">
        <div>
          <p className="eyebrow">Admin access</p>
          <h1>Admin sign in</h1>
          <p className="muted">Use password: admin123</p>
        </div>
        <form className="auth__form" onSubmit={onSubmit}>
          <label>
            Full name
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Admin" />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••"
            />
          </label>
          {error && <div className="alert alert--error">{error}</div>}
          <button className="btn btn--primary" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing in...' : 'Enter dashboard'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default AdminLogin
