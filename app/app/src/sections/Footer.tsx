import { MessageCircle } from 'lucide-react'

const menuLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Ranks', href: '#ranks' },
  { label: 'Server', href: '#server' },
]

const communityLinks = [
  { label: 'Discord', href: 'https://discord.gg/3Xu6kJEw4', external: true },
  { label: 'WhatsApp', href: 'https://bit.ly/GBRainbow', external: true },
  { label: 'TikTok', href: 'https://www.tiktok.com/@rainbowcraft0309', external: true },
]

export default function Footer() {
  const handleClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer
      className="relative bg-[#0A0A0A] border-t border-white/5 py-20 pb-10"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-display font-extrabold text-lg text-white mb-4">
              RAINBOWCRAFT
            </h3>
            <p className="font-body text-sm text-rc-dim leading-relaxed">
              Server Minecraft Survival Economy terbaik untuk komunitas gaming
              Indonesia.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-4">
              Menu
            </h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (!link.href.startsWith('http')) {
                        e.preventDefault()
                        handleClick(link.href)
                      }
                    }}
                    className="font-body text-sm text-rc-dim hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-4">
              Komunitas
            </h4>
            <ul className="space-y-3">
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-rc-dim hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-4">
              Social
            </h4>
            <div className="flex gap-4">
              <a
                href="https://discord.gg/3Xu6kJEw4"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-rc-dim hover:text-white hover:border-white/20 transition-colors"
                aria-label="Discord"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@rainbowcraft0309"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-rc-dim hover:text-white hover:border-white/20 transition-colors"
                aria-label="TikTok"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a
                href="https://bit.ly/GBRainbow"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-rc-dim hover:text-white hover:border-white/20 transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M9.5 15.5a5 5 0 0 0 5 0" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
          <p className="font-body text-xs text-rc-dim">
            2026 RainbowCraft. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-body text-xs text-rc-dim hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="font-body text-xs text-rc-dim hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
