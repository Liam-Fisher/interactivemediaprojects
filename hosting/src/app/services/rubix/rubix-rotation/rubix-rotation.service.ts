import { Injectable } from '@angular/core';
import { Axis, IRubix, Orientation, RotationAction } from 'src/app/types/rubix';
import { RubixCubeletStateService } from '../rubix-cubelet-state/rubix-cubelet-state.service';
import { RubixFaceletStateService } from '../rubix-facelet-state/rubix-facelet-state.service';
import * as THREE from 'three';
import { RubixSceneService } from '../rubix-scene/rubix-scene.service';
import { createGroup, removeGroup } from '../helpers/three';
import { getAngle, setVector } from '../helpers/converting';
@Injectable({
  providedIn: 'root'
})
export class RubixRotationService {
  isCameraRotating = false;
  isCubeRotating = false;
  queue: RotationAction[] = [];
  frames: number = 10;
  progress: number = 0;
  angle: number = 0;
  vector = new THREE.Vector3(1,0,0);
  group: THREE.Group = new THREE.Group();
  names: string[] = [];
  constructor(private scene: RubixSceneService, private cubelets: RubixCubeletStateService, private facelets: RubixFaceletStateService) { }
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
  }
  completeRotation() {
      this.progress = 0;
      this.isCameraRotating = false;
      if(this.isCubeRotating) {
        removeGroup(this.scene.scene, this.cubelets.names, this.group);
        this.isCubeRotating = false;
      }
  }
  initializeRotation(axis: Axis, orientation: Orientation) {
    this.vector.set( +(axis === 'x'), +(axis === 'y'), +(axis === 'z') );
    this.angle = Math.PI / (this.frames * (orientation === '+' ? 2 : -2));
  }
  initializeCameraRotation(axis: Axis, orientation: Orientation) {
      this.isCameraRotating = true;
      this.isCubeRotating = false;
  }
  initializeSliceRotation(axis: Axis, orientation: Orientation, slice: number) {
        this.cubelets.rotate(axis, orientation, slice);
        this.group = createGroup(this.scene.scene,  this.cubelets.names);
        this.isCameraRotating = false;
        this.isCubeRotating = true;
      }
}
