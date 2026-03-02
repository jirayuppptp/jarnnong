const tools = [
    {
        icon: 'palette',
        title: 'Creative & Media',
        desc: 'ปลดปล่อยจินตนาการด้วยเครื่องมือสร้างรูปภาพ วิดีโอ และกราฟิกอัจฉริยะ',
        items: ['Image Generation', 'Video Synthesis', 'Design Automation'],
    },
    {
        icon: 'terminal',
        title: 'Web & Coding',
        desc: 'สร้างสรรค์ผลงานดิจิทัลด้วย No-code และ Coding Assistants ระดับเทพ',
        items: ['Code Completion', 'No-code App Builders', 'Website Generators'],
    },
    {
        icon: 'task_alt',
        title: 'Productivity',
        desc: 'ทำงานเร็วขึ้น 10 เท่าด้วยระบบวิจัย เอกสาร และแชทบอทสุดชาญฉลาด',
        items: ['AI Chatbots', 'Document Summarization', 'Research Assistants'],
    },
]

export default function AITools() {
    return (
        <section className="py-24 bg-[#05070A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-[1.4]">
                            สารบัญเครื่องมือ AI
                        </h2>
                        <p className="text-text-secondary">
                            สำรวจคลังเครื่องมือ AI ที่คัดสรรมาเพื่อทุกสายงาน
                        </p>
                    </div>
                    <a className="text-primary font-bold flex items-center gap-1 hover:underline" href="#">
                        ดูทั้งหมด
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                        <div
                            key={tool.title}
                            className={`glass-card p-8 cursor-pointer transition-all group animate-fade-up hover-glow hover:scale-[1.02] active:scale-[0.98] ${index === 0 ? 'animate-delay-100' :
                                index === 1 ? 'animate-delay-200' :
                                    'animate-delay-300'
                                }`}
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                            <p className="text-text-secondary mb-6 text-sm leading-relaxed">{tool.desc}</p>
                            <ul className="space-y-3">
                                {tool.items.map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-xs text-slate-300 group-hover:text-white transition-colors">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0 group-hover:shadow-[0_0_8px_rgba(0,242,255,1)] transition-all"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
