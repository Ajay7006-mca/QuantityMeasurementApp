import { Calculator, GitCompareArrows, Home, LogOut, RefreshCw } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const links = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/convert', label: 'Conversion', icon: RefreshCw },
  { to: '/calculator', label: 'Calculator', icon: Calculator },
  { to: '/compare', label: 'Comparison', icon: GitCompareArrows },
]

function Navbar() {
  const { isAuthenticated, login, logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <NavLink to={isAuthenticated ? '/home' : '/'} className="text-lg font-black tracking-tight text-slate-950">
          Quantity Measurement App
        </NavLink>
        <div className="flex flex-wrap items-center gap-2">
          {isAuthenticated ? (
            <div className="flex flex-wrap gap-2">
              {links.map(({ icon: Icon, ...link }) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'text-slate-600 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-slate-950'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </NavLink>
              ))}
            </div>
          ) : null}

          {isAuthenticated ? <div className="h-6 w-px bg-slate-200 max-sm:hidden" /> : null}

          {isAuthenticated ? (
            <div className="flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 px-2 py-1">
              {user?.picture ? (
                <img className="h-8 w-8 rounded-full object-cover" src={user.picture} alt="" />
              ) : null}
              <span className="max-w-44 truncate px-1 text-sm font-semibold text-slate-700">
                {user?.name || user?.email || 'Signed in'}
              </span>
              <button
                className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-rose-50 hover:text-rose-700"
                type="button"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              className="group inline-flex items-center gap-3 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-black text-white shadow-sm ring-1 ring-slate-900 transition hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              type="button"
              onClick={login}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-black text-cyan-700 shadow-sm transition group-hover:scale-105">
                G
              </span>
              Login with Google
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
