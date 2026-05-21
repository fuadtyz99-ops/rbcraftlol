import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Ranks', href: '#ranks' },
  { label: 'Server', href: '#server' },
  { label: 'Discord', href: 'https://discord.gg/3Xu6kJEw4', external: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(10,10,10,0.9)] backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#home')
          }}
          className="font-display font-extrabold text-lg text-white tracking-tight"
        >
          RAINBOWCRAFT
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (!link.external) {
                  e.preventDefault()
                  handleNavClick(link.href)
                }
              }}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-sm text-white/70 hover:text-white transition-colors font-body"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="https://discord.gg/3Xu6kJEw4"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block gradient-bg text-white text-sm font-semibold px-6 py-2.5 hover:opacity-90 transition-opacity"
        >
          Join Server
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-white/10">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (!link.external) {
                    e.preventDefault()
                    handleNavClick(link.href)
                  } else {
                    setMenuOpen(false)
                  }
                }}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-white/70 hover:text-white transition-colors font-body"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://discord.gg/3Xu6kJEw4"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-bg text-white text-sm font-semibold px-6 py-2.5 text-center hover:opacity-90 transition-opacity"
            >
              Join Server
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
