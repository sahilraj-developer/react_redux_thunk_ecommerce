import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../features/auth/authSlice'

const NavBar = () => {
  const user = useAppSelector((state) => state.auth.user)
  const role = user?.role ?? 'guest'
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav__brand">
        <span className="badge">ShopSwift</span>
        <div>
          <p className="nav__title">E-Commerce Command</p>
          <p className="nav__subtitle">Customer + Admin + Vendor portals</p>
        </div>
      </div>
      <nav className="nav__links">
        <NavLink to="/" end>
          Storefront
        </NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
        {user && <NavLink to="/notifications">Notifications</NavLink>}
        {!user && <NavLink to="/login">Customer login</NavLink>}
      </nav>
      <div className="nav__user">
        {user ? (
          <>
            <span className="chip">
              {user.name} - {user.role}
            </span>
            <button className="btn btn--ghost" onClick={() => dispatch(logout())}>
              Log out
            </button>
          </>
        ) : (
          <span className="chip chip--muted">Guest mode</span>
        )}
        <div className="menu">
          <button className="btn btn--ghost" onClick={() => setOpen((prev) => !prev)}>
            Portals
          </button>
          {open && (
            <div className="menu__panel">
              <NavLink to="/admin/login" onClick={() => setOpen(false)}>
                Admin access
              </NavLink>
              <NavLink to="/vendor/login" onClick={() => setOpen(false)}>
                Vendor access
              </NavLink>
              {role === 'admin' && (
                <NavLink to="/admin" onClick={() => setOpen(false)}>
                  Admin dashboard
                </NavLink>
              )}
              {role === 'vendor' && (
                <NavLink to="/vendor" onClick={() => setOpen(false)}>
                  Vendor HQ
                </NavLink>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
