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
      intro="Accurate, easy-to-use calculators for everyday calculations. All tools are free and provide instant results with clear explanations."
    >
      <div className="calc-grid">
        {CALCULATORS.map(calc => (
          <article key={calc.slug} className="post-card">
            <Link href={`/calculators/${calc.slug}`} className="post-card-link">
              <div className="post-card-content">
                <h2 className="calc-card-title">{calc.name}</h2>
                <p className="calc-card-desc">{calc.shortDescription}</p>
                <div style={{ marginTop: '1rem', color: '#2563EB', fontWeight: 500, fontSize: '0.9375rem' }}>
                  Open Calculator →
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </CalculatorLayout>
  )
}


