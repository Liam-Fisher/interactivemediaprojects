import { Axis, Orientation } from "src/app/types/rubix";
import { getRotation } from "./rotationAction";
import * as THREE from 'three';


export function rotate() {
    let { orientation, axis,  slice } = getRotation.call(this);
    console.log(`orientation: ${orientation}, axis: ${axis} slice: ${slice}`);
    if (!axis || !orientation) {
        return;
    }
    
    this.rotationVector = new THREE.Vector3(+(axis==='x'), +(axis==='y'), +(axis==='z'));
    this.rotationAngle = Math.PI / (this.rotationFrames * (orientation === '+' ? 2 : -2));
    let cubeletNames: string[] = [];
    if (!slice) {
        console.log('rotating whole cube');
        rotateCube.call(this, cubeletNames, axis, orientation);
    }
    else {
        this.faceletState.rotate(axis, orientation, slice);

        cubeletNames.push(...this.cubeletState.rotate(axis, orientation, slice));
    }
    setRotationGroup.call(this, cubeletNames);
    this.isRotating = true;
    return;
}
function rotateCube(cubeletNames: string[], axis: Axis, orientation: Orientation) {
    for(let i=-1; i<=1; i++) {
        this.faceletState.rotate(axis, orientation, i);
        cubeletNames.push(...this.cubeletState.rotate(axis, orientation, i));
        if(i===0) { // ignore the fixed cube, it should always be the middle one
           cubeletNames.shift();
        }
    } // add it back here
    setRotationGroup.call(this, ['middle', ...cubeletNames]);
}

function setRotationGroup(rotatingNames: string[]) {
    console.log(`rotating names: ${rotatingNames.join('|')}`);
    if(this.rotationGroup) {
        this.rotationGroup.children.forEach((child: any) => this.scene.add(child));
    }
    this.rotationGroup = new THREE.Group();
    for(let name of rotatingNames) {
        this.rotationGroup.add(this.scene.getObjectByName(name));
    }
}
/* 
function rotateFaceColors(faces: FaceName[], facelets: number[]) {
    console.log(`initial face colors`);
    this.printFaces();
    let intialColors: number[] = Array.from(this.faceColors[faces[0]]);
    for(let i = 1; i <= faces.length; i++) {
        let isLastFace = (i === faces.length);
        let face = faces[i-1];
            for(let facelet of facelets) {
                this.faceColors[face][facelet] = isLastFace ? intialColors[facelet] : this.faceColors[faces[i]][facelet];
            }
    }
    console.log(`new face colors`);
    this.printFaces();
    return;
} */