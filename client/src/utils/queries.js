import { gql } from '@apollo/client';

export const Stock_Search = gql`
  query StockSearch {
    thoughts {
      _id
      open
      high
      low
      close
      volume 
    }
  }
`;

export const USER_INFO = gql `
query GetUserEmail($userId: ID!) {
  user(_id: $userId) {
  email
  }
}
`;