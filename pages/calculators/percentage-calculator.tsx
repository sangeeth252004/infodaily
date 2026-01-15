import { useMemo, useState } from 'react'
import Link from 'next/link'
import CalculatorLayout from '../../components/calculators/CalculatorLayout'
import { Button, Field, TextInput } from '../../components/calculators/controls'

function toNumber(value: string): number | null {
  const n = Number(value)
  if (!Number.isFinite(n)) return null
  return n
}

export default function PercentageCalculatorPage() {
  const [value, setValue] = useState('')
  const [percent, setPercent] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo(() => {
    if (!submitted) return null
    const v = toNumber(value)
    const p = toNumber(percent)
    if (v === null || p === null) return null
    const out = (v * p) / 100
    if (!Number.isFinite(out)) return null
    return Math.round(out * 100) / 100
  }, [value, percent, submitted])

  const error = submitted && result === null ? 'Please enter valid numbers.' : null

  function onReset() {
    setValue('')
    setPercent('')
    setSubmitted(false)
  }

  return (
    <CalculatorLayout
      title="Percentage Calculator (X% of a Number) | InfoDaily"
      description="Calculate a percentage of any value. Enter a number and a percentage to get the result instantly."
      canonicalPath="/calculators/percentage-calculator"
      h1="Percentage Calculator"
      intro="Calculate a percentage of a number (for example, 15% of 200)."
      calculatorName="Percentage Calculator"
    >
      <div className="calc-form">
        <form
          onSubmit={e => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <div className="calc-form-grid">
            <Field label="Value" htmlFor="value">
              <TextInput
                id="value"
                type="number"
                inputMode="decimal"
                value={value}
                onChange={e => setValue(e.target.value)}
                step={0.01}
                placeholder="e.g., 200"
                required
              />
            </Field>
            <Field label="Percentage (%)" htmlFor="percent">
              <TextInput
                id="percent"
                type="number"
                inputMode="decimal"
                value={percent}
                onChange={e => setPercent(e.target.value)}
                step={0.01}
                placeholder="e.g., 15"
                required
              />
            </Field>
          </div>

          <div className="calc-actions">
            <Button type="submit">Calculate</Button>
            <Button type="button" variant="secondary" onClick={onReset}>
              Reset
            </Button>
          </div>

          {error ? <div className="calc-error">{error}</div> : null}
        </form>
      </div>

      {result !== null ? (
        <div className="calc-result" aria-live="polite">
          <div className="calc-result-title">Result:</div>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '0.5rem', marginBottom: 0 }}>
            {result}
          </p>
        </div>
      ) : null}

      <div className="calc-content">
        <h2>How this calculator works</h2>
        <p>
          This tool multiplies your value by the percentage and divides by 100. It’s useful for
          discounts, markups, commission, and quick “X% of Y” calculations.
        </p>

        <h2>Formula used</h2>
        <p>
          <code>Result = Value × (Percentage / 100)</code>
        </p>

        <h2>Example calculation</h2>
        <p>
          For <code>15%</code> of <code>200</code>:
          <br />
          <code>200 × (15 / 100) = 30</code>
        </p>

        <h2>FAQs</h2>
        <ul>
          <li>
            <strong>Can I use decimals?</strong> Yes—both inputs support decimals.
          </li>
          <li>
            <strong>Why is the output rounded?</strong> It is rounded to 2 decimal places for clean
            display in common use cases.
          </li>
          <li>
            <strong>Is negative percentage allowed?</strong> Yes. A negative percentage produces a
            negative result, which can be helpful in some calculations.
          </li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}


