import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play, Volume2, VolumeX, Loader2, Sparkles } from 'lucide-react';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // We use Web Audio API to synthesize romantic music directly in the browser
    // This removes all external URL dependency & "Load Failed" errors
    const audioContextRef = useRef(null);
    const nextNoteTimeRef = useRef(0);
    const timerIdRef = useRef(null);

    // Romantic Melody Data (C Major 7 / F Major 7 feel)
    const melody = [
        { note: 261.63, duration: 1 }, // C4
        { note: 329.63, duration: 1 }, // E4
        { note: 392.00, duration: 1 }, // G4
        { note: 493.88, duration: 1 }, // B4
        { note: 440.00, duration: 1 }, // A4
        { note: 349.23, duration: 1 }, // F4
        { note: 261.63, duration: 1 }, // C4
        { note: 293.66, duration: 1 }, // D4
    ];
    const currentNoteRef = useRef(0);

    const playNote = (audioContext, freq, startTime, duration) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'sine'; // Softest sound
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.1); // Soft fade in
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Long fade out

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
    };

    const scheduler = () => {
        while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
            const item = melody[currentNoteRef.current];
            if (!isMuted) {
                playNote(audioContextRef.current, item.note, nextNoteTimeRef.current, item.duration);
            }
            nextNoteTimeRef.current += 1.5; // Tempo
            currentNoteRef.current = (currentNoteRef.current + 1) % melody.length;
        }
        timerIdRef.current = setTimeout(scheduler, 25);
    };

    const togglePlay = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (isPlaying) {
            clearTimeout(timerIdRef.current);
            setIsPlaying(false);
        } else {
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }
            nextNoteTimeRef.current = audioContextRef.current.currentTime;
            scheduler();
            setIsPlaying(true);
        }
    };

    const toggleMute = () => setIsMuted(!isMuted);

    useEffect(() => {
        return () => clearTimeout(timerIdRef.current);
    }, []);

    return (
        <div className="music-player-container luxury-player">
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        className="music-visualizer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={`music-btn-main ${isPlaying ? 'active' : ''}`}
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Play Virtual Piano"
            >
                {isPlaying ? (
                    <Pause size={20} fill="currentColor" />
                ) : (
                    <Play size={20} className="ml-1" fill="currentColor" />
                )}
            </motion.button>

            <div className="music-controls-right">
                <button className="mute-icon-btn" onClick={toggleMute}>
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
            </div>

            <div className="player-message-box">
                <span className="msg-txt">
                    {isPlaying ? (
                        <><Sparkles size={12} className="inline mr-1 text-yellow-500" /> Virtual Piano</>
                    ) : (
                        "Play Romantic Melody"
                    )}
                </span>
            </div>
        </div>
    );
};

export default MusicPlayer;
