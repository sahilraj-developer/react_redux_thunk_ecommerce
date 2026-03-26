const AdminDashboard = () => {
  return (
    <main className="page">
      <section className="section">
        <div className="section__header">
          <div>
            <p className="eyebrow">Admin control</p>
            <h1>Operations dashboard</h1>
            <p className="muted">
              Manage inventory, verify orders, and coordinate fulfillment. This route is protected and requires an
              admin role.
            </p>
          </div>
          <button className="btn btn--primary">Create promotion</button>
        </div>
        <div className="stats">
          {[
            { label: 'Orders in queue', value: '148' },
            { label: 'Fulfillment SLA', value: '97%' },
            { label: 'Revenue today', value: '$32.4k' },
          ].map((stat) => (
            <div className="stat" key={stat.label}>
              <p>{stat.label}</p>
              <h3>{stat.value}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Admin Workstreams</h2>
        <div className="card-grid">
          {[
            'Inventory health checks',
            'Returns approvals',
            'Campaign scheduling',
            'Fraud review queue',
          ].map((item) => (
            <article className="card" key={item}>
              <div className="card__tag card__tag--admin">Admin</div>
              <h4>{item}</h4>
              <p className="muted">Role-secured route with audit friendly actions.</p>
              <button className="btn btn--mini">Open</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AdminDashboard

