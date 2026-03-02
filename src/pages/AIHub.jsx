import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function AIHub() {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'aitools'), orderBy('title', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTools(data);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching AI tools:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen bg-[#050d0d] text-slate-300 font-sans selection:bg-[#0df2f2] selection:text-[#050d0d]">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0df2f2]/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#0df2f2]/10 border border-[#0df2f2]/20 backdrop-blur-md">
                        <span className="text-[#0df2f2] text-xs font-black uppercase tracking-[0.2em]">Curated AI Ecosystem</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight font-display animate-fade-up">
                        EXPLORE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0df2f2] to-blue-500">POWER</span><br />
                        OF AI TOOLS
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed animate-fade-up animate-delay-100">
                        รวบรวมเครื่องมือ AI ที่ทันสมัยและดีที่สุดสำหรับการทำงานในยุคถัดไป
                        เพื่อเพิ่มประสิทธิภาพและลดเวลาในการทำงานของคุณ
                    </p>
                </div>
            </section>

            {/* Tools Directory */}
            <section className="pb-32 container mx-auto px-6">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[400px] rounded-3xl bg-white/5 animate-pulse border border-white/5"></div>
                        ))}
                    </div>
                ) : tools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tools.map((tool, index) => (
                            <div
                                key={tool.id}
                                className="group relative bg-[#0a1a1a]/80 border border-white/5 rounded-3xl overflow-hidden hover:border-[#0df2f2]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full backdrop-blur-sm animate-fade-up"
                                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={tool.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'}
                                        alt={tool.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1a] via-transparent to-transparent"></div>
                                </div>

                                <div className="p-8 pt-0 flex flex-col flex-1 mt-6">
                                    <div className="mb-4">
                                        <span className="px-3 py-1 rounded-full bg-[#0df2f2]/10 border border-[#0df2f2]/20 text-[10px] font-bold text-[#0df2f2] uppercase tracking-wider">
                                            {tool.category}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-4 line-clamp-2 leading-[1.4] font-display group-hover:text-[#0df2f2] transition-colors">
                                        {tool.title}
                                    </h3>
                                    <div
                                        className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 font-light ql-editor !p-0 prose prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: tool.description }}
                                    />

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-[10px] text-slate-500 uppercase font-black">AI SOLUTION</span>
                                        <a
                                            href={tool.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/5 hover:bg-[#0df2f2] text-white hover:text-black w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 hover:border-[#0df2f2] transition-all duration-300 group/btn"
                                        >
                                            <span className="material-symbols-outlined group-hover:rotate-45 transition-transform">arrow_forward</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-6xl text-slate-700 mb-6">smart_toy</span>
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">COMING SOON</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">ขณะนี้กำลังรวบรวมเครื่องมือ AI คุณภาพ โปรดติดตามอัปเดตจากเราเร็วๆ นี้</p>
                    </div>
                )}
            </section>
        </div>
    );
}
