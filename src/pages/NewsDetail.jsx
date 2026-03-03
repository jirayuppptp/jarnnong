import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { db } from '../firebase'
import { doc, getDoc, updateDoc, increment, collection, query, limit, getDocs } from 'firebase/firestore'

export default function NewsDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [article, setArticle] = useState(null)
    const [relatedNews, setRelatedNews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true)
            try {
                // Fetch the main article
                const docRef = doc(db, 'news', id)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const data = { id: docSnap.id, ...docSnap.data() }
                    setArticle(data)

                    // Increment realViews in Firestore
                    await updateDoc(docRef, {
                        realViews: increment(1)
                    }).catch(err => console.error("Error incrementing views:", err));

                    // Fetch related news (simple: just get 3 latest excluding current)
                    const q = query(collection(db, 'news'), limit(4))
                    const querySnapshot = await getDocs(q)
                    const related = querySnapshot.docs
                        .map(d => ({ id: d.id, ...d.data() }))
                        .filter(item => item.id !== id)
                        .slice(0, 3)
                    setRelatedNews(related)
                } else {
                    navigate('/ai-news')
                }
            } catch (error) {
                console.error('Error fetching article:', error)
                navigate('/ai-news')
            } finally {
                setLoading(false)
            }
        }

        fetchArticle()
        window.scrollTo(0, 0)
    }, [id, navigate])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#05070A] pt-32 flex justify-center">
                <div className="animate-pulse text-primary font-bold">LOADING ARTICLE...</div>
            </div>
        )
    }

    if (!article) return null

    return (
        <div className="min-h-screen bg-[#05070A] pb-32 selection:bg-[#0df2f2] selection:text-[#050d0d]">
            <title>{article.title} | AI News by JarnNong</title>
            <meta name="description" content={article.content ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'ข่าวสาร AI ล่าสุดจาก Jarnnong.com'} />
            <meta property="og:title" content={`${article.title} | AI News by JarnNong`} />
            <meta property="og:description" content={article.content ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'ข่าวสาร AI ล่าสุดจาก Jarnnong.com'} />
            {article.image && <meta property="og:image" content={article.image} />}

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

                    <div className="flex items-center gap-2 text-primary bg-primary/10 w-fit px-3 py-1 rounded-full text-[10px] font-black mb-6 neon-border uppercase tracking-widest">
                        <span className="material-symbols-outlined text-xs">auto_awesome</span>
                        {article.category}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 !leading-[1.3] animate-fade-up animate-delay-100 font-display">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest animate-fade-up animate-delay-200">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-primary">calendar_today</span>
                            {article.date}
                        </div>
                        <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                            <span className="material-symbols-outlined text-sm text-primary">visibility</span>
                            อ่านแล้ว {((article.initialViews || 0) + (article.realViews || 0)).toLocaleString()} ครั้ง
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                <div className="glass-card overflow-hidden animate-fade-up animate-delay-300">
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
                                className="rich-text-content text-slate-300 text-lg leading-relaxed mb-12 ql-editor !p-0"
                                dangerouslySetInnerHTML={{ __html: article.content || '' }}
                            />
                        </div>

                        <style>{`
                            .rich-text-content h1 { font-size: 2.5rem; font-weight: 900; color: white; margin: 3rem 0 1.5rem; line-height: 1.2; font-family: 'Kanit', sans-serif; }
                            .rich-text-content h2 { font-size: 2rem; font-weight: 800; color: white; margin: 2.5rem 0 1.25rem; line-height: 1.3; font-family: 'Kanit', sans-serif; }
                            .rich-text-content h3 { font-size: 1.5rem; font-weight: 700; color: white; margin: 2rem 0 1rem; }
                            .rich-text-content p { margin-bottom: 1.75rem; font-weight: 300; }
                            .rich-text-content ul { list-style-type: none; padding-left: 0; margin-bottom: 2rem; }
                            .rich-text-content ul li { position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; color: #cbd5e1; }
                            .rich-text-content ul li::before { content: ""; position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; background: #0df2f2; border-radius: 50%; box-shadow: 0 0 10px #0df2f2; }
                            .rich-text-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 2rem; color: #cbd5e1; }
                            .rich-text-content blockquote { border-left: 4px solid #0df2f2; padding: 1.5rem 2rem; font-style: italic; margin: 3rem 0; background: rgba(13, 242, 242, 0.05); border-radius: 0 20px 20px 0; color: #f8fafc; font-size: 1.25rem; }
                            .rich-text-content a { color: #0df2f2; text-decoration: underline; text-underline-offset: 4px; font-weight: 600; }
                            .rich-text-content img { max-width: 100%; height: auto; border-radius: 24px; margin: 3rem auto; display: block; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 30px 60px -12px rgba(0,0,0,0.5); }
                            .rich-text-content strong { color: white; font-weight: 700; }
                        `}</style>

                        {/* Share & Tags */}
                        <div className="border-t border-white/5 mt-12 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex flex-wrap gap-2">
                                {['#AI', '#Tech', '#Innovation', '#JarnNong'].map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-slate-500 hover:text-primary hover:bg-primary/10 cursor-pointer transition-all uppercase tracking-tighter">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Share Article:</span>
                                <div className="flex gap-2">
                                    {['facebook', 'chat', 'share'].map(icon => (
                                        <button key={icon} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-[#05070A] hover:scale-110 transition-all">
                                            <span className="material-symbols-outlined text-sm">{icon}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related News */}
                <div className="mt-24">
                    <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4 font-display uppercase tracking-tight">
                        ข่าวอื่นๆ <span className="text-primary text-glow">ที่คุณอาจสนใจ</span>
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1a] to-transparent opacity-60"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-primary">{item.category}</span>
                                        <span className="text-slate-500 font-mono italic">{item.date}</span>
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
