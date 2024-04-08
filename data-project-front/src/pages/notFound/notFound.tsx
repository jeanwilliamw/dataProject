import { Link } from 'react-router-dom';
import useRequireAuth from '../../hooks/useRequireAuth';

function NotFoundPage() {
  useRequireAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-4">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/dashboard" className="text-blue-500 hover:underline">
        Go back to home
      </Link>
    </div>
  );
}

export default NotFoundPage;
