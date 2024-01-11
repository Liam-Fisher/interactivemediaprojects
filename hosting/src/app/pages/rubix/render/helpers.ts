import { Axis, IRubix, Orientation } from "src/app/types/rubix";
import * as THREE from "three";


export function setVector(state: IRubix['rotationState'], axis: Axis) {
  state.vector.set( +(axis === 'x'), +(axis === 'y'), +(axis === 'z') );
}

export function setAngle(state: IRubix['rotationState'], orientation: Orientation) {
    state.angle = Math.PI / (state.frames * (orientation === '+' ? 2 : -2));
}

export function createGroup(scene: THREE.Scene, state: IRubix['rotationState']) {
    state.group = new THREE.Group();
    for (let name of state.names) {
      let object = scene.getObjectByName(name);
      if(!object) {
        console.error(`object ${name} not found`);
      }
      else {
        state.group.add(object.removeFromParent());
      }
    }
    scene.add(state.group);
    state.group.children.forEach((child: any) => {
      console.log(`child: ${child.name}`);
    });
  }
  
export function removeGroup(scene: THREE.Scene, state: IRubix['rotationState']) {
    for (let name of state.names) {
      let object = state.group.getObjectByName(name);
      if(!object) {
        console.error(`object ${name} not found`);
      }
      else {
        let position = object.getWorldPosition(new THREE.Vector3());
        let quaternion = object.getWorldQuaternion(new THREE.Quaternion());
        state.group.remove(object);
        object.position.copy(position);
        object.quaternion.copy(quaternion);
        scene.add(object);
      }
    }
    scene.remove(state.group);
  }
  