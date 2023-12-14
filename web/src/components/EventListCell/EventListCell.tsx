import type {
  FindEventListQuery,
  FindEventListQueryVariables,
} from 'types/graphql'

import { DateField, DatetimeLocalField, Form } from '@redwoodjs/forms'
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

  // convert date for date input field
  const formatDateForInput = (date) => {
    const displayDate = new Date(date)
    console.log(displayDate.toISOString().split('T')[0])
    return displayDate.toISOString().split('T')[0]
  }

  // convert date for date time input field
  const formatDateTimeForInput = (date: string) => {
    const displayDate = new Date(date)
    const year = displayDate.getFullYear()
    const month = String(displayDate.getMonth() + 1).padStart(2, '0') // Months are 0-indexed in JavaScript
    const day = String(displayDate.getDate()).padStart(2, '0')
    const hours = String(displayDate.getHours()).padStart(2, '0')
    const minutes = String(displayDate.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day}T${hours}:${minutes}`
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
            <DatetimeLocalField
              name={`update-dateTime-${index}`}
              defaultValue={formatDateTimeForInput(event.dateTime)}
            />
          </li>
        ))}
      </ul>
    </Form>
  )
}
