import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export default function AINews() {
    const [news, setNews] = useState([])

    useEffect(() => {
        const savedNews = localStorage.getItem('jarnnong_news')
        if (savedNews) {
            setNews(JSON.parse(savedNews))
        } else {
            // News will be updated from Admin
            setNews([])
        }
    }, [])

    return (
        <div className="min-h-screen bg-[#05070A] pb-32">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden mesh-gradient">
                <div className="absolute inset-0 circuit-pattern opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 neon-border text-primary text-xs font-bold mb-6 animate-fade-up">
                        <span className="material-symbols-outlined text-sm">newspaper</span>
                        LATEST UPDATES
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 animate-fade-up animate-delay-100">
                        ข่าวสาร <span className="text-primary text-glow">วงการ AI</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto animate-fade-up animate-delay-200">
                        เกาะติดทุกความเคลื่อนไหว เทคโนโลยีอัจฉริยะ และนวัตกรรมเปลี่ยนโลกที่เราคัดสรรมาให้คุณ
                    </p>
                </div>
            </section>

            {/* News Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item, index) => (
                        <NavLink
                            to={`/ai-news/${item.id}`}
                            key={item.id}
                            className={`block glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300 animate-fade-up`}
                            style={{ animationDelay: `${(index + 3) * 100}ms` }}
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={item.image || 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800'}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary/90 text-[#05070A] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                    <span className="text-slate-500 text-xs font-mono">{item.date}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                    {item.title}
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                                    {item.content.replace(/<[^>]*>?/gm, '')}
                                </p>
                                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                                    อ่านรายละเอียด
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </section>
        </div>
    )
}
