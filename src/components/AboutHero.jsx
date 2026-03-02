const stats = [
    { value: '10+ ปี', label: 'ประสบการณ์' },
    { value: '50,000+', label: 'ผู้ติดตาม' },
    { value: '5,000+', label: 'นักเรียน' },
]

export default function AboutHero() {
    return (
        <section className="relative py-24 overflow-hidden bg-[#060f0f] border-b border-primary/10">
            {/* Circuit dots */}
            <div className="absolute inset-0 circuit-pattern opacity-10"></div>
            {/* Glow orb */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Photo */}
                    <div className="flex justify-center lg:justify-start">
                        <div className="relative group">
                            {/* Glow ring behind photo */}
                            <div className="absolute -inset-1 bg-gradient-to-tr from-primary via-primary/50 to-transparent rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                            {/* Photo */}
                            <div className="relative w-72 h-72 md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_0_50px_rgba(0,242,255,0.2)]">
                                <img
                                    alt="จารย์โหน่ง"
                                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                                    src="/profile.jpg"
                                />
                            </div>
                            {/* Verified badge */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 glass-card rounded-2xl flex items-center justify-center shadow-2xl">
                                <span className="material-symbols-outlined text-primary text-4xl">verified</span>
                            </div>
                        </div>
                    </div>

                    {/* Text content */}
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4 tracking-widest">
                                FOUNDER &amp; INSTRUCTOR
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
                                รู้จักกับ <span className="text-primary text-glow">จารย์โหน่ง</span>
                            </h2>
                            <p className="text-xl md:text-2xl font-semibold text-[#94A3B8]">
                                อาจารย์ผู้เชี่ยวชาญด้าน AI และเทคโนโลยีเปลี่ยนโลก
                            </p>
                        </div>

                        <p className="text-text-secondary text-lg leading-relaxed">
                            ด้วยความเชื่อที่ว่า <span className="text-white font-medium">"AI ไม่ได้มาแทนที่คน แต่คนใช้ AI จะมาแทนที่คนที่ใช้ไม่เป็น"</span>{' '}
                            จารย์โหน่งจึงอุทิศตนเพื่อสร้างแหล่งเรียนรู้เทคโนโลยีอัจฉริยะที่เข้าถึงง่ายที่สุดสำหรับคนไทย
                            มุ่งหวังให้ทุกคนสามารถยกระดับศักยภาพตนเองและธุรกิจด้วยนวัตกรรมระดับโลก
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 py-4">
                            {stats.map((s) => (
                                <div key={s.label} className="glass-card p-4 text-center">
                                    <div className="text-primary font-bold text-xl md:text-2xl mb-1">{s.value}</div>
                                    <div className="text-[10px] md:text-xs text-text-secondary uppercase tracking-wider">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <button className="px-8 py-4 border-2 border-primary/50 text-primary hover:bg-primary hover:text-[#05070A] font-bold rounded-xl transition-all flex items-center gap-2 group">
                                ติดตามจารย์โหน่ง
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">rss_feed</span>
                            </button>
                            <div className="flex items-center gap-4 px-4">
                                <a className="text-text-secondary hover:text-primary transition-colors" href="#" title="Website">
                                    <span className="material-symbols-outlined text-2xl">public</span>
                                </a>
                                <a className="text-text-secondary hover:text-primary transition-colors" href="#" title="YouTube">
                                    <span className="material-symbols-outlined text-2xl">video_library</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
