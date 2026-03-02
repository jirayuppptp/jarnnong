import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export default function ProtectedRoute({ children }) {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050d0d] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#0df2f2]/20 border-t-[#0df2f2] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}
