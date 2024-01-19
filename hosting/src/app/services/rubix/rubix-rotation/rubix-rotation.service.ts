import { Injectable } from '@angular/core';
import { Axis, Orientation, RotationAction } from 'src/app/types/rubix';
import { RubixCubeletStateService } from '../rubix-cubelet-state/rubix-cubelet-state.service';
import * as THREE from 'three';
import { RubixSceneService } from '../rubix-scene/rubix-scene.service';
import { createGroup, removeGroup } from '../helpers/three';


// use the normals to determine the axis of rotation
@Injectable({
  providedIn: 'root'
})
export class RubixRotationService {
  isCameraRotating = false;
  isCubeRotating = false;
  queue: RotationAction[] = [];
  progress: number = 0;
  frames!: number;
  angle: number = 0;
  vector = new THREE.Vector3(1,0,0);
  group: THREE.Group = new THREE.Group();
  names: string[] = [];
  constructor(private scene: RubixSceneService, private cubelets: RubixCubeletStateService) { }
get isRotating() {
  return this.isCameraRotating || this.isCubeRotating;
}
  animateRotation() {
      this.progress++;
      if(this.isCameraRotating) { 
        this.scene.rotateCamera(this.vector, this.angle)
      }
      else {
        this.group.rotateOnWorldAxis(this.vector, this.angle);
      }
      if(this.progress >= this.frames) {
        this.completeRotation();
      }
      return !this.isCubeRotating;
  }
  completeRotation() {
      this.progress = 0;
        removeGroup(this.scene.scene, this.cubelets.rotated, this.group);
        this.scene.getAllFaceColors(this.cubelets.faceColors);
        this.isCubeRotating = false;
      
  }
  initializeRotation(axis: Axis, orientation: Orientation) {
    // reorient
    
    this.vector.set( +(axis === 'x'), +(axis === 'y'), +(axis === 'z') );
    this.angle = Math.PI / (this.frames * (orientation === '+' ? 2 : -2));
  }
  initializeCameraRotation(axis: Axis, orientation: Orientation) {
      this.isCameraRotating = true;
      this.isCubeRotating = false;
      // change the properties of the Orientation Service
  }
  initializeSliceRotation(axis: Axis, orientation: Orientation, slice: number) {
    console.log('initializing SliceRotation');
        this.cubelets.rotate(axis, orientation, slice);
        this.group = createGroup(this.scene.scene,  this.cubelets.rotated);
        this.isCameraRotating = false;
        this.isCubeRotating = true;
      }
}
