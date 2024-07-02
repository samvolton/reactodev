import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, User>({
    mutationFn: async (updatedUser) => {
      const response = await axios.patch(`http://localhost:5001/users/${updatedUser.id}`, updatedUser);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export default useUpdateUser;