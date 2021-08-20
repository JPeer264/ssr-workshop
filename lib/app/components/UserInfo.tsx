import { FC } from 'react';
import { User } from '../hooks/useUsers';

interface UserInfoProps {
  user?: User;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return <>User not found</>;
  }

  return (
    <div>
      <div>
        <b>Email:</b>
        {' '}
        {user.email}
        <br />
        <b>Name:</b>
        {' '}
        {user.name}
      </div>
    </div>
  );
};

export default UserInfo;
