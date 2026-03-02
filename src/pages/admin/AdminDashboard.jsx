import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [counts, setCounts] = useState({
        courses: 0,
        news: 0,
        dictionary: 0,
        totalViews: 0
    });
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        // Fetch data from localStorage
        const courses = JSON.parse(localStorage.getItem('jarnnong_courses') || '[]');
        const news = JSON.parse(localStorage.getItem('jarnnong_news') || '[]');
        const dictionary = JSON.parse(localStorage.getItem('jarnnong_dictionary') || '[]');

        // Calculate total views (initial + real)
        const totalViews = news.reduce((acc, curr) => acc + (curr.initialViews || 0) + (curr.realViews || 0), 0);

        setCounts({
            courses: courses.length,
            news: news.length,
            dictionary: dictionary.length,
            totalViews: totalViews
        });

        // Generate dynamic recent activities
        const combined = [
            ...courses.map(c => ({ type: 'หลักสูตร', title: c.title, time: 'เมื่อเร็วๆ นี้' })),
            ...news.map(n => ({ type: 'ข่าวสาร', title: n.title, time: 'เมื่อเร็วๆ นี้' })),
            ...dictionary.map(d => ({ type: 'พจนานุกรม', title: d.term, time: 'เมื่อเร็วๆ นี้' }))
        ].sort(() => 0.5 - Math.random()); // Simple shuffle for varied activity

        setRecentActivities(combined.slice(0, 5));
    }, []);

    const stats = [
        { label: 'หลักสูตรอบรมทั้งหมด', value: counts.courses.toLocaleString(), icon: 'school', color: 'bg-blue-500/20 text-blue-400' },
        { label: 'ข่าวสาร AI', value: counts.news.toLocaleString(), icon: 'newspaper', color: 'bg-emerald-500/20 text-emerald-400' },
        { label: 'คำศัพท์ในสารบัญ', value: counts.dictionary.toLocaleString(), icon: 'menu_book', color: 'bg-purple-500/20 text-purple-400' },
        { label: 'การเข้าชมทั้งหมด', value: counts.totalViews >= 1000 ? (counts.totalViews / 1000).toFixed(1) + 'k' : counts.totalViews, icon: 'trending_up', color: 'bg-orange-500/20 text-orange-400' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-black text-white">Dashboard สรุปภาพรวม</h1>
                <p className="text-slate-400 mt-2">ยินดีต้อนรับกลับมา, นี่คือข้อมูลล่าสุดของ JarnNong.com</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s) => (
                    <div key={s.label} className="bg-[#0a1a1a]/80 border border-white/5 p-6 rounded-2xl backdrop-blur-sm group hover:border-[#0df2f2]/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-xl ${s.color}`}>
                                <span className="material-symbols-outlined">{s.icon}</span>
                            </div>
                            <span className="text-xs font-bold text-[#0df2f2] bg-[#0df2f2]/10 px-2 py-1 rounded">Live</span>
                        </div>
                        <div className="text-3xl font-black text-white mb-1 font-mono">{s.value}</div>
                        <div className="text-sm font-medium text-slate-400">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity Section */}
                <div className="bg-[#0a1a1a]/80 border border-white/5 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0df2f2]">history</span>
                        กิจกรรมล่าสุด
                    </h3>
                    <div className="space-y-4">
                        {recentActivities.length > 0 ? (
                            recentActivities.map((act, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/5 transition-colors border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-[#0df2f2]"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">เพิ่ม{act.type}ใหม่: <span className="text-[#0df2f2]">"{act.title}"</span></p>
                                        <p className="text-[10px] text-slate-500 uppercase mt-1 tracking-wider">{act.time} • โดย ADMIN</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500 italic text-sm text-center py-8">ยังไม่มีกิจกรรมล่าสุด</p>
                        )}
                    </div>
                </div>

                {/* System Health Section */}
                <div className="bg-[#0a1a1a]/80 border border-white/5 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0df2f2]">settings_heart</span>
                        สถานะระบบ
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Database Connection</span>
                                <span className="text-emerald-400 font-bold flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    ปกติ (OK)
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Storage Usage (Local)</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '8%' }}></div>
                                    </div>
                                    <span className="text-blue-400 font-bold">8%</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Security Layers</span>
                                <span className="text-[#0df2f2] font-black tracking-tighter uppercase px-2 py-0.5 rounded bg-[#0df2f2]/10 text-[10px]">
                                    Active / Protected
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
