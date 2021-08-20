import { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import create from 'zustand';
// eslint-disable-next-line import/no-cycle
import { fetchUserById, fetchUsers } from '../services/api';

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address,
  phone: string;
  website: string;
  company: Company;
}

interface UserZustand {
  users: User[];
  setUsers: (user: User[]) => void;
  setUser: (user: User) => void;
}

const useUserZustand = create<UserZustand>((set, get) => ({
  users: [],
  setUsers: (users) => set({ users }),
  setUser: (user) => set({
    users: [
      ...get().users.filter(({ id }) => id !== user.id),
      user,
    ],
  }),
}));

export const useUsers = () => {
  const state = useUserZustand();
  const { data: users, isLoading } = useQuery('users', fetchUsers);

  useEffect(() => {
    if (!users) {
      return;
    }

    state.setUsers(users);
  }, [users]);

  return {
    users,
    isLoading,
  };
};

export const useUserById = (userId: string) => {
  const state = useUserZustand(
    useCallback(
      ({ users, setUser }) => ({
        user: users.find(({ id }) => userId === String(id)),
        setUser,
      }),
      [userId],
    ),
  );
  const { data: user, isLoading } = useQuery(['user', userId], () => fetchUserById(userId));

  useEffect(() => {
    if (!user) {
      return;
    }

    state.setUser(user);
  }, [user]);

  return {
    user,
    isLoading,
  };
};
