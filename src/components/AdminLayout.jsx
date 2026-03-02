import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menuItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/admin/dashboard' },
    { label: 'จัดการเครื่องมือ AI', icon: 'auto_fix', to: '/admin/ai-tools' },
    { label: 'จัดการข่าวสาร AI', icon: 'newspaper', to: '/admin/news' },
    { label: 'จัดการพจนานุกรม AI', icon: 'menu_book', to: '/admin/dictionary' },
];

export default function AdminLayout({ children }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="flex min-h-screen bg-[#020606] text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#050d0d] flex flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-white/5">
                    <NavLink to="/" className="flex items-center gap-3">
                        <img src="/profile.jpg" alt="Logo" className="w-10 h-10 rounded-full border border-[#0df2f2]/30" />
                        <span className="font-bold text-lg tracking-tight">JarnNong <span className="text-[#0df2f2]">Admin</span></span>
                    </NavLink>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-[#0df2f2]/10 text-[#0df2f2] border border-[#0df2f2]/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <span className="material-symbols-outlined text-xl">{item.icon}</span>
                            <span className="font-medium text-sm">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/5 rounded-xl transition-colors group"
                    >
                        <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">logout</span>
                        <span className="font-medium text-sm">ออกจากระบบ</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 border-b border-white/5 bg-[#050d0d]/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Control Panel</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-white">jirayuppptp@gmail.com</p>
                            <p className="text-[10px] text-[#0df2f2] uppercase">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0df2f2] to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <span className="material-symbols-outlined text-[#050d0d] font-bold">person</span>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
