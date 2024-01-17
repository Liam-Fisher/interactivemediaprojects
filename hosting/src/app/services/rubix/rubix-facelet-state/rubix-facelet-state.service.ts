
import { Axis, Colors, FaceName, Orientation } from "src/app/types/rubix";
import { FACE_NAMES, FACELET_ROTATION_GROUPS, RING_FACES, SIDE_FACES } from "../helpers/data";
import { Injectable } from "@angular/core";
import { indexMap, reverseCycle, rotateSquare } from "../helpers/math";
import { logFacelets } from "../helpers/loggers";

@Injectable({
  providedIn: 'root'
})
export class RubixFaceletStateService {
    readonly names: FaceName[] = FACE_NAMES;
    colors!: Record<FaceName, number[]>;
    constructor() {
        this.reset();
    }
    reset() {
        this.colors = {} as Colors<number[]>;
        this.names.forEach((name,i) => this.colors[name] = (new Array(9)).fill(i));
    }
    printFaces() {
        logFacelets(this.colors);
    }
    getFaceIndex(faceName: FaceName|undefined): number {
        let index = faceName ? this.names.indexOf(faceName) : -1;
        if(index === -1) throw Error(`invalid face name ${faceName}`);
        return index;
    }
    getSideFace(axis: Axis, slice: number): FaceName|undefined {
        return SIDE_FACES[axis][slice+1];
    }
    rotateSideFace(orientation: Orientation, side?: FaceName) {
        if (side) {
            this.colors[side] = rotateSquare(reverseCycle(this.colors[side], orientation));
        }
    }
    rotateSlice(slices: [FaceName, number[]][]) {
        for (let i = 0; i < slices.length; i++) {
            indexMap(this.colors, slices[i], slices[i+1] ?? slices[0]);
            // keep this for debugging
            let [fromFace, fromIndices] = slices[i];
            let [toFace, toIndices] = slices[i+1] ?? slices[0];
            console.log(`setting colors at ${toIndices} of face: ${toFace}`);
            console.log(`to colors at ${fromIndices} of face: ${fromFace}`);
        }
    }
    getRingFaces(axis: Axis, orientation: Orientation): FaceName[] {  
        return reverseCycle(RING_FACES[axis], orientation);
    }
    getSlice(axis: Axis, face: FaceName, slice: number): [FaceName, number[]] {
        return [face, FACELET_ROTATION_GROUPS[axis][this.getFaceIndex(face)][slice+1]];
    }
    rotateRingFaces(axis: Axis, slice: number, ...faces: FaceName[]) {
        if(faces.length) this.rotateSlice(faces.map(face => this.getSlice(axis, face, slice)));
    }
    rotate(axis: Axis, orientation: Orientation, slice: number) {

        let sideFace = this.getSideFace(axis, slice);
        console.log(`rotating side: ${sideFace??'none'}`);
        this.rotateSideFace(orientation, sideFace);

        let ringFaces = this.getRingFaces(axis, orientation);
        console.log(`ring rotation order: ${ringFaces.join('=>')}`);
        this.rotateRingFaces(axis, slice, ...ringFaces);    
    }
}