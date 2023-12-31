import { Axis2dName, Axis3dName, FaceName, RotationName } from "src/app/types/rubix";


export function getFaceAddresses(axis3d: Axis3dName, orientation: boolean): [FaceName, FaceName, FaceName, FaceName] {
    
    if (axis3d === 'x') {
        return orientation ? ['front', 'top', 'back', 'bottom'] : ['front', 'bottom', 'back', 'top'];
    }
    if (axis3d === 'y') {
        return orientation ? ['front', 'left', 'back', 'right'] : ['front', 'right', 'back', 'left'];
    }
    if (axis3d === 'z') {
        return orientation ? ['left', 'top', 'right', 'bottom'] : ['left', 'bottom', 'right', 'top'];
    }
    throw new Error(`invalid axis ${axis3d}`);
}


export function getFaceletAddresses(axis2d?: Axis2dName, slice?: number): number[] {
    if(!axis2d || !slice) {
        return [0,1,2,3,4,5,6,7,8];
    }
    if (axis2d === 'vertical') {
        return [0,1,2].map(i => i*3 + slice+1);
    }
    else if (axis2d === 'horizontal') {
        return [0,1,2].map(i => i + (slice+1)*3);
    }
    else {
        throw new Error(`invalid axis ${axis2d}`);
    }
}

export function getCubeletAddresses(axis3d: Axis3dName, slice?: number): number[] {
    let cubelets: number[] = [];

    if (!slice) {
        for (let i = 0; i < 27; i++) {
            cubelets.push(i);
        }
    }
    else {
        
    }
    return cubelets;
}

function transposeMatrix(matrix: number[][]) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}