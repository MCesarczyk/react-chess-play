import { css } from '@emotion/react'

export const globalStyles = css`
  html {
      box-sizing: border-box;
  }

  *, ::after, ::before {
      box-sizing: inherit;
  }

  html,
  body {
    margin: 0;
    height: 100%;
    font-family: 'AvenirStd';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
    max-height: 100vh;
  }

  *:focus {
    outline-style: solid;
    outline-offset: -1px;
  }
`;
