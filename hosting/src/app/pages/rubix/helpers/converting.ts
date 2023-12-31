import { Colors, Column, ColumnName, CubeletName, FaceName, Layer, LayerName, Position, Row, RowName } from 'src/app/types/rubix';


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
export function addressToPosition(address: number): Position {
    let iaddr= 26-address;
    return {
        x: (iaddr % 3) - 1,
        y: (Math.floor(iaddr / 3) % 3) - 1,
        z: Math.floor(iaddr / 9) - 1
    };
}
export function positionToName(position: Position): CubeletName {
    const { x, y, z } = position;
    const layer = Layer[z+1] as LayerName;
    const row = Row[y+1] as RowName;
    const column = Column[x+1] as ColumnName;
    return `${positionToAddress(position)}_${layer}_${row}_${column}`;
}
export function nameToPosition(name: CubeletName): Position {
    const [layer, row, column] = name.split('_');
    const z = Layer[layer as LayerName]-1;
    const y = Row[row as RowName]-1;
    const x = Column[column as ColumnName]-1;
    return { x, y, z };
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


