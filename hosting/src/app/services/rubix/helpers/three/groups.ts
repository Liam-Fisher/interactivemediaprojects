import * as THREE from 'three'; 
export function createGroup(scene: THREE.Scene, names: string[]) {
    //console.log(`creating group with names ${names.join('|')}`);
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
       // console.log(`removed ${name} rotateX: ${object.rotation.x}, rotateY: ${object.rotation.y}, rotateZ: ${object.rotation.z}`);
       // console.log(object);
     
      }
    }
    scene.remove(group);
  }
  