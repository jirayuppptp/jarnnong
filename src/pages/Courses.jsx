import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'courses'), orderBy('title', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCourses(data);
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
                        <span className="text-[#0df2f2] text-xs font-black uppercase tracking-[0.2em]">Learning Ecosystem</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight font-display">
                        UPGRADE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0df2f2] to-blue-500">SKILLS</span><br />
                        WITH AI MASTERY
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
                        หลักสูตรอบรมพิเศษที่คัดสรรมาเพื่อคุณโดยเฉพาะ ตั้งแต่ระดับเริ่มต้นจนถึงขั้นสูง
                        เน้นการใช้งานจริงในภาคธุรกิจและสายอาชีพ
                    </p>
                </div>
            </section>

            {/* Courses Directory */}
            <section className="pb-32 container mx-auto px-6">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[500px] rounded-3xl bg-white/5 animate-pulse border border-white/5"></div>
                        ))}
                    </div>
                ) : courses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <div key={course.id} className="group relative bg-[#0a1a1a]/80 border border-white/5 rounded-3xl overflow-hidden hover:border-[#0df2f2]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full backdrop-blur-sm">
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1a] via-transparent to-transparent"></div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-[#0df2f2] uppercase tracking-wider">
                                            {course.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 pt-0 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            {course.duration}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">group</span>
                                            LIMITED SLOT
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-4 line-clamp-2 leading-[1.4] font-display">
                                        {course.title}
                                    </h3>
                                    <div
                                        className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 font-light ql-editor !p-0 prose prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: course.description }}
                                    />

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] text-slate-500 uppercase font-black mb-1">FEES</div>
                                            <div className="text-2xl font-black text-[#0df2f2]">{course.price} <span className="text-xs">฿</span></div>
                                        </div>
                                        <a
                                            href={course.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/5 hover:bg-[#0df2f2] text-white hover:text-black w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 hover:border-[#0df2f2] transition-all duration-300"
                                        >
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-6xl text-slate-700 mb-6">school</span>
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">COMING SOON</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">ขณะนี้ยังไม่มีหลักสูตรเปิดสอน โปรดติดตามข่าวสารอัปเดตจากเราเร็วๆ นี้</p>
                    </div>
                )}
            </section>

            {/* Newsletter Section */}
            <section className="container mx-auto px-6 pb-32">
                <div className="bg-gradient-to-r from-blue-600/20 to-[#0df2f2]/20 border border-[#0df2f2]/20 rounded-[40px] p-12 text-center relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black text-white mb-4 font-display">รับข่าวสารหลักสูตรใหม่ก่อนใคร</h2>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto uppercase tracking-widest text-xs font-bold">STAY UPDATED WITH OUR LATEST COURSES AND OFFERS</p>
                        <form className="max-w-md mx-auto flex gap-4">
                            <input
                                type="email"
                                placeholder="YOUR EMAIL ADDRESS"
                                className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#0df2f2]/50 text-xs font-bold"
                            />
                            <button className="bg-[#0df2f2] text-[#050d0d] px-8 py-4 rounded-2xl font-black text-xs uppercase hover:shadow-[0_0_30px_rgba(13,242,242,0.4)] transition-all">
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
