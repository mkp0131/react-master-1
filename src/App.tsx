import { isDarkAtom } from 'atoms';
import BtnToggleTheme from 'components/BtnToggleTheme';
import GlobalStyle from 'GlobalStyle';
import React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Router from 'Router';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'theme';

function App() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  useEffect(() => {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: Dark)').matches;

    if (prefersDark) setIsDark(true);
  }, []);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <BtnToggleTheme />
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
