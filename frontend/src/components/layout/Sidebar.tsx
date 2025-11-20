import React from 'react';
import { BookOpen, Home, LogOut, Users } from 'react-feather';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import UrbanoLogo from '../../assets/urbano-logo-white.png';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/AuthService';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  className: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const history = useHistory();
  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const handleLogout = async () => {
    await authService.logout();
    setAuthenticatedUser(null);
    history.push('/login');
  };

  return (
    <div className={`sidebar flex flex-col h-full p-2 justify-between ${className}`}>
      <Link to="/" className="flex justify-center pt-3">
        <img src={UrbanoLogo} alt="Urbano logo" />
      </Link>

      <nav className="mt-5 flex flex-col gap-5 h-2/3 justify-center px-2">
        <SidebarItem to="/">
          <Home /> Dashboard
        </SidebarItem>
        <SidebarItem to="/courses">
          <BookOpen /> Courses
        </SidebarItem>
        {authenticatedUser?.role === 'admin' && (
          <SidebarItem to="/users">
            <Users /> Users
          </SidebarItem>
        )}
      </nav>

      <button
        className="text-red-500 rounded-md p-3 transition-colors flex gap-3 justify-center items-center font-semibold focus:outline-none mt-auto mb-5 bg-white"
        onClick={handleLogout}>
        <LogOut /> Logout
      </button>
    </div>
  );
}
