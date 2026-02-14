import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Gift, Sparkles, Calendar } from 'lucide-react';
import './About.css';

const features = [
    {
        icon: <Gift size={48} className="text-gold" />,
        title: "Luxury Gifts",
        desc: "Exquisite jewelry, fine chocolates, and premium floral arrangements."
    },
    {
        icon: <Sparkles size={48} className="text-gold" />,
        title: "Unforgettable Moments",
        desc: "Create memories that shimmer like gold and last a lifetime."
    },
    {
        icon: <Calendar size={48} className="text-gold" />,
        title: "VIP Experiences",
        desc: "Exclusive access to romantic getaways and private dining."
    }
];

const About = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section id="collection" className="collection-section" ref={ref}>
            <div className="collection-bg" />

            <div className="collection-content">
                <motion.div style={{ y }} className="collection-header">
                    <span className="collection-subtitle">Discover</span>
                    <h2 className="collection-title">The Collection</h2>
                    <div className="collection-divider" />
                </motion.div>

                <div className="collection-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="collection-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-50px" }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="card-icon">
                                {feature.icon}
                            </div>
                            <h3 className="card-title">{feature.title}</h3>
                            <p className="card-desc">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
