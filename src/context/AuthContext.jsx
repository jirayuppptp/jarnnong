import { createContext, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, loading, error] = useAuthState(auth);

    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('admin_auth'); // Cleanup if still used elsewhere
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
