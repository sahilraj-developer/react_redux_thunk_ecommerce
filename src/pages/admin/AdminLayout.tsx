import { NavLink, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="portal">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Admin portal</p>
          <h2>Operations</h2>
        </div>
        <nav className="sidebar__links">
          <NavLink to="/admin" end>
            Overview
          </NavLink>
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/customers">Customers</NavLink>
          <NavLink to="/admin/sales">Sales</NavLink>
          <NavLink to="/admin/reports">Reports</NavLink>
        </nav>
        <div className="sidebar__card">
          <p className="muted">Security checks enabled</p>
          <p>Admin login only at /admin/login</p>
        </div>
      </aside>
      <section className="portal__main">
        <Outlet />
      </section>
    </div>
  )
}

export default AdminLayout
