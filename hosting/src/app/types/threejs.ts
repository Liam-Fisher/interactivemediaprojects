import { ElementRef, NgZone } from '@angular/core';
import * as THREE from 'three';
export interface IThree {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    raycaster: THREE.Raycaster;
    display: ElementRef<HTMLDivElement>;
    ngZone: NgZone
}
