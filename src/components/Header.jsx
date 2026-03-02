import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
    { label: 'หน้าแรก', to: '/' },
    { label: 'จารย์โหน่ง', to: '/about' },
    { label: 'หลักสูตรอบรม', to: '/courses' },
    { label: 'ข่าวสาร AI', to: '/ai-news' },
    { label: 'พจนานุกรม AI', to: '/ai-terms' },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                            <span className="text-xl font-bold tracking-tight text-white">JarnNong.com</span>
                        </NavLink>
                        <nav className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.label}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `text-sm font-medium transition-colors ${isActive && item.to !== '#'
                                            ? 'text-primary'
                                            : 'text-text-secondary hover:text-primary'
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
                        <div className="hidden lg:flex items-center bg-white/5 rounded-lg px-3 py-1.5 neon-border focus-within:border-primary/50 transition-all">
                            <span className="material-symbols-outlined text-primary/60 text-sm">search</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-sm w-48 text-white placeholder:text-text-secondary outline-none"
                                placeholder="ค้นหาหลักสูตร..."
                                type="text"
                            />
                        </div>
                        <NavLink to="/admin/login" className="hidden sm:inline-flex btn-primary px-5 py-2 text-sm text-center">
                            เข้าสู่ระบบ
                        </NavLink>

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-white hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-3xl">
                                {isMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`
                md:hidden fixed inset-0 bg-[#05070A] z-[100] transition-all duration-500 ease-in-out
                ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
            `}>
                {/* Close Button Inside Mobile Menu */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-white hover:text-primary transition-colors focus:outline-none"
                    >
                        <span className="material-symbols-outlined text-4xl">close</span>
                    </button>
                </div>

                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>

                <nav className="relative z-10 flex flex-col p-6 pt-2">
                    <div className="space-y-1">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={item.label}
                                to={item.to}
                                onClick={() => setIsMenuOpen(false)}
                                style={{ transitionDelay: `${index * 50}ms` }}
                                className={({ isActive }) =>
                                    `flex items-center justify-between text-lg font-medium py-4 px-4 rounded-xl transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                                    } ${isActive && item.to !== '#'
                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                    }`
                                }
                            >
                                <span>{item.label}</span>
                                <span className={`material-symbols-outlined text-sm opacity-50 transition-transform ${isMenuOpen ? 'scale-100' : 'scale-0'}`}>
                                    chevron_right
                                </span>
                            </NavLink>
                        ))}
                    </div>

                    <div className={`mt-10 transition-all duration-500 delay-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        <NavLink
                            to="/admin/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="btn-primary w-full py-4 text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,255,0.15)] active:scale-[0.98]"
                        >
                            <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                            เข้าสู่ระบบแอดมิน
                        </NavLink>
                        <p className="text-center text-sm text-slate-500 mt-8 font-medium tracking-wider uppercase">
                            JarnNong AI Hub © 2024
                        </p>
                    </div>
                </nav>
            </div>
        </header>
    )
}
