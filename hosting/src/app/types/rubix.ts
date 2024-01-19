import { ElementRef, NgZone } from '@angular/core';
import * as THREE from 'three';
import { RubixCubeletStateService } from '../services/rubix/rubix-cubelet-state/rubix-cubelet-state.service';
import { RubixFaceletStateService } from '../services/rubix/rubix-facelet-state/rubix-facelet-state.service';
import { RubixGameStateService } from '../services/rubix/rubix-game-state/rubix-game-state.service';
import { RubixRotationService } from '../services/rubix/rubix-rotation/rubix-rotation.service';
import { RubixPointerService } from '../services/rubix/rubix-pointer/rubix-pointer.service';

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
export type Position = [number, number, number];
export type Orientation = '+' | '-';
// types passed as arguments
export type Swipe = 'left'|'right'|'up'|'down'|'none';


export interface RotationAction {
    orientation?: Orientation;
    axis?: Axis;
    slice?: number;
}
export interface PermutationAddressMap  {
    // the addresses of the cubelets to rotate
    diagonal: number[],
    orthogonal: number[],
    fixed: number[];
}

export interface IRubixDisplay {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    raycaster: THREE.Raycaster;
}

export interface IRubixRotation {
    queue: RotationAction[];
    isRotating: boolean;
    isCameraRotating: boolean;
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
    lights: THREE.PointLight[];
    cameraDistance: number;
    cubeletSize: number;
    colorPalette: number[];
}
export interface IRubixGame {
    isActive: boolean;
    isScrambling: boolean;
    scrambleCount: number;
    moveCount: number;
}

export interface IRubix  {
    ngZone: NgZone;
    cubelets: RubixCubeletStateService;
    facelets: RubixFaceletStateService;
    game: RubixGameStateService;
    rotation: RubixRotationService;
    pointer: RubixPointerService;
    display: ElementRef<HTMLCanvasElement>;
}

export type GameState = 'scrambling'|'solving'|'solved';


export interface GameCompletionData {
    moveCount?: number;
    timePlayed?: number;
    isSolved?: boolean;
}