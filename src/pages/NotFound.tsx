import { Link } from 'react-router-dom'

const NotFound = () => (
  <main className="page page--center">
    <section className="auth">
      <p className="eyebrow">Lost in the catalog</p>
      <h1>Page not found</h1>
      <p className="muted">Try heading back to the storefront.</p>
      <Link className="btn btn--primary" to="/">
        Go home
      </Link>
    </section>
  </main>
)

export default NotFound

