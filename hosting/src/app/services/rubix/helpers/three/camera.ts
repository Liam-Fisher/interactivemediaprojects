import * as THREE from 'three';
export function addCameraSphere(scene: THREE.Scene, camera: THREE.Camera, distance: number, gui: any) {
    let geometry = new THREE.SphereGeometry( distance*Math.sqrt(3), 32, 32 );
    let sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xFAfAFA, transparent: true, opacity: 0.25} );
    const sphere = new THREE.Mesh( geometry, sphereMaterial );
    sphere.name = 'cameraSphere';
    camera.position.set(distance,distance,distance);
    sphere.add(camera);
    camera.lookAt(0,-0.5,0);
    // this matches the orientation used in rubix cube notation
    sphere.rotateOnWorldAxis(new THREE.Vector3(0,1,0), Math.PI/2);
   gui.add(sphere.rotation, 'x', 0, Math.PI*2, Math.PI/2).name('cameraSphereX');
   // gui.add(sphere.rotation, 'y', 0, Math.PI*2, Math.PI/2).name('cameraSphereY');
    //gui.add(sphere.rotation, 'z', 0, Math.PI*2, Math.PI/2).name('cameraSphereZ');
    scene.add( sphere );
}