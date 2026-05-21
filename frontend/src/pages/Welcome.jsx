import { ArrowRight, Calculator, CheckCircle2, GitBranch, GitCompareArrows, RefreshCw, ShieldCheck } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const features = [
  { icon: RefreshCw, text: 'Convert length, weight, temperature, and volume units.' },
  { icon: Calculator, text: 'Calculate compatible quantities .' },
  { icon: GitCompareArrows, text: 'Compare values and keep each workflow easy to scan.' },
]

function Welcome() {
  const { isAuthenticated, login } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return (
    <div className="min-h-[calc(100vh-81px)] bg-slate-950 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <section>
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200 ring-1 ring-cyan-300/20">
            <ShieldCheck className="h-4 w-4" />
            Secure Google OAuth entry
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Quantity Measurement App
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            A polished workspace for converting, calculating, and comparing quantities with a Spring Boot backend.
          </p>

          <div className="mt-8 grid gap-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3 rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                <p className="text-sm leading-6 text-slate-200">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-white p-6 text-slate-950 shadow-2xl sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-black">Welcome</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Sign in with Google.
          </p>

          <button
            className="group mt-7 flex w-full items-center justify-center gap-3 rounded-lg bg-slate-950 px-5 py-3.5 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            type="button"
            onClick={login}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black text-cyan-700 shadow-sm">
              G
            </span>
            Continue with Google
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">


          </div>
        </section>
      </div>
    </div>
  )
}

export default Welcome
