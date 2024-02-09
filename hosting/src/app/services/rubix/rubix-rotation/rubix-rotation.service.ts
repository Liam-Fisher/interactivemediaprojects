import { EffectRef, Injectable, effect, signal } from '@angular/core';
import { Axis, Orientation, RotationAction } from 'src/app/types/rubix';
import { RubixCubeletStateService } from '../rubix-cubelet-state/rubix-cubelet-state.service';
import * as THREE from 'three';
import { RubixSceneService } from '../rubix-scene/rubix-scene.service';
import { FACELET_ROTATION_SLICES, RING_FACES } from '../helpers/data';
import { RnboDeviceService } from '../../rnbo/rnbo-device.service';
import { createGroup, removeGroup } from '../helpers/three/groups';

// use the normals to determine the axis of rotation
@Injectable({
  providedIn: 'root',
})
export class RubixRotationService {
  isCubeRotating = false;
  progress: number = 0;
  frames!: number;
  angle: number = 0;
  vector = new THREE.Vector3(1, 0, 0);
  group: THREE.Group = new THREE.Group();
  constructor(
    public device: RnboDeviceService,
    private scene: RubixSceneService,
    private cubelets: RubixCubeletStateService
  ) {}

  animateRotation() {
    this.progress++;
    this.group.rotateOnWorldAxis(this.vector, this.angle);
    if (this.progress >= this.frames) {
      this.completeRotation();
    }
    return !this.isCubeRotating;
  }
  completeRotation() {
    this.progress = 0;
    removeGroup(this.scene.scene, this.cubelets.rotated, this.group);
    this.isCubeRotating = false;
    let faceColorArray = this.scene.getAllFaceColors(this.cubelets.faceColors);
    console.log(
      `rotation complete, emitting faceColors: ${faceColorArray.join(' ')}`
    );
    this.device.inport.next(['faceColors', faceColorArray]);
  }
  initializeRotation(
    axis: Axis,
    orientation: Orientation,
    slice: number,
    state: string
  ) {
    console.log('initializing SliceRotation');
    this.frames =
      state === 'scrambling'
        ? this.scene.framesPerScrambleRotation
        : this.scene.framesPerRotation;
    this.vector.set(+(axis === 'x'), +(axis === 'y'), +(axis === 'z'));
    this.angle = Math.PI / (this.frames * (orientation === '+' ? 2 : -2));
    this.cubelets.rotate(axis, orientation, slice);
    this.group = createGroup(this.scene.scene, this.cubelets.rotated);
    if (state !== 'scrambling') {
      let move = this.getMoveAsIntList(axis, orientation, slice);
      console.log(
        `rotation starting, emitting move: ${axis} ${orientation} ${slice} | ${move.join(
          ' '
        )}`
      );

      this.device.inport.next(['moveInput', move]);
    }
    this.isCubeRotating = true;
  }
  getMoveAsIntList(axis: Axis, orientation: Orientation, slice: number) {
    return [
      ['x', 'y', 'z'].indexOf(axis),
      ['+', '-'].indexOf(orientation),
      slice,
    ];
  }
  changedFacelets(axis: Axis, orientation: Orientation, slice: number) {
    let changedFacelets = [];
    let changedFaces = RING_FACES[axis][orientation];
    for (let face of changedFaces) {
      if (face === 'front') {
        changedFacelets.push(0);
      } else if (face === 'right') {
        changedFacelets.push(1);
      } else if (face === 'top') {
        changedFacelets.push(2);
      } else {
        continue;
      }
      changedFacelets.push(...FACELET_ROTATION_SLICES[axis][face][slice + 1]);
    }
    return changedFacelets;
  }
}
