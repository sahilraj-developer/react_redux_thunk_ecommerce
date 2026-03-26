import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../features/auth/authSlice'

const NavBar = () => {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()

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
        <NavLink to="/admin/login">Admin</NavLink>
        <NavLink to="/vendor/login">Vendor</NavLink>
        {!user && <NavLink to="/login">Customer login</NavLink>}
      </nav>
      <div className="nav__user">
        {user ? (
          <>
            <span className="chip">{user.name} - {user.role}</span>
            <button className="btn btn--ghost" onClick={() => dispatch(logout())}>
              Log out
            </button>
          </>
        ) : (
          <span className="chip chip--muted">Guest mode</span>
        )}
      </div>
    </header>
  )
}

export default NavBar
