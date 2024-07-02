// src/hooks/useDeleteUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: number) => {
      await axios.delete(`http://localhost:5001/users/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export default useDeleteUser;