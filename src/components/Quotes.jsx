import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower, Quote } from 'lucide-react';
import './Quotes.css';

const quotes = [
    { text: "Love allows us to walk in the sweet music of our particular heart.", author: "Jack Gilbert" },
    { text: "There is always some madness in love. But there is also always some reason in madness.", author: "Friedrich Nietzsche" },
    { text: "Love isn't something you find. Love is something that finds you.", author: "Loretta Young" },
    { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
    { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" }
];

const Quotes = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % quotes.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="quotes" className="quotes-section">
            <div className="quotes-overlay"></div>

            <motion.div
                className="quotes-container"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="quotes-icon-bg"
                >
                    <Flower size={60} color="#FFD700" strokeWidth={1} />
                </motion.div>

                <h2 className="quotes-main-title">Whispers of Devotion</h2>
                <div className="quotes-divider"></div>

                <div className="quote-display-area">
                    <Quote className="quote-mark-left" size={40} />
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.8 }}
                            className="quote-content-wrapper"
                        >
                            <p className="quote-text-primary">{quotes[current].text}</p>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '50px' }}
                                className="quote-line"
                            />
                            <p className="quote-author-v2">{quotes[current].author}</p>
                        </motion.div>
                    </AnimatePresence>
                    <Quote className="quote-mark-right" size={40} />
                </div>

                <div className="quote-navigation-dots">
                    {quotes.map((_, i) => (
                        <button
                            key={i}
                            className={`quote-dot-v2 ${i === current ? 'active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to quote ${i + 1}`}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Quotes;
