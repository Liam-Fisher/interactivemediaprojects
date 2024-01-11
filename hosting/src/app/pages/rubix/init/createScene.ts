import { IRubix } from "src/app/types/rubix";
import * as THREE from "three";


export function createScene(component: IRubix){    
    // scene, camera, renderer, raycaster
    component.scene = new THREE.Scene();
    component.raycaster = new THREE.Raycaster();
    createCamera(component);
    createRenderer(component);
}
function createRenderer(component: IRubix) {
    const div = component.display.nativeElement;
    component.renderer = new THREE.WebGLRenderer();
    div.appendChild(component.renderer.domElement);
}
function createCamera(component: IRubix) {
    component.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    component.camera.position.set(-3,2,3);    
    component.camera.lookAt(0, 0, 0);
}