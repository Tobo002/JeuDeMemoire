import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__brand">Earwerm</p>
        <p className="site-footer__note">
          HCI prototype — musical memory training
        </p>
        <p className="site-footer__copy">&copy; {year} Earwerm</p>
      </div>
    </footer>
  )
}
