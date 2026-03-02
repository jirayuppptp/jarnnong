import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
    { label: 'หน้าแรก', to: '/' },
    { label: 'จารย์โหน่ง', to: '/about' },
    { label: 'สารบัญเครื่องมือ AI', to: '/ai-hub' },
    { label: 'ข่าวสาร AI', to: '#news' },
    { label: 'พจนานุกรม AI', to: '#dictionary' },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#05070A]/80 backdrop-blur-md">
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
                                placeholder="ค้นหาเครื่องมือ AI..."
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
                md:hidden fixed inset-0 top-16 bg-[#05070A]/95 backdrop-blur-xl z-40 transition-all duration-300
                ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
            `}>
                <nav className="flex flex-col p-6 gap-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `text-lg font-bold py-3 border-b border-white/5 transition-all ${isActive && item.to !== '#' ? 'text-primary pl-4' : 'text-text-secondary hover:text-primary'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                    <div className="mt-8">
                        <NavLink
                            to="/admin/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="btn-primary w-full py-4 text-center flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">login</span>
                            เข้าสู่ระบบสำหรับแอดมิน
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    )
}
