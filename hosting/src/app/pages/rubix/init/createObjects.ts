import { Colors, IRubix, Position } from "src/app/types/rubix";
import { addressToPosition, positionToColors } from "../helpers/converting";
import * as THREE from 'three';
import AxisGridHelper from "../helpers/axisGridHelper";
import { GUI } from 'lil-gui';
const gui = new GUI();

export function createObjects(component: IRubix) {
    const scene = component.scene;
    const names = component.cubeletState.names;
    const {cubeletSize, colorPalette} = component.graphicsState;
    
    addShell(scene, cubeletSize);
    addCubelets(scene, names, cubeletSize, colorPalette);
}


function addShell(scene: THREE.Scene, size: number) {
    let shellPosition = new THREE.Vector3(0,0,0);
    let shellSize = 3 + size*0.51;
    let shellMaterial = new THREE.MeshBasicMaterial( {color: 0xFA00FA, transparent: true, opacity: 0.25} );
    scene.add(createCubeMesh('shell', shellPosition, shellSize, shellMaterial)); 
}

function addCubelets(scene: THREE.Scene,names: string[], size: number, palette: number[]) {
    
    console.log('creating cubelets');
    for(let i = 0; i < 27; i++) {
        console.log(`creating cubelet ${i} with name ${names[i]}`);
        scene.add(createCubelet(i, names[i], size, palette));
    }
}

function createCubelet(address: number, name: string, size: number, palette: number[]): THREE.Mesh {
    const position = addressToPosition(address);
    const colors = positionToColors(position);
    const materials = createMaterials(palette, Object.values(colors));
    logCubelet(address, name, position, colors);
    const mesh = createCubeMesh(name, position, size, materials);
    mesh.rotateY(Math.PI/-2);
    return mesh;
}


function createMaterials(palette: number[], colors: number[]): THREE.MeshBasicMaterial[] {
    return colors.map((colorIndex: number) => {
        let color = palette[colorIndex];
        return (new THREE.MeshBasicMaterial({ color }));
    });
}
function createCubeMesh(name: string, position: Position, size: number, materials: THREE.MeshBasicMaterial|THREE.MeshBasicMaterial[]): THREE.Mesh {
    const mesh = new THREE.Mesh((new THREE.BoxGeometry(size,size,size)), materials);
    mesh.name = name;
    mesh.position.set(position.x,position.y,position.z);
    createHelper(mesh, name);
    return mesh;
}
function createHelper(mesh: THREE.Mesh, name: string) {
    const helper = new AxisGridHelper(mesh, 1);
    gui.add(helper, 'visible').name(name);
}

function logCubelet(address: number, name: string, position: Position, colors: Colors) {
    console.log(`creating cubelet (${address}): ${name}`); 
    console.log(`${name}: [x: ${position.x}, y: ${position.y}, z: ${position.z}])`);
    console.log(`${name}: [front: ${colors.front}, back: ${colors.back}, top: ${colors.top}, bottom: ${colors.bottom}, left: ${colors.left}, right: ${colors.right}]`);
}
