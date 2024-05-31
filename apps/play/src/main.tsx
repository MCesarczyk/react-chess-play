import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Board } from './app/Board';
import { observe } from './Game';
import { Coord } from './types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

observe((knightPosition: Coord) =>
  root.render(
    <StrictMode>
      <DndProvider backend={HTML5Backend}>
        <Board knightPosition={knightPosition} />
      </DndProvider>
    </StrictMode>
  )
);
