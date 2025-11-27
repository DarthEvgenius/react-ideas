import { trpc } from '../../lib/trpc'

export default function AllIdeasPage() {
  const { data, error, isLoading, isFetching, isError } =
    trpc.getIdeas.useQuery()

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <h1>Ideas</h1>

      {data?.ideas.map((i) => (
        <li key={i.nick}>
          <h2>{i.name}</h2>
          <p>{i.description}</p>
        </li>
      ))}
    </div>
  )
}
