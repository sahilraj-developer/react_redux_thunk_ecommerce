const AdminSales = () => (
  <div className="portal__content">
    <section className="section">
      <div className="section__header">
        <div>
          <p className="eyebrow">Revenue</p>
          <h1>Sales performance</h1>
          <p className="muted">Track sales velocity, conversion rates, and revenue by channel.</p>
        </div>
        <button className="btn btn--primary">Export report</button>
      </div>
      <div className="stats">
        {[{ label: 'Conversion rate', value: '3.8%' }, { label: 'Average order', value: '$128' }, { label: 'New customers', value: '1.2k' }].map(
          (stat) => (
            <div className="stat" key={stat.label}>
              <p>{stat.label}</p>
              <h3>{stat.value}</h3>
            </div>
          )
        )}
      </div>
    </section>
  </div>
)

export default AdminSales
