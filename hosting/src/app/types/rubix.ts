import { ElementRef, NgZone } from '@angular/core';
import * as THREE from 'three';
import { CubeletState } from '../pages/rubix/logic/cubeletState';
import { FaceletState } from '../pages/rubix/logic/faceletState';

export enum Face {
    'front',
    'back',
    'top',
    'bottom',
    'right',
    'left'
}
export type FaceName = keyof typeof Face;
export type Colors<T = number> = Record<FaceName, T>;


export type Axis = 'x' | 'y' | 'z';
export type Position<T = number> = Record<Axis, T>;
export type Orientation = '+' | '-';
// types passed as arguments

export interface RotationAction {
    orientation?: Orientation;
    axis?: Axis;
    slice?: number;
}
export interface PermutationAddressMap  {
    // the addresses of the cubelets to rotate
    diagonal: number[],
    orthogonal: number[],
    fixed: number;
}
// Cube State
export interface CubeletData {
    // a number from 0 to 26, representing the dynamic address of the cubelet
    // this can be used to find the cubelet's position
    address: number;
    // the current position of the cubelet (derived from address)
    position: Position;
    // the faces of a cubelet, in order of front, back, right, left, top, bottom
    colors: Colors;
}


export interface IRubixDisplay {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    raycaster: THREE.Raycaster;
    display: ElementRef<HTMLDivElement>;
    displayHeight: number;
    displayWidth: number;
}

export interface IRubixRotation {
    queue: RotationAction[];
    isRotating: boolean;
    names: string[]
    group: THREE.Group;
    vector: THREE.Vector3;
    angle: number;
    progress: number;
    frames: number;
}

export interface IRubixPointer {
    isDown: boolean;
    framesDown: number;
    downPosition: THREE.Vector2;
    upPosition: THREE.Vector2;
}

export interface IRubixGraphics {
    cubeletSize: number;
    colorPalette: number[];
}
export interface IRubixGame {
    isActive: boolean;
    isScrambling: boolean;
    scrambleCount: number;
    moveCount: number;
}

export interface IRubix extends IRubixDisplay{
    ngZone: NgZone;
    
    gameState: IRubixGame;
    graphicsState: IRubixGraphics;

    rotationState: IRubixRotation;
    pointerState: IRubixPointer;

    cubeletState: CubeletState;
    faceletState: FaceletState;

    onPointerDown: (event: PointerEvent) => void;
    onPointerUp: (event: PointerEvent) => void;
    onWindowResize: () => void;
    
}




