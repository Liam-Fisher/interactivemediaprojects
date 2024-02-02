import { Axis, Colors } from "src/app/types/rubix";
import * as THREE from 'three';


function getFaceColors(tgt: number[], orientation: [Axis,Axis,Axis], castTo: THREE.Vector3, castFrom: THREE.Vector3) {
    tgt = [];
    castFrom[orientation[0]] = 2;
    castTo[orientation[0]] = -1;
    castTo[orientation[1]] = 0;
    castTo[orientation[2]] = 0;

    for(let i=0; i<3; i++) {  
      for(let j=0; j<3; j++) {
        castFrom[orientation[1]] = 1-i;
        castFrom[orientation[2]] = 1-j;
        tgt.push(this.colorIndexFromRay(castFrom, castTo));
      }
    }
  }
export function getAllFaceColors(tgt: Pick<Colors<number[]>, 'front'|'right'|'top'>) {
    console.log(`getting all face colors`);
    let castTo = new THREE.Vector3(0,0,0);
    let castFrom = new THREE.Vector3(0,0,0);
    this.getFaceColors(tgt.front, ['x', 'y','z'], castTo, castFrom);
    this.getFaceColors(tgt.right, ['z','y','x'], castTo, castFrom);
    this.getFaceColors(tgt.top, ['y','x','z'], castTo, castFrom);
    tgt.top.reverse();
    return [...tgt.front, ...tgt.right, ...tgt.top];
}