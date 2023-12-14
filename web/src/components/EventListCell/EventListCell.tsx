import type {
  FindEventListQuery,
  FindEventListQueryVariables,
} from 'types/graphql'

import { DateField, Form } from '@redwoodjs/forms'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindEventListQuery {
    events {
      date
      dateTime
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindEventListQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  events,
}: CellSuccessProps<FindEventListQuery, FindEventListQueryVariables>) => {
  const prettifyDate = (date) => {
    const displayDate = new Date(date)
    return displayDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
  }

  // convert date for input field
  const formatDateForInput = (date) => {
    const displayDate = new Date(date)
    return displayDate.toISOString().split('T')[0]
  }

  return (
    <Form>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {JSON.stringify(event)}
            {prettifyDate(event.date)}
            <DateField
              defaultValue={formatDateForInput(event.date)}
              name={`update-${index}`}
            />
          </li>
        ))}
      </ul>
    </Form>
  )
}
