import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Quotes from './components/Quotes';
import LoveCalculator from './components/LoveCalculator';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#880E4F]"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, #D50000 0%, #880E4F 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                filter: ["drop-shadow(0 0 0px #fff)", "drop-shadow(0 0 20px #ffea00)", "drop-shadow(0 0 0px #fff)"]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-8 relative"
            >
              <Heart size={100} fill="#FFD700" color="#B71C1C" strokeWidth={1} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.5em' }}
              transition={{ duration: 1.5 }}
              style={{
                fontFamily: 'serif',
                color: '#FFD700',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '0.5em',
                fontSize: '1.5rem',
                marginTop: '1rem'
              }}
            >
              Valentine
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Navbar />
          <MusicPlayer />
          <main>
            <Hero />
            <Quotes />
            <LoveCalculator />
            <Gallery />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default App;
