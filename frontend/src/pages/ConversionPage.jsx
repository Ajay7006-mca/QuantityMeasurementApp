import { ArrowRightLeft, RefreshCw, RotateCcw, Sparkles } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import Button from '../components/Button'
import HistoryPanel from '../components/HistoryPanel'
import InputField from '../components/InputField'
import ResultDisplay from '../components/ResultDisplay'
import UnitSelector from '../components/UnitSelector'
import { useAsyncAction } from '../hooks/useAsyncAction'
import { convertUnits } from '../services/api'
import { MEASUREMENT_TYPES, UNITS_BY_TYPE, defaultUnitFor, getUnitLabel, getTypeLabel } from '../utils/measurements'
import { formatNumber } from '../utils/format'
import { buildQuantityDTO, parseQuantityValue } from '../utils/validation'

function ConversionPage() {
  const [measurementType, setMeasurementType] = useState('LENGTH')
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState(defaultUnitFor('LENGTH'))
  const [toUnit, setToUnit] = useState('INCH')
  const [fieldError, setFieldError] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  const units = useMemo(() => UNITS_BY_TYPE[measurementType], [measurementType])

  const convertAction = useCallback((payload) => convertUnits(payload), [])
  const { run, loading, error, setError } = useAsyncAction(convertAction)

  const handleMeasurementTypeChange = (nextType) => {
    setMeasurementType(nextType)
    const defaultUnit = defaultUnitFor(nextType)
    const alternateUnit = UNITS_BY_TYPE[nextType]?.[1]?.value || defaultUnit
    setFromUnit(defaultUnit)
    setToUnit(alternateUnit)
    setResult(null)
    setFieldError('')
    setError('')
  }

  const handleReset = () => {
    const defaultUnit = defaultUnitFor(measurementType)
    const alternateUnit = UNITS_BY_TYPE[measurementType]?.[1]?.value || defaultUnit
    setValue('')
    setFromUnit(defaultUnit)
    setToUnit(alternateUnit)
    setResult(null)
    setFieldError('')
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const parsed = parseQuantityValue(value)
    if (parsed.error) {
      setFieldError(parsed.error)
      return
    }

    setFieldError('')
    const quantity = buildQuantityDTO({
      value: parsed.value,
      unit: fromUnit,
      measurementType,
    })

    const response = await run({ quantity, targetUnit: toUnit })
    if (!response) return

    setResult(response)
    setHistory((items) => [
      {
        id: crypto.randomUUID(),
        inputValue: parsed.value,
        fromUnit,
        toUnit,
        measurementType,
        result: response.value,
      },
      ...items,
    ])
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Conversion</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black text-slate-950">
            <RefreshCw className="h-8 w-8 text-cyan-600" />
            Convert units
          </h1>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <UnitSelector
            label="Measurement type"
            options={MEASUREMENT_TYPES}
            value={measurementType}
            onChange={(event) => handleMeasurementTypeChange(event.target.value)}
          />
          <InputField
            label="Input value"
            type="number"
            step="any"
            placeholder="Enter a number"
            value={value}
            error={fieldError}
            onChange={(event) => setValue(event.target.value)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <UnitSelector label="From unit" options={units} value={fromUnit} onChange={(event) => setFromUnit(event.target.value)} />
            <UnitSelector label="To unit" options={units} value={toUnit} onChange={(event) => setToUnit(event.target.value)} />
          </div>

          {error ? <p className="rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-700">{error}</p> : null}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" loading={loading}>
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Convert
            </Button>
            <Button type="button" variant="secondary" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <ResultDisplay
            icon={Sparkles}
            tone={result ? 'success' : 'neutral'}
            result={result ? `${formatNumber(result.value)} ${getUnitLabel(measurementType, result.unit)}` : ''}
          >
          </ResultDisplay>
        </div>
      </section>

      <HistoryPanel
        title="Conversion history"
        items={history}
        emptyText="Completed conversions will appear here for this session."
        onClear={() => setHistory([])}
        renderItem={(item) => (
          <>
            <p className="font-semibold text-slate-900">
              {formatNumber(item.inputValue)} {getUnitLabel(item.measurementType, item.fromUnit)} = {formatNumber(item.result)}{' '}
              {getUnitLabel(item.measurementType, item.toUnit)}
            </p>
            <p className="mt-1 text-xs text-slate-500">{getTypeLabel(item.measurementType)}</p>
          </>
        )}
      />
    </div>
  )
}

export default ConversionPage
