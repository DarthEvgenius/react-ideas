import type React from 'react'
import css from './index.module.scss'

export default function FormItems({ children }: { children: React.ReactNode }) {
  return <div className={css.wrapper}>{children}</div>
}
