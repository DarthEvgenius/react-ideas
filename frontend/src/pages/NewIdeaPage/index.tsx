// import css from './index.module.scss'
import Segment from '../../components/Segment'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import { useFormik } from 'formik'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from '@reactideas/backend/src/router/createIdea/input'
import { toFormikValidate } from 'zod-formik-adapter'

export default function NewIdeaPage() {
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
      await createIdea.mutateAsync(values)
      console.log('Submitted from formik:', values)
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
        <Input name="name" label="Name" formik={formik} />

        <Input name="nick" label="Nick" formik={formik} />

        <Input name="description" label="description" formik={formik} />

        <Textarea name="text" label="text" formik={formik} />

        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Some fields are invalid</div>
        )}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
