import cn from 'classnames'
import css from './index.module.scss'
import type React from 'react'

export default function Alert({
  color,
  children,
}: {
  color: 'red' | 'green'
  children: React.ReactNode
}) {
  return (
    <div className={cn({ [css.alert]: true, [css[color]]: true })}>
      {children}
    </div>
  )
}
