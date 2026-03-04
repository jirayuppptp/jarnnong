import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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

export default function ManageDictionary() {
    const quillRef = useRef(null);
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isMigrating, setIsMigrating] = useState(false);

    const [formData, setFormData] = useState({ term: '', category: '', definition: '' });

    // Auto-categorization logic based on keywords
    const autoCategorizeTerm = (term, definition) => {
        const text = `${term} ${definition}`.toLowerCase();

        const rules = [
            { category: 'Generative AI', keywords: ['generative', 'genai', 'llm', 'create', 'generate', 'text-to', 'chatgpt', 'midjourney', 'stable diffusion', 'gemini', 'claude', 'copilot', 'hallucination'] },
            { category: 'Prompt Engineering', keywords: ['prompt', 'few-shot', 'zero-shot', 'chain of thought', 'instruction tuning', 'system prompt'] },
            { category: 'Machine Learning', keywords: ['ml', 'machine learning', 'dataset', 'train', 'model', 'predict', 'regression', 'classification', 'supervised', 'unsupervised', 'algorithm', 'scikit'] },
            { category: 'Deep Learning', keywords: ['dl', 'deep learning', 'neural network', 'cnn', 'rnn', 'transformer', 'backpropagation', 'epoch', 'gradient'] },
            { category: 'Natural Language Processing', keywords: ['nlp', 'sentiment', 'translation', 'token', 'language model', 'text processing'] },
            { category: 'Computer Vision', keywords: ['vision', 'image recognition', 'object detection', 'pixel', 'opencv', 'yolo'] }
        ];

        for (const rule of rules) {
            if (rule.keywords.some(kw => text.includes(kw))) {
                return rule.category;
            }
        }
        return 'General AI';
    };

    useEffect(() => {
        const q = query(collection(db, 'dictionary'), orderBy('term', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const dictionaryData = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setItems(dictionaryData);
        });

        return () => unsubscribe();
    }, []);

    const handleMigrate = async () => {
        const localData = JSON.parse(localStorage.getItem('jarnnong_dict') || '[]');
        if (localData.length === 0) return alert('ไม่พบข้อมูลคำศัพท์เก่าในเครื่อง');

        if (!window.confirm(`ต้องการย้ายคำศัพท์ ${localData.length} รายการ ขึ้น Cloud หรือไม่?`)) return;

        setIsMigrating(true);
        try {
            const batch = writeBatch(db);
            localData.forEach(item => {
                const newDocRef = doc(collection(db, 'dictionary'));
                const { id, ...data } = item;
                batch.set(newDocRef, data);
            });
            await batch.commit();
            alert('ย้ายคำศัพท์สำเร็จ!');
            localStorage.removeItem('jarnnong_dict');
        } catch (error) {
            console.error('Migration failed:', error);
            alert('เกิดข้อผิดพลาดในการย้ายข้อมูล');
        } finally {
            setIsMigrating(false);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({ ...item });
        } else {
            setEditingItem(null);
            setFormData({ term: '', category: '', definition: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Auto-assign category right before saving
        const finalCategory = autoCategorizeTerm(formData.term, formData.definition);
        const dataToSave = { ...formData, category: finalCategory };

        try {
            if (editingItem) {
                const docRef = doc(db, 'dictionary', editingItem.id);
                const { id, ...data } = dataToSave;
                await updateDoc(docRef, data);
            } else {
                await addDoc(collection(db, 'dictionary'), dataToSave);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Save failed:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('ยืนยันการลบคำศัพท์นี้?')) {
            try {
                await deleteDoc(doc(db, 'dictionary', id));
            } catch (error) {
                console.error('Delete failed:', error);
                alert('เกิดข้อผิดพลาดในการลบข้อมูล');
            }
        }
    };

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                try {
                    const compressed = await compressImage(file, 800, 0.7);
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection();
                    quill.insertEmbed(range.index, 'image', compressed);
                    quill.setSelection(range.index + 1);
                } catch (error) {
                    console.error('Image upload failed:', error);
                    alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
                }
            }
        };
    }, []);

    const quillModules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'clean']
            ],
            handlers: {
                image: imageHandler
            }
        }
    }), [imageHandler]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-white font-display uppercase tracking-wider">Manage AI Glossary</h1>
                    <p className="text-sm text-slate-400">รวบรวมและแปลความหมายคำศัพท์เทคนิคล้ำสมัย (Firestore)</p>
                </div>
                <div className="flex gap-3">
                    {localStorage.getItem('jarnnong_dict') && (
                        <button
                            onClick={handleMigrate}
                            disabled={isMigrating}
                            className="bg-purple-600/20 text-purple-400 border border-purple-500/30 px-4 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-600/30 transition-all disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-xl">cloud_upload</span>
                            {isMigrating ? 'กำลังย้าย...' : 'ย้ายคำศัพท์ขึ้น Cloud'}
                        </button>
                    )}
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-[#0df2f2] text-[#050d0d] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(13,242,242,0.4)] hover:scale-105 transition-all"
                    >
                        <span className="material-symbols-outlined text-xl">add</span>
                        เพิ่มคำศัพท์ใหม่
                    </button>
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-[#0df2f2] font-bold">
                            <th className="px-6 py-4">คำศัพท์ (Term)</th>
                            <th className="px-6 py-4">หมวดหมู่</th>
                            <th className="px-6 py-4 text-center">จำนวนคลิก</th>
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
                                <td className="px-6 py-4 text-sm text-slate-400 text-center font-mono">
                                    {(item.views || 0).toLocaleString()} ครั้ง
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
                        {items.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-slate-500 italic">ไม่พบข้อมูลคำศัพท์</td>
                            </tr>
                        )}
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
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">หมวดหมู่ (Auto-categorized)</label>
                                <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-300 text-sm italic">
                                    {autoCategorizeTerm(formData.term, formData.definition) || 'พิมพ์คำศัพท์หรือความหมายเพื่อวิเคราะห์หมวดหมู่...'}
                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold not-italic">
                                        AUTO
                                    </span>
                                </div>
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
