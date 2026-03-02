import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

export default function AdminDashboard() {
    const [counts, setCounts] = useState({
        courses: 0,
        news: 0,
        dictionary: 0,
        aitools: 0,
        totalViews: 0
    });
    const [recentActivities, setRecentActivities] = useState([]);
    const [dbStatus, setDbStatus] = useState('connecting');

    useEffect(() => {
        // Listen to Courses
        const unsubscribeCourses = onSnapshot(collection(db, 'courses'), (snapshot) => {
            setCounts(prev => ({ ...prev, courses: snapshot.size }));
            setDbStatus('online');
        });

        // Listen to Dictionary
        const unsubscribeDict = onSnapshot(collection(db, 'dictionary'), (snapshot) => {
            setCounts(prev => ({ ...prev, dictionary: snapshot.size }));
        });

        // Listen to AI Tools
        const unsubscribeAITools = onSnapshot(collection(db, 'aitools'), (snapshot) => {
            setCounts(prev => ({ ...prev, aitools: snapshot.size }));
        });

        // Listen to News for counts and views
        const unsubscribeNews = onSnapshot(collection(db, 'news'), (snapshot) => {
            const newsData = snapshot.docs.map(doc => doc.data());
            const views = newsData.reduce((acc, curr) => acc + (curr.initialViews || 0) + (curr.realViews || 0), 0);
            setCounts(prev => ({ ...prev, news: snapshot.size, totalViews: views }));

            // Generate some "recent activity" from news as it's the most active
            const recent = snapshot.docs
                .map(doc => ({
                    id: doc.id,
                    type: 'ข่าวสาร',
                    title: doc.data().title,
                    time: doc.data().date
                }))
                .sort((a, b) => b.time.localeCompare(a.time))
                .slice(0, 5);
            setRecentActivities(recent);
        });

        return () => {
            unsubscribeCourses();
            unsubscribeDict();
            unsubscribeAITools();
            unsubscribeNews();
        };
    }, []);

    const stats = [
        { label: 'หลักสูตรอบรม', value: counts.courses.toLocaleString(), icon: 'school', color: 'bg-blue-500/20 text-blue-400' },
        { label: 'เครื่องมือ AI', value: counts.aitools.toLocaleString(), icon: 'precision_manufacturing', color: 'bg-cyan-500/20 text-cyan-400' },
        { label: 'ข่าวสาร AI', value: counts.news.toLocaleString(), icon: 'newspaper', color: 'bg-emerald-500/20 text-emerald-400' },
        { label: 'คำศัพท์ AI', value: counts.dictionary.toLocaleString(), icon: 'menu_book', color: 'bg-purple-500/20 text-purple-400' },
        { label: 'ยอดการเข้าชม', value: counts.totalViews >= 1000 ? (counts.totalViews / 1000).toFixed(1) + 'k' : counts.totalViews, icon: 'trending_up', color: 'bg-orange-500/20 text-orange-400' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-black text-white">Dashboard สรุปภาพรวม</h1>
                <p className="text-slate-400 mt-2">ยินดีต้อนรับกลับมา, ข้อมูลทั้งหมดดึงจาก <span className="text-[#0df2f2] font-bold">Cloud Firestore</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                        ข่าวสารล่าสุด
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
                            <p className="text-slate-500 italic text-sm text-center py-8">ยังไม่มีกิจกรรมล่าสุดในส่วนข่าวสาร</p>
                        )}
                    </div>
                </div>

                {/* System Health Section */}
                <div className="bg-[#0a1a1a]/80 border border-white/5 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0df2f2]">settings_heart</span>
                        สถานะระบบคลาวด์
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Firestore Connection</span>
                                <span className={`${dbStatus === 'online' ? 'text-emerald-400' : 'text-orange-400'} font-bold flex items-center gap-2`}>
                                    <span className={`w-2 h-2 rounded-full ${dbStatus === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-orange-400 animate-pulse'}`}></span>
                                    {dbStatus === 'online' ? 'เชื่อมต่อแล้ว (Online)' : 'กำลังเชื่อมต่อ...'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Cloud Sync Status</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-[#0df2f2] font-bold">Real-time</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Environment</span>
                                <span className="text-[#0df2f2] font-black tracking-tighter uppercase px-2 py-0.5 rounded bg-[#0df2f2]/10 text-[10px]">
                                    Production / Firebase
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
