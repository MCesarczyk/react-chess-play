import styled from '@emotion/styled';
import { useDraggable } from '@dnd-kit/core';
import { PieceItem } from './types';

interface PieceProps {
  piece: PieceItem;
  disabled?: boolean;
}

export function Piece({ piece, disabled }: PieceProps) {
  const { id, type, colour, image, alt } = piece;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `${type}-${colour}-${id}`,
    data: { piece },
  });

  return (
    <PieceImage
      ref={setNodeRef}
      $faded={isDragging}
      disabled={disabled}
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

const PieceImage = styled.img<{ $faded?: boolean; disabled?: boolean }>`
  width: 80%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  box-shadow: 0 0 0.5rem 0.25rem #000;
  background-color: #ccc;
  touch-action: manipulation;
  user-select: none;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: #aaa;
  }

  ${({ $faded }) => $faded && 'opacity: 0.5;'}
`;
