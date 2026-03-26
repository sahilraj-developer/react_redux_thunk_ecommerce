const VendorOverview = () => (
  <div className="portal__content">
    <section className="section">
      <div className="section__header">
        <div>
          <p className="eyebrow">Vendor overview</p>
          <h1>Your sales cockpit</h1>
          <p className="muted">Monitor product performance, fulfillment, and payout schedules.</p>
        </div>
        <button className="btn btn--primary">Upload product</button>
      </div>
      <div className="stats">
        {[{ label: 'Active listings', value: '36' }, { label: 'Weekly revenue', value: '$8.4k' }, { label: 'Top product', value: 'Desk Lamp' }].map(
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

export default VendorOverview
