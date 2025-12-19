import type React from 'react'
import css from './index.module.scss'
import cn from 'classnames'
import { Link } from 'react-router-dom'

export default function Button({
  children,
  loading = false,
}: {
  children: React.ReactNode
  loading?: boolean
}) {
  return (
    <button
      className={cn({ [css.button]: true, [css.disabled]: loading })}
      type="submit"
      disabled={loading}
    >
      {loading ? 'Submitting...' : children}
    </button>
  )
}

export function LinkButton({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <Link className={css.button} to={to}>
      {children}
    </Link>
  )
}
