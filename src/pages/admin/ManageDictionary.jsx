import { useState, useEffect, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function ManageDictionary() {
    const quillRef = useRef(null);
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

    const quillModules = useMemo(() => ({
        toolbar: [
            [{ 'header': [false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    }), []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-white font-display uppercase tracking-wider">Manage AI Glossary</h1>
                    <p className="text-sm text-slate-400">รวบรวมและแปลความหมายคำศัพท์เทคนิคล้ำสมัย</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#0df2f2] text-[#050d0d] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(13,242,242,0.4)] hover:scale-105 transition-all"
                >
                    <span className="material-symbols-outlined text-xl">add</span>
                    เพิ่มคำศัพท์ใหม่
                </button>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-[#0df2f2] font-bold">
                            <th className="px-6 py-4">คำศัพท์ (Term)</th>
                            <th className="px-6 py-4">หมวดหมู่</th>
                            <th className="px-6 py-4">ความหมาย (พรีวิว)</th>
                            <th className="px-6 py-4 text-right">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4 font-black text-white text-base tracking-tight">{item.term}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-300 border border-white/10 uppercase font-black tracking-tighter">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-400 max-w-md truncate">
                                    {(item.definition || '').replace(/<[^>]*>?/gm, '')}
                                </td>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050d0d]/95 backdrop-blur-sm">
                    <div className="bg-[#0a1a1a] border border-white/10 w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black text-white uppercase tracking-wider font-display">
                                {editingItem ? 'Edit Glossary' : 'New Glossary Term'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                            <div className="quill-container">
                                <label className="block text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">คำอธิบายความหมาย (Rich Text)</label>
                                <ReactQuill
                                    ref={quillRef}
                                    theme="snow"
                                    value={formData.definition}
                                    onChange={(val) => setFormData({ ...formData, definition: val })}
                                    modules={quillModules}
                                    className="bg-white/5 rounded-xl text-white border-white/10"
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-4 bg-[#0df2f2] text-[#050d0d] rounded-xl font-black hover:scale-[1.02] transition-all uppercase tracking-tighter"
                                >
                                    Save Term
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .ql-toolbar.ql-snow { border-color: rgba(255,255,255,0.1) !important; background: rgba(255,255,255,0.05); border-radius: 12px 12px 0 0; }
                .ql-container.ql-snow { border-color: rgba(255,255,255,0.1) !important; border-radius: 0 0 12px 12px; height: 200px; font-size: 14px; }
                .ql-editor { color: #f1f5f9; }
                .ql-snow .ql-stroke { stroke: #94a3b8; }
                .ql-snow .ql-fill { fill: #94a3b8; }
                .ql-snow.ql-toolbar button:hover .ql-stroke { stroke: #0df2f2; }
                .ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: #0df2f2; }
            `}</style>
        </div>
    );
}
