import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars } from 'lucide-react';
import './LoveCalculator.css';

const LoveCalculator = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [result, setResult] = useState(null);
    const [calculating, setCalculating] = useState(false);

    const calculateLove = (e) => {
        e.preventDefault();
        if (!name1 || !name2) return;

        setCalculating(true);
        // Simulate calculation
        setTimeout(() => {
            // Simple hash function for pseudo-random but consistent results
            const combined = (name1 + name2).toLowerCase().replace(/\s/g, '');
            let hash = 0;
            for (let i = 0; i < combined.length; i++) {
                hash = combined.charCodeAt(i) + ((hash << 5) - hash);
            }
            const score = Math.abs(hash % 41) + 60; // Score between 60 and 100

            let message = "";
            if (score > 95) message = "Twin Flames! 🔥♾️";
            else if (score > 85) message = "A Perfect Match! 💖";
            else if (score > 75) message = "Looking Good! 😍";
            else message = "Give it a try! 😉";

            setResult({ score, message });
            setCalculating(false);
        }, 1500);
    };

    return (
        <section id="love-calculator" className="calculator-section">
            <motion.div
                className="calculator-card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-8">
                    <Heart className="mx-auto mb-4 text-red-500 animate-pulse" size={48} fill="#D50000" />
                    <h2 className="calc-title">Love Calculator</h2>
                    <p className="calc-subtitle">Are you meant to be?</p>
                </div>

                <form onSubmit={calculateLove} className="calc-form">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="calc-input"
                            value={name1}
                            onChange={(e) => setName1(e.target.value)}
                            required
                        />
                        <div className="heart-icon">❤️</div>
                        <input
                            type="text"
                            placeholder="Crush's Name"
                            className="calc-input"
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-luxury w-full mt-4" disabled={calculating}>
                        {calculating ? 'Consulting Cupid...' : 'Calculate Compatibility'}
                    </button>
                </form>

                <AnimatePresence>
                    {result && !calculating && (
                        <motion.div
                            className="result-box"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <div className="score-circle">
                                {result.score}%
                            </div>
                            <h3 className="result-msg">{result.message}</h3>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default LoveCalculator;
