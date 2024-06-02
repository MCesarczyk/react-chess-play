import { useDrag } from 'react-dnd';
import clsx from 'clsx';

import { PieceType } from './types';
import { useEffect } from 'react';

interface PieceProps {
  type: PieceType;
  image: string;
  alt: string;
  setDraggedPiece: (pieceType: PieceType) => void;
}

export function Piece({ type, image, alt, setDraggedPiece }: PieceProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (isDragging) {
      setDraggedPiece(type);
    }
  }, [isDragging, setDraggedPiece, type]);

  return (
    <img
      ref={drag}
      className={clsx(
        'p-1 m-2 rounded-lg shadow-xl bg-gray-400 hover:bg-gray-600',
        isDragging && 'opacity-50 bg-opacity-50 border-2'
      )}
      height="80%"
      width="80%"
      src={image}
      alt={alt}
      draggable="false"
    />
  );
}
