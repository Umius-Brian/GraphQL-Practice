import { GraphQLServer } from 'graphql-yoga'

// Type definitions for API
// 5 scalar types (stores single value): String, Boolean, Int, Float, ID

const typeDefs = `
  type Query {
    greeting(name: String): String!
    add(a: Float!, b: Float!): Float!
    me: User!
    post: Post!
  }  

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello, ${args.name}`
      } 
      return 'Hello'
    },
    add(parent, args, ctx, info) {
      return args.a + args.b
    },
    me() {
      return {
        id: '123',
        name: 'Chronos',
        email: 'hello@email.com',
        age: 27
      }
    },
    post() {
      return {
        id: '234',
        title: 'Post Title',
        body: 'Post message',
        published: true
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