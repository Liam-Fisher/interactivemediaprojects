import { Axis, Colors, FaceName, Orientation } from "src/app/types/rubix";
import { FACE_NAMES, FACELET_ROTATION_GROUPS } from "./data";
import { reverseCycle } from "src/app/services/rubix/rubix-facelet-state/helper";

export class FaceletState {
    faceNames!: FaceName[];
    colors!: Colors<number[]>;
    orientation!: Map<number, FaceName>; // could use another array but this is more readable
    constructor() {
        this.reset();
    }
    reset() {
        this.faceNames = Array.from(FACE_NAMES);
        this.orientation = new Map();
        this.colors = {} as Colors<number[]>;
        for (let i=0; i<6; i++) {
            let face = this.faceNames[i];
            this.orientation.set(i, face);
            this.colors[face] = (new Array(9)).fill(i);
        }
    }
    printFaces() {
        console.log(`... ... ... printing faces ... ... ... ... `);
        for (let face in this.colors) {
          let colors = this.colors[face as FaceName];
          console.log(`${face}:           `);
          console.log(`${colors[2]}|${colors[1]}|${colors[0]}`);
          console.log(`${colors[5]}|${colors[4]}|${colors[3]}`);
          console.log(`${colors[8]}|${colors[7]}|${colors[6]}`);
        }
        console.log(`... ... ... ...  ... ... ... ... ... ... `);
      }
      getFaceName(faceIndex: number): FaceName {
        return this.orientation.get(faceIndex) as FaceName;
    }
    transposeFace(f: number[], o: Orientation): number[] {
        let map = f.map((_, i) => f.at((i % 3 + (i % 3) * 3))) as number[];
        return o === '+' ? map : map.reverse();
    }
    rotateSideFace(axis: Axis, orientation: Orientation, slice: number) {
        let sideFaceName = this.getSideFace(axis, slice);
        if (!sideFaceName) return;
        this.colors[sideFaceName] = this.transposeFace(this.colors[sideFaceName], orientation);
        
    }
    getSideFace(axis: Axis, slice: number): FaceName | undefined {
        if (slice === 0) return undefined;
        if (axis === 'x') return slice === -1 ? 'left' : 'right';
        if (axis === 'y') return slice === -1 ? 'top' : 'bottom';
        if (axis === 'z') return slice === -1 ? 'front' : 'back';
        throw new Error(`invalid axis ${axis}`);
    }
    getRingFaces(axis: Axis): FaceName[] {
        if (axis === 'x') return ['front', 'bottom', 'back', 'top'] // 0 2 1 3 | 2 0 3 1
        if (axis === 'y') return ['left', 'front', 'right', 'back'] // 4 0 5 1 | 1 5 0 4
        if (axis === 'z') return ['top', 'right', 'bottom', 'left'] // 2 5 3 4 | 2 5 3 4
        throw new Error(`invalid axis ${axis}`);
    }
    rotateSlice(ring: FaceName[], facelets: number[][]) {
        let initial: number[] = Array.from(this.colors[ring[0]]);
        for (let i = 1; i <= ring.length; i++) {
            
            let isLastFace = (i === ring.length);
            for (let j = 0; j < 3; j++) {
                if (isLastFace) {
                    console.log(`setting facelet ${facelets[i - 1][j]} of face: ${ring[i - 1]} to facelet ${facelets[0][j]} of face: ${ring[0]}`);
                    this.colors[ring[i - 1]][facelets[i - 1][j]] = initial[facelets[0][j]];
                }
                else {
                    console.log(`setting facelet ${facelets[i - 1][j]} of face: ${ring[i - 1]} to facelet ${facelets[i][j]} of face: ${ring[i]}`);
                    this.colors[ring[i - 1]][facelets[i - 1][j]] = this.colors[ring[i]][facelets[i][j]];
                }
            }
        }
    }
    rotateRingFaces(axis: Axis, orientation: Orientation, slice: number) {
        let ring = this.getRingFaces(axis);
        reverseCycle(ring, orientation);
        console.log(`ring rotation order: ${ring.join('=>')}`);
        // get facelet addresses with logic??
        let facelets = ring.map(face => FACELET_ROTATION_GROUPS[face][axis][slice as number + 1]);
        console.log( `facelet addresses: ${facelets.map(f => f.join('|')).join(' ')}`);
        this.rotateSlice(ring, facelets);
    }
    rotate(axis3d: 'x' | 'y' | 'z', orientation: Orientation, slice: number) {
        this.rotateSideFace(axis3d, orientation, slice);
        let ring = this.getRingFaces(axis3d);
        if (orientation) {
            [ring[1], ring[3]] = [ring[3], ring[1]];
        }
        console.log(`ring rotation order: ${ring.join('=>')}`);
        // get facelet addresses with logic??
        let facelets = ring.map(face => FACELET_ROTATION_GROUPS[face][axis3d][slice as number + 1]);
        console.log( `facelet addresses: ${facelets.map(f => f.join('|')).join(' ')}`);
        this.rotateSlice(ring, facelets);
    }
}