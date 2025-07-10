import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated, config } from 'react-spring';
import { TextField, Select, MenuItem, Button, Typography, Container, Grid, ThemeProvider, createTheme, IconButton } from '@mui/material';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Tilt } from 'react-tilt';
import { ParallaxProvider } from 'react-scroll-parallax';
import { useInView } from 'react-intersection-observer';
import logo from '../assets/NewLogo_BLANK.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import HomeIcon from '@mui/icons-material/Home';

// Define a custom theme
const theme = createTheme({
  spacing: 8,
});

const StyledContainer = styled(Container)`
  min-height: 100vh;
  padding: ${props => props.theme.spacing(4)}px;
  direction: rtl;
  position: relative;
  overflow: hidden;
  background-color: #FFFFFF;
  color: #0D0D0D;
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

const SocialLinksContainer = styled.div`
  position: fixed;
  left: ${props => props.theme.spacing(2)}px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing(2)}px;
  z-index: 1000;
`;

const SocialIconButton = styled(IconButton)`
  background-color: #62238C !important;
  color: white !important;
  &:hover {
    background-color: #BF4B81 !important;
  }
`;

const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path d="M34.8916 0H26.2875V32.7688C26.2875 36.5917 23.1833 39.6959 19.3604 39.6959C15.5375 39.6959 12.4333 36.5917 12.4333 32.7688C12.4333 29.0146 15.4688 25.9479 19.1833 25.8417V17.1688C10.6146 17.275 3.76245 24.2125 3.76245 32.7688C3.76245 41.3938 10.7354 48.3667 19.3604 48.3667C28.0541 48.3667 34.9583 41.4625 34.9583 32.7688V16.0167C38.1312 18.2667 42.0229 19.5875 46.1833 19.6562V10.9833C39.9979 10.7688 34.8916 5.93752 34.8916 0Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="48" height="48" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const ToolCard = React.memo(({ tool, index }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Tilt options={{ max: 25, scale: 1.05, perspective: 1000 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          padding: '24px',
          textAlign: 'center',
        }}
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
      </motion.div>
    </Tilt>
  </Grid>
));

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
  { category: 'מידול קולי / סוכני AI קוליים', name: 'Play.ht', usage: 'יצירת קולות מלאכותיים', link: 'https://play.ht', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Elevenlabs', usage: 'יצירת קולות מלאכותיים', link: 'https://elevenlabs.io', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Kits.AI', usage: 'יצירת קולות מלאכותיים', link: 'https://www.kits.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Weights.gg', usage: 'יצירת קולות מלאכותיים', link: 'https://weights.gg', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'Replay AI', usage: 'יצירת קולות מלאכותיים', link: 'https://www.tryreplay.io', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מידול קולי', name: 'RVC Training', usage: 'אימון מודלי קול', link: 'https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/releases', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'קוד פתוח', name: 'HuggingFace', usage: 'פלטפורמה למודלי AI קוד פתוח', link: 'https://huggingface.co', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'קורסים - למידת מכונה', name: 'deeplearning.ai', usage: 'קורסים ללמידת מכונה', link: 'https://deeplearning.ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'אוטומציה', name: 'Zapier Central', usage: 'אוטומציה של משימות', link: 'https://zapier.com/central', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'אוטומציה', name: 'make.com', usage: 'אוטומציה של משימות', link: 'https://www.make.com/en', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'ללא קוד - קריאות API', name: 'Bubble', usage: 'פיתוח אפליקציות ללא קוד', link: 'https://bubble.io', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'officely.ai', usage: 'יצירת סוכני AI', link: 'https://www.officely.ai', price: 'בתשלום', difficulty: 'בינוני' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'fastbots.ai', usage: 'יצירת בוטים מהירה', link: 'https://fastbots.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'uchat', usage: 'יצירת בוטים לצ\'אט', link: 'https://www.uchat.com.au', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'ללא קוד - יצירת סוכנים', name: 'Flowise ai', usage: 'יצירת סוכני AI בגישה ויזואלית', link: 'https://flowiseai.com', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'תמונות / גרפיקה / וידאו', name: 'Automatic1111', usage: 'ממשק למודלי יצירת תמונות', link: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'תמונות / גרפיקה / וידאו', name: 'ComfyUI', usage: 'ממשק ויזואלי ליצירת תמונות', link: 'https://github.com/comfyanonymous/ComfyUI', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'שירותי ענן ליצירת תמונות', name: 'RunDiffusion', usage: 'שירות ענן ליצירת תמונות', link: 'https://rundiffusion.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'שירותי ענן ליצירת תמונות', name: 'DiffusionHub', usage: 'שירות ענן ליצירת תמונות', link: 'https://diffusionhub.io', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'קורסים - למידת מכונה בפייתון', name: 'nnfs.io', usage: 'קורסים למידת מכונה בפייתון', link: 'https://nnfs.io', price: 'בתשלום', difficulty: 'מתקדמים' },
  { category: 'תמונות', name: 'Midjourney', usage: 'יצירת תמונות איכותיות', link: 'https://www.midjourney.com/home', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'יצירת תמונות / הגדלת איכות תמונה', name: 'Krea.ai', usage: 'יצירת תמונות והגדלת איכות', link: 'https://www.krea.ai/home', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות', name: 'glif.ai', usage: 'יצירת תמונות פשוטה', link: 'https://glif.app/glifs', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'המרת תמונות לתלת מימד עם עומק', name: 'LeiaPix', usage: 'המרת תמונות לתלת מימד', link: 'https://convert.leiapix.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמונות / גרפיקה', name: 'Adobe Firefly', usage: 'יצירת תמונות של אדובי', link: 'https://firefly.adobe.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמונות / גרפיקה', name: 'Ideogram.ai', usage: 'יצירת תמונות עם טקסט', link: 'https://ideogram.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'החלפת פנים בתמונות / וידאו', name: 'miocreate', usage: 'החלפת פנים', link: 'https://www.miocreate.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'ללא קוד - פיתוח אתרים', name: 'mobirise', usage: 'בניית אתרים ללא קוד', link: 'https://mobirise.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'וידאו', name: 'PIKA', usage: 'יצירת וידאו מטקסט', link: 'https://pika.art', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'PixVerse', usage: 'יצירת וידאו מטקסט', link: 'https://pixverse.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'Viggle', usage: 'יצירת וידאו עם תנועה', link: 'https://viggle.ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'אופנה', name: 'IDM VTON', usage: 'הלבשה וירטואלית', link: 'https://huggingface.co/spaces/yisol/IDM-VTON', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מודלים של שפה', name: 'OOGA-BOOGA', usage: 'הרצת מודלי שפה מקומיים', link: 'https://github.com/oobabooga/text-generation-webui', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודלים של שפה', name: 'LM Studio', usage: 'הרצת מודלי שפה מקומיים', link: 'https://lmstudio.ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודלים של שפה', name: 'Ollama', usage: 'הרצת מודלי שפה מקומיים', link: 'https://ollama.com', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'סוכני AI קוליים', name: 'Hume.ai', usage: 'סוכני AI עם רגש', link: 'https://www.hume.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'חיפוש מידע', name: 'Mendable', usage: 'חיפוש מידע חכם', link: 'https://www.mendable.ai', price: 'בתשלום', difficulty: 'מתקדמים' },
  { category: 'חיפוש מידע', name: 'Gitbook Lens', usage: 'חיפוש בתוכן', link: 'https://docs.gitbook.com/content-editor/searching-your-content/gitbook-ai', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מידול קולי', name: 'רובו-שאול', usage: 'מידול קולי בעברית', link: 'https://github.com/maxmelichov/Text-To-speech', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'מודל של שפה', name: 'Groq', usage: 'מודל שפה מהיר', link: 'https://groq.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'תמלול ויצירת כתוביות', name: 'Captions', usage: 'יצירת כתוביות אוטומטית', link: 'https://www.captions.ai', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'תמלול ויצירת כתוביות / עריכת וידאו', name: 'Kapwing', usage: 'עריכת וידאו וכתוביות', link: 'https://www.kapwing.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'וידאו', name: 'CapCut', usage: 'עריכת וידאו פשוטה', link: 'https://www.capcut.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'כתיבת קוד', name: 'Github Co-Pilot', usage: 'עזרה בכתיבת קוד', link: 'https://github.com/features/copilot', price: 'חינם', difficulty: 'מתקדמים' },
  { category: 'פיתוח', name: 'Devin', usage: 'מפתח AI אוטונומי', link: 'https://preview.devin.ai', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מחקר', name: 'Perplexity', usage: 'מנוע חיפוש מבוסס AI', link: 'https://www.perplexity.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מודל שפה גדול', name: 'Microsoft Co-Pilot', usage: 'עוזר AI של מיקרוסופט', link: 'https://copilot.microsoft.com', price: 'חינם', difficulty: 'מתחילים' },
  { category: 'מצגות / דוחות / מאמרים', name: 'Office Co-Pilot', usage: 'עזרה ביצירת מסמכי Office', link: 'https://copilot.cloud.microsoft/en-us/prompts', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'ניתוח נתונים', name: 'Julius AI', usage: 'ניתוח נתונים וסטטיסטיקה', link: 'https://julius.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  
  // הכלים החדשים שביקשת להוסיף
  { category: 'מחקר', name: 'NotebookLM', usage: 'כלי מחקר מבוסס AI של גוגל, ניהול מידע, סיכומים, יצירת פודקאסטים מהמידע', link: 'https://notebooklm.google.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות / עריכה גרפית', name: 'PromeAI', usage: 'פלטפורמה מקיפה ליצירת תמונות AI, הפיכת סקיצות לתמונות ריאליסטיות, רנדרים אדריכליים', link: 'https://www.promeai.pro', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'תמונות', name: 'Reve.art', usage: 'מחולל תמונות AI מתקדם, מתמחה ב-prompt adherence, aesthetics ו-typography', link: 'https://reve.art', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'מצגות / דוחות / מאמרים', name: 'Gamma', usage: 'יצירת מצגות, אתרים ומסמכים מקצועיים מטקסט פשוט, ללא צורך בכישורי עיצוב', link: 'https://gamma.app', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  
  // כלים נוספים פופולריים ב-2025
  { category: 'מודל שפה גדול', name: 'DeepSeek', usage: 'מודל שפה מתקדם וחדשני, מתחרה ב-OpenAI, מתמחה בהיגיון ויצירה', link: 'https://deepseek.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'Synthesia', usage: 'יצירת וידאו עם אוואטרים מדברים, תוכן הדרכה ומצגות וידאו מקצועיות', link: 'https://synthesia.io', price: 'בתשלום', difficulty: 'מתחילים' },
  { category: 'תמלול ויצירת כתוביות / עריכת וידאו', name: 'Descript', usage: 'עריכת וידאו באמצעות עריכת טקסט, תמלול אוטומטי ועריכה מתקדמת', link: 'https://descript.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'וידאו', name: 'Runway', usage: 'יצירת וידאו מבוסס AI מתקדם, Gen-3 Alpha, עריכה יצירתית וכלים מתקדמים', link: 'https://runwayml.com', price: 'חינם / בתשלום', difficulty: 'בינוני' },
  { category: 'כתיבת קוד', name: 'Cursor', usage: 'עורך קוד מבוסס AI מתקדם, עזרה בכתיבה ועריכת קוד בזמן אמת', link: 'https://cursor.sh', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { category: 'ללא קוד - פיתוח אתרים', name: 'Base44', usage: 'פלטפורמה ליצירת אפליקציות מלאות מטקסט פשוט, ללא קוד, עם בסיס נתונים ואיחסון מובנים', link: 'https://base44.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { category: 'ללא קוד - פיתוח אתרים', name: 'Loveable', usage: 'פלטפורמה מבוסת AI ליצירת אפליקציות web מתקדמות עם אינטגרציה ל-GitHub ו-Supabase', link: 'https://lovable.dev', price: 'חינם / בתשלום', difficulty: 'מתחילים' }
];

const AItoolsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
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

  const filterTools = useCallback((tools) => {
    return tools.filter(tool =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!difficultyFilter || tool.difficulty === difficultyFilter) &&
      (!priceFilter || tool.price.includes(priceFilter)) &&
      (!categoryFilter || tool.category === categoryFilter)
    );
  }, [searchTerm, difficultyFilter, priceFilter, categoryFilter]);

  const filteredTools = useMemo(() => filterTools(aiTools), [filterTools]);

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <ParallaxProvider>
          <StyledContainer maxWidth={false}>
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
                  <ToolCard key={tool.name} tool={tool} index={index} />
                ))}
              </AnimatePresence>
            </Grid>

            <SocialLinksContainer>
              <SocialIconButton href="https://triroars.co.il" target="_blank" rel="noopener noreferrer">
                <HomeIcon />
              </SocialIconButton>
              <SocialIconButton href="https://www.facebook.com/profile.php?id=61553596496338" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </SocialIconButton>
              <SocialIconButton href="https://www.instagram.com/triroars/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </SocialIconButton>
              <SocialIconButton href="https://www.tiktok.com/@triroars" target="_blank" rel="noopener noreferrer">
                <TikTokIcon />
              </SocialIconButton>
              <SocialIconButton href="https://chat.whatsapp.com/Er9gUVQ0zxsF1BDSQlCbMC" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
              </SocialIconButton>
            </SocialLinksContainer>

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
