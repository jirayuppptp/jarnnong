import { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchCourse = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const docRef = doc(db, 'courses', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCourse({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("No such course!");
                    // If it's the static example ID or not found, we can handle it
                    if (id !== 'static-example') {
                        alert("ไม่พบข้อมูลหลักสูตรที่ต้องการ");
                        navigate('/courses');
                    }
                }
            } catch (error) {
                console.error("Error fetching course: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#05070A] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-[#05070A] flex items-center justify-center text-white">
                <p>ขออภัย ไม่พบข้อมูลหลักสูตร</p>
            </div>
        );
    }

    // Use empty array if curriculum is not provided
    const displayCurriculum = course.curriculum || [];

    return (
        <div className="min-h-screen bg-[#05070A] pb-32 font-sans">
            <Helmet>
                <title>{course?.title || 'Course Details'} | JarnNong.com</title>
                <meta name="description" content={course?.shortDescription || course?.title || 'รายละเอียดหลักสูตร'} />
                <meta property="og:title" content={`${course?.title || 'Details'} | JarnNong.com`} />
                <meta property="og:description" content={course?.shortDescription || course?.title || 'รายละเอียดหลักสูตร'} />
                {course?.image && <meta property="og:image" content={course.image} />}
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden mesh-gradient">
                <div className="absolute inset-0 circuit-pattern opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 neon-border text-primary text-xs font-bold mb-6">
                                <span className="material-symbols-outlined text-sm">school</span>
                                {course.category || 'PREMIUM COURSE'}
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.2] font-display">
                                {course.title}
                            </h1>
                            <p className="text-xl text-text-secondary mb-10 leading-relaxed font-light">
                                {course.shortDescription}
                            </p>
                            <div className="flex flex-wrap gap-4 items-center">
                                <button className="btn-primary px-10 py-5 text-lg font-black hover-glow transition-all">
                                    สมัครเรียนเลย
                                </button>
                                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                                    <span className="text-3xl font-black text-white">฿{Number(course.price).toLocaleString()}.-</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative animate-float animate-delay-300">
                            <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full opacity-30"></div>
                            <div className="relative glass-card p-1 shadow-2xl overflow-hidden rounded-[2.5rem]">
                                <img
                                    src={course.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200'}
                                    alt={course.title}
                                    className="w-full h-full object-cover rounded-[2.3rem] min-h-[300px]"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 overflow-hidden backdrop-blur-md">
                                            {course.mentorImage ? (
                                                <img src={course.mentorImage} alt={course.mentorName} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="material-symbols-outlined text-primary text-3xl">face</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-white font-black text-lg">{course.mentorName || 'JarnNong AI Team'}</div>
                                            <div className="text-primary text-[10px] font-black uppercase tracking-widest">Master Instructor</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left: Description & Modules */}
                    <div className="lg:col-span-2 space-y-16">
                        <div className="animate-fade-up">
                            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-4xl">info</span>
                                รายละเอียดหลักสูตร
                            </h2>
                            <div
                                className="quill-editor-content text-slate-300 text-lg leading-relaxed font-light glass-card p-10 border-white/5"
                                dangerouslySetInnerHTML={{ __html: course.description }}
                            />
                            <style>{`
                                .quill-editor-content h1, .quill-editor-content h2, .quill-editor-content h3 { color: white; font-weight: 800; margin-top: 1.5em; margin-bottom: 0.5em; font-family: 'Kanit', sans-serif; }
                                .quill-editor-content h1 { font-size: 2rem; }
                                .quill-editor-content h2 { font-size: 1.5rem; }
                                .quill-editor-content p { margin-bottom: 1em; }
                                .quill-editor-content ul { list-style-type: disc; padding-left: 2em; margin-bottom: 1em; }
                                .quill-editor-content ol { list-style-type: decimal; padding-left: 2em; margin-bottom: 1em; }
                                .quill-editor-content strong { color: white; font-weight: 700; }
                                .quill-editor-content em { font-style: italic; color: #0df2f2; }
                            `}</style>
                        </div>

                        {displayCurriculum.length > 0 && (
                            <div className="animate-fade-up animate-delay-200 mt-16">
                                <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-4xl">list_alt</span>
                                    เนื้อหาหลักสูตร
                                </h2>
                                <div className="space-y-6">
                                    {displayCurriculum.map((item, idx) => (
                                        <div key={idx} className="glass-card p-8 border-white/5 hover:border-primary/20 transition-all">
                                            <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
                                                {item.module}
                                                <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-black">{item.lessons.length} LESSONS</span>
                                            </h3>
                                            <div className="space-y-4">
                                                {item.lessons.map((lesson, lIdx) => (
                                                    <div key={lIdx} className="flex items-center gap-4 text-slate-400 group cursor-default">
                                                        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black group-hover:bg-primary/20 group-hover:text-primary transition-all pointer-events-none">
                                                            {(lIdx + 1).toString().padStart(2, '0')}
                                                        </span>
                                                        <span className="text-sm font-medium">{lesson}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Info Sidebar */}
                    <div className="space-y-8 animate-fade-in animate-delay-500">
                        <div className="glass-card p-10 sticky top-32 border-primary/10">
                            <div className="mb-8">
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 text-center">Course Statistics</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                                        <p className="text-white font-black text-xl">{course.duration || 'Flexible'}</p>
                                        <p className="text-[9px] text-slate-500 uppercase font-black">Duration</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                                        <p className="text-white font-black text-xl">{course.level}</p>
                                        <p className="text-[9px] text-slate-500 uppercase font-black">Level</p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-white mb-6 uppercase tracking-wider">สิ่งที่คุณจะได้รับ</h3>
                            <ul className="space-y-4 mb-10">
                                {[
                                    'ใบประกาศนียบัตรเมื่อเรียนจบ',
                                    'เข้าถึงกลุ่มลับ Community เฉพาะผู้เรียน',
                                    'อัปเดตบทเรียนใหม่ๆ ฟรีตลอดชีพ',
                                    'Source Code และ Prompt Templates',
                                    'การรับคำปรึกษาจาก Mentor โดยตรง'
                                ].map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-400 text-sm font-medium">
                                        <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                            <button className="btn-primary w-full py-5 font-black text-lg hover-glow mb-6 active:scale-95 transition-all">
                                ลงทะเบียนตอนนี้
                            </button>
                            <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                <span className="material-symbols-outlined text-sm">lock</span>
                                Secure Payment Guaranteed
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
