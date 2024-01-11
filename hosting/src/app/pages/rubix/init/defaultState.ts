import { IRubix, RotationAction } from "src/app/types/rubix";
import * as THREE from "three";
export function setDefaultState(component: IRubix) {
    component.gameState = defaultGameState();
    component.graphicsState = defaultGraphicsState();
    component.pointerState = defaultPointerState();
    component.rotationState = defaultRotationState();
}


function defaultGameState(): IRubix["gameState"] {
    let isActive = true;
    let isScrambling = true;
    let scrambleCount = 64;
    let moveCount = 0;
    return {isActive, isScrambling, scrambleCount, moveCount};
}


function defaultGraphicsState(): IRubix["graphicsState"] {
    let cubeletSize = 0.75;
    let colorPalette = [ 0xFFFFFF, 0xFFFF00,  0xFFA500, 0xFF0000, 0x00FF00, 0x0000FF, 0x000000 ];
    return {cubeletSize, colorPalette};
}


function defaultPointerState(): IRubix["pointerState"] {
    let downPosition = new THREE.Vector2();
    let upPosition = new THREE.Vector2();
    let framesDown = 0;
    let isDown = false;
    return {downPosition, upPosition, framesDown, isDown};
}


function defaultRotationState(): IRubix["rotationState"] {
    let queue: RotationAction[] = [];
    let names: string[] = [];
    let group = new THREE.Group();
    let vector = new THREE.Vector3(0, 0, 0);
    let angle = 0;
    let progress = 0;
    let isRotating = false;
    let frames = 20;
    return {queue, names, group, vector, angle, progress, isRotating, frames};
}