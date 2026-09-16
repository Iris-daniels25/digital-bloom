import { navLinks } from '../data/content'

function Header() {
  return (
    <header className="site-header" id="home">
      <a className="brand" href="#home" aria-label="Digital Bloom home">
        Digital Bloom
      </a>
      <nav aria-label="Primary navigation">
        <ul className="nav-list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
