import styled from '@emotion/styled';
import { useDraggable } from '@dnd-kit/core';
import { PieceRecord } from './types';

export function Piece({ type, colour, id, image, alt }: PieceRecord) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `${type}-${colour}-${id}`,
    data: { piece: { type, colour, id, image, alt } },
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
