import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import type { ClientError } from 'graphql-request';
import { getUsersQuery } from '../../../lib/graphql/users';

const endpoint = process.env.ENDPOINT;
const graphQLClient = new GraphQLClient(endpoint);

export const fetchPosts = async (): Promise<any[]> => {
  const response = await graphQLClient.request(getUsersQuery);
  return response;
};

export default function usePosts() {
  return useQuery<any[], ClientError>('findAll', fetchPosts);
}
