import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export default function AINews() {
    const [news, setNews] = useState([])

    useEffect(() => {
        const savedNews = localStorage.getItem('aiNews')
        if (savedNews) {
            setNews(JSON.parse(savedNews))
        } else {
            // Mock data if empty
            const mockNews = [
                {
                    id: 1,
                    title: 'OpenAI เปิดตัว Sora โมเดลสร้างวิดีโอจากข้อความสุดสมจริง',
                    content: 'วงการวิดีโอต้องสั่นสะเทือนเมื่อ OpenAI เปิดตัวโมเดลใหม่ล่าสุดที่สามารถสร้างวิดีโอคุณภาพสูงได้จากเพียงคำบรรยายข้อความ...',
                    date: '2024-03-01',
                    category: 'AI Updates',
                    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
                },
                {
                    id: 2,
                    title: 'Claude 3 ครองแชมป์โมเดลภาษาที่ฉลาดที่สุดในปัจจุบัน',
                    content: 'Anthropic ประกาศความสำเร็จของ Claude 3 ที่ทำคะแนนทดสอบได้เหนือกว่า GPT-4 ในหลายด้าน พร้อมรองรับข้อมูลขนาดมหาศาล...',
                    date: '2024-02-28',
                    category: 'Models',
                    image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c71d0?auto=format&fit=crop&q=80&w=800'
                },
                {
                    id: 3,
                    title: 'Google DeepMind พัฒนา AI ช่วยวินิจฉัยโรคได้แม่นยำกว่าหมอหน้าใหม่',
                    content: 'ก้าวสำคัญของ AI ในวงการแพทย์ เมื่อระบบใหม่จาก Google สามารถระบุอาการและวินิจฉัยโรคเบื้องต้นได้อย่างแม่นยำสูง...',
                    date: '2024-02-25',
                    category: 'Medicine',
                    image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=800'
                }
            ]
            setNews(mockNews)
            localStorage.setItem('aiNews', JSON.stringify(mockNews))
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
                        <article
                            key={item.id}
                            className={`glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300 animate-fade-up`}
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
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-slate-500 text-xs mb-4">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-primary/60">calendar_today</span>
                                        {item.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-primary/60">person</span>
                                        JarnNong AI
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-text-secondary text-sm line-clamp-3 mb-6 leading-relaxed">
                                    {item.content}
                                </p>
                                <button className="flex items-center gap-2 text-primary font-bold text-sm group/btn">
                                    อ่านเพิ่มเติม
                                    <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    )
}
