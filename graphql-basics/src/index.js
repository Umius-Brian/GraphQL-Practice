import { GraphQLServer } from 'graphql-yoga'

// Type definitions for API, schemas
// 5 scalar types (stores single value): String, Boolean, Int, Float, ID
// Any relationships must be set up in typeDefs

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

const posts = [{
  id: '10',
  title: `Ender's Game`,
  body: 'This is how to GraphQL',
  published: true,
  author: '1',
}]

const comments = [{
  id: '100',
  text: 'First',
  author: '1',
  post: '10'
}, {
  id: '200',
  text: 'Second',
  author: '2',
  post: '10'
}, {
  id: '300',
  text: 'Third',
  author: '1',
  post: '10'
}, {
  id: '400',
  text: 'Fourth',
  author: '1',
  post: '10'
}]

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments:[Comment!]!
    me: User!
    post: Post!
  }  

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comment: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`


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

    comments(parent, args, ctx, info) {
      return comments
    },

    me() {
      return {
        id: '123',
        name: 'Chronos',
        email: 'hello@email.com',
        age: 27
      }
    },

    posts(parent, args, ctx, info) {
      if(!args.query) {
        return posts
      }
      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch
      })
    }
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author    // parent = Post object
      })
    },
    comment(parent, args, ctx, info) {
      return comments.find((comment) => {
        return comment.post === parent.id
      })
    }
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author = parent.id
      })
    }
  },

  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },

    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })
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