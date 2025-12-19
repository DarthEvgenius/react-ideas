import { trpc } from '../../lib/trpc'
import { type EditIdeaRouteParams } from '../../lib/routes'
import { useParams } from 'react-router-dom'
import EditIdeaComponent from '../../components/EditIdeaComponent'

export default function EditIdeaPage() {
  const { ideaNick } = useParams() as EditIdeaRouteParams

  const getIdeaResult = trpc.getIdea.useQuery({ ideaNick })

  // get user info to check permission
  const getMeResult = trpc.getMe.useQuery()

  if (
    getIdeaResult.isLoading ||
    getMeResult.isLoading ||
    getIdeaResult.isFetching ||
    getMeResult.isFetching
  ) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getIdeaResult.data?.idea) {
    return <span>Idea not found</span>
  }

  const idea = getIdeaResult.data.idea
  const me = getMeResult.data?.me

  if (!me) {
    return <span>Only for authorized users</span>
  }

  if (idea.author.id !== me?.id) {
    return <span>You can edit only your idea.</span>
  }

  return <EditIdeaComponent idea={idea} />
}
