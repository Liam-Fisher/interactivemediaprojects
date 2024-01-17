import { Axis, Colors, Orientation, Position } from "src/app/types/rubix";

    // due to the way the cube is constructed, the colors are not in the same order as the faces
export function positionToColors([x,y,z]: Position): Colors {
        return {
            'front':   z === 1  ? 0 : 6,
            'back':    z === -1 ? 1 : 6,
            'top':     y === 1  ? 2 : 6,
            'bottom':  y === -1 ? 3 : 6,
            'left':   x === -1  ? 4 : 6,
            'right':    x === 1 ? 5 : 6,
        }
}

export function addressToPosition(address: number): [number, number, number] {
    let iaddr= 26-address;
    return [
        (iaddr % 3) - 1, 
        (Math.floor(iaddr / 3) % 3) - 1, 
        Math.floor(iaddr / 9) - 1
    ];
}
export function getAngle(frames: number, orientation: Orientation): number {
    return Math.PI / (frames * (orientation === '+' ? 2 : -2));
}
export function getVector(vector: THREE.Vector3, axis: Axis) {
    vector.set(+(axis === 'x'), +(axis === 'y'), +(axis === 'z'));
}

export function normalizePointer(event: PointerEvent, [width, height]: [number,number], pointer: THREE.Vector2) {
    const { clientX, clientY } = event;
    return pointer.set((clientX / width) * 2 - 1, -(clientY / height) * 2 + 1);
}