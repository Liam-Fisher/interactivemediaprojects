import { CubeletName, Face, FaceName, IRubix, Position } from "src/app/types/rubix";
import { addressToPosition, positionToColors, positionToName } from "../converting";
import * as THREE from 'three';
import { CubeletState } from "../../logic/cubeletState";
import { FaceletState } from "../../logic/faceletState";


export function createCube() {
    this.cubeletState = new CubeletState();
    this.faceletState = new FaceletState();
    
    
    createShell.call(this);
    createCubelets.call(this);
}
function createShell(){
    let shellSize = this.params.cubeletSize * 3.1;
    let geometry = new THREE.BoxGeometry( shellSize, shellSize, shellSize );
    let material = new THREE.MeshBasicMaterial( {color: 0xFA00FA, transparent: true, opacity: 0.25} );
    let cube = new THREE.Mesh( geometry, material );
    cube.name = 'shell';
    this.scene.add( cube );
}

function createCubelets() {
    console.log('creating cubelets');
    for(let i = 0; i < 27; i++) {
        console.log(`creating cubelet ${i} with name ${this.cubeletState.cubelets[i]}`);
        createCubelet.call(this, i, this.cubeletState.cubelets[i]);
    }
    // adjust the cube so that the front and right faces are visible
    this.scene.rotateOnWorldAxis(new THREE.Vector3(0,1,0), (Math.PI/4));
}
//declare function createMaterials(palette: string[], colors: number[]): THREE.MeshBasicMaterial[];
function createCubelet(address: number, name: string) {
    const position = addressToPosition(address);
    const colors = positionToColors(position);
    console.log(`creating cubelet (${address}): ${name})s`); 
    console.log(`${name}: [x: ${position.x}, y: ${position.y}, z: ${position.z}])`);
    
    const colorsArray = Object.values(colors);
    console.log(`${name}: ${colorsArray})`);
    
    const materials = createMaterials(this.params.colorPalette, Object.values(colors));
    const geometry = createCubeGeometry(this.params.cubeletSize);
    const mesh = createMesh(name, position, geometry, materials);
    this.scene.add(mesh);
}

function createMesh(name: string, position: Position, geometry: THREE.BoxGeometry, materials: THREE.MeshBasicMaterial[]): THREE.Mesh {
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