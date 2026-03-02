import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function CourseSection() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const savedCourses = localStorage.getItem('jarnnong_courses');
        if (savedCourses) {
            const allCourses = JSON.parse(savedCourses);
            setCourses(allCourses.slice(0, 3)); // Only show top 3 on home page
        }
    }, []);

    return (
        <section className="py-24 bg-[#05070A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div className="animate-fade-up">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-display leading-[1.3]">
                            หลักสูตรอบรมแนะนำ
                        </h2>
                        <p className="text-xl text-text-secondary max-w-2xl font-light">
                            เริ่มต้นเส้นทาง AI ของคุณด้วยหลักสูตรที่ออกแบบมาเพื่อการใช้งานจริง
                        </p>
                    </div>
                    <NavLink
                        to="/courses"
                        className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all group animate-fade-up"
                    >
                        ดูหลักสูตรทั้งหมด
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </NavLink>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.length > 0 ? (
                        courses.map((course, index) => (
                            <NavLink
                                key={course.id}
                                to="/courses"
                                className={`group relative flex flex-col rounded-[2rem] bg-white/[0.02] border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-500 animate-fade-up`}
                                style={{ animationDelay: `${(index + 1) * 100}ms` }}
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] to-transparent opacity-60" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                            {course.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 leading-[1.4] group-hover:text-primary transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-2 font-light">
                                        {course.description}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-primary font-mono font-bold">{course.price} ฿</span>
                                        <span className="text-xs text-text-secondary flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                            {course.duration}
                                        </span>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white/[0.02] rounded-3xl border border-white/5">
                            <p className="text-slate-500 italic">เร็วๆ นี้...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
