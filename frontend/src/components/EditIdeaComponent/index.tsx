import { useState } from 'react'
import { trpc } from '../../lib/trpc'
import FormItems from '../FormItems'
import Input from '../Input'
import Segment from '../Segment'
import { useFormik } from 'formik'
// on frontend we must import only types directly from backend
import type { TrpcRouterOutput } from '@reactideas/backend/src/router'
import { getViewIdeaRoute } from '../../lib/routes'
import { useNavigate } from 'react-router-dom'
import Textarea from '../Textarea'
import Alert from '../Alert'
import Button from '../Button'
import { pick } from 'lodash-es'
import { toFormikValidate } from 'zod-formik-adapter'
import { zUpdateIdeaTrpcInput } from '@reactideas/backend/src/router/updateIdea/input'

export default function EditIdeaComponent({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>
}) {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<null | string>(null)

  const updateIdea = trpc.updateIdea.useMutation()
  const formik = useFormik({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validate: toFormikValidate(zUpdateIdeaTrpcInput.omit({ ideaId: true })),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)

        await updateIdea.mutateAsync({ ...values, ideaId: idea.id })

        navigate(getViewIdeaRoute({ ideaNick: values.nick }))
      } catch (error: any) {
        setSubmittingError(error.message)
      }
    },
  })

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="name" label="Name" formik={formik} />

          <Input name="nick" label="Nick" formik={formik} />

          <Input
            name="description"
            label="description"
            formik={formik}
            maxWidth={300}
          />

          <Textarea name="text" label="text" formik={formik} />

          {!formik.isValid && !!formik.submitCount && (
            <div style={{ color: 'red' }}>Some fields are invalid</div>
          )}

          {submittingError && <Alert color="red">{submittingError}</Alert>}

          <Button loading={formik.isSubmitting}>
            {formik.isSubmitting ? 'Submitting...' : 'Update Idea'}
          </Button>
        </FormItems>
      </form>
    </Segment>
  )
}
