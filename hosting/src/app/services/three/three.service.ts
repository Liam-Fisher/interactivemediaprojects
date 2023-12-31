import { Injectable } from '@angular/core';
import { IRubix } from 'src/app/types/rubix';
import { IThree } from 'src/app/types/threejs';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ThreeService  {
  rotateX: THREE.Vector3 = new THREE.Vector3(1,0,0);
  rotateY: THREE.Vector3 = new THREE.Vector3(0,1,0);
  rotateZ: THREE.Vector3 = new THREE.Vector3(0,0,1);
  rotationCounter: number = 0;
  constructor() { }
  createScene(component: IThree&IRubix) {
    // scene, camera, renderer, raycaster
    component.scene = new THREE.Scene();
    component.raycaster = new THREE.Raycaster();
    component.renderer = new THREE.WebGLRenderer();
    component.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    component.camera.rotation.x = -Math.PI/8;
    component.camera.position.y = 2;
    component.camera.position.z = component.params.zoom;
    // initial resize
    this.resize(component);
    // link renderer to display
    component.display.nativeElement.appendChild(component.renderer.domElement);
  }
  getPointerSnorm(component: IThree&IRubix, event: PointerEvent): THREE.Vector2 {
    const { clientX, clientY } = event;
    const x = (clientX / component.displayWidth) * 2 - 1;
    const y = -(clientY / component.displayHeight) * 2 + 1;
    return new THREE.Vector2(x,y);
  }
  resize(component: IThree&IRubix) {
    const container = component.display.nativeElement;
    component.displayWidth = container.clientWidth;
    component.displayHeight = container.clientHeight;
    component.camera.aspect = component.displayWidth / component.displayHeight;
    component.camera.updateProjectionMatrix();
    component.renderer.setSize(component.displayWidth, component.displayHeight);
  }
  render(component: IRubix) {
    component.ngZone.runOutsideAngular(() => {
        const animateFn = () => {
          requestAnimationFrame(animateFn);
          component.renderer.render(component.scene, component.camera);
          component.animations.forEach((animation) => animation());
        };
        animateFn();
      });
  }
}
// intended -> actual
// front <-> right
// back <-> left

// front -> right
// back -> left
// top -> top
// bottom -> bottom
// right -> front
// left -> back
/* 


  demoRotate(component: IThree&IRubix) {
    
    if(this.rotationCounter < Math.PI) {
      component.scene.rotateOnWorldAxis(this.rotateX, 0.01);
    }
    else if (this.rotationCounter < 2*Math.PI) {
      ;
    }
    else if (this.rotationCounter < 6*Math.PI) {
      component.scene.rotateOnWorldAxis(this.rotateY, 0.01);
    }
    else {
      ;
    }
    this.rotationCounter = (this.rotationCounter+0.01)%(8*Math.PI);
  }
    component.rotationGroup = new THREE.Group();
    component.rotationGroup.add(component.scene.getObjectByName('front_top_right')!);
    component.rotationGroup.add(component.scene.getObjectByName('front_top_center')!);
    component.rotationGroup.add(component.scene.getObjectByName('front_top_left')!);
    
    component.rotationGroup.add(component.scene.getObjectByName('front_middle_right')!);
    component.rotationGroup.add(component.scene.getObjectByName('front_middle_center')!);
    component.rotationGroup.add(component.scene.getObjectByName('front_middle_left')!);
    
    component.rotationGroup.add(component.scene.getObjectByName('front_bottom_right')!);
    component.rotationGroup.add(component.scene.getObjectByName('front_bottom_center')!);
    component.rotationGroup.add(component.scene.getObjectByName('front_bottom_left')!);
    
    component.scene.add(component.rotationGroup);
    console.log(`${component.scene.children.length} children in scene`); */