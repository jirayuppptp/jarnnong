import { useState, useEffect } from 'react';

function AIHub() {
    const [email, setEmail] = useState('');
    const [tools, setTools] = useState([]);

    useEffect(() => {
        const savedTools = localStorage.getItem('jarnnong_ai_tools');
        if (savedTools) {
            setTools(JSON.parse(savedTools));
        }
    }, []);

    // Group tools by category for the directory
    const categories = [...new Set(tools.map(t => t.category))];

    return (
        <div className="bg-[#050d0d] text-slate-200 min-h-screen font-sans">

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-28 pb-40">
                {/* Mesh Gradient Background */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              radial-gradient(at 0% 0%, rgba(13, 242, 242, 0.12) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(13, 242, 242, 0.08) 0px, transparent 50%),
              radial-gradient(at 50% 100%, rgba(13, 242, 242, 0.05) 0px, transparent 50%)
            `,
                    }}
                />
                {/* Circuit Pattern */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(13, 242, 242, 0.08) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-5xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0df2f2]/10 border border-[#0df2f2]/30 text-[#0df2f2] text-sm font-bold mb-10 tracking-widest uppercase animate-fade-up">
                            <span className="material-symbols-outlined text-lg">rocket_launch</span>
                            The Future is Here
                        </div>

                        {/* Heading */}
                        <h1
                            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white mb-8 leading-[1.3] font-display animate-fade-up animate-delay-100"
                            style={{ textShadow: '0 0 15px rgba(13, 242, 242, 0.4), 0 0 30px rgba(13, 242, 242, 0.2)' }}
                        >
                            อัปเกรดทักษะ AI <br />
                            <span className="text-[#0df2f2]">ให้ก้าวทันโลก</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-up animate-delay-200">
                            ศูนย์รวมความรู้และเครื่องมือ AI สำหรับคนไทย เพื่อก้าวสู่อนาคตที่เหนือกว่าด้วยเทคโนโลยีอัจฉริยะที่เข้าถึงง่ายและทันสมัยที่สุด
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up animate-delay-300">
                            <button
                                className="w-full sm:w-auto px-10 py-5 bg-[#0df2f2] text-[#050d0d] font-extrabold text-lg rounded-2xl flex items-center justify-center gap-3 hover:-translate-y-1 transition-all hover-glow"
                                style={{ boxShadow: '0 0 25px rgba(13,242,242,0.3)' }}
                            >
                                ดูบทเรียนล่าสุด
                                <span className="material-symbols-outlined font-bold">arrow_forward</span>
                            </button>
                            <button className="w-full sm:w-auto px-10 py-5 bg-slate-800/50 text-white font-extrabold text-lg rounded-2xl border border-slate-700 hover:bg-slate-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                                สำรวจเครื่องมือ
                                <span className="material-symbols-outlined">explore</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Brand Logos */}
                <div className="mt-24 max-w-6xl mx-auto px-4 opacity-40 animate-fade-in animate-delay-500">
                    <div className="flex flex-wrap justify-center gap-10 md:gap-20 grayscale hover:grayscale-0 transition-all duration-500">
                        {['OpenAI', 'Midjourney', 'Anthropic', 'Google AI', 'Meta'].map(brand => (
                            <div key={brand} className="text-2xl font-black font-display tracking-tight text-white">{brand}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Tools Directory Section */}
            <section className="py-32 bg-[#050d0d]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <h2
                                className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display leading-[1.4]"
                                style={{ textShadow: '0 0 15px rgba(13, 242, 242, 0.4), 0 0 30px rgba(13, 242, 242, 0.2)' }}
                            >
                                สารบัญเครื่องมือ AI
                            </h2>
                            <p className="text-xl text-slate-400 max-w-xl">
                                สำรวจคลังเครื่องมือ AI ที่คัดสรรมาเพื่อเพิ่มประสิทธิภาพการทำงานในทุกสายอาชีพ
                            </p>
                        </div>
                        <a href="#" className="text-[#0df2f2] font-bold text-lg flex items-center gap-2 hover:gap-3 transition-all group">
                            ดูทั้งหมด
                            <span className="material-symbols-outlined text-xl">open_in_new</span>
                        </a>
                    </div>

                    {/* Cards - Dynamic from Admin */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tools.length > 0 ? (
                            tools.map((tool, index) => (
                                <a
                                    key={tool.id}
                                    href={tool.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`group relative p-8 rounded-3xl bg-[#0a1a1a] border border-[#0df2f2]/10 hover:border-[#0df2f2]/50 transition-all duration-300 animate-fade-up`}
                                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0df2f2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                                    <div className="relative">
                                        <div className="w-14 h-14 bg-[#0df2f2]/10 rounded-2xl flex items-center justify-center mb-6 text-[#0df2f2] group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-3xl">{tool.icon || 'auto_awesome'}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-[10px] font-bold text-[#0df2f2] uppercase tracking-widest bg-[#0df2f2]/10 px-2 py-1 rounded-md border border-[#0df2f2]/20">
                                                {tool.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 font-display leading-[1.4]">{tool.name}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">{tool.description}</p>
                                        <div className="flex items-center gap-2 text-[#0df2f2] text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                                            เยี่ยมชมเว็บไซต์
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </div>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                                <p className="text-slate-500 italic">ยังไม่มีข้อมูลเครื่องมือ AI ในขณะนี้...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section className="py-24 border-t border-[#0df2f2]/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10 animate-fade-up">
                            <h2
                                className="text-5xl font-black tracking-tight text-white font-display leading-[1.3]"
                                style={{ textShadow: '0 0 15px rgba(13, 242, 242, 0.4), 0 0 30px rgba(13, 242, 242, 0.2)' }}
                            >
                                ทำไมต้อง <br />
                                <span className="text-[#0df2f2]">AI Knowledge Hub?</span>
                            </h2>

                            <div className="space-y-8">
                                {[
                                    {
                                        icon: 'translate',
                                        title: 'เนื้อหาภาษาไทย',
                                        desc: 'เรียนรู้ได้เร็วขึ้นด้วยคำอธิบายภาษาไทยที่ใช้ภาษาเข้าใจง่าย ตั้งแต่พื้นฐานจนถึงระดับนำไปใช้จริง',
                                    },
                                    {
                                        icon: 'update',
                                        title: 'อัปเดตทุกสัปดาห์',
                                        desc: 'ไม่พลาดทุกความเคลื่อนไหวในวงการ AI ระดับโลก เราคัดกรองข่าวสารที่สำคัญและมีผลกระทบมาให้คุณ',
                                    },
                                    {
                                        icon: 'verified',
                                        title: 'คัดสรรโดยผู้เชี่ยวชาญ',
                                        desc: 'ทุกเครื่องมือและบทเรียนผ่านการทดสอบการใช้งานจริงในภาคธุรกิจและอุตสาหกรรมสร้างสรรค์',
                                    },
                                ].map((feat, idx) => (
                                    <div key={feat.title} className={`flex gap-6 animate-fade-up animate-delay-${(idx + 1) * 100}`}>
                                        <div className="shrink-0 w-14 h-14 bg-[#0df2f2]/20 rounded-2xl flex items-center justify-center text-[#0df2f2]">
                                            <span className="material-symbols-outlined text-3xl">{feat.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-2 text-white">{feat.title}</h4>
                                            <p className="text-lg text-slate-400">{feat.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Video Placeholder */}
                        <div className="relative animate-float">
                            <div className="absolute -inset-8 bg-[#0df2f2]/20 blur-[100px] rounded-full opacity-30" />
                            <div className="relative bg-slate-900 rounded-[2.5rem] p-3 border border-slate-800 shadow-2xl overflow-hidden aspect-video flex items-center justify-center group cursor-pointer hover-glow transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0df2f2]/20 to-transparent" />
                                <div className="flex flex-col items-center gap-6 relative z-10">
                                    <div className="w-24 h-24 bg-[#0df2f2]/30 rounded-full flex items-center justify-center animate-pulse group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-[#0df2f2] text-6xl">play_circle</span>
                                    </div>
                                    <span className="text-slate-300 font-bold text-lg px-6 py-2 bg-white/5 rounded-full border border-white/10">ดูวิดีโอแนะนำ Hub ของเรา</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA / Newsletter Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="bg-[#0df2f2] rounded-[3rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group"
                        style={{ boxShadow: '0 20px 60px -15px rgba(13, 242, 242, 0.3)' }}
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full -mr-40 -mt-40 blur-[100px] group-hover:bg-white/30 transition-all duration-[2000ms]" />
                        <div className="relative z-10 text-center md:text-left max-w-xl animate-fade-up">
                            <h2 className="text-4xl md:text-6xl font-black text-[#050d0d] mb-6 leading-[1.3] font-display">
                                พร้อมเริ่มต้น <br />หรือยัง?
                            </h2>
                            <p className="text-[#050d0d]/80 text-xl md:text-2xl font-medium">
                                สมัครสมาชิกวันนี้เพื่อรับจดหมายข่าวอัปเดต AI รายสัปดาห์ ส่งตรงถึงอีเมลคุณ
                            </p>
                        </div>
                        <div className="relative z-10 w-full md:w-auto animate-fade-up animate-delay-200">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="อีเมลของคุณ"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="px-8 py-5 rounded-2xl border-none focus:ring-4 focus:ring-[#050d0d]/20 w-full sm:w-80 text-lg text-[#050d0d] outline-none font-bold"
                                />
                                <button className="px-10 py-5 bg-[#050d0d] text-white font-extrabold text-lg rounded-2xl hover:bg-black hover:shadow-2xl transition-all shrink-0 active:scale-95">
                                    ติดตามเลย
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black border-t border-slate-800 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                        {/* Brand */}
                        <div className="col-span-1">
                            <a href="#" className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-[#0df2f2] text-4xl">auto_awesome</span>
                                <span className="text-2xl font-black tracking-tighter text-white font-display">AI HUB</span>
                            </a>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                แหล่งเรียนรู้และรวบรวมเครื่องมือ AI ที่ใหญ่ที่สุดในประเทศไทย มุ่งมั่นเพื่อส่งเสริมทักษะดิจิทัลให้คนไทยทุกคนก้าวทันโลกเทคโนโลยี
                            </p>
                        </div>

                        {/* Menu */}
                        <div>
                            <h5 className="font-bold text-xl text-white mb-8">เมนูหลัก</h5>
                            <ul className="space-y-5 text-base text-slate-400">
                                {['บทเรียนทั้งหมด', 'เครื่องมือ AI', 'ข่าวสารวงการ AI', 'บทความน่ารู้'].map(link => (
                                    <li key={link}><a href="#" className="hover:text-[#0df2f2] transition-colors">{link}</a></li>
                                ))}
                            </ul>
                        </div>

                        {/* Knowledge */}
                        <div>
                            <h5 className="font-bold text-xl text-white mb-8">ความรู้</h5>
                            <ul className="space-y-5 text-base text-slate-400">
                                {['พจนานุกรม AI', 'Prompt Engineering', 'Generative AI', 'AI for Business'].map(link => (
                                    <li key={link}><a href="#" className="hover:text-[#0df2f2] transition-colors">{link}</a></li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h5 className="font-bold text-xl text-white mb-8">ติดต่อเรา</h5>
                            <ul className="space-y-5 text-base text-slate-400">
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-xl text-[#0df2f2]">mail</span>
                                    info@aihub.in.th
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-xl text-[#0df2f2]">share</span>
                                    @aihubthai
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-24 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
                        <p>© 2024 AI Knowledge Hub for Thai People. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-[#0df2f2] transition-colors">นโยบายความเป็นส่วนตัว</a>
                            <a href="#" className="hover:text-[#0df2f2] transition-colors">ข้อกำหนดการใช้งาน</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default AIHub;
