import type { FormikProps } from 'formik'
import css from './index.module.scss'
import cn from 'classnames'

export default function Textarea({
  name,
  label,
  formik,
}: {
  name: string
  label: string
  formik: FormikProps<any>
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
      <textarea
        className={cn({
          [css.input]: true,
          [css.invalid]: isInvalid,
        })}
        id={name}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value)
        }}
        value={value}
        disabled={formik.isSubmitting}
      />
      {isInvalid && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
