import { Injectable } from '@angular/core';
import { IRubix } from 'src/app/types/rubix';
import * as THREE from 'three';
import { COLOR_PALETTE } from '../helpers/data';
@Injectable({
  providedIn: 'root'
})
export class RubixSceneService {
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  raycaster!: THREE.Raycaster;
  readonly cubeletSize = 0.75; 
  readonly cameraDistance = 2.5;
  readonly colorPalette = COLOR_PALETTE;
  constructor() { }
  init(canvas: HTMLCanvasElement)  {
    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({canvas});
    this.resize();
  }
  get dims(): [number, number] {
    return [this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight];
  }
  resize() {
  const [width, height] = this.dims;
  this.camera.aspect = width / height;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(width, height);
  }
  rotateCamera(vector: THREE.Vector3, angle: number) {
    this.scene.getObjectByName('cameraSphere')?.rotateOnWorldAxis(vector, angle)
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
