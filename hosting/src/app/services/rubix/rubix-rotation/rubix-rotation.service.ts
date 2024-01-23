import { Injectable } from '@angular/core';
import { Axis, Orientation, RotationAction } from 'src/app/types/rubix';
import { RubixCubeletStateService } from '../rubix-cubelet-state/rubix-cubelet-state.service';
import * as THREE from 'three';
import { RubixSceneService } from '../rubix-scene/rubix-scene.service';
import { createGroup, removeGroup } from '../helpers/three';
import { BehaviorSubject } from 'rxjs';
import { FACELET_ROTATION_SLICES, RING_FACES } from '../helpers/data';


// use the normals to determine the axis of rotation
@Injectable({
  providedIn: 'root'
})
export class RubixRotationService {
  isCubeRotating = false;
  progress: number = 0;
  frames!: number;
  angle: number = 0;
  vector = new THREE.Vector3(1,0,0);
  group: THREE.Group = new THREE.Group();
  faceColors = new BehaviorSubject<number[]>([]);
  moveInput = new BehaviorSubject<number[]>([]);
  constructor(private scene: RubixSceneService, private cubelets: RubixCubeletStateService) { }

  animateRotation() {
      this.progress++;
      this.group.rotateOnWorldAxis(this.vector, this.angle);
      if(this.progress >= this.frames) {
        this.completeRotation();
      }
      return !this.isCubeRotating;
  }
  completeRotation() {
      this.progress = 0;
      removeGroup(this.scene.scene, this.cubelets.rotated, this.group);
      this.isCubeRotating = false;
      this.faceColors.next(this.scene.getAllFaceColors(this.cubelets.faceColors));
  }
  initializeRotation(axis: Axis, orientation: Orientation, slice: number, state: string) {
        console.log('initializing SliceRotation');
        this.frames = state === 'scrambling' ?  this.scene.framesPerScrambleRotation : this.scene.framesPerRotation;
        this.vector.set( +(axis === 'x'), +(axis === 'y'), +(axis === 'z') );
        this.angle = Math.PI / (this.frames * (orientation === '+' ? 2 : -2));
        this.cubelets.rotate(axis, orientation, slice);
        this.group = createGroup(this.scene.scene,  this.cubelets.rotated);
        this.isCubeRotating = true;

        this.moveInput.next([]);
      }
      emitChangedFacelets(axis: Axis, orientation: Orientation, slice: number)  {
        let moveInput = [];
        
        let changedFaces = RING_FACES[axis][orientation];
      
        for(let face of changedFaces) {
          if(face==='front') {
            moveInput.push(0);
          }
          else if(face==='right') {
            moveInput.push(1);
          }
          else if(face==='top') {
            moveInput.push(2);
          }
          else {
            continue;
          }
          moveInput.push(...FACELET_ROTATION_SLICES[axis][face][slice+1]);
        }
        this.moveInput.next(moveInput);
      }
}
