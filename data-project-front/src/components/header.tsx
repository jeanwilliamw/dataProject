import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../pages/admin/types/user';
import { FaUser } from 'react-icons/fa'; // Import user icon from react-icons library
import useRequireAuth from '../hooks/useRequireAuth';

interface HeaderProps {
  user: User;
  pageName: string;
}

const Header: React.FC<HeaderProps> = ({ user, pageName }) => {
  const navigate = useNavigate();
  const { setUser } = useRequireAuth();
  const [showMenu, setShowMenu] = useState(false); // State to control menu visibility
  const menuRef = useRef<HTMLDivElement>(null); // Ref for the menu

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-blue-500 text-white py-8 w-full">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">{pageName}</h2>
          <p className="text-lg">Bonjour, {user.username} !</p>
        </div>
        <div className="relative flex items-center" ref={menuRef}>
          <button
            className="text-white text-lg font-semibold bg-transparent border border-white rounded-md py-2 px-4 transition duration-300 ease-in-out hover:bg-white hover:text-blue-500 mr-10"
            onClick={() => navigate('/dashboard')}
          >
            Tableau de bord
          </button>
          {user.role === 'ADMIN' && (
            <button
              className="text-white text-lg font-semibold bg-transparent border border-white rounded-md py-2 px-4 transition duration-300 ease-in-out hover:bg-white hover:text-blue-500 mr-10"
              onClick={() => navigate('/admin')}
            >
              Administration
            </button>
          )}
          <FaUser
            className="cursor-pointer mr-4" // Add margin to the user icon
            onClick={() => setShowMenu(!showMenu)}
            size={24}
          />
          {showMenu && (
            <div className="absolute right-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                onClick={() => navigate('/profile')}
              >
                Mon profil
              </button>
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                onClick={() => (setUser ? setUser(null) : null)}
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
