import { Colors, IRubix, Position } from "src/app/types/rubix";
import { addressToPosition, positionToColors } from "../helpers/converting";
import * as THREE from 'three';
import AxisGridHelper from "../helpers/axisGridHelper";
import { GUI } from 'lil-gui';
const gui = new GUI();

export function createObjects(component: IRubix) {
    createScene(component);
    createRaycaster(component);
    createRenderer(component);
    createCamera(component);
    const {scene, camera} = component;
    const names = component.cubeletState.names;
    const {cubeletSize, colorPalette, cameraDistance} = component.graphicsState;
    addShell(scene, cubeletSize);
    addCameraSphere(scene, camera, cameraDistance);
    createLights(scene, component.graphicsState.lights);
    addCubelets(scene, names, cubeletSize, colorPalette);
}

function addCameraSphere(scene: THREE.Scene, camera: THREE.Camera, distance: number) {
    let geometry = new THREE.SphereGeometry( distance*Math.sqrt(3), 32, 32 );
    let sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xFAfAFA, transparent: true, opacity: 0.25} );
    const sphere = new THREE.Mesh( geometry, sphereMaterial );
    sphere.name = 'cameraSphere';
    camera.position.set(distance,distance,distance);
    sphere.add(camera);
    camera.lookAt(0,0,0);
   // gui.add(sphere.rotation, 'x', 0, Math.PI*2, Math.PI/2).name('cameraSphereX');
   // gui.add(sphere.rotation, 'y', 0, Math.PI*2, Math.PI/2).name('cameraSphereY');
    //gui.add(sphere.rotation, 'z', 0, Math.PI*2, Math.PI/2).name('cameraSphereZ');
    scene.add( sphere );
}
function addShell(scene: THREE.Scene, size: number) {
    let shellMaterial = new THREE.MeshStandardMaterial( {color: 0xFA00FA, transparent: true, opacity: 0.25} );
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
    const materials = createMaterials(palette, Object.values(colors));
    logCubelet(address, name, position, colors);
    const mesh = createCubeMesh(name, position, size, materials);
    mesh.rotateY(Math.PI/-2);
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
function createCubeMesh(name: string, position: Position, size: number, materials: THREE.MeshStandardMaterial|THREE.MeshStandardMaterial[]): THREE.Mesh {
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
function createScene(component: IRubix) {
    component.scene = new THREE.Scene();
}
function createRaycaster(component: IRubix) {
    component.raycaster = new THREE.Raycaster();
}
function createRenderer(component: IRubix) {
    component.renderer = new THREE.WebGLRenderer({antialias: true, canvas: component.display.nativeElement});;
}
function createCamera(component: IRubix) {
    component.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
}
function createLights(scene: THREE.Scene, lights: THREE.PointLight[]) {
    
        const leftLight = new THREE.PointLight(0xFFFFFF, 1);
        gui.add(leftLight.position, 'x', -10, 10, 0.1).name('lightLeftX');
        gui.add(leftLight.position, 'y', -10, 10, 0.1).name('lightLeftY');
        gui.add(leftLight.position, 'z', -10, 10, 0.1).name('lightLeftZ');
        leftLight.position.set(0, 0, 2);
        leftLight.lookAt(0, 0, 0);
        scene.add(leftLight);
        lights.push(leftLight);
        
        const rightLight = new THREE.PointLight(0xFFFFFF, 1);
        gui.add(rightLight.position, 'x', -10, 10, 0.1).name('lightRightX');
        gui.add(rightLight.position, 'y', -10, 10, 0.1).name('lightRightY');
        gui.add(rightLight.position, 'z', -10, 10, 0.1).name('lightRightZ');
        rightLight.position.set(0, 0, -2);
        rightLight.lookAt(0, 0, 0);
        scene.add(rightLight);
        lights.push(rightLight);

        const topLight = new THREE.PointLight(0xFFFFFF, 1);
        gui.add(topLight.position, 'x', -10, 10, 0.1).name('lightTopX');
        gui.add(topLight.position, 'y', -10, 10, 0.1).name('lightTopY');
        gui.add(topLight.position, 'z', -10, 10, 0.1).name('lightTopZ');
        topLight.position.set(0, 2, 0);
        topLight.lookAt(0, 0, 0);
        scene.add(topLight);
        lights.push(topLight);

        
    scene.add(new THREE.AmbientLight(0xFFFFFF, 1));
}
