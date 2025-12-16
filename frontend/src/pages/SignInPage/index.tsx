import { zSignInTrpcInput } from '@reactideas/backend/src/router/signIn/input'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useFormik } from 'formik'
import { useState } from 'react'
import Alert from '../../components/Alert'
import Button from '../../components/Button'
import FormItems from '../../components/FormItems'
import Input from '../../components/Input'
import Segment from '../../components/Segment'
import { trpc } from '../../lib/trpc'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { getAllIdeasRoute } from '../../lib/routes'

export const SignInPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  const signIn = trpc.signIn.useMutation()

  const [submittingError, setSubmittingError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)

        const { token } = await signIn.mutateAsync(values)
        Cookie.set('token', token, { expires: 9999999 })

        trpcUtils.invalidate()
        navigate(getAllIdeasRoute())
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          {!formik.isValid && !!formik.submitCount && (
            <Alert color="red">Some fields are invalid</Alert>
          )}
          {submittingError && <Alert color="red">{submittingError}</Alert>}

          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
