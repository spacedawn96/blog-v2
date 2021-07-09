import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { gql, useQuery, NetworkStatus } from '@apollo/client';

export const ALL_POSTS_QUERY = gql`
  query {
    findAll {
      id
      name
    }
  }
`;

export default function Home() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(ALL_POSTS_QUERY, {
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  console.log(data);
  return (
    <div>
      <span> hello</span>
    </div>
  );
}
