import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart, Sparkles } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        valentine: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => setSubmitted(true), 1000);
    };

    return (
        <section id="contact" className="contact-section">
            {/* Decorative Hearts */}
            <div className="contact-heart-1"><Heart size={150} fill="#B71C1C" /></div>
            <div className="contact-heart-2"><Heart size={120} fill="#FF80AB" /></div>

            <div className="contact-container">
                <motion.div
                    className="contact-heading"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                >
                    <Sparkles className="mx-auto text-gold mb-4" size={48} color="#FFD700" />
                    <h2 className="contact-title">Begin Your Story</h2>
                    <div className="contact-divider" />
                </motion.div>

                <motion.div
                    className="contact-card"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {submitted ? (
                        <motion.div className="text-center py-20" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                            <Heart size={80} className="text-secondary mx-auto mb-6 animate-pulse" fill="#E91E63" />
                            <h3 className="text-3xl font-serif text-gold mb-4">Message Sent!</h3>
                            <p className="text-xl text-gray-300">Love is on its way to you.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Your Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Your Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Special Request</label>
                                <textarea
                                    rows="4"
                                    className="form-control"
                                    placeholder="Tell us how we can make it perfect..."
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-submit"
                            >
                                Send Request <Send size={20} />
                            </motion.button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
