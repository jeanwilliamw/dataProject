import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import useRequireAuth from '../../hooks/useRequireAuth';
import UserList from '../../components/user-list';
import UserManagementModal from './user-management-modal';
import { User } from './types/user';
import { getAllUsers } from '../../api/users';
import { useApiBanner } from '../../contexts/apiBannerContext';

const AdminPage: React.FC = () => {
  const { user } = useRequireAuth('ADMIN');
  const { setApiBanner } = useApiBanner();

  const [modalState, setModalState] = useState<
    'create' | 'edit' | 'delete' | null
  >(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) return;
    getAllUsers(user?.access_token)
      .then((users) => {
        setUsers(users);
        setApiBanner({
          message: `Les utilisateurs ont été récupérés avec succès`,
          type: 'success',
        });
      })
      .catch(() => {
        setApiBanner({
          message: `La récupération des utilisateurs a échoué`,
          type: 'failure',
        });
      });
  }, []);

  return (
    <div>
      {user && <Header user={user} pageName="Administration" />}
      <div className="container mx-auto px-4 py-8">
        <div className="flex">
          {!!users.length && (
            <h2 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h2>
          )}
          <button
            onClick={() => {
              setModalState('create');
              setSelectedUser(null);
            }}
            className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Créer un nouvel utilisateur
          </button>
        </div>
        {!!users.length && (
          <UserList
            users={users}
            setModal={setModalState}
            setSelectedUser={setSelectedUser}
          />
        )}
      </div>
      {modalState && (
        <UserManagementModal
          modalState={modalState}
          setModalState={setModalState}
          selectedUser={selectedUser}
          setUsers={setUsers}
        />
      )}
    </div>
  );
};

export default AdminPage;
