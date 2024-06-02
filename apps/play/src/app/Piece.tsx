import { useDraggable } from '@dnd-kit/core';
import clsx from 'clsx';
import { PieceType } from './types';

interface PieceProps {
  type: PieceType;
  image: string;
  alt: string;
}

export function Piece({ type, image, alt }: PieceProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: type,
    data: { piece: { type, image, alt } },
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
      {...attributes}
      {...listeners}
    />
  );
}
