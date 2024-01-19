
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { RubixSceneService } from "src/app/services/rubix/rubix-scene/rubix-scene.service";
import { addressToPosition, positionToColors } from "src/app/services/rubix/helpers/converting";
import AxisGridHelper from "src/app/services/rubix/helpers/axisGridHelper";
const gui = new GUI();

export function createGroup(scene: THREE.Scene, names: string[]) {
  console.log(`creating group with names ${names.join('|')}`);
let group = new THREE.Group();
  for (let name of names) {
    let object = scene.getObjectByName(name);
    if (!object) {
      console.error(`object ${name} not found`);
    } else {
      group.add(object.removeFromParent());
    }
  }
  scene.add(group);
  return group;
}

export function removeGroup(scene: THREE.Scene, names: string[], group: THREE.Group) {
  for (let name of names) {
    let object = group.getObjectByName(name);
    if (!object) {
      console.error(`object ${name} not found`);
    } else {
      let position = object.getWorldPosition(new THREE.Vector3());
      let quaternion = object.getWorldQuaternion(new THREE.Quaternion());
      group.remove(object);
      object.position.copy(position);
      object.quaternion.copy(quaternion);
      scene.add(object);
      console.log(`removed ${name} rotateX: ${object.rotation.x}, rotateY: ${object.rotation.y}, rotateZ: ${object.rotation.z}`);
      console.log(object);
   
    }
  }
  scene.remove(group);
}

export function getFaceColor() {

}

export function createObjects({scene, camera, lights, cubeletSize, colorPalette, cameraDistance}: RubixSceneService, names: string[]) {
    addShell(scene, cubeletSize);
    addCameraSphere(scene, camera, cameraDistance);
    createLights(scene, lights);
    addCubelets(scene, names, cubeletSize, colorPalette);
}

function addCameraSphere(scene: THREE.Scene, camera: THREE.Camera, distance: number) {
    let geometry = new THREE.SphereGeometry( distance*Math.sqrt(3), 32, 32 );
    let sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xFAfAFA, transparent: true, opacity: 0.25} );
    const sphere = new THREE.Mesh( geometry, sphereMaterial );
    sphere.name = 'cameraSphere';
    camera.position.set(distance,distance,distance);
    sphere.add(camera);
    camera.lookAt(0,-0.5,0);
    // this matches the orientation used in rubix cube notation
    sphere.rotateOnWorldAxis(new THREE.Vector3(0,1,0), Math.PI/2);
   // gui.add(sphere.rotation, 'x', 0, Math.PI*2, Math.PI/2).name('cameraSphereX');
   // gui.add(sphere.rotation, 'y', 0, Math.PI*2, Math.PI/2).name('cameraSphereY');
    //gui.add(sphere.rotation, 'z', 0, Math.PI*2, Math.PI/2).name('cameraSphereZ');
    scene.add( sphere );
}
function addShell(scene: THREE.Scene, size: number) {
    let shellMaterial = new THREE.MeshStandardMaterial( {color: 0xFAAAFA, transparent: true, opacity: 0.25} );
    scene.add(createCubeMesh('shell', [0,0,0], 3 + size*0.51, shellMaterial)); 
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
    console.log(`creating cubelet ${name} at ${position.join(',')}`);
    console.log(colors);
    const materials = createMaterials(palette, Object.values(colors));
    const mesh = createCubeMesh(name, position, size, materials);
    //mesh.rotateY(Math.PI/-2);
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
    createHelper(mesh, name);
    return mesh;
}
function createHelper(mesh: THREE.Mesh, name: string) {
    const helper = new AxisGridHelper(mesh, 1);
    gui.add(helper, 'visible').name(name);
}
function createLights(scene: THREE.Scene, lights: THREE.PointLight[]) {
    
        const leftLight = new THREE.PointLight(0xFFFFFF, 1);
        //gui.add(leftLight.position, 'x', -10, 10, 0.1).name('lightLeftX');
        //gui.add(leftLight.position, 'y', -10, 10, 0.1).name('lightLeftY');
        //gui.add(leftLight.position, 'z', -10, 10, 0.1).name('lightLeftZ');
        leftLight.position.set(0, 0, 2);
        leftLight.lookAt(0, 0, 0);
        scene.add(leftLight);
        lights.push(leftLight);
        
        const rightLight = new THREE.PointLight(0xFFFFFF, 1);
        //gui.add(rightLight.position, 'x', -10, 10, 0.1).name('lightRightX');
        //gui.add(rightLight.position, 'y', -10, 10, 0.1).name('lightRightY');
        //gui.add(rightLight.position, 'z', -10, 10, 0.1).name('lightRightZ');
        rightLight.position.set(0, 0, -2);
        rightLight.lookAt(0, 0, 0);
        scene.add(rightLight);
        lights.push(rightLight);

        const topLight = new THREE.PointLight(0xFFFFFF, 1);
        //gui.add(topLight.position, 'x', -10, 10, 0.1).name('lightTopX');
        //gui.add(topLight.position, 'y', -10, 10, 0.1).name('lightTopY');
        //gui.add(topLight.position, 'z', -10, 10, 0.1).name('lightTopZ');
        topLight.position.set(0, 2, 0);
        topLight.lookAt(0, 0, 0);
        scene.add(topLight);
        lights.push(topLight);

        
    scene.add(new THREE.AmbientLight(0xFFFFFF, 1));
}

