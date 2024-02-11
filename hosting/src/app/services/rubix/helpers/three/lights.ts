import * as THREE from 'three';
export function createLights(scene: THREE.Scene, lights: THREE.PointLight[], gui?: any) {
    


    const leftLight = new THREE.PointLight(0xFAFAFA, 1.1, 10, 1.1);
    leftLight.position.set(1.4, 0, 0);
    leftLight.lookAt(0, 0, 0);
    scene.add(leftLight);
    lights.push(leftLight);
    
    const rightLight = new THREE.PointLight(0xFAFAFA, 1.1, 10, 1.1);
    rightLight.position.set(0, 0, -1.5);
    rightLight.lookAt(0, 0, 0);
    scene.add(rightLight);
    lights.push(rightLight);
    
    const topLight = new THREE.PointLight(0xFAFAFA, 1.1, 10, 1.1);
    topLight.position.set(0, 1.5, 0);
    topLight.lookAt(0, 0, 0);
    scene.add(topLight);
    lights.push(topLight);

    if(gui) {

    //gui.add(topLight.position, 'x', -1, 1, 0.1).name('lightTopX');
    //gui.add(topLight, 'decay', 0, 10, 0.1).name('topDecay');
    //gui.add(topLight.position, 'z', -1, 1, 0.1).name('lightTopZ');

    //gui.add(leftLight, 'decay', 0, 10, 0.1).name('leftDecay');
    //gui.add(leftLight.position, 'y', -1, 2, 0.1).name('lightLeftY');
    //gui.add(leftLight.position, 'z', -1, 2, 0.1).name('lightLeftZ');
    
    //gui.add(rightLight.position, 'x', -1, 1, 0.1).name('lightRightX');
    //gui.add(rightLight.position, 'y', -1, 1, 0.1).name('lightRightY');
    //gui.add(rightLight, 'decay', 0, 10, 0.1).name('rightDecay');
    }
    
scene.add(new THREE.AmbientLight(0xFFFFFF, 1));
}