import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Knight } from './app/Piece';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Knight />
    </DndProvider>
  </StrictMode>
);
