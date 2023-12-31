import { Axis3dName, FaceName } from "src/app/types/rubix";
import { getRotation } from "./rotationAction";
import * as THREE from 'three';
import { getCubeletAddresses, getFaceAddresses, getFaceletAddresses } from "./addresses";


export function rotate() {
    let { orientation, axis3d, face,  axis2d, slice } = getRotation.call(this);
    console.log(`orientation: ${orientation}, axis3d: ${axis3d}, face: ${face}, axis2d: ${axis2d}, slice: ${slice}`);
    if (!axis3d || orientation === undefined) {
        return;
    }
    console.log(`rotating from face: ${face} on axis ${axis3d} with orientation: ${orientation}`);
    let faces = getFaceAddresses(axis3d, orientation);
    let cubelets = getCubeletAddresses(axis3d, slice);
    let facelets = getFaceletAddresses(axis2d, slice);
    console.log(`face rotation order: ${faces.join('=>')}`);
    console.log(`cubelets addresses: ${cubelets.join('|')}`);
    console.log(`facelet addresses: ${facelets.join('|')}`);
    if (!slice || !face || !axis2d) {
        console.log('rotating whole cube');
        rotateFaceColors.call(this, faces, facelets);
    }
    else {
        console.log(`rotating slice: ${slice} ${axis2d}`);
        rotateFaceColors.call(this, faces, facelets);
    }
    setRotationVector.call(this, axis3d);
    setRotationAngle.call(this, orientation);
    setRotationGroup.call(this, cubelets);
    this.isRotating = true;
    return;
}

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
}
function setRotationVector(axis3d: Axis3dName) {
    this.rotationVector = new THREE.Vector3(+(axis3d === 'x'),+(axis3d === 'y'),+(axis3d === 'z'));
}

function setRotationAngle(orientation: boolean) {
    let orientationFactor = orientation ? 4 : -4;
    this.rotationAngle = Math.PI / (this.rotationFrames * orientationFactor);
}

function setRotationGroup(addresses: number[]) {
    this.rotationGroup = new THREE.Group();
    addresses.forEach((addr: number) => this.rotationGroup.add(this.scene.children[addr]));
    this.scene.add(this.rotationGroup);
}