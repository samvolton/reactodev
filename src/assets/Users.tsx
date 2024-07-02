// src/components/UserList.tsx
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from 'react-router-dom';
import useUserStore from "../stores/userStore";
import useDeleteUser from "../hooks/useDeleteUser";
import { User } from '../types';

const UserList: React.FC = () => {
  const { updateCurrentUser } = useUserStore();
  const deleteUser = useDeleteUser();
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5001/users");
      return response.data;
    }
  });

  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser.mutate(userId);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  return (
    <div className="user-list">
      <h1>User List</h1>
      <ul>
        {users && users.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <div>
              <button onClick={() => updateCurrentUser(user)}>Activate</button>
              <Link to={`/edit-user/${user.id}`}>Edit</Link>
              <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;