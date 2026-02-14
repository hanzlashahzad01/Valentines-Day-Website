import React from 'react';
import { Heart, Instagram, Facebook, Twitter, Sparkles } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="footer">
            <div className="container footer-content">

                <div className="footer-brand">Velour</div>
                <p className="max-w-md mx-auto text-lg italic text-[#FFCDD2] opacity-80">
                    "Love is the only gold."
                </p>

                <div className="footer-links">
                    <a href="#" className="footer-link"><Instagram size={32} /></a>
                    <a href="#" className="footer-link"><Facebook size={32} /></a>
                    <a href="#" className="footer-link"><Twitter size={32} /></a>
                </div>

                <div className="footer-copyright flex flex-col items-center gap-4">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent max-w-xs mb-4"></div>
                    <p>&copy; {new Date().getFullYear()} Velour. Crafted with Obsession.</p>
                    <div className="flex items-center gap-2 text-gold">
                        <Sparkles size={14} className="text-yellow-500" />
                        <span className="text-yellow-500 font-bold">EXQUISITE ROMANCE</span>
                        <Sparkles size={14} className="text-yellow-500" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
