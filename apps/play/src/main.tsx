import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './app/App';
import { Global } from '@emotion/react';
import { globalStyles } from './globalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Global styles={globalStyles} />
    <App />
  </StrictMode>
);
