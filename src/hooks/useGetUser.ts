import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const useGetUser = (userId: number | undefined) => {
  return useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (userId === undefined) {
        throw new Error('User ID is undefined');
      }
      const response = await axios.get(`http://localhost:5001/users/${userId}`);
      return response.data;
    },
    enabled: userId !== undefined,
  });
};

export default useGetUser;