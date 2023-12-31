import { CubeletName, Face, FaceName, IRubix, Position } from "src/app/types/rubix";
import { addressToPosition, positionToColors, positionToName } from "../converting";
import * as THREE from 'three';


export function createCube() {
    createCubelets.call(this);
    createShell.call(this);
    createFaces.call(this);
}
function createShell(){
    let shellSize = this.params.cubeletSize * 3.1;
    let geometry = new THREE.BoxGeometry( shellSize, shellSize, shellSize );
    let material = new THREE.MeshBasicMaterial( {color: 0xFA00FA, transparent: true, opacity: 0.25} );
    let cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );
}
function createFaces() {
    this.faceColors = {};
    this.cubeOrientation = new Map();
    for(let i = 0; i < 6; i++) {
        console.log(`creating face ${i}`);
        let name = Face[i] as FaceName;
        this.cubeOrientation.set(i, name);
        this.faceColors[name] = (new Array(9)).fill(i);
        console.log(`face ${name} has colors ${this.faceColors[name].join('|')}`);
    }
}
function createCubelets() {
    console.log('creating cubelets');
    for(let i = 0; i < 27; i++) {
        console.log(`creating cubelet ${i}`);
        createCubelet.call(this, i);
    }
    // adjust the cube so that the front and right faces are visible
    this.scene.rotateOnWorldAxis(new THREE.Vector3(0,1,0), (Math.PI/4));
}
//declare function createMaterials(palette: string[], colors: number[]): THREE.MeshBasicMaterial[];
function createCubelet(address: number) {
    const position = addressToPosition(address);
    const name = positionToName(position);
    const colors = positionToColors(position);
    console.log(`creating cubelet (${address}): ${name})s`); 
    console.log(`${name}: [x: ${position.x}, y: ${position.y}, z: ${position.z}])`);
    
    const colorsArray = Object.values(colors);
    console.log(`${name}: ${colorsArray})`);
    
    const materials = createMaterials(this.colorPalette, Object.values(colors));
    const geometry = createCubeGeometry(this.cubeletSize);
    const mesh = createMesh(name, position, geometry, materials);
    this.scene.add(mesh);
    //this.cubeData[name] = {address, position, colors};
}

function createMesh(name: CubeletName, position: Position, geometry: THREE.BoxGeometry, materials: THREE.MeshBasicMaterial[]): THREE.Mesh {
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.name = name;
    mesh.translateX(position.x);
    mesh.translateY(position.y);
    mesh.translateZ(position.z);
    mesh.rotateY(Math.PI/-2);
    //mesh.rotateZ(Math.PI);
    return mesh;
}
function createCubeGeometry(size: number): THREE.BoxGeometry {
    return new THREE.BoxGeometry(size,size,size);
}
function createMaterials(palette: number[], colors: number[]): THREE.MeshBasicMaterial[] {
    return colors.map((colorIndex: number) => {
        let color = palette[colorIndex];
        return (new THREE.MeshBasicMaterial({ color }));
    });
}

/* 
function createCubelet(service: IThree&IRubix, address: number) {

    
    const { position, colors, name } = data;
    console.log(`creating cubelet ${name} at position ${JSON.stringify(position)} with colors ${JSON.stringify(colors)}`);
    const geometry = new THREE.BoxGeometry(service.cubeletSize, service.cubeletSize, service.cubeletSize);
    const cube = new THREE.Mesh(geometry, createMaterials(this.colorPalette,colors));
    cube.name = name;
    cube.position.set(...Object.values(position));
    service.scene.add(cube);
}
function createMaterials(palette: string[], colors: Colors<number>) {
    return Object.values(colors).map((colorIndex: number) => {
        let color = palette[colorIndex];
        return (new THREE.MeshBasicMaterial({ color }));
    });
} */