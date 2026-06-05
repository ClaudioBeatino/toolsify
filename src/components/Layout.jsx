import { Outlet, Link, useLocation } from 'react-router-dom'
import AdBanner from './AdBanner'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 hover:text-indigo-700">
              <span className="text-2xl">🔧</span>
              <span>Toolsify</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link to="/" className={`hover:text-indigo-600 transition-colors ${location.pathname === '/' ? 'text-indigo-600' : ''}`}>
                Home
              </Link>
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Ad banner top */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4">
        <AdBanner slot="1234567890" format="horizontal" className="w-full h-24 rounded-xl overflow-hidden" />
      </div>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Ad banner bottom */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-4">
        <AdBanner slot="0987654321" format="horizontal" className="w-full h-24 rounded-xl overflow-hidden" />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/" className="font-bold text-indigo-600 text-lg">🔧 Toolsify</Link>
          <p className="text-gray-500 text-sm mt-2">Strumenti online gratuiti per tutti i giorni.</p>
          <p className="text-gray-400 text-xs mt-3">© {new Date().getFullYear()} Toolsify. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  )
}
