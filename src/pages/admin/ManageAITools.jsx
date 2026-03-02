import { useState, useEffect, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { compressImage } from '../../utils/imageHelper';
import { db } from '../../firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    writeBatch
} from 'firebase/firestore';

export default function ManageAITools() {
    const quillRef = useRef(null);
    const [tools, setTools] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTool, setEditingTool] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [isMigrating, setIsMigrating] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        link: '',
        image: ''
    });

    useEffect(() => {
        const q = query(collection(db, 'aitools'), orderBy('title', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const toolsData = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setTools(toolsData);
        });

        return () => unsubscribe();
    }, []);

    const handleMigrate = async () => {
        const localData = JSON.parse(localStorage.getItem('jarnnong_aitools') || '[]');
        if (localData.length === 0) return alert('ไม่พบข้อมูลเก่าในเครื่อง');

        if (!window.confirm(`ต้องการย้ายข้อมูล ${localData.length} รายการ ขึ้น Cloud หรือไม่?`)) return;

        setIsMigrating(true);
        try {
            const batch = writeBatch(db);
            localData.forEach(tool => {
                const newDocRef = doc(collection(db, 'aitools'));
                const { id, ...data } = tool;
                batch.set(newDocRef, data);
            });
            await batch.commit();
            alert('ย้ายข้อมูลสำเร็จ!');
            localStorage.removeItem('jarnnong_aitools');
        } catch (error) {
            console.error('Migration failed:', error);
            alert('เกิดข้อผิดพลาดในการย้ายข้อมูล');
        } finally {
            setIsMigrating(false);
        }
    };

    const handleOpenModal = (tool = null) => {
        if (tool) {
            setEditingTool(tool);
            setFormData({ ...tool });
        } else {
            setEditingTool(null);
            setFormData({
                title: '',
                category: '',
                description: '',
                link: '',
                image: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoadingImage(true);
        try {
            const compressed = await compressImage(file, 800, 0.7);
            setFormData({ ...formData, image: compressed });
        } catch (error) {
            console.error('Image upload failed:', error);
            alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
        } finally {
            setLoadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTool) {
                const toolDoc = doc(db, 'aitools', editingTool.id);
                const { id, ...data } = formData;
                await updateDoc(toolDoc, data);
            } else {
                await addDoc(collection(db, 'aitools'), formData);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Save failed:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('ยืนยันการลบเครื่องมือนี้?')) {
            try {
                await deleteDoc(doc(db, 'aitools', id));
            } catch (error) {
                console.error('Delete failed:', error);
                alert('เกิดข้อผิดพลาดในการลบข้อมูล');
            }
        }
    };

    const quillModules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    }), []);

    return (
        <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white font-display uppercase tracking-tight">จัดการเครื่องมือ AI</h1>
                    <p className="text-sm text-slate-400">เพิ่ม แก้ไข หรือลบรายการเครื่องมือ AI ในระบบ (Firestore)</p>
                </div>
                <div className="flex gap-3">
                    {localStorage.getItem('jarnnong_aitools') && (
                        <button
                            onClick={handleMigrate}
                            disabled={isMigrating}
                            className="bg-purple-600/20 text-purple-400 border border-purple-500/30 px-4 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-600/30 transition-all disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-xl">cloud_upload</span>
                            {isMigrating ? 'กำลังย้าย...' : 'ย้ายข้อมูลเก่าขึ้น Cloud'}
                        </button>
                    )}
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-[#0df2f2] text-[#050d0d] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(13,242,242,0.4)] transition-all"
                    >
                        <span className="material-symbols-outlined text-xl">add</span>
                        เพิ่มเครื่องมือใหม่
                    </button>
                </div>
            </div>

            <div className="bg-[#0a1a1a]/80 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-[#0df2f2] font-bold">
                                <th className="px-6 py-4">รูปปก</th>
                                <th className="px-6 py-4">ชื่อเครื่องมือ / หมวดหมู่</th>
                                <th className="px-6 py-4 text-right">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {tools.map((tool) => (
                                <tr key={tool.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="w-20 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                                            <img src={tool.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white text-sm">{tool.title}</span>
                                            <span className="text-[10px] text-slate-500 uppercase mt-1 tracking-wider">{tool.category}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => handleOpenModal(tool)} className="p-2 text-slate-400 hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-xl">edit</span>
                                        </button>
                                        <button onClick={() => handleDelete(tool.id)} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {tools.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center text-slate-500 italic">ไม่พบข้อมูลเครื่องมือ AI</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Tool Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto pt-10 pb-10">
                    <div className="bg-[#0a1a1a] border border-[#0df2f2]/20 w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-white font-display">
                                {editingTool ? 'แก้ไขเครื่องมือ AI' : 'เพิ่มเครื่องมือใหม่'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                                <span className="material-symbols-outlined text-3xl">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ชื่อเครื่องมือ</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="เช่น ChatGPT, Midjourney"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">หมวดหมู่</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="เช่น Text, Image, Video"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ลิงก์ใช้งาน (URL)</label>
                                    <input
                                        type="url"
                                        required
                                        placeholder="https://..."
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">อัปโหลดรูปภาพ</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-white/10 rounded-2xl hover:border-[#0df2f2]/50 transition-colors cursor-pointer group">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        <span className="material-symbols-outlined text-3xl text-slate-500 group-hover:text-[#0df2f2]">cloud_upload</span>
                                        <span className="text-slate-400 group-hover:text-white">{loadingImage ? 'กำลังประมวลผล...' : 'เลือกรูปภาพ'}</span>
                                    </label>
                                    {formData.image && (
                                        <div className="w-32 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="quill-container">
                                <label className="block text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">คำอธิบาย (Rich Text)</label>
                                <ReactQuill
                                    ref={quillRef}
                                    theme="snow"
                                    value={formData.description}
                                    onChange={(val) => setFormData({ ...formData, description: val })}
                                    modules={quillModules}
                                    className="bg-white/5 rounded-xl text-white border-white/10"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#0df2f2] text-[#050d0d] font-black py-4 rounded-xl hover:scale-[1.02] transition-all"
                                >
                                    บันทึกเครื่องมือ
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
        </div>
    );
}
