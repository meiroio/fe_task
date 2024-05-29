import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../styles';
import AppRouter from './AppRouter';

import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
