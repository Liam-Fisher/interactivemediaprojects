import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { normalizePointer } from '../helpers/converting';
import { RubixSceneService } from '../rubix-scene/rubix-scene.service';

import { getDirection } from '../helpers/math';
import { Swipe } from 'src/app/types/rubix';
@Injectable({
  providedIn: 'root'
})
export class RubixPointerService {
  isDown!: boolean;
  framesDown!: number;
  direction!: Swipe;
  currentPosition!: THREE.Vector2;
  downPosition = new THREE.Vector2();
  #dims!: [number, number];
  readonly distanceThreshold: number = 0.02;
  constructor(public scene: RubixSceneService) { 
    this.reset();
  }
  set dims([width, height]: [number, number]) {
    this.#dims = [width, height];
  }
  get dims(): [number, number] {
    return this.#dims;
  }
  reset() {
    [this.isDown, this.direction,this.framesDown] = [false,'none',0];
    this.downPosition.set(0,0);
    this.currentPosition.set(0,0);
  }
  addListeners(canvas: HTMLCanvasElement) {
    canvas.addEventListener('pointerdown', (event: PointerEvent) => this.onPointerDown(event));
    canvas.addEventListener('pointermove', (event: PointerEvent) => this.onPointerMove(event));
    canvas.addEventListener('pointerup', (event: PointerEvent) => this.onPointerUp(event));
  }
  onPointerDown(event: PointerEvent) {
    event.preventDefault();
    this.isDown = true;
    normalizePointer(event, this.dims, this.downPosition);
  }
  onPointerMove(event: PointerEvent) {
    event.preventDefault();
    this.direction = getDirection(normalizePointer(event, this.scene.dims, (new THREE.Vector2())), this.downPosition, this.distanceThreshold);
  }
  onPointerUp(event: PointerEvent) {
    event.preventDefault();
    this.reset();
  }
}
