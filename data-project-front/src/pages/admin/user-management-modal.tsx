import React from 'react';
import CreateUserForm from './forms/CreateUserForm';
import EditUserForm from './forms/EditUserForm';
import DeleteUserForm from './forms/DeleteUserForm';
import { User } from './types/user';

interface ModalProps {
  modalState: 'create' | 'edit' | 'delete' | null;
  setModalState: React.Dispatch<
    React.SetStateAction<'create' | 'edit' | 'delete' | null>
  >;
  selectedUser: User | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserManagementModal: React.FC<ModalProps> = ({
  modalState,
  setModalState,
  selectedUser,
  setUsers,
}) => {
  const closeModal = () => {
    setModalState(null);
  };

  const renderForm = () => {
    switch (modalState) {
      case 'create':
        return <CreateUserForm closeModal={closeModal} setUsers={setUsers} />;
      case 'edit':
        return selectedUser ? (
          <EditUserForm
            closeModal={closeModal}
            user={selectedUser}
            setUsers={setUsers}
          />
        ) : null;
      case 'delete':
        return (
          <DeleteUserForm
            closeModal={closeModal}
            user={selectedUser}
            setUsers={setUsers}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {modalState && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="relative bg-white w-96 p-4 rounded-lg">
              <button
                className="absolute top-1 right-1 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full"
                onClick={closeModal}
              >
                X
              </button>
              {renderForm()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagementModal;
