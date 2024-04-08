import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  // Add more user properties as needed
}

interface UserListProps {
  users: User[];
  setModal: React.Dispatch<
    React.SetStateAction<'create' | 'edit' | 'delete' | null>
  >;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserList: React.FC<UserListProps> = ({
  users,
  setModal,
  setSelectedUser,
}) => {
  return (
    <div>
      <table className="border-collapse border">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">
              Nom d'utilisateur
            </th>
            <th className="border border-gray-400 px-4 py-2">E-mail</th>
            <th className="border border-gray-400 px-4 py-2">Rôle</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-400 px-4 py-2">
                {user.username}
              </td>
              <td className="border border-gray-400 px-4 py-2">{user.email}</td>
              <td className="border border-gray-400 px-4 py-2">{user.role}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => {
                    setModal('edit');
                    setSelectedUser(user);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    setModal('delete');
                    setSelectedUser(user);
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
