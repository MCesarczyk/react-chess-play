import { useDraggable } from '@dnd-kit/core';
import clsx from 'clsx';

import { PieceType } from './types';
import { useEffect } from 'react';

interface PieceProps {
  type: PieceType;
  image: string;
  alt: string;
  setDraggedPiece?: (pieceType: PieceType) => void;
}

export function Piece({ type, image, alt, setDraggedPiece }: PieceProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: type });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  useEffect(() => {
    if (isDragging && setDraggedPiece) {
      setDraggedPiece(type);
    }
  }, [isDragging, setDraggedPiece, type]);

  return (
    <img
      ref={setNodeRef}
      className={clsx(
        'p-1 m-2 rounded-lg shadow-xl bg-gray-400 hover:bg-gray-600',
        isDragging && 'opacity-50 bg-opacity-50 border-2'
      )}
      style={style}
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
