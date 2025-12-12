import type { FormikProps } from 'formik'
import css from './index.module.scss'
import cn from 'classnames'

export default function Input({
  name,
  label,
  formik,
  maxWidth,
  type = 'text',
}: {
  name: string
  label: string
  formik: FormikProps<any>
  maxWidth?: number
  type?: 'text' | 'password'
}) {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  const isDisabled = formik.isSubmitting
  const isInvalid = !!touched && !!error

  return (
    <div
      className={cn({
        [css.field]: true,
        [css.disabled]: isDisabled,
      })}
    >
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={cn({
          [css.input]: true,
          [css.invalid]: isInvalid,
        })}
        style={{ maxWidth }}
        type={type}
        id={name}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          formik.setFieldTouched(name)
        }}
        value={value}
        disabled={isDisabled}
      />
      {isInvalid && <div className={css.error}>{error}</div>}
    </div>
  )
}
