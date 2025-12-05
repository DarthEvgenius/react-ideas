// import css from './index.module.scss'
import { useState } from 'react'
import Segment from '../../components/Segment'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'

export default function NewIdeaPage() {
  const [state, setState] = useState({
    name: '',
    nick: '',
    description: '',
    text: '',
  })

  return (
    <Segment title="New Idea">
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault()
          console.log('Submitted', state)
        }}
      >
        <Input name="name" label="Name" state={state} setState={setState} />

        <Input name="nick" label="Nick" state={state} setState={setState} />

        <Input
          name="description"
          label="description"
          state={state}
          setState={setState}
        />

        <Textarea name="text" label="text" state={state} setState={setState} />

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
