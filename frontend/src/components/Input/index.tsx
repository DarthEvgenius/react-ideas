export default function Input({
  name,
  label,
  state,
  setState,
}: {
  name: string
  label: string
  state: Record<string, any>
  setState: React.Dispatch<React.SetStateAction<any>>
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
        id={name}
        onChange={(e) => {
          setState((old) => ({
            ...old,
            [name]: e.target.value,
          }))
        }}
        value={state[name]}
      />
    </div>
  )
}
