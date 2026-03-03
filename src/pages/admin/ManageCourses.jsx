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

export default function ManageCourses() {
    const quillRef = useRef(null);
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [isMigrating, setIsMigrating] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        description: '',
        price: '',
        image: '',
        category: '',
        mentorName: '',
        duration: '',
        level: 'Beginner'
    });

    useEffect(() => {
        const q = query(collection(db, 'courses'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sort in memory to avoid missing field exclusion
            const sortedData = data.sort((a, b) => {
                const dateA = a.createdAt || '';
                const dateB = b.createdAt || '';
                return dateB.localeCompare(dateA);
            });
            setCourses(sortedData);
        }, (error) => {
            console.error("Error fetching courses:", error);
        });

        return () => unsubscribe();
    }, []);

    const handleMigrate = async () => {
        const localData = JSON.parse(localStorage.getItem('jarnnong_courses') || '[]');
        if (localData.length === 0) return alert('ไม่พบข้อมูลเก่าในเครื่อง');

        if (!window.confirm(`ต้องการย้ายข้อมูล ${localData.length} รายการ ขึ้น Cloud หรือไม่?`)) return;

        setIsMigrating(true);
        try {
            const batch = writeBatch(db);
            localData.forEach(course => {
                const newDocRef = doc(collection(db, 'courses'));
                const { id, ...data } = course;
                batch.set(newDocRef, {
                    ...data,
                    shortDescription: data.shortDescription || '',
                    mentorName: data.mentorName || '',
                    level: data.level || 'Beginner',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            });
            await batch.commit();
            alert('ย้ายข้อมูลสำเร็จ!');
            localStorage.removeItem('jarnnong_courses');
        } catch (error) {
            console.error('Migration failed:', error);
            alert('เกิดข้อผิดพลาดในการย้ายข้อมูล');
        } finally {
            setIsMigrating(false);
        }
    };

    const handleOpenModal = (course = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData({
                title: course.title || '',
                shortDescription: course.shortDescription || '',
                description: course.description || '',
                price: course.price || '',
                image: course.image || '',
                category: course.category || '',
                mentorName: course.mentorName || '',
                duration: course.duration || '',
                level: course.level || 'Beginner'
            });
        } else {
            setEditingCourse(null);
            setFormData({
                title: '',
                shortDescription: '',
                description: '',
                price: '',
                image: '',
                category: '',
                mentorName: '',
                duration: '',
                level: 'Beginner'
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
        setLoading(true);
        try {
            if (editingCourse) {
                const courseDoc = doc(db, 'courses', editingCourse.id);
                await updateDoc(courseDoc, {
                    ...formData,
                    updatedAt: new Date().toISOString()
                });
                alert("อัปเดตหลักสูตรเรียบร้อยแล้ว");
            } else {
                await addDoc(collection(db, 'courses'), {
                    ...formData,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                alert("เพิ่มหลักสูตรใหม่เรียบร้อยแล้ว");
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Save failed:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('ยืนยันการลบหลักสูตรนี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
            try {
                await deleteDoc(doc(db, 'courses', id));
                alert("ลบหลักสูตรเรียบร้อยแล้ว");
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
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'clean']
            ],
            handlers: {
                image: imageHandler
            }
        },
    }), [imageHandler]);

    return (
        <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white font-display uppercase tracking-tight">จัดการหลักสูตรอบรม</h1>
                    <p className="text-sm text-slate-400">เพิ่ม แก้ไข หรือลบรายการหลักสูตรการสอนในระบบ (Firestore)</p>
                </div>
                <div className="flex gap-3">
                    {localStorage.getItem('jarnnong_courses') && (
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
                        เพิ่มหลักสูตรใหม่
                    </button>
                </div>
            </div>

            <div className="bg-[#0a1a1a]/80 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-[#0df2f2] font-bold">
                                <th className="px-6 py-4">รูปปก</th>
                                <th className="px-6 py-4">ชื่อหลักสูตร / หมวดหมู่</th>
                                <th className="px-6 py-4 text-center">ระดับ</th>
                                <th className="px-6 py-4 text-center">ราคา</th>
                                <th className="px-6 py-4 text-right">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {courses.map((course) => (
                                <tr key={course.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="w-20 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                                            <img src={course.image || 'https://via.placeholder.com/150'} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white text-sm">{course.title}</span>
                                            <span className="text-[10px] text-slate-500 uppercase mt-1 tracking-wider">{course.category}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${course.level === 'Beginner' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                            course.level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                                'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}>
                                            {course.level || 'Beginner'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-bold text-[#0df2f2]">{Number(course.price).toLocaleString()} ฿</span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => handleOpenModal(course)} className="p-2 text-slate-400 hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-xl">edit</span>
                                        </button>
                                        <button onClick={() => handleDelete(course.id)} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {courses.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500 italic">ไม่พบข้อมูลหลักสูตร</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Course Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto pt-10 pb-10">
                    <div className="bg-[#0a1a1a] border border-[#0df2f2]/20 w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-white font-display">
                                {editingCourse ? 'แก้ไขหลักสูตรอบรม' : 'เพิ่มหลักสูตรใหม่'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                                <span className="material-symbols-outlined text-3xl">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ชื่อหลักสูตร</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="เช่น Mastery of Generative AI"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">คำอธิบายสั้นๆ (Short Description - ประมาณ 150 ตัวอักษร)</label>
                                <textarea
                                    required
                                    rows="2"
                                    maxLength="180"
                                    value={formData.shortDescription}
                                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                    placeholder="สรุปเนื้อหาสั้นๆ เพื่อแสดงในหน้าแรก..."
                                ></textarea>
                                <p className="text-[10px] text-right text-slate-500 mt-1">{formData.shortDescription.length}/180</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">หมวดหมู่</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="เช่น AI Tutorials, Business"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ราคา (บาท)</label>
                                    <input
                                        type="number"
                                        required
                                        placeholder="0"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ระยะเวลา</label>
                                    <input
                                        type="text"
                                        placeholder="เช่น 12 ชั่วโมง"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ระดับความยาก</label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                        className="w-full bg-[#050d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ชื่อผู้สอน (Mentor)</label>
                                    <input
                                        type="text"
                                        placeholder="ชื่ออาจารย์ผู้สอน"
                                        value={formData.mentorName}
                                        onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">อัปโหลดรูปภาพหน้าปก</label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-white/10 rounded-xl hover:border-[#0df2f2]/50 transition-colors cursor-pointer group">
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            <span className="material-symbols-outlined text-xl text-slate-500 group-hover:text-[#0df2f2]">cloud_upload</span>
                                            <span className="text-slate-400 group-hover:text-white text-xs">{loadingImage ? '...' : 'เลือกรูป'}</span>
                                        </label>
                                        {formData.image && (
                                            <div className="w-16 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="quill-container">
                                <label className="block text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">รายละเอียดหลักสูตร (Rich Text)</label>
                                <ReactQuill
                                    ref={quillRef}
                                    theme="snow"
                                    value={formData.description}
                                    onChange={(val) => setFormData({ ...formData, description: val })}
                                    modules={quillModules}
                                    className="bg-white/5 rounded-xl text-white border-white/10"
                                />
                            </div>

                            <style>{`
                                .ql-toolbar.ql-snow { border-color: rgba(255,255,255,0.1) !important; background: rgba(255,255,255,0.05); border-radius: 12px 12px 0 0; }
                                .ql-container.ql-snow { border-color: rgba(255,255,255,0.1) !important; border-radius: 0 0 12px 12px; height: 200px; font-size: 14px; }
                                .ql-editor { color: #f1f5f9; }
                                .ql-snow .ql-stroke { stroke: #94a3b8; }
                                .ql-snow .ql-fill { fill: #94a3b8; }
                                .ql-snow.ql-toolbar button:hover .ql-stroke { stroke: #0df2f2; }
                                .ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: #0df2f2; }
                            `}</style>

                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-[#0df2f2] text-[#050d0d] font-black py-4 rounded-xl hover:shadow-[0_0_20px_rgba(13,242,242,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div> : <span className="material-symbols-outlined">save</span>}
                                    บันทึกข้อมูล
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 bg-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/20 transition-all"
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
