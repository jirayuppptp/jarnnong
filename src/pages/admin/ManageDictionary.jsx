import { useState, useEffect } from 'react';

export default function ManageDictionary() {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ term: '', category: 'General AI', definition: '' });

    useEffect(() => {
        const savedDict = localStorage.getItem('jarnnong_dict');
        if (savedDict) {
            setItems(JSON.parse(savedDict));
        } else {
            const mock = [
                { id: 1, term: 'LLM', category: 'Model Architecture', definition: 'Large Language Model หรือโมเดลภาษาขนาดใหญ่ที่ถูกฝึกฝนด้วยข้อมูลมหาศาล' },
                { id: 2, term: 'Prompt Engineering', category: 'Usage', definition: 'ศาสตร์ของการออกแบบคำสั่งเพื่อให้ AI แสดงผลลัพธ์ที่ตรงใจที่สุด' },
            ];
            setItems(mock);
            localStorage.setItem('jarnnong_dict', JSON.stringify(mock));
        }
    }, []);

    const saveToLocalStorage = (newItems) => {
        setItems(newItems);
        localStorage.setItem('jarnnong_dict', JSON.stringify(newItems));
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({ ...item });
        } else {
            setEditingItem(null);
            setFormData({ term: '', category: 'General AI', definition: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            const updated = items.map(i => i.id === editingItem.id ? { ...formData, id: i.id } : i);
            saveToLocalStorage(updated);
        } else {
            const newItem = { ...formData, id: Date.now() };
            saveToLocalStorage([...items, newItem]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('ยืนยันการลบคำศัพท์นี้?')) {
            const filtered = items.filter(i => i.id !== id);
            saveToLocalStorage(filtered);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-white">จัดการพจนานุกรม AI</h1>
                    <p className="text-sm text-slate-400">รวบรวมและแปลความหมายคำศัพท์เทคนิคล้ำสมัย</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#0df2f2] text-[#050d0d] px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(13,242,242,0.4)] transition-all"
                >
                    <span className="material-symbols-outlined text-xl">add</span>
                    เพิ่มคำศัพท์ใหม่
                </button>
            </div>

            <div className="bg-[#0a1a1a]/80 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-[#0df2f2] font-bold">
                            <th className="px-6 py-4">คำศัพท์ (Term)</th>
                            <th className="px-6 py-4">หมวดหมู่</th>
                            <th className="px-6 py-4">ความหมาย</th>
                            <th className="px-6 py-4 text-right">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-black text-white text-base">{item.term}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-300 border border-white/10 uppercase font-medium">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-400 max-w-md truncate">{item.definition}</td>
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
                            {editingItem ? 'แก้ไขคำศัพท์' : 'เพิ่มคำศัพท์ใหม่'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">คำศัพท์ (Term)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.term}
                                    onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm font-bold uppercase"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">หมวดหมู่</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">คำอธิบายความหมาย</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.definition}
                                    onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
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
                                    บันทึกข้อมูล
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
