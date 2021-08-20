import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${normalize}

  html, body, #main {
    height: 100%;
    font-family: 'Open Sans', sans-serif;
    color: #232528;
  }
`;

export default GlobalStyles;
