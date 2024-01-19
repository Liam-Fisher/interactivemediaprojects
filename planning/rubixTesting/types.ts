
export enum Face {
    'front',
    'back',
    'top',
    'bottom',
    'right',
    'left'
}
export type FaceName = keyof typeof Face;
export type Colors<T = number> = Record<FaceName, T>;

export type Axis = 'x' | 'y' | 'z';
export type Position = [number, number, number];
export type Orientation = '+' | '-';