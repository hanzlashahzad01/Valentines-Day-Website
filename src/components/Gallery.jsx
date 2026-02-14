import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Gallery.css';

const images = [
    { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7", title: "Eternal" },
    { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2", title: "Passion" },
    { src: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954", title: "Romance" },
    { src: "https://images.unsplash.com/photo-1549417229-aa67d3263c09", title: "Devotion" },
    { src: "https://images.unsplash.com/photo-1511285560982-1351c4f63155", title: "Forever" },
    { src: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f", title: "Moments" },
];

const Gallery = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
    });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

    return (
        <section ref={sectionRef} className="gallery-section" id="gallery">
            <div className="gallery-sticky">
                <motion.div style={{ x }} className="gallery-track">
                    <div className="gallery-intro">
                        <h2 className="gallery-title">Love<br />Gallery</h2>
                        <p className="gallery-desc">
                            A showcase of beautiful moments. Love is not just a feeling, it's an art.
                        </p>
                    </div>

                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            className="gallery-card"
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                src={`${img.src}?auto=format&fit=crop&w=800&q=80`}
                                alt={img.title}
                                className="gallery-img"
                            />
                            <div className="gallery-overlay">
                                <h3 className="gallery-item-title">{img.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Gallery;
