import { useState, useEffect } from 'react';

export default function ManageNews() {
    const [news, setNews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [formData, setFormData] = useState({ title: '', date: new Date().toISOString().split('T')[0], content: '', category: 'AI Updates', image: '' });

    useEffect(() => {
        const savedNews = localStorage.getItem('jarnnong_news');
        if (savedNews) {
            setNews(JSON.parse(savedNews));
        } else {
            const mock = [
                {
                    id: 1,
                    title: 'OpenAI เปิดตัว Sora โมเดลสร้างวิดีโอจากข้อความสุดสมจริง',
                    content: 'วงการวิดีโอต้องสั่นสะเทือนเมื่อ OpenAI เปิดตัวโมเดลใหม่ล่าสุดที่สามารถสร้างวิดีโอคุณภาพสูงได้จากเพียงคำบรรยายข้อความ...',
                    date: '2024-03-01',
                    category: 'AI Updates',
                    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
                },
                {
                    id: 2,
                    title: 'Claude 3 ครองแชมป์โมเดลภาษาที่ฉลาดที่สุดในปัจจุบัน',
                    content: 'Anthropic ประกาศความสำเร็จของ Claude 3 ที่ทำคะแนนทดสอบได้เหนือกว่า GPT-4 ในหลายด้าน พร้อมรองรับข้อมูลขนาดมหาศาล...',
                    date: '2024-02-28',
                    category: 'Models',
                    image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c71d0?auto=format&fit=crop&q=80&w=800'
                }
            ];
            setNews(mock);
            localStorage.setItem('jarnnong_news', JSON.stringify(mock));
        }
    }, []);

    const saveToLocalStorage = (newNews) => {
        setNews(newNews);
        localStorage.setItem('jarnnong_news', JSON.stringify(newNews));
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingNews(item);
            setFormData({ ...item });
        } else {
            setEditingNews(null);
            setFormData({ title: '', date: new Date().toISOString().split('T')[0], content: '', category: 'AI Updates', image: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingNews) {
            const updated = news.map(n => n.id === editingNews.id ? { ...formData, id: n.id } : n);
            saveToLocalStorage(updated);
        } else {
            const newItem = { ...formData, id: Date.now() };
            saveToLocalStorage([...news, newItem]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('ยืนยันการลบข่าวนี้?')) {
            const filtered = news.filter(n => n.id !== id);
            saveToLocalStorage(filtered);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-white">จัดการข่าวสาร AI</h1>
                    <p className="text-sm text-slate-400">อัปเดตข่าวสารเทคโนโลยี AI ล่าสุดให้ผู้ติดตาม</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#0df2f2] text-[#050d0d] px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(13,242,242,0.4)] transition-all"
                >
                    <span className="material-symbols-outlined text-xl">add</span>
                    เพิ่มข่าวใหม่
                </button>
            </div>

            <div className="bg-[#0a1a1a]/80 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-[#0df2f2] font-bold">
                            <th className="px-6 py-4">หัวข้อข่าว</th>
                            <th className="px-6 py-4">หมวดหมู่</th>
                            <th className="px-6 py-4">วันที่</th>
                            <th className="px-6 py-4">เนื้อหา</th>
                            <th className="px-6 py-4 text-right">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {news.map((item) => (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-bold text-white text-sm line-clamp-1">{item.title}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-md bg-[#0df2f2]/10 text-[10px] text-[#0df2f2] border border-[#0df2f2]/20 uppercase font-bold">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-300 font-mono italic">{item.date}</td>
                                <td className="px-6 py-4 text-sm text-slate-400 max-w-sm truncate">{item.content}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => handleOpenModal(item)} className="p-2 text-slate-400 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-xl">edit</span>
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400/60 hover:text-red-400 transition-colors">
                                        <span className="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0a1a1a] border border-[#0df2f2]/20 w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-black text-white mb-6">
                            {editingNews ? 'แก้ไขข่าวสาร' : 'เพิ่มข่าวใหม่'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">หัวข้อข่าว</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">วันที่เผยแพร่</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">หมวดหมู่</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="เช่น AI Updates, Models"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">URL รูปภาพ (ถ้ามี)</label>
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">เนื้อหาข่าว</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                ></textarea>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-[#0df2f2] text-[#050d0d] rounded-xl font-bold hover:shadow-[0_0_20px_rgba(13,242,242,0.4)] transition-all"
                                >
                                    บันทึกข่าว
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
