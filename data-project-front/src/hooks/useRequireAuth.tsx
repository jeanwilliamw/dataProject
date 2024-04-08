import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

const useRequireAuth = (role?: string) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (role && user && user.role !== role) {
      navigate('/dashboard');
    }
  }, [user, role, navigate]);

  if (!role || (user && user.role === role)) {
    return { user, setUser };
  }
  return { user: null, setUser: null };
};

export default useRequireAuth;
