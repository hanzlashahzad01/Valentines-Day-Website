import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Sparkles, Star } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">

                {/* Logo */}
                <motion.a
                    href="#"
                    className="nav-logo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="logo-icon-wrapper">
                        <Sparkles size={24} className="sparkle-icon" />
                        <Heart size={20} fill="#D50000" stroke="none" className="heart-mini" />
                    </div>
                    Velour
                </motion.a>

                {/* Desktop Links */}
                <div className="nav-links">
                    {['Home', 'Quotes', 'Gallery', 'Contact'].map((item, index) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="nav-link"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            {item}
                        </motion.a>
                    ))}
                    <motion.button
                        className="nav-btn-luxury"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 215, 0, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Share Love ❤️
                    </motion.button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="mobile-menu"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            <div className="mobile-menu-content">
                                {['Home', 'Quotes', 'Gallery', 'Contact'].map((item) => (
                                    <motion.a
                                        key={item}
                                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                                        className="mobile-link"
                                        onClick={() => setIsOpen(false)}
                                        whileHover={{ x: 10, color: '#FFD700' }}
                                    >
                                        <Star size={18} className="mr-4 opacity-50" />
                                        {item}
                                    </motion.a>
                                ))}
                                <button className="nav-btn-luxury w-full mt-8">
                                    Spread The Love
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
