import { Link } from 'react-router-dom'
import Button from '../components/Button'

const features = [
  {
    title: 'Convert quantities',
    text: 'Switch between supported length, weight, temperature, and volume units using the Spring Boot conversion API.',
  },
  {
    title: 'Calculate with units',
    text: 'Add, subtract, multiply, and divide compatible quantities while preserving backend business rules.',
  },
  {
    title: 'Compare values',
    text: 'Check equality through the backend and resolve greater-than or less-than feedback with backend conversion.',
  },
]

function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid items-center gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Separate React frontend for Spring Boot</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Quantity Measurement App
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A clean measurement workspace for conversions, calculations, and comparisons across practical unit systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/convert">
              <Button>Start converting</Button>
            </Link>
            <Link to="/calculator">
              <Button variant="secondary">Open calculator</Button>
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {['FEET', 'INCH', 'KILOGRAM', 'GRAM', 'CELSIUS', 'KELVIN', 'LITRE', 'GALLON'].map((unit) => (
              <div key={unit} className="rounded-lg bg-slate-50 p-4 text-center">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Unit</p>
                <p className="mt-1 text-lg font-black text-slate-900">{unit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 pb-10 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-950">{feature.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
          </article>
        ))}
      </section>
    </div>
  )
}

export default HomePage
