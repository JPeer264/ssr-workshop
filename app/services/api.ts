import isServer from '../helpers/isServer';
import type { User } from '../hooks/useUsers';

const delay = (ms = 1000) => new Promise((res) => setTimeout(res, ms));

export const fetchUsers = async (): Promise<User[]> => {
  if (!isServer) {
    await delay();
  }

  return (await fetch('https://jsonplaceholder.typicode.com/users')).json();
};

export const fetchUserById = async (id: string): Promise<User> => {
  if (!isServer) {
    await delay();
  }

  return (await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)).json();
};
