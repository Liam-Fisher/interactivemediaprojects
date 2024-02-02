
import { Swipe, FaceName, Orientation, Position, Axis, RotationAction } from "src/app/types/rubix";

export function reorientCycle<El extends any>(cycle: El[], orientation: Orientation): El[] {
    return orientation === '-' ? Array.from(cycle) : Array.from(cycle).reverse();
}




export function permuteGroup(names: string[], orientation: Orientation, cycles: number[][]): string[][] {
    cycles.forEach(cycle => console.log(`rotating: ${cycle.map(c => names[c]).join('|')}`));
    return cycles.map(cycle => permute(names, reorientCycle(cycle, orientation)));
}

export function permute<T=any>(tgt: T[], cycle: number[]): T[] {
    let first = tgt[cycle[0]];
    return cycle.map((c, i,a) => (tgt[c] = tgt[a[i+1]]??first));
}

export const randomAxis = (): Axis => (['x','y','z'] as Axis[])[Math.floor(Math.random() * 3)];
export const randomSlice = (): number => Math.floor(Math.random() * 3) - 1;


// tranpose addrs

    // 0 -> 2
    // 1 -> 5
    // 2 -> 8
    // 3 -> 1
    // 4 -> 4
    // 5 -> 7
    // 6 -> 0
    // 7 -> 3
    // 8 -> 6


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
 // Facelet Rotation Methods

    // for the "side" face, e.g. the face that doesn;t exchange any facelets with other faces
export function flipSquare<El extends any>(sq: El[]): El[] {
        let [a,b,c,d,e,f,g,h,i] = sq;
        return [c,b,a,f,e,d,i,h,g];
    }
export function rotateSquare<El extends any>(sq: El[]): El[] {
    let [a,b,c,d,e,f,g,h,i] = sq;
    return [g,d,a,h,e,b,i,f,c];
}
export function rotateFace<Key extends string, El extends any>(tgt: Record<Key, El[]>, orientation: Orientation,  key?: Key) {
    if(key) {
        tgt[key] = rotateSquare(reorientCycle(tgt[key], orientation));
    }
}
 // for the ring of faces that exchange facelets
export function rotateSlice<Key extends string, El extends any>(tgt: Record<Key, El[]>, slices: [Key, number[]][]) {
    let [initialKey, initialIndices] = slices[0];
    let initialColors = initialIndices.map(n => tgt[initialKey][n]);
    
    for (let i = 1; i <=slices.length; i++) {
        let last =  i === slices.length;
        let [setKey, setIndices] = slices[i-1];
        let [getKey, getIndices] = last ? slices[0] : slices[i];
        console.log(`${setIndices} of ${setKey} = ${getIndices} of face: ${getKey}`);
        for(let j=0; j<getIndices.length; j++) {
           //console.log(`from ${tgt[setKey][setIndices[j]]}`);
            tgt[setKey][setIndices[j]] =  last ? initialColors[j] : tgt[getKey][getIndices[j]];
            //console.log(`to ${tgt[setKey][setIndices[j]]}`);
        }
    }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
    // Swipe Detection Methods

    // if the motion is across the top face, ignore the y axis
    // if the motion is across the left face, ignore the x axis
    // if the motion is across the front face, ignore the z axis
    export function getFaceDirection(face: FaceName, from?: THREE.Vector3, to?: THREE.Vector3): Swipe {
        if(!from || !to) return 'none'; // shouldn't happen
        if(face === 'front') return getSwipeDirection(to.x-from.x, to.y-from.y);
        if(face === 'top') return getSwipeDirection(to.x-from.x, to.z-from.z);
        if(face === 'left') return getSwipeDirection(to.z-from.z, to.y-from.y);
        return 'none'; // shouldn't happen
    }
    export function getSwipeDirection(dX: number, dY: number): Swipe {
        return Math.abs(dX) > Math.abs(dY) ? (dX > 0 ? 'right' : 'left') : (dY > 0 ? 'down' : 'up');
    }