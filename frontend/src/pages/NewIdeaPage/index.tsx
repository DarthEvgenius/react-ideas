// import css from './index.module.scss'
import Segment from '../../components/Segment'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import { useFormik } from 'formik'
// import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { toFormikValidate } from 'zod-formik-adapter'

export default function NewIdeaPage() {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: toFormikValidate(
      z.object({
        name: z.string().min(1, 'Name is requered'),
        nick: z
          .string()
          .min(1)
          .regex(
            /^[a-z0-9-]+$/,
            'Nick may contain only lowercase letters, numbers and dashes'
          ),
        description: z.string().min(1, 'Description is requered'),
        text: z.string().min(10, 'Text should be at least 10 characters long'),
      })
    ),
    onSubmit: (values) => {
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
