import { FC } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import CardWrapper from '../components/CardWrapper';
import { useUsers } from '../hooks/useUsers';

const UsersOverview: FC = () => {
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
              <Link to={`/users/${user.id}`}>More info</Link>
            </Card>
          ))}
        </CardWrapper>
      </div>
    </div>
  );
};

export default UsersOverview;
