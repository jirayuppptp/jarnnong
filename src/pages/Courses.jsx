import { useState, useEffect } from 'react';

function Courses() {
    const [email, setEmail] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const savedCourses = localStorage.getItem('jarnnong_courses');
        if (savedCourses) {
            setCourses(JSON.parse(savedCourses));
        }
    }, []);

    return (
        <div className="bg-[#050d0d] text-slate-200 min-h-screen font-sans">

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-28 pb-40 border-b border-white/5">
                {/* Mesh Gradient Background */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              radial-gradient(at 0% 0%, rgba(13, 242, 242, 0.12) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(13, 242, 242, 0.08) 0px, transparent 50%),
              radial-gradient(at 50% 100%, rgba(13, 242, 242, 0.05) 0px, transparent 50%)
            `,
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0df2f2]/10 border border-[#0df2f2]/30 text-[#0df2f2] text-sm font-bold mb-10 tracking-widest uppercase animate-fade-up">
                            <span className="material-symbols-outlined text-lg">school</span>
                            Upskill for the AI Era
                        </div>

                        <h1
                            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white mb-8 leading-[1.3] font-display animate-fade-up animate-delay-100"
                            style={{ textShadow: '0 0 15px rgba(13, 242, 242, 0.4), 0 0 30px rgba(13, 242, 242, 0.2)' }}
                        >
                            หลักสูตรอบรม AI <br />
                            <span className="text-[#0df2f2]">เพื่ออนาคตของคุณ</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-up animate-delay-200">
                            เรียนรู้ทักษะ AI จากประสบการณ์จริงเพื่อการประยุกต์ใช้ในธุรกิจและการทำงานอย่างเป็นมืออาชีพ
                            เนื้อหาเจาะลึก เข้าใจง่าย พร้อมนำไปสร้างความได้เปรียบในการแข่งขัน
                        </p>
                    </div>
                </div>
            </section>

            {/* Courses Directory Section */}
            <section className="py-32 bg-[#050d0d]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <h2
                                className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display leading-[1.4]"
                                style={{ textShadow: '0 0 15px rgba(13, 242, 242, 0.4), 0 0 30px rgba(13, 242, 242, 0.2)' }}
                            >
                                เลือกหลักสูตรที่รวบรวมมาเพื่อคุณ
                            </h2>
                            <p className="text-xl text-slate-400 max-w-xl">
                                พัฒนาทักษะที่โลกปัจจุบันต้องการด้วยคอร์สอบรมที่เน้นการใช้งานจริงและเห็นผลลัพธ์
                            </p>
                        </div>
                    </div>

                    {/* Course Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.length > 0 ? (
                            courses.map((course, index) => (
                                <div
                                    key={course.id}
                                    className={`group relative flex flex-col rounded-[2.5rem] bg-[#0a1a1a] border border-[#0df2f2]/10 overflow-hidden hover:border-[#0df2f2]/50 transition-all duration-500 animate-fade-up`}
                                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                                >
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1a] via-transparent to-transparent opacity-60" />
                                        <div className="absolute top-6 left-6">
                                            <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-[#0df2f2] text-[10px] font-black uppercase tracking-widest border border-[#0df2f2]/20">
                                                {course.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 mb-4 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                            <span className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-sm text-[#0df2f2]">schedule</span>
                                                {course.duration}
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
                                                <p className="text-[10px] text-slate-500 uppercase font-black mb-1">ราคาหลักสูตร</p>
                                                <p className="text-2xl font-black text-[#0df2f2] font-mono">{course.price} ฿</p>
                                            </div>
                                            <a
                                                href={course.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="px-6 py-3 bg-[#0df2f2] text-[#050d0d] font-black rounded-xl hover:shadow-[0_0_20px_rgba(13,242,242,0.4)] transition-all active:scale-95"
                                            >
                                                สมัครเรียน
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-24 bg-white/[0.02] rounded-[3rem] border border-white/5">
                                <span className="material-symbols-outlined text-6xl text-slate-700 mb-6">school</span>
                                <p className="text-slate-500 italic text-lg font-light">กำลังเตรียมข้อมูลหลักสูตรที่น่าสนใจ เร็วๆ นี้...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-32 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="bg-[#0df2f2] rounded-[3rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group shadow-[0_20px_60px_-15px_rgba(13,242,242,0.3)]"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full -mr-40 -mt-40 blur-[100px] group-hover:bg-white/30 transition-all duration-[2000ms]" />
                        <div className="relative z-10 text-center md:text-left max-w-xl">
                            <h2 className="text-4xl md:text-6xl font-black text-[#050d0d] mb-6 leading-[1.3] font-display">
                                ไม่พลาดหลักสูตร <br />ใหม่ๆ ของเรา
                            </h2>
                            <p className="text-[#050d0d]/80 text-xl font-medium">
                                รับการแจ้งเตือนเมื่อเราเปิดรับสมัครหลักสูตรใหม่
                            </p>
                        </div>
                        <div className="relative z-10 w-full md:w-auto">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="อีเมลของคุณ"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="px-8 py-5 rounded-2xl border-none focus:ring-4 focus:ring-[#050d0d]/20 w-full sm:w-80 text-lg text-[#050d0d] outline-none font-bold"
                                />
                                <button className="px-10 py-5 bg-[#050d0d] text-white font-extrabold text-lg rounded-2xl hover:bg-black hover:shadow-2xl transition-all shrink-0 active:scale-95">
                                    ติดตามเลย
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Courses;
