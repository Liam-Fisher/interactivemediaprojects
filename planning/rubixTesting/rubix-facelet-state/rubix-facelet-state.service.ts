
import { Axis, Colors, FaceName, Orientation } from "src/app/types/rubix";
import { FACE_NAMES,  FACELET_ROTATION_SLICES, RING_FACES, SIDE_FACES } from "../../../hosting/src/app/services/rubix/helpers/data";
/* import { Injectable } from "@angular/core"; */
import { rotateFace, rotateSlice } from "../../../hosting/src/app/services/rubix/helpers/math";
import { logFacelets } from "../../../hosting/src/app/services/rubix/helpers/loggers";
/* 
@Injectable({
  providedIn: 'root'
}) */
export class RubixFaceletStateService {
    readonly materialIndices = [0,1,2,3,4,5];
    readonly names: FaceName[] = FACE_NAMES;
    colors!: Record<FaceName, number[]>;
    faceMap: Map<FaceName, FaceName> = new Map();
    constructor() {
        this.reset();
    }
    reset() {
        this.colors = {} as Colors<number[]>;
        this.names.forEach((name,i) => {
            this.colors[name] = (new Array(9)).fill(i);
            this.faceMap.set(name, name);   
        });
        this.printFaces();
    }
    printFaces() {
        //this.faceMap.forEach((value, key) => console.log(`camera perspective: ${key}, cube perspective: ${value}`));
        logFacelets(this.colors);
    }
    getFaceIndex(faceName: FaceName|undefined): number {
        let index = faceName ? this.names.indexOf(faceName) : -1;
        if(index === -1) {
            throw Error(`invalid face name ${faceName}`);
        }    
        return index;
    }
    getSlices(axis: Axis, faces: FaceName[], slice: number): [FaceName, number[]][] {
        return faces.map(face => [face, FACELET_ROTATION_SLICES[axis][face][slice+1]]);
    }
    rotate(axis: Axis, orientation: Orientation, slice: number) {

        let sideFace = SIDE_FACES[axis][slice+1];
       // console.log(`rotating side: ${sideFace??'none'}`);
        rotateFace(this.colors, orientation, sideFace);

        let ringFaces = RING_FACES[axis][orientation];
        rotateSlice(this.colors, this.getSlices(axis, ringFaces, slice));   
     //   this.printFaces();
    }
}