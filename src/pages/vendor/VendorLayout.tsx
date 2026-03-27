import { NavLink, Outlet } from 'react-router-dom'

const VendorLayout = () => {
  return (
    <div className="portal portal--vendor">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Vendor portal</p>
          <h2>Seller HQ</h2>
        </div>
        <nav className="sidebar__links">
          <NavLink to="/vendor" end>
            Overview
          </NavLink>
          <NavLink to="/vendor/products">Products</NavLink>
          <NavLink to="/vendor/reports">Notifications</NavLink>
        </nav>
        <div className="sidebar__card">
          <p className="muted">Grow with visibility</p>
          <p>Upload new SKUs and track approval feedback.</p>
        </div>
      </aside>
      <section className="portal__main">
        <Outlet />
      </section>
    </div>
  )
}

export default VendorLayout
