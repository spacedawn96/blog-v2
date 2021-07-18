import { useQuery } from 'react-query';
import { GraphQLClient } from 'graphql-request';
import type { ClientError } from 'graphql-request';
import { getUsersQuery } from '../../../lib/graphql/users';

const endpoint = process.env.ENDPOINT;
const graphQLClient = new GraphQLClient(endpoint);

export const fetchUsers = async (): Promise<any[]> => {
  const response = await graphQLClient.request(getUsersQuery);
  return response;
};

export default function useUsers() {
  return useQuery<any[], ClientError>('findAll', fetchUsers);
}
