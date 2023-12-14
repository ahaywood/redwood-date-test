export const schema = gql`
  type Event {
    id: Int!
    name: String!
    dateTime: DateTime!
    date: DateTime!
  }

  type Query {
    events: [Event!]! @requireAuth
    event(id: Int!): Event @requireAuth
  }

  input CreateEventInput {
    name: String!
    dateTime: DateTime!
    date: DateTime!
  }

  input UpdateEventInput {
    name: String
    dateTime: DateTime
    date: DateTime
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event! @requireAuth
    updateEvent(id: Int!, input: UpdateEventInput!): Event! @requireAuth
    deleteEvent(id: Int!): Event! @requireAuth
  }
`
