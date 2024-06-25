import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated, config } from 'react-spring';
import { TextField, Select, MenuItem, Button, Typography, Container, Grid, ThemeProvider, createTheme } from '@mui/material';
import styled, { keyframes, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Tilt } from 'react-tilt';
import { ParallaxProvider } from 'react-scroll-parallax';
import { useInView } from 'react-intersection-observer';
import logo from '../assets/NewLogo_BLANK.png';

// Define a custom theme
const theme = createTheme({
  spacing: 8, // Define a base spacing unit
});

const move = keyframes`
  0% {
    left: -10%;
  }
  100% {
    left: 100%;
  }
`;

const generateRandomPositionAndDelay = () => {
  const positions = [];
  for (let i = 0; i < 10; i++) {
    const randomTop = Math.random() * 100;
    const randomDelay = Math.random() * 5;
    positions.push({ top: randomTop, delay: randomDelay });
  }
  return positions;
};

const randomPositions = generateRandomPositionAndDelay();

const StyledContainer = styled(Container)`
  min-height: 100vh;
  padding: ${props => props.theme.spacing(4)}px;
  direction: rtl;
  position: relative;
  overflow: hidden;
  background-color: #FFFFFF;
  color: #0D0D0D;
`;

const LinesContainer = styled.div`
  position: absolute;
  top: 0%; /* מתחיל מהכותרת */
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: calc(100vh - 10px);
  width: 100%;
`;

const Line = styled.div`
  position: absolute;
  height: 1px;
  width: 100%;
  top: 0%
  left: 0;
  background: rgba(98, 35, 140, 0.1);
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 15vw;
    height: 50%;
    top: 0%;
    left: -50%;
    background: linear-gradient(to right, rgba(98, 35, 140, 0) 0%, #62238C 75%, #62238C 100%);
    animation: ${move} 7s 0s infinite;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing(8)}px;
  position: relative;
  padding-top: 50px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Logo = styled.img`
  height: 200px;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${props => props.theme.spacing(2)}px;
  margin-bottom: ${props => props.theme.spacing(6)}px;
  background: rgba(98, 35, 140, 0.1);
  padding: ${props => props.theme.spacing(3)}px;
  border-radius: 16px;
  position: relative;
  z-index: 1;
`;

const ToolCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: ${props => props.theme.spacing(3)}px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, rgba(98,35,140,0.8) 30%, rgba(191,75,129,0.8) 90%);
  border: 0;
  border-radius: 3px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
  color: white;
  height: 48px;
  padding: 0 30px;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 10px 4px rgba(255, 105, 135, .3);
  }
`;

const categories = [
  'תמונות / ליפסינק',
  'מודל שפה גדול',
  'תמונות / וידאו',
  'אוואטרים / ליפסינק',
  'תמונות / עריכה גרפית',
  'תמונות / עריכה גרפית / וידאו',
  'מוזיקה',
  'מידול קולי / סוכני AI קוליים',
  'מידול קולי',
  'קוד פתוח',
  'קורסים - למידת מכונה',
  'אוטומציה',
  'ללא קוד - קריאות API',
  'ללא קוד - יצירת סוכנים',
  'תמונות / גרפיקה / וידאו',
  'שירותי ענן ליצירת תמונות',
  'קורסים - למידת מכונה בפייתון',
  'תמונות',
  'יצירת תמונות / הגדלת איכות תמונה',
  'המרת תמונות לתלת מימד עם עומק',
  'תמונות / גרפיקה',
  'החלפת פנים בתמונות / וידאו',
  'ללא קוד - פיתוח אתרים',
  'וידאו',
  'אופנה',
  'מודלים של שפה',
  'סוכני AI קוליים',
  'חיפוש מידע',
  'תמלול ויצירת כתוביות',
  'תמלול ויצירת כתוביות / עריכת וידאו',
  'כתיבת קוד',
  'פיתוח',
  'מחקר',
  'מצגות / דוחות / מאמרים',
  'ניתוח נתונים'
];

const aiTools = [
  { category: 'תמונות / ליפסינק', name: 'Artflow', usage: 'יצירת תמונות, אימון מודל על תמונות שלנו, ליפסינק לאוואטרים, יצירת סרטונים', link: 'https://artflow.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'ChatGPT', usage: 'מענה על שאלות בכל הנושאים, יכולת ליצור ולערוך תמונות', link: 'https://chat.openai.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'Claude', usage: 'מענה על שאלות בכל הנושאים', link: 'https://claude.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'Cohere', usage: 'מענה על שאלות בכל הנושאים', link: 'https://cohere.ai', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'תמונות / וידאו', name: 'FaceFusion', usage: 'החלפת פנים בתמונות או בווידאו', link: 'https://facefusion.io', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'אוואטרים / ליפסינק', name: 'HeyGen', usage: 'יצירת אוואטרים, סוכנים וליפסינק', link: 'https://heygen.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'אוואטרים / ליפסינק', name: 'D-ID', usage: 'יצירת אוואטרים, סוכנים וליפסינק', link: 'https://d-id.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות / עריכה גרפית', name: 'ClipDrop', usage: 'יצירת תמונות, עריכת תמונות, החלפת פנים', link: 'https://clipdrop.co', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות / עריכה גרפית', name: 'Fooocus', usage: 'יצירת תמונות בצורה פשוטה או מתקדמת עם סטייבל דיפיוז\'ן בממשק ידידותי יחסית למשתמש', link: 'https://github.com/lllyasviel/Fooocus', price: 'חינם', difficulty: 'בינוני' },
  { category: 'תמונות / עריכה גרפית / וידאו', name: 'Leonardo', usage: 'יצירת תמונות, אימון מודלים, יצירת קטעי וידאו קצרים', link: 'https://leonardo.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מוזיקה', name: 'Suno', usage: 'יצירת מוזיקה', link: 'https://suno.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'אוואטרים / ליפסינק', name: 'Yepic', usage: 'ליפסינק', link: 'https://www.yepic.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי / סוכני AI קוליים', name: 'Play.ht', usage: '', link: 'https://play.ht', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Elevenlabs', usage: '', link: 'https://elevenlabs.io', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Kits.AI', usage: '', link: 'https://www.kits.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Weights.gg', usage: '', link: 'https://weights.gg', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Replay AI', usage: '', link: 'https://www.tryreplay.io', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'RVC Training', usage: '', link: 'https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/releases', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'קוד פתוח', name: 'HuggingFace', usage: '', link: 'https://huggingface.co', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'קורסים - למידת מכונה', name: 'deeplearning.ai', usage: '', link: 'https://deeplearning.ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'אוטומציה', name: 'Zapier Central', usage: '', link: 'https://zapier.com/central', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'אוטומציה', name: 'make.com', usage: '', link: 'https://www.make.com/en', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'ללא קוד - קריאות API', name: 'Bubble', usage: '', link: 'https://bubble.io', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'officely.ai', usage: '', link: 'https://www.officely.ai', price: 'בתשלום', difficulty: 'בינוני' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'fastbots.ai', usage: '', link: 'https://fastbots.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'uchat', usage: '', link: 'https://www.uchat.com.au', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'Flowise ai', usage: '', link: 'https://flowiseai.com', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'תמונות / גרפיקה / וידאו', name: 'Automatic1111', usage: '', link: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'תמונות / גרפיקה / וידאו', name: 'ComfyUI', usage: '', link: 'https://github.com/comfyanonymous/ComfyUI', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'שירותי ענן ליצירת תמונות', name: 'RunDiffusion', usage: '', link: 'https://rundiffusion.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'שירותי ענן ליצירת תמונות', name: 'DiffusionHub', usage: '', link: 'https://diffusionhub.io', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'קורסים - למידת מכונה בפייתון', name: 'nnfs.io', usage: '', link: 'https://nnfs.io', price: 'בתשלום', difficulty: 'מתקדמים' },
  { category: 'תמונות', name: 'Midjourney', usage: '', link: 'https://www.midjourney.com/home', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'יצירת תמונות / הגדלת איכות תמונה', name: 'Krea.ai', usage: '', link: 'https://www.krea.ai/home', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות', name: 'glif.ai', usage: '', link: 'https://glif.app/glifs', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'המרת תמונות לתלת מימד עם עומק', name: 'LeiaPix', usage: '', link: 'https://convert.leiapix.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמונות / גרפיקה', name: 'Adobe Firefly', usage: '', link: 'https://firefly.adobe.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמונות / גרפיקה', name: 'Ideogram.ai', usage: '', link: 'https://ideogram.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'החלפת פנים בתמונות / וידאו', name: 'miocreate', usage: '', link: 'https://www.miocreate.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'ללא קוד - פיתוח אתרים', name: 'mobirise', usage: '', link: 'https://mobirise.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'וידאו', name: 'PIKA', usage: '', link: 'https://pika.art', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'PixVerse', usage: '', link: 'https://pixverse.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'Viggle', usage: '', link: 'https://viggle.ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'אופנה', name: 'IDM VTON', usage: '', link: 'https://huggingface.co/spaces/yisol/IDM-VTON', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מודלים של שפה', name: 'OOGA-BOOGA', usage: '', link: 'https://github.com/oobabooga/text-generation-webui', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודלים של שפה', name: 'LM Studio', usage: '', link: 'https://lmstudio.ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודלים של שפה', name: 'Ollama', usage: '', link: 'https://ollama.com', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'סוכני AI קוליים', name: 'Hume.ai', usage: '', link: 'https://www.hume.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'חיפוש מידע', name: 'Mendable', usage: '', link: 'https://www.mendable.ai', price: 'בתשלום', difficulty: 'מתקדמים' },
  { category: 'חיפוש מידע', name: 'Gitbook Lens', usage: '', link: 'https://docs.gitbook.com/content-editor/searching-your-content/gitbook-ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מידול קולי', name: 'רובו-שאול', usage: '', link: 'https://github.com/maxmelichov/Text-To-speech', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודל של שפה', name: 'Groq', usage: '', link: 'https://groq.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמלול ויצירת כתוביות', name: 'Captions', usage: '', link: 'https://www.captions.ai', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'תמלול ויצירת כתוביות / עריכת וידאו', name: 'Kapwing', usage: '', link: 'https://www.kapwing.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'וידאו', name: 'CapCut', usage: '', link: 'https://www.capcut.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'כתיבת קוד', name: 'Github Co-Pilot', usage: '', link: 'https://github.com/features/copilot', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'פיתוח', name: 'Devin', usage: '', link: 'https://preview.devin.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מחקר', name: 'Perplexity', usage: '', link: 'https://www.perplexity.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'Microsoft Co-Pilot', usage: '', link: 'https://copilot.microsoft.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מצגות / דוחות / מאמרים', name: 'Office Co-Pilot', usage: '', link: 'https://copilot.cloud.microsoft/en-us/prompts', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'ניתוח נתונים', name: 'Julius AI', usage: '', link: 'https://julius.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' }
];
const AItoolsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredTools, setFilteredTools] = useState(aiTools);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headerAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(-50px)',
    config: config.molasses,
  });

  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: config.wobbly,
  });

  useEffect(() => {
    const filtered = aiTools.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!difficultyFilter || tool.difficulty === difficultyFilter) &&
      (!priceFilter || tool.price.includes(priceFilter)) &&
      (!categoryFilter || tool.category === categoryFilter)
    );
    setFilteredTools(filtered);
  }, [searchTerm, difficultyFilter, priceFilter, categoryFilter]);

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <ParallaxProvider>
          <StyledContainer maxWidth={false}>
            <LinesContainer>
              {randomPositions.map((position, index) => (
                <Line key={index} style={{ top: `${position.top}%`, animationDelay: `${position.delay}s` }} />
              ))}
            </LinesContainer>
            <Header ref={ref}>
              <animated.div style={headerAnimation}>
                <Logo src={logo} alt="KA Logo" />
                <animated.div style={titleAnimation}>
                  <Typography variant="h2" sx={{ 
                    fontWeight: 'bold', 
                    marginBottom: 2, 
                    color: '#62238C',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    '@media (max-width:600px)': {
                      fontSize: '2.5rem',
                    },
                  }}>
                    כלי AI מובילים
                  </Typography>
                </animated.div>
                <Typography variant="h5" sx={{ 
                  marginBottom: 4, 
                  color: '#0D0D0D',
                  '@media (max-width:600px)': {
                    fontSize: '1.2rem',
                  },
                }}>
                  גלה את הכלים החדשניים ביותר בתחום הבינה המלאכותית
                </Typography>
              </animated.div>
            </Header>

            <SearchContainer>
              <TextField
                label="חפש כלי..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                  flexGrow: 1, 
                  maxWidth: '300px', 
                  input: { color: '#0D0D0D', textAlign: 'right' }, 
                  '& label': { color: '#0D0D0D', right: 0, transformOrigin: 'right' },
                  '& label.Mui-focused': { transformOrigin: 'right' }
                }}
                InputLabelProps={{
                  style: { right: 14, left: 'auto' }
                }}
              />
              <Select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                displayEmpty
                sx={{ minWidth: '120px', color: '#0D0D0D', '& .MuiSelect-icon': { color: '#0D0D0D' } }}
              >
                <MenuItem value="">רמת קושי</MenuItem>
                <MenuItem value="מתחילים">מתחילים</MenuItem>
                <MenuItem value="בינוני">בינוני</MenuItem>
                <MenuItem value="מתקדמים">מתקדמים</MenuItem>
              </Select>
              <Select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                displayEmpty
                sx={{ minWidth: '120px', color: '#0D0D0D', '& .MuiSelect-icon': { color: '#0D0D0D' } }}
              >
                <MenuItem value="">עלות</MenuItem>
                <MenuItem value="חינם">חינם</MenuItem>
                <MenuItem value="בתשלום">בתשלום</MenuItem>
              </Select>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                displayEmpty
                sx={{ minWidth: '150px', color: '#0D0D0D', '& .MuiSelect-icon': { color: '#0D0D0D' } }}
              >
                <MenuItem value="">קטגוריה</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </SearchContainer>
            <Grid container spacing={4}>
              <AnimatePresence>
                {filteredTools.map((tool, index) => (
                  <Grid item xs={12} sm={6} md={4} key={tool.name}>
                    <Tilt options={{ max: 25, scale: 1.05, perspective: 1000 }}>
                      <ToolCard
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#62238C' }}>
                          {tool.name}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 1, color: '#0D0D0D' }}>
                          <strong>קטגוריה:</strong> {tool.category}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 1, color: '#0D0D0D' }}>
                          <strong>שימוש:</strong> {tool.usage}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 1, color: '#0D0D0D' }}>
                          <strong>מחיר:</strong> {tool.price}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: 2, color: '#0D0D0D' }}>
                          <strong>דרגת קושי:</strong> {tool.difficulty}
                        </Typography>
                        <StyledButton
                          variant="contained"
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          קח אותי לשם
                        </StyledButton>
                      </ToolCard>
                    </Tilt>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>

            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 4, color: '#0D0D0D' }}>
              נבנה בעזרת AI | קרדיט: יובל אבידני
            </Typography>
          </StyledContainer>
        </ParallaxProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export default AItoolsPage;