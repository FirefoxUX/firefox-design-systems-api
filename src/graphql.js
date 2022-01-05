require('dotenv').config();
import { ApolloServer, gql } from "apollo-server-lambda";


export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
      "Access-Control-Allow-Origin",
      "https://studio.apollographql.com"
  );
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
  );
  if (req.method === "OPTIONS") {
      res.end();
      return false;
  }

  await startServer;
  await apolloServer.createHandler({
      path: "/api/graphql",
  })(req, res);
}

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
  cors: {
    origin: '*',
    credentials: true
  },
  playground: true, // enable GraphQL Playground IDE on prod env
  introspection: true
});

exports.handler = server.createHandler(); // Don't forget to add 