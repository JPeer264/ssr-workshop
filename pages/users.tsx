import Link from 'next/link';
import { FC } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Card from '../app/components/Card';
import CardWrapper from '../app/components/CardWrapper';
import { User, useUsers } from '../app/hooks/useUsers';
import { fetchUsers } from '../app/services/api';

const UsersOverview: FC<{ users: User[] }> = () => {
  const { users, isLoading } = useUsers();

  return (
    <div>
      <h1>Users</h1>
      <div>
        {isLoading && 'Loading...'}

        <CardWrapper>
          {users?.map((user) => (
            <Card key={user.id}>
              <div>{user.name}</div>
              <br />
              <Link href={`/users/${user.id}`}>More info</Link>
            </Card>
          ))}
        </CardWrapper>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('users', fetchUsers);

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default UsersOverview;
