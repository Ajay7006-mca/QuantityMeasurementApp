import { ArrowDown, ArrowUp, Equal, GitCompareArrows, RotateCcw, Scale } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import Button from '../components/Button'
import HistoryPanel from '../components/HistoryPanel'
import InputField from '../components/InputField'
import ResultDisplay from '../components/ResultDisplay'
import UnitSelector from '../components/UnitSelector'
import { useAsyncAction } from '../hooks/useAsyncAction'
import { compareUnits } from '../services/api'
import { MEASUREMENT_TYPES, UNITS_BY_TYPE, defaultUnitFor, getUnitLabel, getTypeLabel } from '../utils/measurements'
import { formatNumber } from '../utils/format'
import { buildQuantityDTO, parseQuantityValue } from '../utils/validation'

const toneForRelation = (relation) => {
  if (relation === '=') return 'neutral'
  if (relation === '>') return 'success'
  if (relation === '<') return 'danger'
  return 'neutral'
}

const iconForRelation = (relation) => {
  if (relation === '>') return ArrowUp
  if (relation === '<') return ArrowDown
  if (relation === '=') return Equal
  return Scale
}

function ComparisonPage() {
  const [measurementType, setMeasurementType] = useState('LENGTH')
  const [leftValue, setLeftValue] = useState('')
  const [rightValue, setRightValue] = useState('')
  const [leftUnit, setLeftUnit] = useState(defaultUnitFor('LENGTH'))
  const [rightUnit, setRightUnit] = useState('INCH')
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  const units = useMemo(() => UNITS_BY_TYPE[measurementType], [measurementType])
  const compareAction = useCallback((payload) => compareUnits(payload), [])
  const { run, loading, error, setError } = useAsyncAction(compareAction)

  const handleMeasurementTypeChange = (nextType) => {
    setMeasurementType(nextType)
    const defaultUnit = defaultUnitFor(nextType)
    const alternateUnit = UNITS_BY_TYPE[nextType]?.[1]?.value || defaultUnit
    setLeftUnit(defaultUnit)
    setRightUnit(alternateUnit)
    setResult(null)
    setErrors({})
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const leftParsed = parseQuantityValue(leftValue, 'First value')
    const rightParsed = parseQuantityValue(rightValue, 'Second value')
    const nextErrors = {
      leftValue: leftParsed.error,
      rightValue: rightParsed.error,
    }

    if (nextErrors.leftValue || nextErrors.rightValue) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    const leftQuantity = buildQuantityDTO({ value: leftParsed.value, unit: leftUnit, measurementType })
    const rightQuantity = buildQuantityDTO({ value: rightParsed.value, unit: rightUnit, measurementType })
    const response = await run({ leftQuantity, rightQuantity })
    if (!response) return

    setResult(response)
    setHistory((items) => [
      {
        id: crypto.randomUUID(),
        measurementType,
        leftValue: leftParsed.value,
        rightValue: rightParsed.value,
        leftUnit,
        rightUnit,
        relation: response.relation,
      },
      ...items,
    ])
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Comparison</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black text-slate-950">
            <Scale className="h-8 w-8 text-cyan-600" />
            Compare two quantities
          </h1>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <UnitSelector label="Measurement type" options={MEASUREMENT_TYPES} value={measurementType} onChange={(event) => handleMeasurementTypeChange(event.target.value)} />

          <div className="grid gap-4 md:grid-cols-2">
            <InputField label="First value" type="number" step="any" value={leftValue} error={errors.leftValue} onChange={(event) => setLeftValue(event.target.value)} />
            <UnitSelector label="First unit" options={units} value={leftUnit} onChange={(event) => setLeftUnit(event.target.value)} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InputField label="Second value" type="number" step="any" value={rightValue} error={errors.rightValue} onChange={(event) => setRightValue(event.target.value)} />
            <UnitSelector label="Second unit" options={units} value={rightUnit} onChange={(event) => setRightUnit(event.target.value)} />
          </div>

          {error ? <p className="rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-700">{error}</p> : null}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" loading={loading}>
              <GitCompareArrows className="mr-2 h-4 w-4" />
              Compare
            </Button>
            <Button type="button" variant="secondary" onClick={() => { setLeftValue(''); setRightValue(''); setResult(null); setErrors({}); setError('') }}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <ResultDisplay
            icon={iconForRelation(result?.relation)}
            tone={toneForRelation(result?.relation)}
            title="Comparison result"
            result={result ? `${formatNumber(leftValue)} ${getUnitLabel(measurementType, leftUnit)} ${result.relation} ${formatNumber(rightValue)} ${getUnitLabel(measurementType, rightUnit)}` : ''}
          >

          </ResultDisplay>
        </div>
      </section>

      <HistoryPanel
        title="Comparison history"
        items={history}
        emptyText="Completed comparisons will appear here for this session."
        onClear={() => setHistory([])}
        renderItem={(item) => (
          <>
            <p className="font-semibold text-slate-900">
              {formatNumber(item.leftValue)} {getUnitLabel(item.measurementType, item.leftUnit)} {item.relation}{' '}
              {formatNumber(item.rightValue)} {getUnitLabel(item.measurementType, item.rightUnit)}
            </p>
            <p className="mt-1 text-xs text-slate-500">{getTypeLabel(item.measurementType)}</p>
          </>
        )}
      />
    </div>
  )
}

export default ComparisonPage
