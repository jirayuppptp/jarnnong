import { NavLink } from 'react-router-dom'

const navItems = [
    { label: 'หน้าแรก', to: '/' },
    { label: 'จารย์โหน่ง', to: '/about' },
    { label: 'สารบัญเครื่องมือ AI', to: '#' },
    { label: 'ข่าวสาร AI', to: '#' },
    { label: 'พจนานุกรม AI', to: '#' },
]

export default function Header() {
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
                        <button className="btn-primary px-5 py-2 text-sm">
                            เข้าสู่ระบบ
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
