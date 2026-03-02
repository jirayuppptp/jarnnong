import { useState, useEffect, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { compressImage } from '../../utils/imageHelper';

export default function ManageCourses() {
    const quillRef = useRef(null);
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        duration: '',
        price: '',
        link: '',
        image: ''
    });

    useEffect(() => {
        const savedCourses = localStorage.getItem('jarnnong_courses');
        if (savedCourses) {
            setCourses(JSON.parse(savedCourses));
        } else {
            // Initial mock data for courses
            const mock = [
                {
                    id: 1,
                    title: 'AI for Business Transformation',
                    category: 'Business',
                    description: 'เรียนรู้วิธีการนำ AI ไปใช้ในธุรกิจเพื่อลดต้นทุนและเพิ่มกำไร',
                    duration: '10 ชั่วโมง',
                    price: '4,900',
                    link: '#',
                    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800'
                }
            ];
            setCourses(mock);
            localStorage.setItem('jarnnong_courses', JSON.stringify(mock));
        }
    }, []);

    const saveToLocalStorage = (newCourses) => {
        setCourses(newCourses);
        localStorage.setItem('jarnnong_courses', JSON.stringify(newCourses));
    };

    const handleOpenModal = (course = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData({ ...course });
        } else {
            setEditingCourse(null);
            setFormData({
                title: '',
                category: '',
                description: '',
                duration: '',
                price: '',
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
            const compressed = await compressImage(file, 800, 0.7); // High quality for course covers
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
        if (editingCourse) {
            const updated = courses.map(c => c.id === editingCourse.id ? { ...formData, id: c.id } : c);
            saveToLocalStorage(updated);
        } else {
            const newCourse = { ...formData, id: Date.now() };
            saveToLocalStorage([...courses, newCourse]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('ยืนยันการลบหลักสูตรนี้?')) {
            const filtered = courses.filter(c => c.id !== id);
            saveToLocalStorage(filtered);
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
                    <h1 className="text-3xl font-black text-white font-display uppercase tracking-tight">จัดการหลักสูตรอบรม</h1>
                    <p className="text-sm text-slate-400">เพิ่ม แก้ไข หรือลบรายการหลักสูตรการสอนในระบบ</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-[#0df2f2] text-[#050d0d] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(13,242,242,0.4)] transition-all"
                >
                    <span className="material-symbols-outlined text-xl">add</span>
                    เพิ่มหลักสูตรใหม่
                </button>
            </div>

            <div className="bg-[#0a1a1a]/80 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5 text-[10px] uppercase tracking-widest text-[#0df2f2] font-bold">
                                <th className="px-6 py-4">รูปปก</th>
                                <th className="px-6 py-4">ชื่อหลักสูตร / หมวดหมู่</th>
                                <th className="px-6 py-4 text-center">ระยะเวลา</th>
                                <th className="px-6 py-4 text-center">ราคา</th>
                                <th className="px-6 py-4 text-right">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {courses.map((course) => (
                                <tr key={course.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="w-20 h-12 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                                            <img src={course.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white text-sm">{course.title}</span>
                                            <span className="text-[10px] text-slate-500 uppercase mt-1 tracking-wider">{course.category}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-xs text-slate-400 font-mono italic">{course.duration}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-bold text-[#0df2f2]">{course.price} ฿</span>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
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
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ลิงก์สมัครเรียน (URL)</label>
                                    <input
                                        type="url"
                                        required
                                        placeholder="https://..."
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
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
                                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">ราคา (บาท)</label>
                                    <input
                                        type="text"
                                        placeholder="เช่น 3,500"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0df2f2]/50 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">อัปโหลดรูปภาพหน้าปก</label>
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

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-[#0df2f2] text-[#050d0d] font-black py-4 rounded-xl hover:scale-[1.02] transition-all"
                                >
                                    บันทึกหลักสูตร
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
