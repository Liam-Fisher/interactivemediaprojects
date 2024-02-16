import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { COLOR_PALETTE } from '../helpers/data';
import { createObjects } from '../helpers/three';
import { flipSquare, rotateSquare } from '../helpers/math';
import { Axis, Colors } from 'src/app/types/rubix';
import { RnboDeviceService } from '../../rnbo/rnbo-device.service';
import { IEventSubscription, NumberParameter, Parameter } from '@rnbo/js';
@Injectable({
  providedIn: 'root'
})
export class RubixSceneService {
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  raycaster!: THREE.Raycaster;
  lights!: THREE.PointLight[];
  subscriptions: IEventSubscription[] = [];
  readonly framesPerScrambleRotation = 4;
  readonly framesPerRotation = 20;
  readonly cubeletSize = 0.75; 
  readonly cameraDistance = 2.5;
  readonly colorPalette = COLOR_PALETTE;
  constructor(public rnbo: RnboDeviceService) { }
  init(canvas: HTMLCanvasElement, cubeletNames: string[])  {
    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({canvas});
    this.lights = [];
    createObjects(this, cubeletNames);
    this.resize();
  }
  linkDevice() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    
    let frontLightZ = this.rnbo.device?.parametersById.get('frontLightZ') as NumberParameter | undefined;
    
    if(frontLightZ) {
      this.subscriptions.push(frontLightZ.changeEvent.subscribe((evt: number) => this.lights[0].position.z = evt));
    }
    let frontLightY = this.rnbo.device?.parametersById.get('frontLightY') as NumberParameter | undefined;
    if(frontLightY) {
      this.subscriptions.push(frontLightY.changeEvent.subscribe((evt: number) => this.lights[0].position.y = evt));
    }
    let leftLightX = this.rnbo.device?.parametersById.get('leftLightX') as NumberParameter | undefined;
    if(leftLightX) {
      this.subscriptions.push(leftLightX.changeEvent.subscribe((evt: number) => this.lights[1].position.x = evt));
    }
    let leftLightY = this.rnbo.device?.parametersById.get('leftLightY') as NumberParameter | undefined;
    if(leftLightY) {
      this.subscriptions.push(leftLightY.changeEvent.subscribe((evt: number) => this.lights[1].position.y = evt));
    }
    let topLightZ = this.rnbo.device?.parametersById.get('topLightZ') as NumberParameter | undefined;
    if(topLightZ) {
      this.subscriptions.push(topLightZ.changeEvent.subscribe((evt: number) => this.lights[2].position.z = evt));
    }
    let topLightX = this.rnbo.device?.parametersById.get('topLightX') as NumberParameter | undefined;
    if(topLightX) {
      this.subscriptions.push(topLightX.changeEvent.subscribe((evt: number) => this.lights[2].position.x = evt));
    }
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
      
      tgt.front = flipSquare(this.getFaceColors(['x', 'y','z'], castTo, castFrom));
      tgt.right = this.getFaceColors(['z','y','x'], castTo, castFrom).reverse();
      tgt.top = flipSquare(this.getFaceColors(['y','x','z'], castTo, castFrom));
/* 

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
      ${tgt.front.slice(6,9).join(' ')}`); */
      return [tgt.front, tgt.right, tgt.top].flat();
    }
}