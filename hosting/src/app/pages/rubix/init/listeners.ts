
import { IRubix } from "src/app/types/rubix";
import * as THREE from "three";
import { getRotation } from "../helpers/rotationAction";

export function addListeners(component: IRubix) {
    
    component.onWindowResize ??= onWindowResize.bind(component);
    component.onPointerDown ??= onPointerDown.bind(component);
    component.onPointerUp ??= onPointerUp.bind(component);
    
    component.ngZone.runOutsideAngular(() => {
        window.addEventListener('resize', () => component.onWindowResize());
        component.renderer.domElement.addEventListener('pointerdown',
            (event: PointerEvent) => component.onPointerDown(event));
        component.renderer.domElement.addEventListener('pointerup',
            (event: PointerEvent) => component.onPointerUp(event));
    });
}
export function removeListeners(component: IRubix) {
    component.ngZone.runOutsideAngular(() => {
        window.removeEventListener('resize', () => component.onWindowResize());
        component.renderer.domElement.removeEventListener('pointerdown',
            (event: PointerEvent) => component.onPointerDown(event));
        component.renderer.domElement.removeEventListener('pointerup',
            (event: PointerEvent) => component.onPointerUp(event));
    });
}

export function onWindowResize() {
    const div = this.display.nativeElement;
    this.displayWidth = div.clientWidth;
    this.displayHeight = div.clientHeight;
    this.camera.aspect = this.displayWidth / this.displayHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.displayWidth, this.displayHeight);
}

export function onPointerDown(event: PointerEvent) {
    event.preventDefault();
    let {pointerState, displayWidth, displayHeight} = this as IRubix;
    setPointerSnorm(displayWidth, displayHeight, pointerState.upPosition, event);
    pointerState.isDown = true;
}

export function onPointerUp(event: PointerEvent) {
    let {pointerState, displayWidth, displayHeight} = this as IRubix;
    setPointerSnorm(displayWidth, displayHeight, pointerState.upPosition, event);
    pointerState.isDown = false;
    getRotation(this);
}

export function setPointerSnorm([width, height]: [number,number], pointer: THREE.Vector2, event: PointerEvent) {
    const { clientX, clientY } = event;
    pointer.set((clientX / width) * 2 - 1, -(clientY / height) * 2 + 1);
}