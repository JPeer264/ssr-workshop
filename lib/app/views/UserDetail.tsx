import { FC } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import { useUserById } from '../hooks/useUsers';

const UserDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading } = useUserById(id);

  return (
    <>
      <Link to="/users">To all users</Link>
      <div>
        {isLoading && 'Loading...'}
        <UserInfo user={user} />
      </div>
    </>
  );
};

export default UserDetail;
