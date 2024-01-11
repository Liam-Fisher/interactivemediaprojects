import { Axis, FaceName, IRubix, Orientation, Position, RotationAction } from "src/app/types/rubix";
import * as THREE from 'three';

export function getRotation(component: IRubix) {
    let {downPosition, upPosition} = component.pointerState;
    let [startPosition, startFace] = getIntersectionData(component, downPosition);
    console.log(`touched face ${startFace} at position ${JSON.stringify(startPosition)} on pointer down`);
    let [endPosition, endFace]= getIntersectionData(component, upPosition);
    console.log(`touched face ${endFace} at position ${JSON.stringify(endPosition)} on pointer up`);

    if (!startFace && !endFace) {  // check for the direction to rotate the whole cube
        console.log('both pointer events are off the cube');
        component.rotationState.queue.push(getCubeRotation(startPosition, endPosition));
    }
    else if (!startFace || !endFace) {
        console.log('only one pointer event is on a cube');
    }
    else if(startFace !== endFace) { 
        console.log('the pointer events are on different cubes but also on different faces');
    }
    else {
    console.log('the pointer events are on different cubes of the same face');
    component.rotationState.queue.push(getSliceRotation(startPosition, endPosition, startFace));
}}


function getIntersectionData(component: IRubix, pointer: THREE.Vector2): [Position, FaceName?] {
    let faceName: FaceName;
    let position: Position;
    component.raycaster.setFromCamera(pointer, component.camera);
    let objectsIntersected =  component.raycaster.intersectObjects(component.scene.children);
    console.log(`getting objects intersected at: ${pointer.x}, ${pointer.y}}`);
    console.log(`objects intersected: ${objectsIntersected.map((intersect: THREE.Intersection) => intersect.object.name).join('|')}`);
    if(objectsIntersected.length < 2) {
        let {x,y} = pointer;
        return [{x,y,z:0}];
    }
    let [intersectionA, intersectionB] = objectsIntersected.slice(0,2);
    let [nameA, nameB] =  [intersectionA.object.name, intersectionB.object.name];
    let [faceA, faceB] = [intersectionA?.face?.materialIndex, intersectionB?.face?.materialIndex];
    
    position = this.cubeletState.getPosition((nameA === 'shell' )?nameB:nameA);
    faceName = this.faceletState.getFaceName((nameA === 'shell' )?faceB:faceA);

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
    let orientation: Orientation, axis: Axis;
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
    let orientation: Orientation, axis: Axis, slice: number;    
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