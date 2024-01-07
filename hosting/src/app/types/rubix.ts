import { ElementRef, NgZone } from '@angular/core';
import * as THREE from 'three';

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
// export type Cube<T = string> = Record<FaceName, T>;

export enum Rotation {
    'up',
    'down',
    'right',
    'left'
}
export type RotationName = keyof typeof Rotation;
export enum Slope {
    'SW',
    'SE',
    'NW',
    'NE'
}
export type SlopeName = keyof typeof Slope;
export enum Axis3d {
    'x',
    'y',
    'z'
}
export type Axis3dName = keyof typeof Axis3d;


export type Position<T = number> = Record<Axis3dName, T>;

export enum Axis2d {
    'horizontal',
    'vertical'
}
export type Axis2dName = keyof typeof Axis2d;


export enum Layer {
    'back',
    'inner',
    'front'
}
export type LayerName = keyof typeof Layer;
export type CubeletLayer<T = number> = Record<LayerName, T>;   
export enum Row {
    
    'bottom',
    'middle',
    'top'
}
export type RowName = keyof typeof Row;
export type CubeletRow<T = number> = Record<RowName, T>;   
export enum Column {
    'left',
    'center',
    'right'
}
export type ColumnName = keyof typeof Column;
export type CubeletColumn<T = number> = Record<RowName, T>;   
export type CubeletName = `${number}_${LayerName}_${RowName}_${ColumnName}`;
export type Axis = 'x' | 'y' | 'z';
export type Orientation = '+' | '-';
// types passed as arguments

export interface RotationAction {
    orientation?: Orientation;
    axis?: Axis;
    slice?: number;
}

export interface RotationParameters {
    slice: number;
}
export interface CubeletAddressMap {
    // the addresses of the cubelets to rotate
    corners: number[],
    edges: number[],
    center: number;
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
export type CubeData = Record<CubeletName, CubeletData>;
export type FaceData = Record<FaceName, number[]>;


export interface IThreeScene {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    raycaster: THREE.Raycaster;

}
export interface IThreeDisplay {
    display: ElementRef<HTMLDivElement>;
    displayHeight: number;
    displayWidth: number;
    onWindowResize(): void;
}
export interface IRubixAnim {
    
    params: IRubixParams;
    isRotating: boolean;
    rotationFrames: number;
    rotationGroup: THREE.Group|null;
    rotationVector: THREE.Vector3;
    rotationAngle: number;
    rotationProgress: number;
    animations: (() => void)[];
}
export interface IRubixEvent extends IThreeScene, IThreeDisplay {
    
    ngZone: NgZone;
    isDragging: boolean;
    framesSincePointerDown: number;
    positionAtPointerDown: THREE.Vector2|null;
    positionAtPointerUp: THREE.Vector2|null;
    onPointerDown(event: PointerEvent): void;
    onPointerUp(event: PointerEvent): void;
}
export interface ICubeletState {
    cubelets: string[]
}
export interface IFaceletState {
    orientation: Map<number,FaceName>;
    facelets: Record<string, number[]>;
}
export interface IRubixParams {
    zoom: number;
    cubeletSize: number;
    colorPalette: number[];
}
export interface IRubix<TC extends ICubeletState, TF extends IFaceletState> extends IThreeScene, IThreeDisplay,IRubixAnim,IRubixEvent {
    cubeletState: TC;
    faceletState: TF;
}


