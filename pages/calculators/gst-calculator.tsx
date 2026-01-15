import { useMemo, useState } from 'react'
import Link from 'next/link'
import CalculatorLayout from '../../components/calculators/CalculatorLayout'
import { Button, Field, Select, TextInput } from '../../components/calculators/controls'

type Mode = 'add' | 'remove'

function nonNegative(value: string): number | null {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

export default function GstCalculatorPage() {
  const [amount, setAmount] = useState('')
  const [gst, setGst] = useState('')
  const [mode, setMode] = useState<Mode>('add')
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo(() => {
    if (!submitted) return null
    const a = nonNegative(amount)
    const g = nonNegative(gst)
    if (a === null || g === null) return null
    const rate = g / 100
    if (!Number.isFinite(rate)) return null

    if (mode === 'add') {
      const gstAmount = a * rate
      const finalPrice = a + gstAmount
      return {
        base: Math.round(a * 100) / 100,
        gstAmount: Math.round(gstAmount * 100) / 100,
        finalPrice: Math.round(finalPrice * 100) / 100,
      }
    }

    // Remove GST: amount is treated as GST-inclusive final price
    const base = a / (1 + rate)
    const gstAmount = a - base
    return {
      base: Math.round(base * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      finalPrice: Math.round(a * 100) / 100,
    }
  }, [amount, gst, mode, submitted])

  const error =
    submitted && !result ? 'Please enter a valid amount and GST percentage.' : null

  function onReset() {
    setAmount('')
    setGst('')
    setMode('add')
    setSubmitted(false)
  }

  return (
    <CalculatorLayout
      title="GST Calculator (Add or Remove GST) | InfoDaily"
      description="Calculate GST amount and final price. Add GST to a base amount or remove GST from an inclusive price."
      canonicalPath="/calculators/gst-calculator"
      h1="GST Calculator"
      intro="Add GST to a base amount or remove GST from a GST-inclusive price."
    >
      <div className="calc-form">
        <form
          onSubmit={e => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <div className="calc-form-grid">
            <Field label={mode === 'add' ? 'Amount (without GST)' : 'Amount (with GST)'} htmlFor="amount">
              <TextInput
                id="amount"
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                step={0.01}
                placeholder={mode === 'add' ? 'e.g., 1000' : 'e.g., 1180'}
                required
              />
            </Field>
            <Field label="GST (%)" htmlFor="gst">
              <TextInput
                id="gst"
                type="number"
                inputMode="decimal"
                value={gst}
                onChange={e => setGst(e.target.value)}
                step={0.01}
                placeholder="e.g., 18"
                required
              />
            </Field>
            <Field label="Mode" htmlFor="mode">
              <Select
                id="mode"
                value={mode}
                onChange={e => setMode(e.target.value as Mode)}
                options={[
                  { value: 'add', label: 'Add GST' },
                  { value: 'remove', label: 'Remove GST' },
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
            Base Amount: <strong>{result.base}</strong>
          </p>
          <p>
            GST Amount: <strong>{result.gstAmount}</strong>
          </p>
          <p>
            Final Price: <strong>{result.finalPrice}</strong>
          </p>
        </div>
      ) : null}

      <div className="calc-content">
        <h2>How this calculator works</h2>
        <p>
          This GST calculator supports two use cases: adding GST to a base amount, or removing GST
          from a GST-inclusive price to find the original base amount and tax portion.
        </p>

        <h2>Formula used</h2>
        <p>
          Add GST:
          <br />
          <code>GST Amount = Base × (GST% / 100)</code>
          <br />
          <code>Final Price = Base + GST Amount</code>
        </p>
        <p>
          Remove GST (when the price already includes GST):
          <br />
          <code>Base = Final / (1 + GST% / 100)</code>
          <br />
          <code>GST Amount = Final − Base</code>
        </p>

        <h2>Example calculation</h2>
        <p>
          If base is <code>1000</code> and GST is <code>18%</code>, then GST amount is <code>180</code>{' '}
          and final price is <code>1180</code>.
        </p>

        <h2>FAQs</h2>
        <ul>
          <li>
            <strong>What does “Remove GST” mean?</strong> It treats your input as a GST-inclusive
            amount and calculates the base and GST split.
          </li>
          <li>
            <strong>Can GST be 0%?</strong> Yes. In that case GST amount is 0 and base equals final.
          </li>
          <li>
            <strong>Does it handle multiple GST slabs?</strong> This is a single-rate calculator; enter
            the GST percentage you need.
          </li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}


