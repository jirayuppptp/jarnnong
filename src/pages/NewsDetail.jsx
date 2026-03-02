import { useState, useEffect } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom'

export default function NewsDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [article, setArticle] = useState(null)
    const [relatedNews, setRelatedNews] = useState([])

    useEffect(() => {
        const savedNews = localStorage.getItem('jarnnong_news')
        if (savedNews) {
            const allNews = JSON.parse(savedNews)
            const found = allNews.find(item => item.id.toString() === id)
            if (found) {
                setArticle(found)
                // Get other news as related news
                setRelatedNews(allNews.filter(item => item.id.toString() !== id).slice(0, 3))
            } else {
                navigate('/ai-news')
            }
        } else {
            navigate('/ai-news')
        }

        // Scroll to top when article changes
        window.scrollTo(0, 0)
    }, [id, navigate])

    if (!article) return null

    return (
        <div className="min-h-screen bg-[#05070A] pb-32">
            {/* Post Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden mesh-gradient">
                <div className="absolute inset-0 circuit-pattern opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <NavLink
                        to="/ai-news"
                        className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-8 hover:translate-x-[-4px] transition-transform"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        กลับไปหน้าข่าวสาร
                    </NavLink>

                    <div className="flex items-center gap-4 text-primary bg-primary/10 w-fit px-3 py-1 rounded-full text-xs font-bold mb-6 neon-border">
                        <span className="material-symbols-outlined text-sm">auto_awesome</span>
                        {article.category}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight animate-fade-up">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm animate-fade-up animate-delay-100">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                            {article.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">person</span>
                            เขียนโดย JarnNong AI
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">visibility</span>
                            อ่านแล้ว 1.2k ครั้ง
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                <div className="glass-card overflow-hidden animate-fade-up animate-delay-200">
                    {/* Main Image */}
                    <div className="relative h-[300px] md:h-[500px]">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] to-transparent opacity-30"></div>
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Summary Box */}
                        <div className="bg-primary/5 border-l-4 border-primary p-6 mb-10 rounded-r-xl">
                            <p className="text-lg italic text-slate-300 leading-relaxed font-light">
                                "{article.content}"
                            </p>
                        </div>

                        {/* Article Body */}
                        <div className="max-w-none">
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                เทคโนโลยีปัญญาประดิษฐ์ (AI) กำลังก้าวหน้าไปอย่างรวดเร็ว และ {article.title} เป็นหนึ่งในก้าวสำคัญของวงการนี้ โดยการพัฒนาที่เกิดขึ้นล่าสุดแสดงให้เห็นว่าเรากำลังเข้าสู่ยุคที่เครื่องจักรสามารถเรียนรู้และสร้างสรรค์ผลงานที่ซับซ้อนได้อย่างน่าทึ่ง
                            </p>

                            <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-primary"></span>
                                จุดเด่นที่น่าสนใจ
                            </h2>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                ความสามารถที่เพิ่มขึ้นนี้ไม่ใช่แค่เรื่องของพลังการประมวลผล แต่เป็นเรื่องของสถาปัตยกรรมโมเดลแนวใหม่ที่เลียนแบบโครงข่ายประสาทของมนุษย์ได้ใกล้เคียงมากขึ้น ทำให้ผลลัพธ์ที่ได้มีความแม่นยำและสมจริงอย่างที่ไม่เคยมีมาก่อน
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/30 transition-colors group/item">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover/item:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-primary">bolt</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">ประสิทธิภาพสูง</h3>
                                    <p className="text-slate-400 leading-relaxed">รองรับการทำงานที่มีขนาดใหญ่และซับซ้อนได้อย่างรวดเร็วและเสถียรยิ่งขึ้น</p>
                                </div>
                                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/30 transition-colors group/item">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover/item:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-primary">analytics</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">ความแม่นยำ</h3>
                                    <p className="text-slate-400 leading-relaxed">ผลการทดสอบเบื้องต้นทำได้ดีกว่ารุ่นก่อนหน้าอย่างชัดเจนในทุกมิติ</p>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-primary"></span>
                                ผลกระทบต่ออุตสาหกรรม
                            </h2>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                ผู้เชี่ยวชาญคาดการณ์ว่านวัตกรรมนี้จะเปลี่ยนโฉมการทำงานในอนาคต ไม่ว่าจะเป็นเรื่องของการลดต้นทุน การเพิ่มประสิทธิภาพผลิตผล หรือแม้แต่การสร้างโอกาสใหม่ๆ ทางธุรกิจที่ปัจจุบันเรายังจินตนาการไปไม่ถึง
                            </p>

                            <blockquote className="relative border-l-4 border-primary px-8 py-6 my-12 bg-primary/5 rounded-r-2xl">
                                <span className="absolute -top-4 left-4 text-6xl text-primary/20 font-serif">"</span>
                                <p className="text-xl font-medium text-white italic leading-relaxed">
                                    นี่คือจุดเปลี่ยนสำคัญที่จะทำให้ AI เข้าถึงทุกคนได้ง่ายขึ้นและมีประโยชน์มากขึ้นในชีวิตประจำวันอย่างแท้จริง
                                </p>
                            </blockquote>
                        </div>

                        {/* Share & Tags */}
                        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex gap-2">
                                {['#AI', '#Tech', '#Innovation', '#JarnNong'].map(tag => (
                                    <span key={tag} className="text-xs text-slate-500 hover:text-primary cursor-pointer transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Share:</span>
                                <div className="flex gap-2">
                                    {['facebook', 'tweet', 'share'].map(icon => (
                                        <button key={icon} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-[#05070A] transition-all">
                                            <span className="material-symbols-outlined text-sm">{icon}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related News */}
                <div className="mt-20">
                    <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-3">
                        ข่าวอื่นๆ <span className="text-primary">ที่คุณอาจสนใจ</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedNews.map((item, index) => (
                            <NavLink
                                to={`/ai-news/${item.id}`}
                                key={item.id}
                                className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300 block"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                                        <span className="text-primary">{item.category}</span>
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
