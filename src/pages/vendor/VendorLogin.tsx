import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const VendorLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.auth.status)
  const error = useAppSelector((state) => state.auth.error)
  const navigate = useNavigate()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const result = await dispatch(login({ email, role: 'vendor', password }))
    if (login.fulfilled.match(result)) {
      navigate('/vendor', { replace: true })
    }
  }

  return (
    <main className="page page--center">
      <section className="auth">
        <div>
          <p className="eyebrow">Vendor access</p>
          <h1>Vendor sign in</h1>
          <p className="muted">Use email: vendor@shopswift.com · password: vendor123</p>
        </div>
        <form className="auth__form" onSubmit={onSubmit}>
          <label>
            Email address
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="vendor@shopswift.com"
              autoComplete="email"
            />
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
            {status === 'loading' ? 'Signing in...' : 'Enter vendor HQ'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default VendorLogin
