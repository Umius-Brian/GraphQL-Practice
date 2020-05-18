import { GraphQLServer } from 'graphql-yoga'

// Type definitions for API
// 5 scalar types (stores single value): String, Boolean, Int, Float, ID

const typeDefs = `
  type Query {
    users(query: String): [User!]!
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

const users = [{
  id: '1',
  name: 'Brian',
  email: 'asdf@email.com',
  age: 30
}, {
  id: '2',
  name: 'Christy',
  email: 'huh@email.com',
  age: 27
}]

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
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