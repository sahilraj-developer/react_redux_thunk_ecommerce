const AdminProducts = () => (
  <div className="portal__content">
    <section className="section">
      <div className="section__header">
        <div>
          <p className="eyebrow">Catalog control</p>
          <h1>Products</h1>
          <p className="muted">Approve vendor listings, update pricing, and manage stock thresholds.</p>
        </div>
        <button className="btn btn--primary">Add product</button>
      </div>
      <div className="card-grid">
        {['Publish new collection', 'Bulk price update', 'Low stock alerts'].map((item) => (
          <article className="card" key={item}>
            <h4>{item}</h4>
            <p className="muted">Automate routine catalog tasks from one console.</p>
            <button className="btn btn--mini">View</button>
          </article>
        ))}
      </div>
    </section>
  </div>
)

export default AdminProducts
