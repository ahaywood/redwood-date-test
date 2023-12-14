import {
  DateField,
  DatetimeLocalField,
  Form,
  Label,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import { Toaster, toast } from '@redwoodjs/web/dist/toast'
import { MetaTags, useMutation } from '@redwoodjs/web'
import EventListCell from 'src/components/EventListCell'

import { QUERY as EVENTS_QUERY } from 'src/components/EventListCell/EventListCell'

const CREATE_EVENT_MUTATION = gql`
  mutation createEventMutation(
    $name: String!
    $date: DateTime!
    $dateTime: DateTime!
  ) {
    createEvent(input: { name: $name, date: $date, dateTime: $dateTime }) {
      id
      dateTime
      date
      name
    }
  }
`

const EventPage = () => {
  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('Event created successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [EVENTS_QUERY],
  })

  const handleSubmit = (data) => {
    console.log(data)
    createEvent({ variables: { ...data } })
  }

  return (
    <>
      <MetaTags title="Event" description="Event page" />

      <Toaster />

      <h1>Event Page</h1>

      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          <p>
            <Label name="name" />
            <br />
            <TextField name="name" />
          </p>

          <p>
            <Label name="date" />
            <br />
            <DatetimeLocalField name="date" />
          </p>

          <p>
            <Label name="date time" />
            <br />
            <DateField name="dateTime" />
          </p>

          <p>
            <Submit>Submit</Submit>
          </p>
        </fieldset>
      </Form>

      <EventListCell />
    </>
  )
}

export default EventPage
