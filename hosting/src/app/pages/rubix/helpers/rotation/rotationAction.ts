import { Axis, Axis2dName, Axis3dName, FaceName, Orientation, Position, RotationAction } from "src/app/types/rubix";
import { addressToPosition, getFaceName, getPosition } from "../converting";
import * as THREE from 'three';

export function getRotation(): RotationAction {
    let [startPosition, startFace] = getIntersectionData.call(this, this.positionAtPointerDown);
    console.log(`touched face ${startFace} at position ${JSON.stringify(startPosition)} on pointer down`);
    let [endPosition, endFace]= getIntersectionData.call(this, this.positionAtPointerUp);
    console.log(`touched face ${endFace} at position ${JSON.stringify(endPosition)} on pointer up`);

    if (!startFace && !endFace) {  // check for the direction to rotate the whole cube
        console.log('both pointer events are off the cube');
        return getCubeRotation(startPosition, endPosition);
    }
    if (!startFace || !endFace) {
        console.log('only one pointer event is on a cube');
        return {};
    }
    if(startFace !== endFace) { 
        console.log('the pointer events are on different cubes and different faces');
        return {};
    }
    return getSliceRotation(startPosition, endPosition, startFace); 
}


function getIntersectionData(pointer: THREE.Vector2): [Position, FaceName?] {
    let faceName: FaceName;
    let position: Position;
    this.raycaster.setFromCamera(pointer, this.camera);
    let objectsIntersected =  this.raycaster.intersectObjects(this.scene.children);
    console.log(`getting objects intersected at: ${pointer.x}, ${pointer.y}}`);
    console.log(`objects intersected: ${objectsIntersected.map((intersect: THREE.Intersection) => intersect.object.name).join('|')}`);
    if(objectsIntersected.length < 2) {
        let {x,y} = pointer;
        return [{x,y,z:0}];
    }
    let [intersectionA, intersectionB] = objectsIntersected.slice(0,2);
    let [nameA, nameB] =  [intersectionA.object.name, intersectionB.object.name];
    let [faceA, faceB] = [intersectionA.face.materialIndex, intersectionB.face.materialIndex];
    
    position = this.cubeletState.getPosition((nameA === 'shell' )?nameB:nameA);
    faceName = this.faceletState.getFaceName((nameA === 'shell' )?faceB:faceA);

    console.log(`object intersected: ${name}`);
    console.log(`position: ${JSON.stringify(position)}`);
    return [position, faceName];
}


function getDeltaPosition(start: Position, end: Position): Position {
    return { 
        x: end.x - start.x,
        y: end.y - start.y,
        z: end.z - start.z
    }
}
function getCubeRotation(startPosition: Position, endPosition: Position): RotationAction {
    let orientation: Orientation, axis: Axis3dName;
    let {x,y} = getDeltaPosition(startPosition, endPosition);
    if(Math.sqrt(x*x+y*y)<0.25) {
        console.log('the pointer events are too close to each other');
        return {};// ignore small movements
    }
    if(Math.abs(y/x) > 0.25) {
        axis = ((x > 0) === (y > 0)) ? 'z' : 'x';
        orientation = y < 0 ? '+' : '-';
    }
    else {
        axis = 'y';
        orientation = x < 0 ? '+' : '-';
    }
    return { orientation, axis };
}

function getSliceRotation(start: Position, end: Position, face: FaceName): RotationAction  {
    let orientation: Orientation, axis: Axis, axis2d: Axis2dName, slice: number;    
    let {x,y,z} = getDeltaPosition(start, end);
    if(x !== 0) { 
        axis = face === 'front' ?'y':'z';
        orientation = x < 0 ? '+':'-';
        slice = start.x;
    }
    else if(y !== 0) { 
        axis = face === 'left' ?'z':'x';
        orientation = y < 0 ? '+':'-';
        slice = start.y;
    }
    else if(z !== 0) { 
        axis = face === 'top' ?'x':'y';
        orientation = z < 0 ? '+':'-';
        slice = start.z;
    }
    else {
        console.log(`both pointer events are on the same cube`);
        return {};
    }
    console.log('both pointer events are on different cubes');
    return {axis, orientation, slice};
}
/* 
function getSliceRotation(start: Position, end: Position, face: FaceName): RotationAction  {
    let orientation: boolean, axis3d: Axis3dName, axis2d: Axis2dName, slice: number;    
    let {x,y,z} = getDeltaPosition(start, end);
    if(x !== 0) { 
        [orientation, slice] = [x < 0, start.x];
        [axis3d, axis2d] = (face === 'front' ? ['y', 'horizontal'] : ['z', 'horizontal']);
    }
    else if(y !== 0) { 
        [orientation, slice] = [y < 0, start.y];
        [axis3d, axis2d] = (face === 'left' ? ['z', 'vertical'] : ['x', 'vertical']);
    }
    else if(z !== 0) { 
        [orientation, slice] = [z < 0, start.z];
        [axis3d, axis2d] = (face === 'top' ? ['x', 'vertical'] : ['y', 'horizontal']);
    }
    else {
        console.log(`both pointer events are on the same cube`);
        return {};
    }
    console.log('both pointer events are on different cubes');
    return { orientation, axis3d, face, axis2d, slice}; 
}
// if no faces are touched, a diagonal swipe or a horizontal swipe that crosses the display center is a rotation on the whole cube
function getCubeRotation(startPosition: Position, endPosition: Position): RotationAction {
    let orientation: boolean, axis3d: Axis3dName;
    let {x,y} = getDeltaPosition(startPosition, endPosition);
    if(Math.sqrt(x*x+y*y)<0.25) {
        console.log('the pointer events are too close to each other');
        return {};// ignore small movements
    }
    if(Math.abs(y/x) > 0.25) {
        [orientation, axis3d] = [(y < 0), ((x > 0) === (y > 0)) ? 'z' : 'x'];
    }
    else {
        [orientation, axis3d] = [(x < 0), 'y'];
    }
    return { orientation, axis3d };
} */
// [face, 3dAxis] => 2dAxis

    // motion across the x axis on the front face is horizontal on the face, and means a rotation on the y axis, 
    // motion across the x axis on the top face is horizontal on the face, and means a rotation on the z axis 
    // motion across the y axis on the front face is vertical on the face, and means a rotation on the x axis
    // motion across the y axis on the left face is vertical on the face, and means a rotation on the z axis
    // motion across the z axis on the left face is horizontal on the face, and means a rotation on the y axis
// [front, y] => horizontal
// [left, y] => horizontal
// [front, z] => vertical
// [left, z] => horizontal
// [left, x] => vertical
// [top, z] => vertical
// [top, x] => horizontal