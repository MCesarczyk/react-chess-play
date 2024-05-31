import { Coord } from './types';

type Observer = ((knightPosition: Coord) => void) | null;

export class Game {
  public knightPosition: Coord = [2, 4];
  private observers: Observer[] = [];

  public observe(receive: Observer) {
    this.observers.push(receive);
    this.emitChange();

    return () => {
      this.observers = this.observers.filter((obs) => obs !== receive);
    };
  }

  public moveKnight(toX: number, toY: number) {
    this.knightPosition = [toX, toY];
    this.emitChange();
  }

  public canMoveKnight(toX: number, toY: number) {
    const [x, y] = this.knightPosition;
    const dx = toX - x;
    const dy = toY - y;

    return (
      (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    );
  }

  public isEqualCoord(c1: Coord, c2: Coord): boolean {
    return c1[0] === c2[0] && c1[1] === c2[1];
  }

  private emitChange() {
    const position = this.knightPosition;
    this.observers.forEach((observer) => observer && observer(position));
  }
}
