const VendorProducts = () => (
  <div className="portal__content">
    <section className="section">
      <div className="section__header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Vendor products</h1>
          <p className="muted">Track approvals, stock levels, and listing performance.</p>
        </div>
        <button className="btn btn--primary">Add SKU</button>
      </div>
      <div className="card-grid">
        {['Pending approvals', 'Live listings', 'Pricing experiments'].map((item) => (
          <article className="card" key={item}>
            <h4>{item}</h4>
            <p className="muted">Keep your catalog competitive and compliant.</p>
            <button className="btn btn--mini">Manage</button>
          </article>
        ))}
      </div>
    </section>
  </div>
)

export default VendorProducts
