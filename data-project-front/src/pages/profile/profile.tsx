import React, { useState } from 'react';
import useRequireAuth from '../../hooks/useRequireAuth';
import Header from '../../components/header';
import { updateUser } from '../../api/users';

const Profile: React.FC = () => {
  const { user, setUser } = useRequireAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    password: '' || undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      if (formData.password === '') {
        setFormData({
          ...formData,
          password: undefined,
        });
      }

      const updatedUser = await updateUser(
        user.id,
        formData,
        user.access_token,
      );
      if (updatedUser) {
        setUser({ ...user, username: updatedUser.username });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {user && <Header user={user} pageName="Profil" />}
      <div className="h-full max-w-md flex items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Modifier mes informations</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Nom d'utilisateur"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Choissisez un mot de passe fort"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Mettre à jour
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
