export default function AdminDashboard() {
    const stats = [
        { label: 'เครื่องมือ AI ทั้งหมด', value: '24', icon: 'auto_fix', color: 'bg-blue-500/20 text-blue-400' },
        { label: 'ข่าวสารวันนี้', value: '12', icon: 'newspaper', color: 'bg-emerald-500/20 text-emerald-400' },
        { label: 'คำศัพท์ในสารบัญ', value: '156', icon: 'menu_book', color: 'bg-purple-500/20 text-purple-400' },
        { label: 'ผู้เข้าชมสัปดาห์นี้', value: '1.2k', icon: 'trending_up', color: 'bg-orange-500/20 text-orange-400' },
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
                            <span className="text-xs font-bold text-[#0df2f2] bg-[#0df2f2]/10 px-2 py-1 rounded">Update</span>
                        </div>
                        <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                        <div className="text-sm font-medium text-slate-400">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity Placeholder */}
                <div className="bg-[#0a1a1a]/80 border border-white/5 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0df2f2]">history</span>
                        กิจกรรมล่าสุด
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-[#0df2f2]"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">เพิ่มเครื่องมือ AI ใหม่: "Sora OpenAI"</p>
                                    <p className="text-[10px] text-slate-500 uppercase mt-1">2 ชั่วโมงที่แล้ว • โดย Admin</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health Placeholder */}
                <div className="bg-[#0a1a1a]/80 border border-white/5 p-6 rounded-3xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0df2f2]">settings_heart</span>
                        สถานะระบบ
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Database Connection</span>
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> ปกติ
                            </span>
                        </li>
                        <li className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Storage Usage (localStorage)</span>
                            <span className="text-blue-400 font-bold">12%</span>
                        </li>
                        <li className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Security Layers</span>
                            <span className="text-[#0df2f2] font-bold">Active</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
