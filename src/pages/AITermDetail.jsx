import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';

export default function AITermDetail() {
    const { id } = useParams();
    const [term, setTerm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchTerm = async () => {
            try {
                const docRef = doc(db, 'dictionary', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setTerm({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('ไม่พบข้อมูลคำศัพท์');
                }
            } catch (err) {
                console.error("Error fetching term:", err);
                setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
            } finally {
                setLoading(false);
            }
        };

        fetchTerm();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#05070A] pt-32 pb-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !term) {
        return (
            <div className="min-h-screen bg-[#05070A] pt-32 pb-20 flex flex-col items-center">
                <span className="material-symbols-outlined text-6xl text-slate-700 mb-4 italic">sentiment_dissatisfied</span>
                <h2 className="text-2xl text-white mb-4">{error}</h2>
                <Link to="/ai-terms" className="text-primary hover:underline">กลับไปหน้าพจนานุกรม</Link>
            </div>
        );
    }

    // Strip HTML tags for meta description
    const plainTextDescription = term.definition.replace(/<[^>]+>/g, '').substring(0, 160) + '...';

    return (
        <>
            <Helmet>
                <title>{term.term} คืออะไร? | พจนานุกรมศัพท์ AI โดย JarnNong</title>
                <meta name="description" content={plainTextDescription} />
                <meta property="og:title" content={`${term.term} - พจนานุกรมศัพท์ AI`} />
                <meta property="og:description" content={plainTextDescription} />
            </Helmet>

            <Breadcrumb customEndNode={term.term} />

            <div className="min-h-screen bg-[#05070A] pb-32 pt-16">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-card p-8 md:p-12 mb-8 animate-fade-up">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                            <h1 className="text-4xl md:text-5xl font-black text-white">{term.term}</h1>
                            {term.category && (
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 w-fit">
                                    {term.category}
                                </span>
                            )}
                        </div>

                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8"></div>

                        <div
                            className="rich-text-content text-slate-300 text-lg leading-relaxed ql-editor !p-0 whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: term.definition }}
                        />

                        <style>{`
                            .rich-text-content p { margin-bottom: 1.5rem; }
                            .rich-text-content ul { list-style-type: disc; padding-left: 2rem; margin-bottom: 1.5rem; }
                            .rich-text-content ol { list-style-type: decimal; padding-left: 2rem; margin-bottom: 1.5rem; }
                            .rich-text-content li { margin-bottom: 0.5rem; }
                            .rich-text-content strong { color: white; font-weight: bold; }
                            .rich-text-content h1, .rich-text-content h2, .rich-text-content h3 { color: white; font-weight: bold; margin-top: 2rem; margin-bottom: 1rem; }
                        `}</style>
                    </div>

                    <div className="flex justify-between items-center animate-fade-up animate-delay-200">
                        <Link to="/ai-terms" className="inline-flex items-center text-slate-400 hover:text-white transition-colors group">
                            <span className="material-symbols-outlined mr-2 group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            กลับไปคำศัพท์ทั้งหมด
                        </Link>
                    </div>
                </article>
            </div>
        </>
    );
}
