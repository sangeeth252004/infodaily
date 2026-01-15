import { useMemo, useState } from 'react'
import Link from 'next/link'
import CalculatorLayout from '../../components/calculators/CalculatorLayout'
import { Button, Field, Select, TextInput } from '../../components/calculators/controls'

function positive(value: string): number | null {
  const n = Number(value)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

function nonNegative(value: string): number | null {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

export default function EmiCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('')
  const [annualRate, setAnnualRate] = useState('')
  const [tenure, setTenure] = useState('')
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>('years')
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo(() => {
    if (!submitted) return null
    const p = positive(loanAmount)
    const annual = nonNegative(annualRate)
    const t = positive(tenure)
    if (p === null || annual === null || t === null) return null

    const n = tenureUnit === 'years' ? Math.round(t * 12) : Math.round(t)
    if (!Number.isFinite(n) || n <= 0) return null

    const r = annual / 12 / 100 // monthly interest rate

    let emi: number
    if (r === 0) {
      emi = p / n
    } else {
      const pow = Math.pow(1 + r, n)
      emi = (p * r * pow) / (pow - 1)
    }

    if (!Number.isFinite(emi)) return null

    const totalPayment = emi * n
    const totalInterest = totalPayment - p

    return {
      emi: Math.round(emi * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      months: n,
    }
  }, [loanAmount, annualRate, tenure, tenureUnit, submitted])

  const error =
    submitted && !result
      ? 'Please enter a valid loan amount, interest rate, and tenure.'
      : null

  function onReset() {
    setLoanAmount('')
    setAnnualRate('')
    setTenure('')
    setTenureUnit('years')
    setSubmitted(false)
  }

  return (
    <CalculatorLayout
      title="EMI Calculator (Monthly Loan EMI) | InfoDaily"
      description="Calculate your monthly EMI, total interest, and total payment based on loan amount, interest rate, and tenure."
      canonicalPath="/calculators/emi-calculator"
      h1="EMI Calculator"
      intro="Estimate your monthly EMI and total interest for a loan based on amount, rate, and tenure."
    >
      <div className="calc-form">
        <form
          onSubmit={e => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <div className="calc-form-grid">
            <Field label="Loan Amount" htmlFor="loan">
              <TextInput
                id="loan"
                type="number"
                inputMode="decimal"
                value={loanAmount}
                onChange={e => setLoanAmount(e.target.value)}
                step={0.01}
                placeholder="e.g., 500000"
                required
              />
            </Field>
            <Field label="Interest Rate (% per year)" htmlFor="rate">
              <TextInput
                id="rate"
                type="number"
                inputMode="decimal"
                value={annualRate}
                onChange={e => setAnnualRate(e.target.value)}
                step={0.01}
                placeholder="e.g., 10.5"
                required
              />
            </Field>
            <Field label="Tenure" htmlFor="tenure">
              <TextInput
                id="tenure"
                type="number"
                inputMode="decimal"
                value={tenure}
                onChange={e => setTenure(e.target.value)}
                step={1}
                placeholder={tenureUnit === 'years' ? 'e.g., 5' : 'e.g., 60'}
                required
              />
            </Field>
            <Field label="Tenure Unit" htmlFor="unit">
              <Select
                id="unit"
                value={tenureUnit}
                onChange={e => setTenureUnit(e.target.value as 'years' | 'months')}
                options={[
                  { value: 'years', label: 'Years' },
                  { value: 'months', label: 'Months' },
                ]}
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
            Monthly EMI: <strong>{result.emi}</strong>
          </p>
          <p>
            Total Interest: <strong>{result.totalInterest}</strong>
          </p>
          <p>
            Total Payment: <strong>{result.totalPayment}</strong> ({result.months} months)
          </p>
        </div>
      ) : null}

      <div className="calc-content">
        <h2>How this calculator works</h2>
        <p>
          EMI (Equated Monthly Installment) spreads repayment across equal monthly payments. This
          calculator converts the annual rate into a monthly rate, uses the loan tenure in months,
          and computes the EMI that amortizes the loan.
        </p>

        <h2>Formula used</h2>
        <p>
          Let <code>P</code> be principal, <code>r</code> be monthly interest rate, and <code>n</code>{' '}
          be number of months:
          <br />
          <code>EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)</code>
          <br />
          If <code>r = 0</code>, then <code>EMI = P / n</code>.
        </p>

        <h2>Example calculation</h2>
        <p>
          For a loan of <code>500,000</code> at <code>10.5%</code> per year for <code>5</code> years:
          the calculator uses <code>n = 60</code> months and monthly rate <code>r = 10.5/12/100</code>{' '}
          to compute EMI, then totals.
        </p>

        <h2>FAQs</h2>
        <ul>
          <li>
            <strong>Why do I need tenure in months?</strong> EMI is a monthly payment, so the formula
            uses total months.
          </li>
          <li>
            <strong>What if my rate is 0%?</strong> The EMI becomes a simple division of principal by
            months.
          </li>
          <li>
            <strong>Are taxes/fees included?</strong> No. This is a basic EMI estimate without extra
            charges.
          </li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}


