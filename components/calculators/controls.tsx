import { ChangeEventHandler, ReactNode } from 'react'

type FieldProps = {
  label: string
  htmlFor: string
  hint?: string
  children: ReactNode
}

export function Field({ label, htmlFor, hint, children }: FieldProps) {
  return (
    <div className="calc-field">
      <label className="calc-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint ? <div className="calc-hint">{hint}</div> : null}
    </div>
  )
}

type InputProps = {
  id: string
  name?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  type?: 'text' | 'number' | 'date'
  inputMode?: 'text' | 'numeric' | 'decimal'
  placeholder?: string
  min?: number
  max?: number
  step?: number
  required?: boolean
  'aria-describedby'?: string
}

export function TextInput({
  id,
  name,
  value,
  onChange,
  type = 'text',
  inputMode,
  placeholder,
  min,
  max,
  step,
  required,
  'aria-describedby': ariaDescribedBy,
}: InputProps) {
  return (
    <input
      className="calc-input"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      inputMode={inputMode}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      required={required}
      aria-describedby={ariaDescribedBy}
    />
  )
}

type SelectOption = { value: string; label: string }
type SelectProps = {
  id: string
  name?: string
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  options: SelectOption[]
}

export function Select({ id, name, value, onChange, options }: SelectProps) {
  return (
    <select className="calc-select" id={id} name={name} value={value} onChange={onChange}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

type ButtonProps = {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled,
}: ButtonProps) {
  const className = variant === 'secondary' ? 'calc-button secondary' : 'calc-button'
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}




