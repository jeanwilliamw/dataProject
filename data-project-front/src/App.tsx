import { Route, Routes } from 'react-router-dom';
import AuthenticationPage from './pages/authentication/login';
import DashboardPage from './pages/dashboard/dashboard';
import NotFoundPage from './pages/notFound/notFound';
import AdminPage from './pages/admin/admin';
import Profile from './pages/profile/profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationPage />} />
      <Route path="/login" element={<AuthenticationPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFoundPage />} />{' '}
    </Routes>
  );
}

export default App;
