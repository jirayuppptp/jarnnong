import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const ADMIN_CREDENTIALS = {
    username: 'jirayuppptp@gmail.com',
    password: '12345678',
};

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('admin_auth') === 'true';
    });

    const login = (username, password) => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            localStorage.setItem('admin_auth', 'true');
            setIsAuthenticated(true);
            return { success: true };
        }
        return { success: false, error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
    };

    const logout = () => {
        localStorage.removeItem('admin_auth');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
