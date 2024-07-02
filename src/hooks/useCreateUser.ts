import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

type CreateUserInput = Omit<User, 'id'>;

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, CreateUserInput, { previousUsers: User[] }>({
    mutationFn: async (newUser) => {
      const response = await axios.post('http://localhost:5001/users', newUser);
      return response.data;
    },
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previousUsers = queryClient.getQueryData<User[]>(['users']) || [];
      queryClient.setQueryData<User[]>(['users'], (old = []) => [...old, { ...newUser, id: Date.now() } as User]);
      return { previousUsers };
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export default useCreateUser;