import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { COLOR_PALETTE } from '../helpers/data';
import { createObjects } from '../helpers/three';
import { Axis, Colors } from '../helpers/cubie';
import { BehaviorSubject } from 'rxjs';
import { flipSquare, rotateSquare } from '../helpers/math';
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
  ngOnDestroy() {
    this.renderer.dispose();
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
    getFaceColors(orientation: [Axis,Axis,Axis], castTo: THREE.Vector3, castFrom: THREE.Vector3) {
      let colorIndices: number[] = [];
      let isRight = orientation[0] === 'z';
      castFrom[orientation[0]] = isRight? -2 :2;
      castTo[orientation[0]] =  isRight?1:-1;
      castTo[orientation[1]] = 0;
      castTo[orientation[2]] = 0;

      for(let i=0; i<3; i++) {  
        for(let j=0; j<3; j++) {
          castFrom[orientation[1]] = 1-i;
          castFrom[orientation[2]] = 1-j;
          let index = this.colorIndexFromRay(castFrom, castTo);
          colorIndices.push(index);
        }
      }
      return colorIndices;
    }
    getAllFaceColors(tgt: Pick<Colors<number[]>, 'front'|'right'|'top'>) {
      //console.log(`getting all face colors`);
      //console.log(tgt);
      let castTo = new THREE.Vector3(0,0,0);
      let castFrom = new THREE.Vector3(0,0,0);
      
      tgt.front = this.getFaceColors(['x', 'y','z'], castTo, castFrom);
      tgt.top = flipSquare(this.getFaceColors(['y','x','z'], castTo, castFrom).reverse());
      tgt.right = this.getFaceColors(['z','y','x'], castTo, castFrom);


      console.log(`top: 
      ${tgt.top.slice(0,3).join(' ')}
      ${tgt.top.slice(3,6).join(' ')}
      ${tgt.top.slice(6,9).join(' ')}`);

      console.log(`right:
      ${tgt.right.slice(0,3).join(' ')}
      ${tgt.right.slice(3,6).join(' ')}
      ${tgt.right.slice(6,9).join(' ')}`);
      console.log(`front:
      ${tgt.front.slice(0,3).join(' ')}
      ${tgt.front.slice(3,6).join(' ')}
      ${tgt.front.slice(6,9).join(' ')}`);
      return Object.values(tgt).flat();
    }
}