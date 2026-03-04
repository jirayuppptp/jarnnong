import { Link } from 'react-router-dom';

const menu = ['บทเรียนทั้งหมด', 'เครื่องมือ AI', 'ข่าวสารวงการ AI', 'บทความน่ารู้']
const knowledge = [
    { label: 'พจนานุกรม AI', url: '/ai-terms' },
    { label: 'Prompt Engineering', url: '/ai-terms/Wzdvx397MX96E7tDS3uo' },
    { label: 'Generative AI', url: '/ai-terms/7TcAoTIWvyH7wtkNGjJW' },
    { label: 'Vibe Coding', url: '/ai-terms/DiHdTp6lr6ghZvRlQLZT' }
]

export default function Footer() {
    return (
        <footer className="bg-[#0F172A] border-t border-white/5 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1">
                        <a className="flex items-center gap-2 mb-6" href="#">
                            <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
                            <span className="text-xl font-bold tracking-tight text-white">JarnNong.com</span>
                        </a>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            แหล่งเรียนรู้และรวบรวมเครื่องมือ AI ที่ใหญ่ที่สุดในประเทศไทย
                            มุ่งมั่นเพื่อส่งเสริมทักษะดิจิทัลให้คนไทยทุกคน
                        </p>
                    </div>

                    {/* Main Menu */}
                    <div>
                        <h5 className="font-bold text-white mb-6">เมนูหลัก</h5>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            {menu.map((item) => (
                                <li key={item}>
                                    <a className="hover:text-primary transition-colors" href="#">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Knowledge */}
                    <div>
                        <h5 className="font-bold text-white mb-6">ความรู้</h5>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            {knowledge.map((item) => (
                                <li key={item.label}>
                                    <Link className="hover:text-primary transition-colors" to={item.url}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h5 className="font-bold text-white mb-6">ติดต่อเรา</h5>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-primary">mail</span>
                                info@jarnnong.com
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-primary">share</span>
                                @jarnnong
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary">
                    <p>© 2026 JarnNong.com — AI Knowledge Hub for Thai People. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-primary transition-colors" href="#">นโยบายความเป็นส่วนตัว</a>
                        <a className="hover:text-primary transition-colors" href="#">ข้อกำหนดการใช้งาน</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
