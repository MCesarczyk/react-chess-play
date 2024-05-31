import { Coord } from './types';

export function observe(receive: (knightPosition: Coord) => void) {
  const randPos = () => Math.floor(Math.random() * 8);
  setInterval(() => receive([randPos(), randPos()]), 500);
}
