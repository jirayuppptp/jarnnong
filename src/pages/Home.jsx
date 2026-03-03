import Hero from '../components/Hero';
import CourseSection from '../components/CourseSection';
import { Helmet } from 'react-helmet-async';
import WhyUs from '../components/WhyUs'
import CTA from '../components/CTA'

export default function Home() {
    return (
        <>
            <Helmet>
                <title>JarnNong.com | ยกระดับทักษะของคุณด้วย AI</title>
                <meta name="description" content="เรียนรู้การประยุกต์ใช้ AI ในการทำงานและธุรกิจกับผู้เชี่ยวชาญ คอร์สเรียน AI ที่ดีที่สุดสำหรับทุกคน" />
                <meta property="og:title" content="JarnNong.com | ยกระดับทักษะของคุณด้วย AI" />
                <meta property="og:description" content="เรียนรู้การประยุกต์ใช้ AI ในการทำงานและธุรกิจกับผู้เชี่ยวชาญ คอร์สเรียน AI ที่ดีที่สุดสำหรับทุกคน" />
            </Helmet>

            <Hero />
            <CourseSection />
            <WhyUs />
            <CTA />
        </>
    )
}
