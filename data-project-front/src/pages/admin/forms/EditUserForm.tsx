import React, { useState } from 'react';
import { User } from '../types/user';
import { updateUser } from '../../../api/users';
import useRequireAuth from '../../../hooks/useRequireAuth';
import { useApiBanner } from '../../../contexts/apiBannerContext';

interface EditUserFormProps {
  closeModal: () => void;
  user: User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  user,
  closeModal,
  setUsers,
}) => {
  const { user: authUser } = useRequireAuth();
  const { setApiBanner } = useApiBanner();
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    role: user?.role,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authUser) {
      try {
        const updatedUser = await updateUser(
          user.id,
          formData,
          authUser.access_token,
        );
        if (updatedUser) {
          setUsers((prevUsers) =>
            prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
          );
          setApiBanner({
            message: `L'utilisateur a été mis à jour avec succès`,
            type: 'success',
          });
        }
      } catch {
        setApiBanner({
          message: `La mise à jour de l'utilisateur a échoué`,
          type: 'failure',
        });
      }
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nom d'utilisateur:
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Nom d'utilisateur"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Role:
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Valider
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
