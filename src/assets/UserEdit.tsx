// src/components/UserEdit.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import UserForm from './UserForm';

const UserEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : undefined;

  return (
    <div className="user-edit">
      <UserForm userId={userId} />
    </div>
  );
};

export default UserEdit;