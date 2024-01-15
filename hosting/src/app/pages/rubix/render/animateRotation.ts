import * as THREE from 'three';
import { setRotationNames } from './setNames';
import { IRubix } from 'src/app/types/rubix';
import { setAngle, createGroup, setVector, removeGroup } from './helpers';
import { logRotationGroup } from '../helpers/logging';
// the animation can be in three states:
// 1. no rotation is in progress, and no rotations are queued
// 2. a rotation is in progress, and no rotations are queued
// 3. a rotation is in progress, and rotations are queued

 


export function animateRotation(component: IRubix) {
  let state = component.rotationState;
  // first, we need to know if there is a rotation in progress
  if(state.isRotating) {
    state.progress++;
    if(state.isCameraRotating) {
      component.scene.getObjectByName('cameraSphere')?.rotateOnWorldAxis(state.vector, state.angle);
    }
    else {
    //console.log(`rotation frame ${state.progress} of ${state.frames}`);
      state.group.rotateOnWorldAxis(state.vector, state.angle);
    }
    if(state.progress >= state.frames) {
      console.log(`rotation complete`);
      if(!state.isCameraRotating) {
        removeGroup(component.scene, state);
      }
      state.isRotating = false;
      state.progress = 0;
    }
  }
  // if there is no rotation in progress, we need to know if there is a rotation queued
  else {
    let rotation = state.queue.shift();
    if(rotation) {
      let {axis, orientation, slice} = rotation;
      
      // this should always be true
      if(axis && orientation) { 

        setAngle(state, orientation);
        setVector(state, axis);
        if(slice !== undefined) {
        console.log(`dequeing rotation | axis: ${axis}  orientation: ${orientation} slice: ${slice}`);
        // set up the rotation
        //component.cubeletState.printCubelets();
        setRotationNames(component, axis, orientation, slice);
        //component.cubeletState.printCubelets();
        //logRotationGroup(state.names);
        createGroup(component.scene, state);
        console.log(`axis: ${JSON.stringify(state.vector)} angle: ${state.angle}`);
        state.isCameraRotating = false;
        }
        else {
          state.isCameraRotating = true;
        } 
        state.isRotating = true;
      }
      else {
        throw new Error(`invalid rotation action: ${JSON.stringify(rotation)}`);
      }
    }
  }  
}

