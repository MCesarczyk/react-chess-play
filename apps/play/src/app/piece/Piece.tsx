import styled from '@emotion/styled';
import { useDraggable } from '@dnd-kit/core';
import { PieceData } from './types';

export function Piece({ type, image, alt, canMovePiece }: PieceData) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: type,
    data: { piece: { type, image, alt, canMovePiece } },
  });

  return (
    <PieceImage
      ref={setNodeRef}
      $faded={isDragging}
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

const PieceImage = styled.img<{ $faded?: boolean }>`
  width: 80%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  box-shadow: 0 0 0.5rem 0.25rem #000;
  background-color: #ccc;
  touch-action: manipulation;

  &:hover {
    background-color: #aaa;
  }

  ${({ $faded }) => $faded && 'opacity: 0.5;'}
`;
