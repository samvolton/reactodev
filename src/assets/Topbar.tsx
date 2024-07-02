// src/components/Topbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import useUserStore from '../stores/userStore';

const Topbar: React.FC = () => {
  const { currentUser } = useUserStore();

  return (
    <header className="topbar">
      <nav>
        <div className="left-links">
          <Link to="/">Home</Link>
          <Link to="/create-user">Create User</Link>
        </div>
        <div className="right-user">
          {currentUser ? `${currentUser.name} (${currentUser.email})` : 'No active user'}
        </div>
      </nav>
    </header>
  );
};

export default Topbar;