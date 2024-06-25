import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import AItoolsPage from './components/AItoolsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AItoolsPage />
    </ThemeProvider>
  );
}

export default App;