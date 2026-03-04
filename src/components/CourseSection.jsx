import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { stripHtml } from '../utils/textHelper';

export default function CourseSection() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'courses'), limit(3));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCourses(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <section className="py-32 container mx-auto px-6">
                <div className="animate-pulse flex flex-col gap-8">
                    <div className="h-10 w-48 bg-white/5 rounded mx-auto"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => <div key={i} className="h-96 bg-white/5 rounded-3xl"></div>)}
                    </div>
                </div>
            </section>
        );
    }

    if (courses.length === 0) return null;

    return (
        <section className="py-32 bg-[#050d0d] overflow-hidden relative" id="courses">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#0df2f2]/5 rounded-full blur-[100px]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div data-aos="fade-right">
                        <span className="text-primary font-mono font-bold text-sm tracking-widest uppercase mb-4 block">Recommended Learning</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight font-display">
                            หลักสูตรที่ <span className="text-primary">แนะนำ</span> สำหรับคุณ
                        </h2>
                    </div>
                    <Link to="/courses" className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs group" data-aos="fade-left">
                        ดูทั้งหมด <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, idx) => (
                        <Link
                            to={`/course-detail/${course.id}`}
                            key={course.id}
                            className="group relative bg-card-bg border border-white/5 rounded-3xl p-4 transition-all duration-500 hover:border-primary/30 hover:-translate-y-2 flex flex-col hover:shadow-[0_0_15px_rgba(0,242,255,0.15)] block"
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                        >
                            <div className="h-56 rounded-2xl overflow-hidden mb-6 relative">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-primary uppercase tracking-wider">
                                        {course.category}
                                    </span>
                                </div>
                            </div>

                            <div className="px-4 pb-4 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-white mb-4 leading-[1.4] group-hover:text-primary transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed mb-6 font-light">
                                    {course.shortDescription || (course.description ? stripHtml(course.description) : 'ไม่มีคำอธิบาย')}
                                </p>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-primary font-mono font-bold">{course.price} ฿</span>
                                    <span className="text-xs text-text-secondary flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                        {course.duration}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
