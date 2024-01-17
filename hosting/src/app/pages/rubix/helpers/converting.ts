import { Colors, FaceName, Position } from 'src/app/types/rubix';
import * as THREE from 'three';

export function positionToColors(position: Position): Colors {
    const { x, y, z } = position;
    // due to the way the cube is constructed, the colors are not in the same order as the faces
        return {
            'front':   z === 1  ? 0 : 6,
            'back':    z === -1 ? 1 : 6,
            'top':     y === 1  ? 2 : 6,
            'bottom':  y === -1 ? 3 : 6,
            'left':   x === -1  ? 4 : 6,
            'right':    x === 1 ? 5 : 6,
        }
}

export function positionToAddress(position: Position): number {
    return 26-((position.x+1) + (position.y+1) * 3 + (position.z+1) * 9);
}
export function addressToPosition(address: number): [number, number, number] {
    let iaddr= 26-address;
    return [
        (iaddr % 3) - 1, 
        (Math.floor(iaddr / 3) % 3) - 1, 
        Math.floor(iaddr / 9) - 1
    ];
}

// from intersection
export function getPosition(intersection: THREE.Intersection): Position {
    let position = intersection.object.position;
    return {x: Math.round(position.x), y: Math.round(position.y), z: Math.round(position.z)};
}
export function getFaceName(intersection: THREE.Intersection, orientation: Map<number, FaceName>): FaceName {
    let faceIndex = intersection?.face?.materialIndex as number;
    return orientation.get(faceIndex) as FaceName;
}
//
// colorPalette = [ 0xFFFFFF, 0xFFFF00,  0xFFA500, 0xFF0000, 0x00FF00, 0x0000FF, 0x000000 ]; 
// material index to face name
    // 0: front (white)
    // 1: back (yellow)
    // 2: top (orange)
    // 3: bottom (red)
    // 4: right (green)
    // 5: left (blue)
    // 6: null (black)


