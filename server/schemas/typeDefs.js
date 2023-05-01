const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  email: String
  favoriteStocks: [Stock!]
}

type Stock {
  symbol: String
}

type Auth {
  token: String
  profile: User
}

type Query {
  users: [User]!
  user(userId: ID!): User
}

type Mutation {
  addUser(email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addStockToFavorites(userId: ID!, stockSymbol: String!): User
  removeUser(userId: ID!): User
  removeStock(userId: ID!, stock: String!): User
}`;

module.exports = typeDefs;
