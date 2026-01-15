import { useMemo, useState } from 'react'
import Link from 'next/link'
import CalculatorLayout from '../../components/calculators/CalculatorLayout'
import { Button, Field, TextInput } from '../../components/calculators/controls'

type AgeResult = { years: number; months: number; days: number }

function isValidDateInput(value: string): boolean {
  if (!value) return false
  // Expect YYYY-MM-DD from <input type="date">
  const parts = value.split('-')
  if (parts.length !== 3) return false
  const [y, m, d] = parts.map(p => Number(p))
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return false
  const dt = new Date(value + 'T00:00:00')
  if (Number.isNaN(dt.getTime())) return false
  // Guard against browser parsing quirks (ensure components match)
  return dt.getFullYear() === y && dt.getMonth() + 1 === m && dt.getDate() === d
}

function calculateAge(dobISO: string, today: Date): AgeResult | null {
  if (!isValidDateInput(dobISO)) return null
  const dob = new Date(dobISO + 'T00:00:00')
  if (dob.getTime() > today.getTime()) return null

  let years = today.getFullYear() - dob.getFullYear()
  let months = today.getMonth() - dob.getMonth()
  let days = today.getDate() - dob.getDate()

  if (days < 0) {
    // Borrow days from previous month
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += prevMonth.getDate()
    months -= 1
  }

  if (months < 0) {
    months += 12
    years -= 1
  }

  if (years < 0) return null
  return { years, months, days }
}

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState('')
  const [touched, setTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo(() => {
    if (!submitted) return null
    return calculateAge(dob, new Date())
  }, [dob, submitted])

  const error =
    submitted && !result
      ? 'Please enter a valid date of birth (not in the future).'
      : null

  function onReset() {
    setDob('')
    setTouched(false)
    setSubmitted(false)
  }

  return (
    <CalculatorLayout
      title="Age Calculator (Years, Months, Days) | InfoDaily"
      description="Calculate your exact age in years, months, and days from your date of birth. Fast, simple, and mobile-friendly."
      canonicalPath="/calculators/age-calculator"
      h1="Age Calculator"
      intro="Enter your date of birth to calculate your age in years, months, and days."
    >
      <div className="calc-form">
        <form
          onSubmit={e => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <div className="calc-form-grid">
            <Field label="Date of Birth" htmlFor="dob">
              <TextInput
                id="dob"
                type="date"
                value={dob}
                onChange={e => {
                  setDob(e.target.value)
                  setTouched(true)
                }}
                required
              />
            </Field>
          </div>

          <div className="calc-actions">
            <Button type="submit" disabled={!touched && !dob}>
              Calculate
            </Button>
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
            Your age is <strong>{result.years}</strong> years,{' '}
            <strong>{result.months}</strong> months, and <strong>{result.days}</strong> days.
          </p>
        </div>
      ) : null}

      <div className="calc-content">
        <h2>How this calculator works</h2>
        <p>
          This age calculator compares your date of birth to today’s date and computes the
          difference by counting full years first, then full months, and finally the remaining
          days.
        </p>

        <h2>Formula used</h2>
        <p>
          There isn’t a single closed-form formula because month lengths vary. The calculation is
          done by:
        </p>
        <ul>
          <li>Start with year difference, month difference, and day difference.</li>
          <li>If days are negative, borrow days from the previous month.</li>
          <li>If months are negative, borrow 12 months from the year difference.</li>
        </ul>

        <h2>Example calculation</h2>
        <p>
          If your date of birth is <code>2000-06-10</code> and today is <code>2026-01-15</code>, the
          result will be expressed as full years, then the remaining months, then remaining days.
        </p>

        <h2>FAQs</h2>
        <ul>
          <li>
            <strong>Why do I see months and days instead of only total days?</strong> This format is
            easier to interpret and matches how age is commonly described.
          </li>
          <li>
            <strong>What if I enter a future date?</strong> The calculator will show an error because
            a date of birth can’t be in the future.
          </li>
          <li>
            <strong>Does it account for leap years?</strong> Yes—borrowing days from the previous
            month naturally includes leap-year month lengths.
          </li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}


