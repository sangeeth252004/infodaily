import { useMemo, useState } from 'react'
import Link from 'next/link'
import CalculatorLayout from '../../components/calculators/CalculatorLayout'
import { Button, Field, TextInput } from '../../components/calculators/controls'

function posNumber(value: string): number | null {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

export default function SimpleInterestCalculatorPage() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [timeYears, setTimeYears] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo(() => {
    if (!submitted) return null
    const p = posNumber(principal)
    const r = posNumber(rate)
    const t = posNumber(timeYears)
    if (p === null || r === null || t === null) return null
    const interest = (p * r * t) / 100
    const total = p + interest
    return {
      interest: Math.round(interest * 100) / 100,
      total: Math.round(total * 100) / 100,
    }
  }, [principal, rate, timeYears, submitted])

  const error = submitted && !result ? 'Please enter valid numbers (non-negative).' : null

  function onReset() {
    setPrincipal('')
    setRate('')
    setTimeYears('')
    setSubmitted(false)
  }

  return (
    <CalculatorLayout
      title="Simple Interest Calculator | InfoDaily"
      description="Calculate simple interest and total amount using principal, annual rate, and time. Fast and easy."
      canonicalPath="/calculators/simple-interest-calculator"
      h1="Simple Interest Calculator"
      intro="Enter principal, annual interest rate, and time period to calculate simple interest."
    >
      <div className="calc-form">
        <form
          onSubmit={e => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <div className="calc-form-grid">
            <Field label="Principal" htmlFor="principal">
              <TextInput
                id="principal"
                type="number"
                inputMode="decimal"
                value={principal}
                onChange={e => setPrincipal(e.target.value)}
                step={0.01}
                placeholder="e.g., 10000"
                required
              />
            </Field>
            <Field label="Rate (% per year)" htmlFor="rate">
              <TextInput
                id="rate"
                type="number"
                inputMode="decimal"
                value={rate}
                onChange={e => setRate(e.target.value)}
                step={0.01}
                placeholder="e.g., 8"
                required
              />
            </Field>
            <Field label="Time (years)" htmlFor="time">
              <TextInput
                id="time"
                type="number"
                inputMode="decimal"
                value={timeYears}
                onChange={e => setTimeYears(e.target.value)}
                step={0.01}
                placeholder="e.g., 2"
                required
              />
            </Field>
          </div>

          <div className="calc-actions">
            <Button type="submit">Calculate</Button>
            <Button type="button" variant="secondary" onClick={onReset}>
              Clear / Reset
            </Button>
            <Link href="/calculators" className="back-link" style={{ marginLeft: 'auto' }}>
              Back to calculators
            </Link>
          </div>

          {error ? <div className="calc-error">{error}</div> : null}
        </form>
      </div>

      {result ? (
        <div className="calc-result" aria-live="polite">
          <div className="calc-result-title">Result</div>
          <p>
            Simple Interest: <strong>{result.interest}</strong>
          </p>
          <p>
            Total Amount: <strong>{result.total}</strong>
          </p>
        </div>
      ) : null}

      <div className="calc-content">
        <h2>How this calculator works</h2>
        <p>
          Simple interest is computed only on the original principal. This calculator multiplies
          principal by the annual rate and time (in years) to find interest, then adds it to
          principal to get the total amount.
        </p>

        <h2>Formula used</h2>
        <p>
          <code>Interest = (Principal × Rate × Time) / 100</code>
          <br />
          <code>Total = Principal + Interest</code>
        </p>

        <h2>Example calculation</h2>
        <p>
          If principal is <code>10,000</code>, rate is <code>8%</code> per year, and time is{' '}
          <code>2</code> years:
          <br />
          <code>Interest = (10000 × 8 × 2) / 100 = 1600</code>
          <br />
          <code>Total = 10000 + 1600 = 11600</code>
        </p>

        <h2>FAQs</h2>
        <ul>
          <li>
            <strong>When should I use simple interest?</strong> For loans or deposits that do not
            compound (or where compounding is not part of the terms).
          </li>
          <li>
            <strong>Is the rate annual?</strong> Yes, rate is treated as a yearly percentage.
          </li>
          <li>
            <strong>What if time is in months?</strong> Convert months to years (months ÷ 12) before
            entering the time value.
          </li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}


