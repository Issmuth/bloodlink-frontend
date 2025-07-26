import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-midnight">
              <span className="text-crimson">Life</span>line
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-midnight hover:text-crimson px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#about" className="text-midnight hover:text-crimson px-3 py-2 text-sm font-medium transition-colors">
                About
              </a>
              <a href="#get-involved" className="text-midnight hover:text-crimson px-3 py-2 text-sm font-medium transition-colors">
                Get Involved
              </a>
              <a href="#login" className="text-midnight hover:text-crimson px-3 py-2 text-sm font-medium transition-colors">
                Login
              </a>
              <button className="btn-primary">
                Register
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-midnight hover:text-crimson focus:outline-none focus:text-crimson"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <a href="#home" className="text-midnight hover:text-crimson block px-3 py-2 text-base font-medium">
              Home
            </a>
            <a href="#about" className="text-midnight hover:text-crimson block px-3 py-2 text-base font-medium">
              About
            </a>
            <a href="#get-involved" className="text-midnight hover:text-crimson block px-3 py-2 text-base font-medium">
              Get Involved
            </a>
            <a href="#login" className="text-midnight hover:text-crimson block px-3 py-2 text-base font-medium">
              Login
            </a>
            <div className="px-3 py-2">
              <button className="btn-primary w-full">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 