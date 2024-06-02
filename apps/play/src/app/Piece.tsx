import { useDraggable } from '@dnd-kit/core';
import clsx from 'clsx';
import { PieceData } from './types';

export function Piece({ type, image, alt, canMovePiece }: PieceData) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: type,
    data: { piece: { type, image, alt, canMovePiece } },
  });

  return (
    <img
      ref={setNodeRef}
      className={clsx(
        'p-1 m-2 rounded-lg shadow-xl bg-gray-400 hover:bg-gray-600',
        isDragging && 'opacity-50 bg-opacity-50 border-2'
      )}
      height="80%"
      width="80%"
      src={image}
      alt={alt}
      draggable="false"
      touch-action="manipulation"
      {...attributes}
      {...listeners}
    />
  );
}
