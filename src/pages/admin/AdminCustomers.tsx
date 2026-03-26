const AdminCustomers = () => (
  <div className="portal__content">
    <section className="section">
      <div className="section__header">
        <div>
          <p className="eyebrow">Customer ops</p>
          <h1>Customers</h1>
          <p className="muted">Review VIP tiers, resolve tickets, and track repeat purchase behavior.</p>
        </div>
        <button className="btn btn--primary">Create segment</button>
      </div>
      <div className="feature-grid">
        {['Support queue status', 'Churn risk flags', 'Loyalty program insights', 'Top advocates list'].map((text) => (
          <div className="feature" key={text}>
            <div className="feature__dot" />
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
)

export default AdminCustomers
