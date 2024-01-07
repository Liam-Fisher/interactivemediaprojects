import { rotationCycle } from "./math";
import { Rotation } from "./types";

// the axis about which the facelets are rotated
type Axis = 'x' | 'y' | 'z';
// the orientation of a rotation 
type Orientation = '+' | '-';
// x+: upwards, y+: right, z+: clockwise
type FaceName = 'front' | 'back' | 'top' | 'bottom' | 'right' | 'left';

const faceletAddressObject: Record<string, Record<'x' | 'y' | 'z', number[][]>> = {
    "front": {
        "y": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "x": [[0, 3, 6], [1, 4, 7], [2, 5, 8]], "z": []
    },
    "left": {
        "y": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "z": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "x": []
    },
    "top": {
        "z": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "x": [[0, 3, 6], [1, 4, 7], [2, 5, 8]], "y": []
    },
    "back": {
        "y": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "x": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "z": []
    },
    "right": {
        "y": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "z": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "x": []
    },
    "bottom": {
        "z": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "x": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "y": []
    }
}

class RubixFaceletState {
    readonly faceNames: FaceName[] = ['front', 'back', 'top', 'bottom', 'left', 'right'];
    facelets!: Record<FaceName, number[]>;
    constructor() {
        this.reset();
    }
    reset() {
        this.facelets = Object.fromEntries(this.faceNames.map((name, i) => [name, (new Array(9)).fill(i)])) as Record<FaceName, number[]>;
    }
    printFaces() {
        console.log(`... ... ... printing faces ... ... ... ... `);
        for (let face in this.facelets) {
          let colors = this.facelets[face as FaceName];
          console.log(`${face}:           `);
          console.log(`${colors[0]}|${colors[1]}|${colors[2]}`);
          console.log(`${colors[3]}|${colors[4]}|${colors[5]}`);
          console.log(`${colors[6]}|${colors[7]}|${colors[8]}`);
        }
        console.log(`... ... ... ...  ... ... ... ... ... ... `);
      }
    transposeFace(f: number[], o: Orientation): number[] {
        let map = f.map((_, i) => f.at((i % 3 + (i % 3) * 3))) as number[];
        return o === '+' ? map : map.reverse();
    }
    rotateSideFace(axis: Axis, orientation: Orientation, slice: number) {
        let sideFaceName = this.getSideFace(axis, slice);
        if (sideFaceName) {
            this.facelets[sideFaceName] = this.transposeFace(this.facelets[sideFaceName], orientation);
        }
    }/* 
    getFaceletAddress(axis2d: 'horizontal' | 'vertical', slice: number): number[][] {
    
    
    } */
    getSideFace(axis: Axis, slice: number): FaceName | undefined {
        if (slice === 0) return undefined;
        if (axis === 'x') return slice === -1 ? 'left' : 'right';
        if (axis === 'y') return slice === -1 ? 'top' : 'bottom';
        if (axis === 'z') return slice === -1 ? 'front' : 'back';
    }
    getRingFaces(axis: Axis): FaceName[] {
        if (axis === 'x') return ['front', 'bottom', 'back', 'top'] // 0 2 1 3 | 2 0 3 1
        if (axis === 'y') return ['left', 'front', 'right', 'back'] // 4 0 5 1 | 1 5 0 4
        if (axis === 'z') return ['top', 'right', 'bottom', 'left'] // 2 5 3 4 | 2 5 3 4
        throw new Error(`invalid axis ${axis}`);
    }
    rotateSlice(ring: FaceName[], facelets: number[][]) {
        let initial: number[] = Array.from(this.facelets[ring[0]]);
        for (let i = 1; i <= ring.length; i++) {
            let isLastFace = (i === ring.length);
            for (let j = 0; j < 3; j++) {
                if (isLastFace) {
                    console.log(`setting facelet ${facelets[i - 1][j]} of face: ${ring[i - 1]} to facelet ${facelets[0][j]} of face: ${ring[0]}`);
                    this.facelets[ring[i - 1]][facelets[i - 1][j]] = initial[facelets[0][j]];
                }
                else {
                    console.log(`setting facelet ${facelets[i - 1][j]} of face: ${ring[i - 1]} to facelet ${facelets[i][j]} of face: ${ring[i]}`);
                    this.facelets[ring[i - 1]][facelets[i - 1][j]] = this.facelets[ring[i]][facelets[i][j]];
                }
            }
        }
    }
    rotate(axis3d: 'x' | 'y' | 'z', orientation: Orientation, slice: number) {

        this.rotateSideFace(axis3d, orientation, slice);

        let ring = this.getRingFaces(axis3d);
        console.log(`ring rotation order: ${ring.join('=>')}`);

        if (orientation) {
            console.log(`reversing orientation`);
            [ring[1], ring[3]] = [ring[3], ring[1]];
            console.log(`ring rotation order: ${ring.join('=>')}`);
        }
        
        let facelets = ring.map(face => faceletAddressObject[face][axis3d][slice as number + 1]);
        console.log( `facelet addresses: ${facelets.map(f => f.join('|')).join(' ')}`);
        this.rotateSlice(ring, facelets);
    }
}


const state = new RubixFaceletState();

const testRotations: Rotation[] = [
    { orientation: '+', axis3d: 'x', slice: -1 },
    { orientation: '-', axis3d: 'x', slice: 0 },
    { orientation: '+', axis3d: 'x', slice: 1 },
    
    { orientation: '+', axis3d: 'x', slice: -1 },
    { orientation: '-', axis3d: 'x', slice: 0 },
    { orientation: '-', axis3d: 'x', slice: 1 },
      
    { orientation: '+', axis3d: 'x', slice: -1 },
    { orientation: '-', axis3d: 'x', slice: 0 },
    { orientation: '+', axis3d: 'x', slice: 1 },
  
    { orientation: '+', axis3d: 'x', slice: -1 },
    { orientation: '-', axis3d: 'x', slice: 0 },
    { orientation: '-', axis3d: 'x', slice: 1 }
    
  ];
  
  state.printFaces();
  for (let test = 0; test < testRotations.length; test++) {
    let testRotation = testRotations[test];
    let { orientation, axis3d, slice } = testRotation;
    console.log(`test: ${test} ~~~~~~~~~~`);
    console.log(`rotating slice ${slice} on axis ${axis3d} with orientation: ${orientation}`);
    state.rotate(axis3d, orientation, slice);
    
    state.printFaces();
} 