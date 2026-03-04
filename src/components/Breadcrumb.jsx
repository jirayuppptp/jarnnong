import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const routeNames = {
    'courses': 'คอร์สเรียน',
    'course-detail': 'คอร์สเรียน',
    'ai-tools': 'AI Tools',
    'ai-news': 'ข่าวสาร AI',
    'ai-terms': 'พจนานุกรม AI',
    'about': 'เกี่ยวกับเรา',
};

export default function Breadcrumb({ customEndNode }) {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Don't show breadcrumbs on home or admin pages
    if (pathnames.length === 0 || pathnames[0] === 'admin') {
        return null;
    }

    return (
        <div className="bg-[#05070A] py-4 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex text-sm text-slate-400" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="inline-flex items-center hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-[18px] mr-1">home</span>
                                หน้าแรก
                            </Link>
                        </li>
                        {pathnames.map((value, index) => {
                            const last = index === pathnames.length - 1;

                            const pathsForLink = [...pathnames];
                            if (pathsForLink[index] === 'course-detail') {
                                pathsForLink[index] = 'courses';
                            }
                            const to = `/${pathsForLink.slice(0, index + 1).join('/')}`;

                            const isIdParam = last && customEndNode && index > 0;

                            const label = isIdParam ? customEndNode : (routeNames[value] || decodeURIComponent(value));

                            return (
                                <li key={to}>
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-[16px] mx-1">chevron_right</span>
                                        {last ? (
                                            <span className="text-white font-medium" aria-current="page">
                                                {label}
                                            </span>
                                        ) : (
                                            <Link to={to} className="hover:text-primary transition-colors">
                                                {label}
                                            </Link>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </div>
    );
}
