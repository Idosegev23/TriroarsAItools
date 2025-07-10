import React, { useState, useMemo } from 'react';
import { Container, Typography, TextField, Grid, Card, CardContent, Button, Chip } from '@mui/material';

// דוגמת נתונים - אפשר להרחיב/לשנות
const aiTools = [
  { name: 'ChatGPT', category: 'מודל שפה', usage: 'שיח חכם, כתיבה, עזרה', link: 'https://chat.openai.com', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { name: 'Claude', category: 'מודל שפה', usage: 'שיח, ניתוח טקסטים', link: 'https://claude.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { name: 'Midjourney', category: 'יצירת תמונה', usage: 'יצירת תמונות מטקסט', link: 'https://midjourney.com', price: 'בתשלום', difficulty: 'מתקדמים' },
  { name: 'Cursor', category: 'פיתוח קוד', usage: 'עורך קוד מבוסס AI', link: 'https://cursor.sh', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
  { name: 'RunwayML', category: 'וידאו', usage: 'יצירת וידאו מבוסס AI', link: 'https://runwayml.com', price: 'חינם / בתשלום', difficulty: 'בינוני' },
  { name: 'Perplexity', category: 'חיפוש מידע', usage: 'חיפוש תשובות עם מקורות', link: 'https://www.perplexity.ai', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { name: 'Gamma', category: 'מצגות', usage: 'יצירת מצגות חכמות', link: 'https://gamma.app', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { name: 'PromeAI', category: 'עיצוב', usage: 'רנדרים אדריכליים, תמונות', link: 'https://www.promeai.pro', price: 'חינם / בתשלום', difficulty: 'מתחילים' },
  { name: 'DeepSeek', category: 'מודל שפה', usage: 'פתרון בעיות מתקדמות', link: 'https://deepseek.com', price: 'חינם / בתשלום', difficulty: 'מתקדמים' },
];

const categories = [...new Set(aiTools.map(t => t.category))];

const CleanHomePage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filtered = useMemo(() => {
    return aiTools.filter(tool =>
      tool.name.toLowerCase().includes(search.toLowerCase()) &&
      (!category || tool.category === category)
    );
  }, [search, category]);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" fontWeight={800} sx={{ mb: 2, letterSpacing: -2, color: '#222' }}>
        AI Tools Hub
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
        כלים חדשניים לעבודה, יצירה ולמידה. בחרו, חפשו, התנסו.
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={7}>
          <TextField
            fullWidth
            label="חיפוש כלי..."
            variant="outlined"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{ style: { borderRadius: 16, background: '#fafbfc' } }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            select
            fullWidth
            label="קטגוריה"
            value={category}
            onChange={e => setCategory(e.target.value)}
            SelectProps={{ native: true }}
            InputProps={{ style: { borderRadius: 16, background: '#fafbfc' } }}
          >
            <option value="">הכל</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {filtered.map(tool => (
          <Grid item xs={12} sm={6} md={4} key={tool.name}>
            <Card elevation={2} sx={{ borderRadius: 4, minHeight: 210, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: '#222' }}>{tool.name}</Typography>
                <Chip label={tool.category} size="small" sx={{ mb: 1, background: '#f3f4f6', color: '#555', fontWeight: 500 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{tool.usage}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {tool.price} | {tool.difficulty}
                </Typography>
              </CardContent>
              <Button
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                sx={{ borderRadius: 99, mt: 1, mb: 2, mx: 2, fontWeight: 600, background: 'linear-gradient(90deg, #6366f1 10%, #a855f7 90%)' }}
                fullWidth
              >
                מעבר לכלי
              </Button>
            </Card>
          </Grid>
        ))}
        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary" sx={{ mt: 6 }}>
              לא נמצאו כלים מתאימים.
            </Typography>
          </Grid>
        )}
      </Grid>
      <Typography variant="body2" align="center" color="text.disabled" sx={{ mt: 8 }}>
        © 2025 Triroars AI Tools. Powered by innovation.
      </Typography>
    </Container>
  );
};

export default CleanHomePage; 