import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { normalizePointer } from '../helpers/converting';
import { RubixSceneService } from '../rubix-scene/rubix-scene.service';

import {  getFaceDirection } from '../helpers/math';
import { FaceName, Swipe } from 'src/app/types/rubix';
import { RubixFaceletStateService } from '../rubix-facelet-state/rubix-facelet-state.service';
import { RubixCubeletStateService } from '../rubix-cubelet-state/rubix-cubelet-state.service';
import { RubixGameStateService } from '../rubix-game-state/rubix-game-state.service';
import { getCubeRotation, getSliceRotation } from '../helpers/logic';
@Injectable({
  providedIn: 'root'
})
export class RubixPointerService {
  isDown!: boolean;
  framesDown!: number;
  direction!: Swipe;
  currentPosition = new THREE.Vector2;
  downPosition = new THREE.Vector2();
  distance: number = 0;
  intersection!: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>|null;

  readonly distanceThreshold: number = 0.02;
  constructor(public scene: RubixSceneService, public game: RubixGameStateService, public facelets: RubixFaceletStateService, public cubelets: RubixCubeletStateService) { 
    this.reset();
  }
  reset() {
    [this.isDown, this.direction,this.framesDown,this.distance] = [false,'none',0,0];
    this.intersection = null;
    this.downPosition.set(0,0);
    this.currentPosition.set(0,0);
  }
  onPointerDown(event: PointerEvent) {
    event.preventDefault();
    this.isDown = true;
    normalizePointer(event, this.scene.dims, this.downPosition);
    this.intersection = this.scene.getIntersectedObject(this.downPosition);
    console.log(`intersected object at ${this.downPosition.x + ' ' +this.downPosition.y}`, this.intersection);
  }
  onPointerMove(event: PointerEvent) {
    
    event.preventDefault();
    if(!this.isDown) {
      return;
    }
    let currentPosition = normalizePointer(event, this.scene.dims, (new THREE.Vector2()));
    this.distance = this.downPosition.distanceTo(currentPosition);
   if(this.distance > this.distanceThreshold) {
    this.checkForRotation(currentPosition);
    }
  }
  onPointerUp(event: PointerEvent) {
    event.preventDefault();
    this.reset();
  } // top / front // back // left top bottom
  checkForRotation(currentPosition: THREE.Vector2) {
    let currentIntersection = this.scene.getIntersectedObject(currentPosition)??null;
    let [clickedFace, currentFace] = [this.intersection?.face?.materialIndex, currentIntersection?.face?.materialIndex];
    let clickedName = this.intersection?.object?.name;
console.log(`clickedName: ${clickedFace} ${clickedName}`);
     if(currentIntersection && clickedName && (typeof clickedFace === 'number') && (clickedFace === currentFace)) {
      console.log(`slice rotation ${clickedName}`);
      this.sliceRotation(this.facelets.names?.[clickedFace], currentIntersection, clickedName);
    }
    else {
      console.log('cube rotation');
      this.cubeRotation(currentPosition);
    }
  }
  sliceRotation(startFace: FaceName, currentIntersection: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>, clickedName: string) {
  console.log(`startFace: ${startFace}`);
  console.log(`currentIntersection`, currentIntersection.point);
  console.log(`clickedPoint: `, this.intersection?.point);
  let direction = getFaceDirection(startFace, this.intersection?.point, currentIntersection?.point);
  console.log(`direction: ${ direction}`);
  let position = this.cubelets.getPosition(clickedName);
  console.log('logicalPosition', position);
  let {axis, orientation, slice} = getSliceRotation(direction, startFace, position);
  console.log(`slice rotation ${axis} ${orientation} ${slice}`);
  this.game.moves.push({axis, orientation, slice});

  console.log(`${this.game.moves.length} moves queued`);
  this.reset();
  //let [axis, orientation] = SLICE_AXIS_ORIENTATION[direction][startFace as 'front'|'left'|'top'];
  //let axisIndex = ['x','y','z'].indexOf(axis);
  //let slice = this.cubelets.getPosition(this.intersection?.object?.name)[axisIndex];
  
}
  cubeRotation(currentPosition: THREE.Vector2) {
    this.game.moves.push(getCubeRotation(this.downPosition, currentPosition));
    this.reset();
  }
}
