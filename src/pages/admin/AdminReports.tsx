const AdminReports = () => (
  <div className="portal__content">
    <section className="section">
      <div className="section__header">
        <div>
          <p className="eyebrow">Analytics</p>
          <h1>Reports</h1>
          <p className="muted">Generate deep dives on customer cohorts, inventory turns, and vendor performance.</p>
        </div>
        <button className="btn btn--primary">Schedule report</button>
      </div>
      <div className="card-grid">
        {['Cohort retention', 'Inventory aging', 'Vendor scorecards', 'Marketing ROI'].map((item) => (
          <article className="card" key={item}>
            <h4>{item}</h4>
            <p className="muted">Automated delivery to your ops team.</p>
            <button className="btn btn--mini">Configure</button>
          </article>
        ))}
      </div>
    </section>
  </div>
)

export default AdminReports
