const ApolloServer = require('apollo-server').ApolloServer
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer
const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Color {
    name: String!
    value: String!
  }

  type Domain {
    name: String!
    color: [Color]!
  }
  
  type Query {
    domains: [Domain]!
    domain(name: String!): Domain
  }
`;

let firefox = 
[
  {
    name: "Desktop",
    color: [
      {
        name: "Action Primary",
        value: "rgba(0, 96, 223, 1)"
      },
      {
        name: "Action Primary Hover",
        value: "rgba(2, 80, 187, 1)"
      },
    ]
  },
  {
    name: "Mobile",
    color: [
      {
        name: "Action Primary",
        value: "a"
      },
      {
        name: "Action Primary Hover",
        value: "b"
      },
    ]
  },
]

const resolvers = {
  Query: {
    domains: () => domains,
    domain: (_, args) => {
      return firefox.find((domain) => domain.name === args.name);
    }
  },
};

function createLambdaServer () {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

function createLocalServer () {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

module.exports = { createLambdaServer, createLocalServer }