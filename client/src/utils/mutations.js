import { gql } from '@apollo/client';

export const User_Profile = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
       token
       profile {
         _id
         email
       }
    }
  }`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    profile {
      _id
      email
    }
  }
}`;

export const ADD_STOCK_TO_FAVORITES = gql`
  mutation AddStockToFavorites($userId: ID!, $stockSymbol: String!) {
    addStockToFavorites(userId: $userId, stockSymbol: $stockSymbol) {
      _id
      email
      favoriteStocks
    }
  }
`;

