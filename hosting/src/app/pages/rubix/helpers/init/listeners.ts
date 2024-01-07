
import { IRubixEvent } from "src/app/types/rubix";
import { rotate } from "../rotation/main";

export function addListeners<T extends IRubixEvent>(component: T) {
    component.ngZone.runOutsideAngular(() => {
        window.addEventListener('resize', () => component.onWindowResize());
        component.renderer.domElement.addEventListener('pointerdown',
            (event: PointerEvent) => component.onPointerDown(event));
        component.renderer.domElement.addEventListener('pointerup',
            (event: PointerEvent) => component.onPointerUp(event));
    });
}
export function removeListeners<T extends IRubixEvent>(component: T) {
    component.ngZone.runOutsideAngular(() => {
        window.removeEventListener('resize', () => component.onWindowResize());
        component.renderer.domElement.removeEventListener('pointerdown',
            (event: PointerEvent) => component.onPointerDown(event));
        component.renderer.domElement.removeEventListener('pointerup',
            (event: PointerEvent) => component.onPointerUp(event));
    });
}

export function onPointerDown(event: PointerEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.positionAtPointerDown = this.threeService.getPointerSnorm(this, event);
    //console.log(`pointer down at: ${this.positionAtPointerDown}`);
}

export function onPointerUp(event: PointerEvent) {
    this.positionAtPointerUp = this.threeService.getPointerSnorm(this, event);
    //console.log(`pointer up at: ${this.positionAtPointerUp}`);
    
    this.isDragging = false;
    rotate.call(this);
    // create rotation group 
    // rotate group (logically)
    // animate group rotation
}