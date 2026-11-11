import { cloneElement } from 'react'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

const baseClasses = [
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5',
  'font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.12em]',
  'leading-none no-underline whitespace-nowrap transition-all duration-200',
  'hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2',
  'focus-visible:outline-offset-3 focus-visible:outline-[#CFB08B]',
  'active:translate-y-0',
].join(' ')

const variants = {
  primary: 'border-transparent bg-[#390F0D] text-[#F5EDE0] shadow-none hover:bg-[#CFB08B] hover:text-[#390F0D]',
  secondary: 'border-[#390F0D]/30 bg-[#F5EDE0]/60 text-[#390F0D] hover:border-[#390F0D] hover:bg-[#F5EDE0]',
  outline: 'border-[#CFB08B] bg-transparent text-[#F5EDE0] hover:bg-[#CFB08B] hover:text-[#390F0D]',
}

export function Button({ children, className = '', variant = 'primary', asChild = false, ...props }) {
  const classes = cn(baseClasses, variants[variant] || variants.primary, className)

  if (asChild) {
    return cloneElement(children, {
      ...props,
      className: cn(classes, children.props.className),
    })
  }

  return <button className={classes} {...props}>{children}</button>
}
