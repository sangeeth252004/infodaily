import { useMemo, useState } from 'react'
import Link from 'next/link'
import CalculatorLayout from '../../components/calculators/CalculatorLayout'
import { Button, Field, TextInput } from '../../components/calculators/controls'

type BmiResult = { bmi: number; category: string }

function parsePositiveNumber(value: string): number | null {
  const n = Number(value)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

export default function BmiCalculatorPage() {
  const [heightCm, setHeightCm] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo((): BmiResult | null => {
    if (!submitted) return null
    const h = parsePositiveNumber(heightCm)
    const w = parsePositiveNumber(weightKg)
    if (!h || !w) return null
    const meters = h / 100
    const bmi = w / (meters * meters)
    if (!Number.isFinite(bmi)) return null
    const rounded = Math.round(bmi * 10) / 10
    return { bmi: rounded, category: bmiCategory(rounded) }
  }, [heightCm, weightKg, submitted])

  const error =
    submitted && !result ? 'Please enter valid height (cm) and weight (kg).' : null

  function onReset() {
    setHeightCm('')
    setWeightKg('')
    setSubmitted(false)
  }

  return (
    <CalculatorLayout
      title="BMI Calculator (Body Mass Index) | InfoDaily"
      description="Calculate your BMI using height and weight, and see your category (Underweight, Normal, Overweight, Obese)."
      canonicalPath="/calculators/bmi-calculator"
      h1="BMI Calculator"
      intro="Enter your height and weight to calculate your Body Mass Index (BMI) and category."
    >
      <div className="calc-form">
        <form
          onSubmit={e => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <div className="calc-form-grid">
            <Field label="Height (cm)" htmlFor="height">
              <TextInput
                id="height"
                type="number"
                inputMode="decimal"
                value={heightCm}
                onChange={e => setHeightCm(e.target.value)}
                min={1}
                step={0.1}
                placeholder="e.g., 170"
                required
              />
            </Field>
            <Field label="Weight (kg)" htmlFor="weight">
              <TextInput
                id="weight"
                type="number"
                inputMode="decimal"
                value={weightKg}
                onChange={e => setWeightKg(e.target.value)}
                min={1}
                step={0.1}
                placeholder="e.g., 65"
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
            Your BMI is <strong>{result.bmi}</strong>.
          </p>
          <p>
            Category: <strong>{result.category}</strong>
          </p>
        </div>
      ) : null}

      <div className="calc-content">
        <h2>How this calculator works</h2>
        <p>
          BMI estimates body fat using your height and weight. This tool converts your height from
          centimeters to meters, computes BMI, and then assigns a category based on standard
          thresholds.
        </p>

        <h2>Formula used</h2>
        <p>
          BMI is calculated as <code>BMI = weight(kg) / height(m)²</code>.
        </p>

        <h2>Example calculation</h2>
        <p>
          If you weigh <code>65 kg</code> and your height is <code>170 cm</code> (1.70 m), then:
          <br />
          <code>BMI = 65 / (1.70 × 1.70) = 22.5</code> (rounded to 1 decimal).
        </p>

        <h2>FAQs</h2>
        <ul>
          <li>
            <strong>Is BMI perfect?</strong> No. BMI is a screening metric and doesn’t directly
            measure body fat or health for every individual.
          </li>
          <li>
            <strong>Why is it rounded?</strong> Rounding makes results easier to read while keeping
            practical accuracy.
          </li>
          <li>
            <strong>Which units should I use?</strong> This calculator uses centimeters (cm) and
            kilograms (kg).
          </li>
        </ul>
      </div>
    </CalculatorLayout>
  )
}


