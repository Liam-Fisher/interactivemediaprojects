

import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { RubixSceneService } from "src/app/services/rubix/rubix-scene/rubix-scene.service";
import AxisGridHelper from "src/app/services/rubix/helpers/axisGridHelper";
import { CUBELET_NAMES } from './data';
const gui = new GUI();

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


export function positionToColors([x,y,z]: Position): Colors {
    return {
        'front':   x === 1  ? 0 : 6,
        'back':    x === -1 ? 1 : 6,
        'top':     y === 1  ? 2 : 6,
        'bottom':  y === -1 ? 3 : 6,
        'left':    z === 1  ? 4 : 6,
        'right':   z === -1 ? 5 : 6,
    }
}

function addressToPosition(addr: number): [number, number, number] {
    return [ 
        (addr % 3) - 1, 
        (Math.floor(addr / 3) % 3) - 1, 
        Math.floor(addr / 9) - 1
    ];
}
const metalness = 0.8;
const roughness = 0.6;
function createMaterials(faceColors: number[], palette: number[]): THREE.MeshStandardMaterial[] {
    return faceColors.map((colorIndex: number) => {
        const color = palette[colorIndex];
        return new THREE.MeshStandardMaterial({ color, metalness, roughness })
    });
}

function createHelper(mesh: THREE.Mesh) {
    const helper = new AxisGridHelper(mesh, 1);
    gui.add(helper, 'visible').name(mesh.name);
}

abstract class Cubie extends THREE.Mesh {
    address: number;
    initialPosition!: [number, number, number];
    colors: Colors;
    constructor(address: number, size: number, palette: number[]) {
        let initialPosition = addressToPosition(address);
        let colors = positionToColors(initialPosition);
        super(new THREE.BoxGeometry(size,size,size,20,20,20)), createMaterials(Object.values(colors), palette);
        this.address = address;
        this.colors = colors;
        this.initialPosition = initialPosition;
        this.name = CUBELET_NAMES[address];
        this.position.set(...initialPosition);
        createHelper(this);
    }
    resetObject() {
      let worldMatrix = this.matrixWorld.clone();
      this.removeFromParent();
      this.matrix.copy(worldMatrix);
      return this;
    }
    addToGroup(group: THREE.Group) {
      group.add(this.removeFromParent());
      return group;
    }
}



export function createGroup(scene: THREE.Scene, names: string[]) {
  console.log(`creating group with names ${names.join('|')}`);
let group = new THREE.Group();
  for (let name of names) {
    group.add((scene.getObjectByName(name) as Cubie).removeFromParent());
  }
  scene.add(group);
  return group;
}

export function removeGroup(scene: THREE.Scene,names: string[], group: THREE.Group) {
    console.log(`removing group with names ${names.join('|')}`);
  for (let name of names) {
    scene.add((group.getObjectByName(name) as Cubie).resetObject());
  }
  scene.remove(group);
}

