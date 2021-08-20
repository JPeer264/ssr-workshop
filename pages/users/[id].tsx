import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import UserInfo from '../../app/components/UserInfo';
import { User, useUserById } from '../../app/hooks/useUsers';
import { fetchUserById } from '../../app/services/api';

const UserDetail: FC<{ user: User }> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoading } = useUserById(id as string);

  return (
    <>
      <Link href="/users">To all users</Link>
      <div>
        {isLoading && 'Loading...'}
        <UserInfo user={user} />
      </div>
    </>
  );
};

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['user', params?.id], () => fetchUserById(params?.id as string));

  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default UserDetail;
