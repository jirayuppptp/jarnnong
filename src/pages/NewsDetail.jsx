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
                        {/* Article Content - Rendered as Rich Text */}
                        <div className="max-w-none">
                            <div
                                className="rich-text-content text-slate-300 text-lg leading-relaxed mb-12"
                                dangerouslySetInnerHTML={{ __html: article.content || article.summary || '' }}
                            />
                        </div>

                        <style>{`
                            .rich-text-content h1 { font-size: 2.25rem; font-weight: 800; color: white; margin-top: 2rem; margin-bottom: 1rem; }
                            .rich-text-content h2 { font-size: 1.875rem; font-weight: 700; color: white; margin-top: 2rem; margin-bottom: 1rem; }
                            .rich-text-content p { margin-bottom: 1.5rem; }
                            .rich-text-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
                            .rich-text-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
                            .rich-text-content blockquote { border-left: 4px solid var(--primary); padding-left: 1.5rem; font-style: italic; margin-bottom: 1.5rem; background: rgba(var(--primary-rgb), 0.1); padding: 1rem 1.5rem; border-radius: 0 12px 12px 0; }
                            .rich-text-content a { color: #0df2f2; text-decoration: underline; }
                            .rich-text-content img { max-width: 100%; height: auto; border-radius: 20px; margin: 2.5rem auto; display: block; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
                        `}</style>

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
                                        src={item.image || 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800'}
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
