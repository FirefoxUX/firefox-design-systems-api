import { ApolloServer, gql } from "apollo-server-lambda";

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true, // enable GraphQL Playground IDE on prod env
  introspection: true
});

exports.handler = server.createHandler(); // Don't forget to add 