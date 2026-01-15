export type CalculatorEntry = {
  slug:
    | 'age-calculator'
    | 'bmi-calculator'
    | 'percentage-calculator'
    | 'simple-interest-calculator'
    | 'emi-calculator'
    | 'gst-calculator'
  name: string
  shortDescription: string
}

export const CALCULATORS: CalculatorEntry[] = [
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    shortDescription: 'Find your exact age in years, months, and days from your date of birth.',
  },
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    shortDescription: 'Calculate Body Mass Index (BMI) and understand your weight category.',
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortDescription: 'Calculate X% of a value quickly with a simple percentage tool.',
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    shortDescription: 'Compute simple interest and total amount for a principal over time.',
  },
  {
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    shortDescription: 'Estimate monthly EMI payments and total interest for a loan.',
  },
  {
    slug: 'gst-calculator',
    name: 'GST Calculator',
    shortDescription: 'Add or remove GST to get tax amount and final price.',
  },
]


