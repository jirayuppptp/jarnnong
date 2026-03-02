import { useState, useEffect } from 'react'

export default function AIDictionary() {
    const [terms, setTerms] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const savedTerms = localStorage.getItem('jarnnong_dict')
        if (savedTerms) {
            setTerms(JSON.parse(savedTerms))
        } else {
            // Data will be updated from Admin
            setTerms([])
        }
    }, [])

    const filteredTerms = terms.filter(t =>
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-[#05070A] pb-32">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden mesh-gradient">
                <div className="absolute inset-0 circuit-pattern opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 neon-border text-primary text-xs font-bold mb-6 animate-fade-up">
                        <span className="material-symbols-outlined text-sm">book</span>
                        AI GLOSSARY
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 animate-fade-up animate-delay-100">
                        พจนานุกรม <span className="text-primary text-glow">ศัพท์ AI</span>
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12 animate-fade-up animate-delay-200">
                        รวมคำศัพท์พื้นฐานและคำศัพท์เทคนิคที่คุณต้องรู้ เพื่อก้าวทันโลกปัญญาประดิษฐ์
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto animate-fade-up animate-delay-300">
                        <div className="relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 group-focus-within:text-primary transition-colors">search</span>
                            <input
                                type="text"
                                placeholder="ค้นหาคำศัพท์..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-lg focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all backdrop-blur-md"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Terms List */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-4">
                {filteredTerms.length > 0 ? (
                    filteredTerms.map((item, index) => (
                        <div
                            key={item.id}
                            className="glass-card p-6 md:p-8 animate-fade-up group hover:bg-white/[0.03]"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-3">
                                <h3 className="text-2xl font-bold text-primary group-hover:text-glow transition-all">{item.term}</h3>
                                <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-white/5 w-fit">
                                    {item.category}
                                </span>
                            </div>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                {item.definition}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 animate-fade-in">
                        <span className="material-symbols-outlined text-6xl text-slate-700 mb-4 italic">sentiment_dissatisfied</span>
                        <p className="text-slate-500 text-xl">ไม่พบคำศัพท์ที่คุณค้นหา...</p>
                    </div>
                )}
            </section>
        </div>
    )
}
