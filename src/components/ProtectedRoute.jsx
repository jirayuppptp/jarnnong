import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login but save the current location to redirect back after login
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
}
