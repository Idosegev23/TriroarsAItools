import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../glassmorphic-bento.css';

// Tool data with enhanced categorization and grid sizes
const aiToolsData = [
  // Hero Tools (Large Cards)
  { 
    id: 1,
    name: 'ChatGPT', 
    category: 'מודל שפה גדול',
    type: 'ai-chat',
    gridSize: 'large',
    icon: '🤖',
    description: 'מודל השפה המתקדם ביותר של OpenAI. יכול לכתוב, לתכנת, לנתח ולפתור בעיות מורכבות.',
    usage: 'מענה על שאלות, כתיבה, תכנות, ניתוח נתונים',
    link: 'https://chat.openai.com', 
    price: 'חינם / בתשלום', 
    difficulty: 'מתחילים',
    featured: true
  },
  { 
    id: 2,
    name: 'Midjourney', 
    category: 'תמונות / AI',
    type: 'ai-image',
    gridSize: 'large',
    icon: '🎨',
    description: 'יוצר תמונות מדהימות מטקסט. האיכות הגבוהה ביותר בשוק ליצירה אמנותית.',
    usage: 'יצירת תמונות, אמנות דיגיטלית, עיצוב',
    link: 'https://midjourney.com', 
    price: 'בתשלום', 
    difficulty: 'מתחילים',
    featured: true
  },

  // Medium Cards
  { 
    id: 3,
    name: 'Claude', 
    category: 'מודל שפה גדול',
    type: 'ai-chat',
    gridSize: 'medium',
    icon: '🧠',
    description: 'מודל AI מתקדם של Anthropic. מצוין לניתוח, כתיבה ופתרון בעיות מורכבות.',
    usage: 'מענה על שאלות, ניתוח טקסטים, כתיבה יצירתית',
    link: 'https://claude.ai', 
    price: 'חינם / בתשלום', 
    difficulty: 'מתחילים'
  },
  { 
    id: 4,
    name: 'Cursor', 
    category: 'כתיבת קוד',
    type: 'ai-code',
    gridSize: 'medium',
    icon: '💻',
    description: 'עורך קוד מבוסס AI המתקדם ביותר. כתיבה ועריכה של קוד בזמן אמת.',
    usage: 'כתיבת קוד, פיתוח אפליקציות, debugging',
    link: 'https://cursor.sh', 
    price: 'חינם / בתשלום', 
    difficulty: 'מתקדמים'
  },
  { 
    id: 5,
    name: 'RunwayML', 
    category: 'וידאו / AI',
    type: 'ai-video',
    gridSize: 'medium',
    icon: '🎬',
    description: 'פלטפורמה מתקדמת ליצירת וידאו מבוסס AI. Gen-3 Alpha הטכנולוגיה החדישה ביותר.',
    usage: 'יצירת וידאו, עריכה יצירתית, אפקטים',
    link: 'https://runwayml.com', 
    price: 'חינם / בתשלום', 
    difficulty: 'בינוני'
  },

  // Small Cards
  { 
    id: 6,
    name: 'Perplexity', 
    category: 'מחקר',
    type: 'ai-chat',
    gridSize: 'small',
    icon: '🔍',
    description: 'מנוע חיפוש מבוסס AI עם מקורות.',
    usage: 'מחקר, חיפוש מידע מדויק',
    link: 'https://www.perplexity.ai', 
    price: 'חינם / בתשלום', 
    difficulty: 'מתחילים'
  },
  { 
    id: 7,
    name: 'ElevenLabs', 
    category: 'מידול קולי',
    type: 'ai-voice',
    gridSize: 'small',
    icon: '🗣️',
    description: 'יצירת קול AI מתקדם וריאליסטי.',
    usage: 'יצירת קול, dubbing, פודקאסטים',
    link: 'https://elevenlabs.io', 
    price: 'חינם / בתשלום', 
    difficulty: 'מתחילים'
  },
  { 
    id: 8,
    name: 'Gamma', 
    category: 'מצגות',
    type: 'ai-chat',
    gridSize: 'small',
    icon: '📊',
    description: 'יצירת מצגות מקצועיות מטקסט.',
    usage: 'מצגות, דוחות, אתרים',
    link: 'https://gamma.app', 
    price: 'חינם / בתשלום', 
    difficulty: 'מתחילים'
  },

  // Wide Cards
  { 
    id: 9,
    name: 'PromeAI', 
    category: 'תמונות / עיצוב',
    type: 'ai-image',
    gridSize: 'wide',
    icon: '🎯',
    description: 'פלטפורמה מקיפה ליצירת תמונות AI, רנדרים אדריכליים והפיכת סקיצות לתמונות ריאליסטיות.',
    usage: 'עיצוב אדריכלי, רנדרים, סקיצות לתמונות',
    link: 'https://www.promeai.pro', 
    price: 'חינם / בתשלום', 
    difficulty: 'מתחילים'
  },

  // Tall Cards
  { 
    id: 10,
    name: 'DeepSeek', 
    category: 'מודל שפה גדול',
    type: 'ai-chat',
    gridSize: 'tall',
    icon: '🚀',
    description: 'מודל שפה חדשני ומתקדם המתחרה ב-OpenAI. מתמחה בהיגיון מתמטי ויצירה מתקדמת.',
    usage: 'פתרון בעיות מורכבות, מתמטיקה, תכנות מתקדם',
    link: 'https://deepseek.com', 
    price: 'חינם / בתשלום', 
    difficulty: 'מתחילים'
  },

  // Additional tools
  { 
    id: 11,
    name: 'HeyGen', 
    category: 'אוואטרים',
    type: 'ai-video',
    gridSize: 'medium',
    icon: '👤',
    description: 'יצירת אוואטרים מדברים וליפסינק מתקדם.',
    usage: 'אוואטרים, וידאו שיווקי, הדרכות',
    link: 'https://heygen.com', 
    price: 'חינם / בתשלום', 
    difficulty: 'מתחילים'
  },
  { 
    id: 12,
    name: 'NotebookLM', 
    category: 'מחקר',
    type: 'ai-chat',
    gridSize: 'small',
    icon: '📚',
    description: 'כלי מחקר של גוגל ליצירת פודקאסטים.',
    usage: 'מחקר, סיכומים, פודקאסטים',
    link: 'https://notebooklm.google.com', 
    price: 'חינם', 
    difficulty: 'מתחילים'
  }
];

const categories = [
  'מודל שפה גדול',
  'תמונות / AI', 
  'וידאו / AI',
  'כתיבת קוד',
  'מידול קולי',
  'מחקר',
  'מצגות',
  'אוואטרים'
];

const GlassmorphicBentoAI = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filterTools = useCallback((tools) => {
    return tools.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!difficultyFilter || tool.difficulty === difficultyFilter) &&
      (!priceFilter || tool.price.includes(priceFilter)) &&
      (!categoryFilter || tool.category === categoryFilter)
    );
  }, [searchTerm, difficultyFilter, priceFilter, categoryFilter]);

  const filteredTools = useMemo(() => filterTools(aiToolsData), [filterTools]);

  // Create grid layout with proper positioning
  const getGridClass = (tool) => {
    return `tool-card ${tool.type} grid-item-${tool.gridSize}`;
  };

  return (
    <div className="glassmorphic-container">
      {/* Floating Orbs Background */}
      <div className="floating-orbs">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>

      {/* Header Section */}
      <motion.header 
        className="glassmorphic-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="hero-card"
          whileHover={{ 
            scale: 1.02,
            rotateX: 5,
            rotateY: 5
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            כלי AI מובילים 2025
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            גלה את הכלים החדשניים ביותר בבינה מלאכותית
          </motion.p>
        </motion.div>
      </motion.header>

      {/* Search and Filters */}
      <motion.div 
        className="search-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="search-filters">
          <input
            type="text"
            className="filter-input"
            placeholder="חפש כלי..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="filter-input"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="">רמת קושי</option>
            <option value="מתחילים">מתחילים</option>
            <option value="בינוני">בינוני</option>
            <option value="מתקדמים">מתקדמים</option>
          </select>

          <select
            className="filter-input"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">עלות</option>
            <option value="חינם">חינם</option>
            <option value="בתשלום">בתשלום</option>
          </select>

          <select
            className="filter-input"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">קטגוריה</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div 
        className="bento-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <AnimatePresence>
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              className={getGridClass(tool)}
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                rotateX: -20
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateX: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                rotateX: 20
              }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                z: 50
              }}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              <div className="tool-icon">{tool.icon}</div>
              
              <div>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-category">{tool.category}</p>
                <p className="tool-description">{tool.description}</p>
              </div>

              <motion.a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="tool-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                קח אותי לשם
              </motion.a>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        style={{ 
          textAlign: 'center', 
          marginTop: '4rem', 
          padding: '2rem',
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '1rem'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        נבנה בעזרת AI | קרדיט: יובל אבידני
      </motion.footer>
    </div>
  );
};

export default GlassmorphicBentoAI; 