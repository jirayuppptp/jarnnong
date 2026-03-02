import { NavLink } from 'react-router-dom'

export default function Hero() {
    const brands = ['OpenAI', 'Midjourney', 'Anthropic', 'Google AI', 'Meta']

    return (
        <section className="relative overflow-hidden pt-20 pb-32 mesh-gradient">
            <div className="absolute inset-0 circuit-pattern opacity-30"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 neon-border text-primary text-xs font-bold mb-6 animate-fade-up">
                        <span className="material-symbols-outlined text-sm">rocket_launch</span>
                        THE FUTURE IS HERE
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[1.3] animate-fade-up animate-delay-100">
                        อัปเกรดทักษะ AI <br />
                        <span className="text-primary text-glow">ให้ก้าวทันโลก</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up animate-delay-200">
                        ศูนย์รวมความรู้และเครื่องมือ AI สำหรับคนไทย เพื่อก้าวสู่อนาคตที่เหนือกว่าด้วยเทคโนโลยีอัจฉริยะ
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-300">
                        <NavLink to="/courses" className="btn-primary w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 text-base hover-glow">
                            <span className="material-symbols-outlined">menu_book</span>
                            รายละเอียดหลักสูตร
                        </NavLink>
                        <NavLink to="/ai-hub" className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-base">
                            <span className="material-symbols-outlined">explore</span>
                            สำรวจเครื่องมือ AI
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Brand logos */}
            <div className="mt-20 max-w-5xl mx-auto px-4 opacity-40 animate-fade-in animate-delay-500">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {brands.map((brand) => (
                        <div key={brand} className="text-xl font-bold text-text-secondary tracking-wide hover:text-primary transition-colors cursor-default">
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
