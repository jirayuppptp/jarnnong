const features = [
    {
        icon: 'translate',
        title: 'เนื้อหาภาษาไทย',
        desc: 'เรียนรู้ได้เร็วขึ้นด้วยคำอธิบายภาษาไทยที่เข้าใจง่าย ตั้งแต่พื้นฐานจนถึงระดับสูง',
    },
    {
        icon: 'update',
        title: 'อัปเดตทุกสัปดาห์',
        desc: 'ไม่พลาดทุกความเคลื่อนไหวในวงการ AI โลก เราคัดกรองข่าวสารที่สำคัญมาให้คุณ',
    },
    {
        icon: 'verified',
        title: 'คัดสรรโดยผู้เชี่ยวชาญ',
        desc: 'ทุกเครื่องมือและบทเรียนผ่านการทดสอบการใช้งานจริงในภาคธุรกิจและอุตสาหกรรม',
    },
]

export default function WhyUs() {
    return (
        <section className="py-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: text */}
                    <div className="space-y-8 animate-fade-up">
                        <h2 className="text-4xl font-black tracking-tight text-white animate-fade-up leading-[1.3]">
                            ทำไมต้อง <br />
                            <span className="text-primary text-glow">AI Knowledge Hub?</span>
                        </h2>
                        <div className="space-y-6">
                            {features.map((f, index) => (
                                <div key={f.title} className={`flex gap-4 animate-fade-up ${index === 0 ? 'animate-delay-100' :
                                    index === 1 ? 'animate-delay-200' :
                                        'animate-delay-300'
                                    }`}>
                                    <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 group hover:bg-primary hover:text-white transition-all duration-300">
                                        <span className="material-symbols-outlined">{f.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1 text-white">{f.title}</h4>
                                        <p className="text-text-secondary text-sm leading-relaxed">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: video placeholder */}
                    <div className="relative animate-float">
                        <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-40"></div>
                        <div className="relative glass-card p-2 shadow-2xl overflow-hidden aspect-video flex items-center justify-center hover-glow transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                            <div className="flex flex-col items-center gap-4 relative z-10">
                                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center animate-pulse cursor-pointer hover:bg-primary/30 transition-colors">
                                    <span className="material-symbols-outlined text-primary text-5xl">play_circle</span>
                                </div>
                                <span className="text-text-secondary font-medium px-4 py-1.5 bg-white/5 rounded-full border border-white/10">ดูวิดีโอแนะนำ Hub ของเรา</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
