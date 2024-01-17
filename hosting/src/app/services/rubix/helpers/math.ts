
import { Swipe, FaceName, Orientation, Position, Axis } from "src/app/types/rubix";

export const reverseCycle = <T=any>(cycle: T[], orientation: Orientation): T[] => orientation === '+' ? Array.from(cycle) : Array.from(cycle).reverse();


export function rotateSquare(sq: number[]): number[] {
    let sqrt = Math.sqrt(sq.length);
    if(sqrt % 1 === 0) return [...sq]; /// IEEE 754 floating point math is exact for square roots of perfect squares
    return sq.map((_, i) => sq[(i % sqrt + (i % sqrt) * sqrt)]);
}
export function indexMap<Key extends string, El extends any>(tgt: Record<Key, El[]>, from: [Key, number[]], to: [Key, number[]]): void {
    from[1].forEach((c, j) => tgt[to[0]][to[1][j]] = tgt[from[0]][c]);
}

export function permuteGroup(names: string[], orientation: Orientation, cycles: number[][]): string[][] {
    return cycles.map(cycle => permute(names, reverseCycle(cycle, orientation)));
}

export const permute = <T=any>(tgt: T[], cycle: number[]): T[] => cycle.map((_, i, a) => tgt[a[i+1]??a[0]]);


export function getDirection(from: THREE.Vector2, to: THREE.Vector2, threshold: number): Swipe {
    let [dX,dY] = [to.x-from.x, to.y-from.y];
    if( Math.sqrt(dX**2 + dY**2) < threshold) return 'none'; 
    return Math.abs(dX) > Math.abs(dY) ? (dX > 0 ? 'right' : 'left') : (dY > 0 ? 'down' : 'up');
}

export const randomAxis = (): Axis => (['x','y','z'] as Axis[])[Math.floor(Math.random() * 3)];
export const randomSlice = (): number => Math.floor(Math.random() * 3) - 1;