import { GraphQLServer } from 'graphql-yoga'

// Type definitions for API
// 5 scalar types (stores single value): String, Boolean, Int, Float, ID

const typeDefs = `
  type Query {
    me: User!
  }  

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '123',
        name: 'Chronos',
        email: 'hello@email.com',
        age: 27
      }
    }
  }
}

const server = new GraphQLServer ({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up!')
}) 