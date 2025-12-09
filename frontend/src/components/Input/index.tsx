import type { FormikProps } from 'formik'

export default function Input({
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

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
        id={name}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => {
          formik.setFieldTouched(name)
        }}
        value={value}
      />
      {error && touched && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
