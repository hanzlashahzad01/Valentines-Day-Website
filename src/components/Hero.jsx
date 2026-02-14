import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, ChevronDown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Hero.css';

const Hero = () => {
    // Rotating Text Logic
    const texts = ["Happy Valentine's", "Cherish Together", "Love is Forever", "You're My Favorite"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleExplosion = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#D50000', '#FFD700', '#FFF'] }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#D50000', '#FFD700', '#FFF'] }));
        }, 250);
    };

    const handleScrollDown = () => {
        const nextSection = document.getElementById('quotes');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // New: Generate Background Floating Hearts Particles
    const heartParticles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.3 + 0.1
    })), []);

    return (
        <section className="hero-section" id="home">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="hero-video-bg"
                poster="https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_1280.jpg"
            >
                <source src="https://cdn.pixabay.com/video/2020/01/05/30932-383794354_large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="hero-overlay-gradient"></div>

            {/* Moving Hearts Animation Layer */}
            <div className="heart-particles-container">
                {heartParticles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="floating-heart"
                        initial={{ y: '110vh', x: `${particle.left}vw`, opacity: 0 }}
                        animate={{
                            y: '-10vh',
                            opacity: [0, particle.opacity, particle.opacity, 0],
                            x: [`${particle.left}vw`, `${particle.left + (Math.random() * 10 - 5)}vw`]
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "linear"
                        }}
                        style={{ fontSize: particle.size, color: '#D50000' }}
                    >
                        <Heart fill="currentColor" size={particle.size} stroke="none" />
                    </motion.div>
                ))}
            </div>

            <div className="hero-content">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-8"
                >
                    <Heart size={100} color="#D50000" fill="#B71C1C" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 20px #FF1744)' }} className="animate-pulse" />
                </motion.div>

                <div className="title-wrapper">
                    <AnimatePresence mode='wait'>
                        <motion.h1
                            key={index}
                            className="hero-title-main"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {texts[index]}
                        </motion.h1>
                    </AnimatePresence>
                </div>

                <motion.div
                    className="hero-title-sub"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <Sparkles className="inline-block mr-2 text-yellow-400" size={16} />
                    Create Your Perfect Moment
                    <Sparkles className="inline-block ml-2 text-yellow-400" size={16} />
                </motion.div>

                <motion.div
                    className="hero-message-box"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                >
                    <p className="special-msg">
                        "Every love story is beautiful, but ours is my favorite."
                    </p>
                </motion.div>

                <motion.div
                    className="hero-btns"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <button className="btn-luxury glue-effect" onClick={handleExplosion}>
                        <Heart className="mr-2" size={20} fill="currentColor" /> Send Love
                    </button>
                    <button className="btn-transparent" onClick={handleScrollDown}>
                        Discover More
                    </button>
                </motion.div>
            </div>

            <div className="scroll-indicator" onClick={handleScrollDown}>
                <ChevronDown className="animate-bounce text-white/50 hover:text-white transition-colors" size={40} />
            </div>
        </section>
    );
};

export default Hero;
