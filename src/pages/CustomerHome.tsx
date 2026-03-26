const CustomerHome = () => {
  return (
    <main className="page">
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Curated drops, same-day shipping</p>
          <h1>Build a storefront customers actually enjoy.</h1>
          <p className="muted">
            ShopSwift blends premium product discovery with a secure checkout flow. The customer view focuses on
            conversion while admin tools keep fulfillment fast.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary">Shop New Arrivals</button>
            <button className="btn btn--ghost">Track an Order</button>
          </div>
        </div>
        <div className="hero__panel">
          <div className="panel">
            <div>
              <p className="panel__label">Top categories</p>
              <h3>Urban Tech, Home Rituals, Studio Gear</h3>
            </div>
            <div className="panel__stats">
              <div>
                <span>24k</span>
                <p>Daily shoppers</p>
              </div>
              <div>
                <span>4.9</span>
                <p>Customer rating</p>
              </div>
              <div>
                <span>2 hr</span>
                <p>Avg. delivery</p>
              </div>
            </div>
          </div>
          <div className="card-grid">
            {['Smart Desk Lamp', 'Noise-Zero Headphones', 'Ceramic Brew Set'].map((item) => (
              <article className="card" key={item}>
                <div className="card__tag">Featured</div>
                <h4>{item}</h4>
                <p className="muted">Limited stock - Express shipping</p>
                <button className="btn btn--mini">View</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div>
          <h2>Customer Experience Layer</h2>
          <p className="muted">
            Segmented routes keep the storefront focused while admin routes are locked behind role-based guards.
          </p>
        </div>
        <div className="feature-grid">
          {[
            'Personalized recommendations with Redux state.',
            'Fast cart interactions using local optimistic updates.',
            'Promotional surfaces controlled by admin settings.',
            'Secure checkout placeholders ready for API wiring.',
          ].map((text) => (
            <div className="feature" key={text}>
              <div className="feature__dot" />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default CustomerHome
