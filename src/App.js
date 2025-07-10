import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion, AnimatePresence } from 'framer-motion';
import theme from './theme';
import AItoolsPage from './components/AItoolsPage';
import GlassmorphicBentoAI from './components/GlassmorphicBentoAI';

function App() {
  const [useNewDesign, setUseNewDesign] = useState(true); // Start with new design

  const toggleDesign = () => {
    setUseNewDesign(!useNewDesign);
  };

  if (useNewDesign) {
    return (
      <div style={{ position: 'relative' }}>
        {/* Design Toggle Button */}
        <motion.button
          onClick={toggleDesign}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '10px 20px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          whileHover={{ 
            scale: 1.05,
            background: 'rgba(255, 255, 255, 0.2)' 
          }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 עיצוב קלאסי
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key="glassmorphic"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <GlassmorphicBentoAI />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ position: 'relative' }}>
        {/* Design Toggle Button */}
        <motion.button
          onClick={toggleDesign}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: '#62238C',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 20px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(98, 35, 140, 0.3)'
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 6px 20px rgba(98, 35, 140, 0.4)' 
          }}
          whileTap={{ scale: 0.95 }}
        >
          ✨ עיצוב חדש 2025
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key="classic"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <AItoolsPage />
          </motion.div>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;