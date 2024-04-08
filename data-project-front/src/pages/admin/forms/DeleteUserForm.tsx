import React from 'react';
import { deleteUser } from '../../../api/users';
import { User } from '../types/user';
import useRequireAuth from '../../../hooks/useRequireAuth';
import { useApiBanner } from '../../../contexts/apiBannerContext';

interface DeleteUserFormProps {
  closeModal: () => void;
  user: User | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const DeleteUserForm: React.FC<DeleteUserFormProps> = ({
  closeModal,
  user,
  setUsers,
}) => {
  const { user: authUser } = useRequireAuth();
  const { setApiBanner } = useApiBanner();

  const handleDelete = async () => {
    if (!user || !authUser) return;
    try {
      const deletedUser = await deleteUser(user.id, authUser?.access_token);
      if (deletedUser) {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
        setApiBanner({
          message: `L'utilisateur a été supprimé avec succès`,
          type: 'success',
        });
      }
    } catch {
      setApiBanner({
        message: `La suppression de l'utilisateur a échoué`,
        type: 'failure',
      });
    }
    closeModal();
  };

  return (
    <div className="p-4 bg-white rounded">
      <p className="mb-10 mt-4 text-xl text-center">
        Voulez vous vraiment supprimer cet utilisateur ?
      </p>
      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
          onClick={closeModal}
        >
          Annuler
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          onClick={handleDelete}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default DeleteUserForm;
