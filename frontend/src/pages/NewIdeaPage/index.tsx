// import css from './index.module.scss'
import Segment from '../../components/Segment'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import { useFormik } from 'formik'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@reactideas/backend/src/router/createIdea/input'
import { toFormikValidate } from 'zod-formik-adapter'
import { useState } from 'react'
import Alert from '../../components/Alert'
import Button from '../../components/Button'
import FormItems from '../../components/FormItems'

export default function NewIdeaPage() {
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<null | string>(null)

  const createIdea = trpc.createIdea.useMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: toFormikValidate(zCreateIdeaTrpcInput),
    onSubmit: async (values) => {
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
        setIsSuccessMessageVisible(true)

        setTimeout(() => setIsSuccessMessageVisible(false), 3000)
        console.log('Submitted from formik:', values)
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => setSubmittingError(null), 3000)
      }
    },
  })

  return (
    <Segment title="New Idea">
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
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

          {isSuccessMessageVisible && (
            <Alert color="green">Idea created!</Alert>
          )}

          {submittingError && <Alert color="red">{submittingError}</Alert>}

          <Button loading={formik.isSubmitting}>
            {formik.isSubmitting ? 'Submitting...' : 'Create Idea'}
          </Button>
        </FormItems>
      </form>
    </Segment>
  )
}
