import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { compressImage } from '../../utils/imageHelper';

function ManageNews() {
    const [news, setNews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        content: '',
        category: 'AI Updates',
        image: ''
    });

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
                }
            ];
            setNews(mock);
            localStorage.setItem('jarnnong_news', JSON.stringify(mock));
        }
    }, []);

    const saveToLocalStorage = (data) => {
        localStorage.setItem('jarnnong_news', JSON.stringify(data));
        setNews(data);
        setIsModalOpen(false);
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoadingImage(true);
        try {
            const compressed = await compressImage(file, 1200, 0.6); // Compress to 60% quality
            setFormData({ ...formData, image: compressed });
        } catch (error) {
            console.error('Image upload failed:', error);
            alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
        } finally {
            setLoadingImage(false);
        }
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
    };

    const handleDelete = (id) => {
        if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบข่าวนี้?')) {
            const filtered = news.filter(n => n.id !== id);
            saveToLocalStorage(filtered);
        }
    };

    const quillModules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'clean']
            ],
            handlers: {
                image: () => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();

                    input.onchange = async () => {
                        const file = input.files[0];
                        if (file) {
                            try {
                                const compressed = await compressImage(file, 800, 0.6); // Slightly smaller for inline images
                                const quill = document.querySelector('.ql-editor').__quill;
                                const range = quill.getSelection();
                                quill.insertEmbed(range.index, 'image', compressed);
                            } catch (error) {
                                console.error('Inline image upload failed:', error);
                            }
                        }
                    };
                }
            }
        },
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2 font-display">Manage AI News</h1>
                    <p className="text-slate-400">สร้างและแก้ไขข่าวสารวงการ AI</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#0df2f2] text-[#050d0d] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                >
                    <span className="material-symbols-outlined">add</span>
                    เพิ่มข่าวใหม่
                </button>
            </div>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-[#0df2f2] font-bold">
                                <th className="px-6 py-4">รูปภาพ</th>
                                <th className="px-6 py-4">หัวข้อข่าว</th>
                                <th className="px-6 py-4">หมวดหมู่</th>
                                <th className="px-6 py-4">วันที่</th>
                                <th className="px-6 py-4 text-right">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {news.map((item) => (
                                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-10 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-white text-sm line-clamp-1">{item.title}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-md bg-[#0df2f2]/10 text-[10px] text-[#0df2f2] border border-[#0df2f2]/20 uppercase font-bold">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-300 font-mono italic">{item.date}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => handleOpenModal(item)} className="p-2 text-slate-400 hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-xl">edit</span>
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-[#050d0d]/95 backdrop-blur-sm overflow-y-auto pt-20 pb-20">
                    <div className="bg-[#0a1a1a] border border-white/10 w-full max-w-4xl rounded-3xl p-6 md:p-10 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-white font-display">
                                {editingNews ? 'แก้ไขข่าวสาร' : 'เพิ่มข่าวใหม่'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                                <span className="material-symbols-outlined text-3xl">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">หัวข้อข่าว</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="ใส่หัวข้อข่าว..."
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
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">อัปโหลดรูปภาพ (บีบอัดอัตโนมัติ)</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-white/10 rounded-2xl hover:border-[#0df2f2]/50 transition-colors cursor-pointer group">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        <span className="material-symbols-outlined text-3xl text-slate-500 group-hover:text-[#0df2f2]">upload_file</span>
                                        <span className="text-slate-400 group-hover:text-white">{loadingImage ? 'กำลังประมวลผล...' : 'คลิกเพื่อเลือกไฟล์ภาพ'}</span>
                                    </label>
                                    {formData.image && (
                                        <div className="w-32 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="quill-container">
                                <label className="block text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">เนื้อหาข่าว (Rich Text)</label>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={(val) => setFormData({ ...formData, content: val })}
                                    modules={quillModules}
                                    className="bg-white/5 rounded-xl text-white border-white/10"
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#0df2f2] text-[#050d0d] font-black py-4 rounded-xl hover:scale-[1.02] transition-all"
                                >
                                    บันทึกข้อมูลข่าวสาร
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 bg-white/5 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-all border border-white/10"
                                >
                                    ยกเลิก
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .ql-toolbar.ql-snow { border-color: rgba(255,255,255,0.1) !important; background: rgba(255,255,255,0.05); border-radius: 12px 12px 0 0; }
                .ql-container.ql-snow { border-color: rgba(255,255,255,0.1) !important; border-radius: 0 0 12px 12px; height: 300px; font-size: 16px; }
                .ql-editor { color: #f1f5f9; }
                .ql-snow .ql-stroke { stroke: #94a3b8; }
                .ql-snow .ql-fill { fill: #94a3b8; }
                .ql-snow.ql-toolbar button:hover .ql-stroke { stroke: #0df2f2; }
                .ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: #0df2f2; }
            `}</style>
        </div>
    );
}

export default ManageNews;
