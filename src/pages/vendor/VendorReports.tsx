const VendorReports = () => (
  <div className="portal__content">
    <section className="section">
      <div className="section__header">
        <div>
          <p className="eyebrow">Performance</p>
          <h1>Vendor reports</h1>
          <p className="muted">See sell-through rates, payouts, and customer feedback.</p>
        </div>
        <button className="btn btn--primary">Download report</button>
      </div>
      <div className="feature-grid">
        {['Top performing SKUs', 'Return reasons', 'Payout schedule', 'Customer reviews'].map((text) => (
          <div className="feature" key={text}>
            <div className="feature__dot" />
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
)

export default VendorReports
