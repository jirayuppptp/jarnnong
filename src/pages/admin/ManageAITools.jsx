import { useState, useEffect } from 'react';

export default function ManageAITools() {
    const [tools, setTools] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTool, setEditingTool] = useState(null);
    const [formData, setFormData] = useState({ name: '', category: '', description: '', url: '', icon: 'auto_awesome' });

    useEffect(() => {
        const savedTools = localStorage.getItem('jarnnong_ai_tools');
        if (savedTools) {
            setTools(JSON.parse(savedTools));
        } else {
            // Mock data
            const mock = [
                { id: 1, name: 'ChatGPT', category: 'LLM', description: 'AI แชทบอทอเนกประสงค์', url: 'https://chat.openai.com', icon: 'chat' },
                { id: 2, name: 'Midjourney', category: 'Image Generation', description: 'สร้างภาพสุดล้ำจากข้อความ', url: 'https://midjourney.com', icon: 'image' },
            ];
            setTools(mock);
            localStorage.setItem('jarnnong_ai_tools', JSON.stringify(mock));
        }
    }, []);

    const saveToLocalStorage = (newTools) => {
        setTools(newTools);
        localStorage.setItem('jarnnong_ai_tools', JSON.stringify(newTools));
    };

    const handleOpenModal = (tool = null) => {
        if (tool) {
            setEditingTool(tool);
            setFormData({ ...tool });
        } else {
            setEditingTool(null);
            setFormData({ name: '', category: '', description: '', url: '', icon: 'auto_awesome' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTool) {
            const updated = tools.map(t => t.id === editingTool.id ? { ...formData, id: t.id } : t);
            saveToLocalStorage(updated);
        } else {
            const newTool = { ...formData, id: Date.now() };
            saveToLocalStorage([...tools, newTool]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('ยืนยันการลบเครื่องมือนี้?')) {
            const filtered = tools.filter(t => t.id !== id);
            saveToLocalStorage(filtered);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-white">จัดการเครื่องมือ AI</h1>
                    <p className="text-sm text-slate-400">เพิ่ม แก้ไข หรือลบรายการเครื่องมือ AI ในระบบสรุป</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#0df2f2] text-[#050d0d] px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(13,242,242,0.4)] transition-all"
                >
                    <span className="material-symbols-outlined text-xl">add</span>
                    เพิ่มเครื่องมือใหม่
                </button>
            </div>

            <div className="bg-[#0a1a1a]/80 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-[#0df2f2] font-bold">
                            <th className="px-6 py-4">ชื่อเครื่องมือ</th>
                            <th className="px-6 py-4">หมวดหมู่</th>
                            <th className="px-6 py-4">คำอธิบาย</th>
                            <th className="px-6 py-4">ลิงก์</th>
                            <th className="px-6 py-4 text-right">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {tools.map((tool) => (
                            <tr key={tool.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#0df2f2]/10 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-sm text-[#0df2f2]">{tool.icon}</span>
                                        </div>
                                        <span className="font-bold text-white text-sm">{tool.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-300 border border-white/10 uppercase font-medium">
                                        {tool.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-400 max-w-xs truncate">{tool.description}</td>
                                <td className="px-6 py-4">
                                    <a href={tool.url} target="_blank" rel="noreferrer" className="text-[#0df2f2] hover:underline text-xs flex items-center gap-1">
                                        เยี่ยมชม <span className="material-symbols-outlined text-xs">open_in_new</span>
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => handleOpenModal(tool)} className="p-2 text-slate-400 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-xl">edit</span>
                                    </button>
                                    <button onClick={() => handleDelete(tool.id)} className="p-2 text-red-400/60 hover:text-red-400 transition-colors">
                                        <span className="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Tool Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0a1a1a] border border-[#0df2f2]/20 w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-black text-white mb-6">
                            {editingTool ? 'แก้ไขเครื่องมือ AI' : 'เพิ่มเครื่องมือ AI ใหม่'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ชื่อเครื่องมือ</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
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
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ลิงก์เว็บไซต์</label>
                                <input
                                    type="url"
                                    required
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">คำอธิบาย</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
