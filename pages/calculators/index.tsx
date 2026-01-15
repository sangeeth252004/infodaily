import Link from 'next/link'
import CalculatorLayout from '../../components/calculators/CalculatorLayout'
import { CALCULATORS } from '../../lib/calculators/catalog'

export default function CalculatorsIndex() {
  return (
    <CalculatorLayout
      title="Free Online Calculators | InfoDaily"
      description="Use fast, free online calculators for age, BMI, percentage, simple interest, EMI, and GST. Mobile-friendly tools with clear results."
      canonicalPath="/calculators"
      h1="Free Online Calculators"
      intro="Quick, mobile-friendly calculators with clear results. Choose a tool below to get started."
    >
      <div className="calc-grid">
        {CALCULATORS.map(calc => (
          <article key={calc.slug} className="post-card">
            <Link href={`/calculators/${calc.slug}`} className="post-card-link">
              <div className="post-card-content">
                <h2 className="calc-card-title">{calc.name}</h2>
                <p className="calc-card-desc">{calc.shortDescription}</p>
                <div className="post-meta" style={{ marginTop: '1.25rem' }}>
                  Open calculator →
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </CalculatorLayout>
  )
}


