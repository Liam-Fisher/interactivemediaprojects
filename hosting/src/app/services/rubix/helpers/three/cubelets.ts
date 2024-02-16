
import * as THREE from 'three';
import { addressToPosition, positionToColors } from "src/app/services/rubix/helpers/converting";
import AxisGridHelper from "src/app/services/rubix/helpers/axisGridHelper";

export function addShell(scene: THREE.Scene, size: number) {
    let shellMaterial = new THREE.MeshStandardMaterial( {color: 0xFAAAFA, transparent: true, opacity: 0.1} );
    scene.add(createCubeMesh('shell', [0,0,0], 3 + size*0.51, shellMaterial)); 
}
export function addCubelets(scene: THREE.Scene,names: string[], size: number, palette: number[]) {
    console.log('creating cubelets');
    for(let i = 0; i < 27; i++) {
       // console.log(`creating cubelet ${i} with name ${names[i]}`);
        scene.add(createCubelet(i, names[i], size, palette));
    }
}

function createCubelet(address: number, name: string, size: number, palette: number[]): THREE.Mesh {
    const position = addressToPosition(address);
    const colors = positionToColors(position);
    //console.log(`creating cubelet ${name} at ${position.join(',')}`);
    //console.log(colors);
    const materials = createMaterials(palette, Object.values(colors));
    const mesh = createCubeMesh(name, position, size, materials);
    return mesh;
}


function createMaterials(palette: number[], colors: number[]): THREE.MeshStandardMaterial[] {
    let metalness = 0.8;
    let roughness = 0.6;
    return colors.map((colorIndex: number) => {
        let color = palette[colorIndex];
        let material = new THREE.MeshStandardMaterial({ color, metalness, roughness });
        return material;
    });
}
function createCubeMesh(name: string, position: [number,number,number], size: number, materials: THREE.MeshStandardMaterial|THREE.MeshStandardMaterial[]): THREE.Mesh {
    const mesh = new THREE.Mesh((new THREE.BoxGeometry(size,size,size,20,20,20)), materials);
    mesh.name = name;
    mesh.position.set(...position);
   // createHelper(mesh, name);
    return mesh;
}
function createHelper(mesh: THREE.Mesh, name: string) {
    const helper = new AxisGridHelper(mesh, 1);
    //gui.add(helper, 'visible').name(name);
}
