import { getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Link } from 'react-router-dom'
import css from './index.module.scss'

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
    <div className={css.filter}>
      <h1 className={css.title}>Ideas</h1>

      {data?.ideas.map((i) => (
        <div className={css.idea} key={i.nick}>
          <h2 className={css.ideaName}>
            <Link
              className={css.ideaLink}
              to={getViewIdeaRoute({ ideaNick: i.nick })}
            >
              {i.name}
            </Link>
          </h2>
          <p>{i.description}</p>
        </div>
      ))}
    </div>
  )
}
