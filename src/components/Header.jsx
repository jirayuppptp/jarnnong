import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
    { label: 'หน้าแรก', to: '/' },
    { label: 'จารย์โหน่ง', to: '/about' },
    { label: 'หลักสูตรอบรม', to: '/courses' },
    { label: 'ข่าวสาร AI', to: '/ai-news' },
    { label: 'พจนานุกรม AI', to: '/ai-terms' },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    return (
        <header className={`sticky top-0 z-50 w-full border-b border-white/5 transition-colors duration-300 ${isMenuOpen ? 'bg-[#05070A]' : 'bg-[#05070A]/80 backdrop-blur-md'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo + Nav */}
                    <div className="flex items-center gap-8">
                        <NavLink to="/" className="flex items-center gap-2 group">
                            <img
                                src="/profile.jpg"
                                alt="JarnNong"
                                className="w-9 h-9 rounded-full object-cover border-2 border-primary/50 group-hover:border-primary transition-all shadow-[0_0_10px_rgba(0,242,255,0.3)]"
                            />
                            <span className="text-xl font-bold tracking-tight text-white font-display">JarnNong.com</span>
                        </NavLink>
                        <nav className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.label}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `text-sm font-bold transition-all hover:text-primary tracking-tight ${isActive
                                            ? 'text-primary'
                                            : 'text-text-secondary'
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center bg-white/5 rounded-lg px-3 py-1.5 neon-border focus-within:border-primary/50 transition-all border border-white/10 group">
                            <span className="material-symbols-outlined text-primary/60 text-sm group-focus-within:text-primary">search</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-xs w-48 text-white placeholder:text-text-secondary outline-none font-medium ml-2 uppercase tracking-widest"
                                placeholder="ค้นหาหลักสูตร..."
                                type="text"
                            />
                        </div>

                        {isAuthenticated ? (
                            <NavLink to="/admin/dashboard" className="hidden sm:flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-white/5 group shadow-lg shadow-black/50 active:scale-95">
                                <div className="text-right hidden xl:block">
                                    <p className="text-[10px] font-black text-white leading-none uppercase">Admin Access</p>
                                    <p className="text-[8px] text-primary uppercase mt-1 tracking-widest font-black">Control Panel</p>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined text-slate-900 text-lg font-bold">shield</span>
                                </div>
                            </NavLink>
                        ) : (
                            <NavLink to="/admin/login" className="hidden sm:inline-flex btn-primary px-6 py-2.5 text-xs font-black uppercase tracking-widest text-center rounded-xl shadow-[0_0_15px_rgba(0,242,255,0.2)] hover:shadow-primary/40 active:scale-95 transition-all">
                                เข้าสู่ระบบ
                            </NavLink>
                        )}

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:text-primary transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {isMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`
                md:hidden fixed inset-0 top-16 bg-[#05070A] backdrop-blur-2xl z-[100] transition-all duration-500 ease-in-out
                ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
            `}>
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>

                <nav className="relative z-10 flex flex-col p-6 pt-10">
                    <div className="space-y-2">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={item.label}
                                to={item.to}
                                onClick={() => setIsMenuOpen(false)}
                                style={{ transitionDelay: `${index * 50}ms` }}
                                className={({ isActive }) =>
                                    `flex items-center justify-between text-xl font-black py-4 px-6 rounded-2xl transition-all duration-300 uppercase tracking-tight ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                                    } ${isActive
                                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(0,242,255,0.1)]'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`
                                }
                            >
                                <span>{item.label}</span>
                                <span className={`material-symbols-outlined text-xl opacity-50 transition-transform ${isMenuOpen ? 'scale-100' : 'scale-0'}`}>
                                    arrow_forward
                                </span>
                            </NavLink>
                        ))}
                    </div>

                    <div className={`mt-12 transition-all duration-500 delay-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        {isAuthenticated ? (
                            <NavLink
                                to="/admin/dashboard"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full py-4 text-center flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-blue-600 text-slate-900 font-black rounded-2xl shadow-[0_0_30px_rgba(0,242,255,0.2)] active:scale-[0.98] uppercase text-sm tracking-widest"
                            >
                                <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                                ไปที่แดชบอร์ด
                            </NavLink>
                        ) : (
                            <NavLink
                                to="/admin/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full py-4 text-center flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl border border-white/10 active:scale-[0.98] uppercase text-sm tracking-widest"
                            >
                                <span className="material-symbols-outlined text-xl">login</span>
                                เข้าสู่ระบบแอดมิน
                            </NavLink>
                        )}
                        <p className="text-center text-[10px] text-slate-500 mt-10 font-bold tracking-[0.4em] uppercase">
                            JarnNong AI Hub © 2024
                        </p>
                    </div>
                </nav>
            </div>
        </header>
    )
}
