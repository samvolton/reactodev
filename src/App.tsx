// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Topbar from "./assets/Topbar";
import UserList from "./assets/Users";
import UserForm from "./assets/UserForm";
import UserEdit from "./assets/UserEdit";
import './App.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Topbar />
          <main>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/create-user" element={<UserForm />} />
              <Route path="/edit-user/:id" element={<UserEdit />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;