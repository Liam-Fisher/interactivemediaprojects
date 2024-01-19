import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { COLOR_PALETTE } from '../helpers/data';
import { createObjects } from '../helpers/three';
import { Axis, Colors } from '../helpers/cubie';
@Injectable({
  providedIn: 'root'
})
export class RubixSceneService {
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  raycaster!: THREE.Raycaster;
  lights!: THREE.PointLight[];
  readonly framesPerScrambleRotation = 4;
  readonly framesPerRotation = 10;
  readonly cubeletSize = 0.75; 
  readonly cameraDistance = 2.5;
  readonly colorPalette = COLOR_PALETTE;
  constructor() { }
  init(canvas: HTMLCanvasElement, cubeletNames: string[])  {
    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({canvas});
    this.lights = [];
    createObjects(this, cubeletNames);
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
  getIntersectedObject(pointer: THREE.Vector2) {
    this.raycaster.setFromCamera(pointer, this.camera);
    let intersected = this.raycaster.intersectObjects(this.scene.children);
    for(let intersection of intersected) {
      let name = intersection.object.name;
      if(name &&  name!=='cameraSphere' && name !== 'shell') {
        return intersection;
      }
    }
    return null;
    }
    colorIndexFromRay(castFrom: THREE.Vector3, castTo: THREE.Vector3): number {
      this.raycaster.set(castFrom, castTo);
      let intersected = this.raycaster.intersectObjects(this.scene.children);

      for(let intersection of intersected) {
        let name = intersection.object.name;
        let index = intersection.face?.materialIndex ?? null;
        if( index !== null && name !== 'shell') {
          return index;
        }
      }
      return -1;
    }
    getFaceColors(tgt: number[], orientation: [Axis,Axis,Axis], castTo: THREE.Vector3, castFrom: THREE.Vector3) {
      tgt = [];
      castFrom[orientation[0]] = 2;
      castTo[orientation[0]] = -1;
      castTo[orientation[1]] = 0;
      castTo[orientation[2]] = 0;

      for(let i=0; i<3; i++) {  
        for(let j=0; j<3; j++) {
          castFrom[orientation[1]] = 1-i;
          castFrom[orientation[2]] = 1-j;
          tgt.push(this.colorIndexFromRay(castFrom, castTo));
        }
      }
    }
    getAllFaceColors(tgt: Pick<Colors<number[]>, 'front'|'right'|'top'>) {
      // front, left, top, left->right top->bottom
      let castTo = new THREE.Vector3(0,0,0);
      let castFrom = new THREE.Vector3(0,0,0);
      this.getFaceColors(tgt.front, ['x', 'y','z'], castTo, castFrom);
      this.getFaceColors(tgt.right, ['z','y','x'], castTo, castFrom);
      this.getFaceColors(tgt.top, ['y','x','z'], castTo, castFrom);
      tgt.top.reverse();
    }
    
}
/* 

      console.log(`....front.....`);
      console.log(`${faceColors.front.slice(0,3).join('|')}`);
      console.log(`${faceColors.front.slice(3,6).join('|')}`);
      console.log(`${faceColors.front.slice(6).join('|')}`);

      console.log(`..............`);
      console.log(`....right.....`);
      console.log(`right: ${faceColors.right.slice(0,3).join('|')}`);
      console.log(`right: ${faceColors.right.slice(3,6).join('|')}`);
      console.log(`right: ${faceColors.right.slice(6).join('|')}`);
      
      console.log(`..............`);
      console.log(`....top.....`);
      console.log(`top: ${faceColors.top.slice(0,3).join('|')}`);
      console.log(`top: ${faceColors.top.slice(3,6).join('|')}`);
      console.log(`top: ${faceColors.top.slice(6).join('|')}`);
      console.log(`..............`);
      
      */
