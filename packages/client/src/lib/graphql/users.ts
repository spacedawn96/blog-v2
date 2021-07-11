import { gql } from 'graphql-request';

export const getUsersQuery = gql`
  query {
    findAll {
      id
      name
    }
  }
`;
