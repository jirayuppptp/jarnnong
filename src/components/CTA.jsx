import { useState } from 'react'

export default function CTA() {
    const [email, setEmail] = useState('')

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[24px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
                    style={{ background: '#00F2FF' }}>
                    {/* Glow decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="relative z-10 text-center md:text-left animate-fade-up">
                        <h2 className="text-3xl md:text-4xl font-black text-[#05070A] mb-4 leading-[1.4]">
                            พร้อมเริ่มต้นหรือยัง?
                        </h2>
                        <p className="text-[#05070A]/80 text-lg font-medium">
                            สมัครสมาชิกวันนี้เพื่อรับจดหมายข่าวอัปเดต AI รายสัปดาห์
                        </p>
                    </div>

                    <div className="relative z-10 w-full md:w-auto animate-fade-up animate-delay-200">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                className="px-6 py-4 rounded-xl border-none focus:ring-2 focus:ring-[#05070A]/20 w-full sm:w-64 outline-none text-[#05070A] placeholder:text-[#05070A]/50 font-medium"
                                placeholder="อีเมลของคุณ"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                className="px-8 py-4 bg-[#05070A] text-white font-bold rounded-xl hover:bg-black transition-all shrink-0 hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] active:scale-95"
                            >
                                ติดตามเลย
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
