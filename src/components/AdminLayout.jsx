import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menuItems = [
    { label: 'Dashboard', icon: 'dashboard', to: '/admin/dashboard' },
    { label: 'จัดการหลักสูตรอบรม', icon: 'school', to: '/admin/courses' },
    { label: 'จัดการเครื่องมือ AI', icon: 'precision_manufacturing', to: '/admin/aitools' },
    { label: 'จัดการข่าวสาร AI', icon: 'newspaper', to: '/admin/news' },
    { label: 'จัดการพจนานุกรม AI', icon: 'menu_book', to: '/admin/dictionary' },
];

export default function AdminLayout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <div className="flex min-h-screen bg-[#020606] text-white selection:bg-[#0df2f2] selection:text-[#050d0d]">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#050d0d] flex flex-col sticky top-0 h-screen z-30">
                <div className="p-6 border-b border-white/5">
                    <NavLink to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <img src="/profile.jpg" alt="Logo" className="w-10 h-10 rounded-full border border-[#0df2f2]/30 group-hover:border-[#0df2f2]/80 transition-all" />
                            <div className="absolute inset-0 rounded-full bg-[#0df2f2]/20 animate-pulse"></div>
                        </div>
                        <span className="font-bold text-lg tracking-tight">JarnNong <span className="text-[#0df2f2]">Admin</span></span>
                    </NavLink>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-[#0df2f2]/10 text-[#0df2f2] border border-[#0df2f2]/20 shadow-[0_0_15px_rgba(13,242,242,0.1)]'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-500/60 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all group font-black text-xs uppercase tracking-[0.2em]"
                    >
                        <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">logout</span>
                        <span>ออกจากระบบ</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 border-b border-white/5 bg-[#050d0d]/80 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#0df2f2] animate-ping"></div>
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">System Online</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-white uppercase tracking-tighter">{user?.email || 'Admin User'}</p>
                            <p className="text-[9px] text-[#0df2f2] font-black uppercase tracking-widest">Master Administrator</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0df2f2] to-cyan-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 group cursor-pointer overflow-hidden">
                            <span className="material-symbols-outlined text-[#050d0d] font-bold group-hover:scale-110 transition-transform">shield_person</span>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-x-hidden">
                    {children}
                </div>
            </main>
        </div>
    );
}
