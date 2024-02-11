import { Injectable } from '@angular/core';
import { CUBE_REORIENTATION, CUBE_ROTATION_CODES, CubeCode, FACE_NAMES, SLICE_REORIENTATION, SLICE_ROTATION_CODES } from '../helpers/data';
import { Axis, FaceName, Orientation, RotationAction } from 'src/app/types/rubix';
import {permute, permuteGroup} from '../helpers/math';
/* 
// ["X", "x", "F", "f", "S", "s", "B", "b", "Y", "y", "U", "u", "E", "e", "D", "d", "Z", "z", "L", "l", "M", "m", "R", "r"];

    "axis": ["x", "y", "z"],
    "orientation": ["+", "-"],
    "slice": ["-1", "0", "1"]
  }
  let index = this.rotationLetters.indexOf(letter);
  let axis = this.rotationAction.axis[Math.floor(index / 8)] as Axis;
  let orientation = this.rotationAction.orientation[index % 2] as Orientation;
  let sliceIndex = Math.floor(index/2)%4;
  let slice = sliceIndex ? +this.rotationAction.slice[sliceIndex-1] : undefined;
  this.rubix.rotationInput(axis, orientation, slice);
   */

  // char codes 88 89 90 120 121 122
@Injectable({
  providedIn: 'root'
})
export class RubixOrientationService {
  cubeCodes!: string[];
  //sliceCodes = SLICE_ROTATION_CODES;
  //sliceCodes: Map<string, number> = new Map();
  sliceCodes!: string[];  
  // starts of with front face facing the user's left, top face and right face are also visible
  
  faceMap: Map<FaceName, number> = new Map();
  constructor() { }
  reset() {
    this.sliceCodes = Array.from(SLICE_ROTATION_CODES);
    this.cubeCodes = Array.from(CUBE_ROTATION_CODES);
    
    this.reorient('y');
    // to align with the scene
// FLIPPED!!!
    //CUBE_ROTATION_CODES.forEach((code, i) => this.cubeCodes.set(code, Math.floor(i/3)*3+2-i%3));   
    
    // FLIPPED WITH MATH!!!
    //this.cubeCodes.set('X', 5).set('Y', 1).set('Z', 0).set('x', 2).set('y', 4).set('z', 3);
    
    
    // From a given rotation input
      // get the rotation with the current orientation
      // reorient the cube by 
  }
  getCubeIndexCycle(axis: Axis) {
    return CUBE_REORIENTATION[axis].map(letter => this.cubeCodes.indexOf(letter));
  }
  getSliceIndexCycle(axis: Axis) {
    return SLICE_REORIENTATION[axis].map(letters => letters.map(letter => this.sliceCodes.indexOf(letter)));
  }
  reorient(axis: Axis) {
// console.log(`reorienting cube ${axis}`);
    //this.cubeCodes.forEach((letter, i) => console.log(`${i}: ${letter}`));
   permute(this.cubeCodes, this.getCubeIndexCycle(axis));

 // console.log(`reoriented cube ${axis}`);
    //this.cubeCodes.forEach((letter, i) => console.log(`${i}: ${letter}`));

   // console.log(`reorienting slices ${axis}`);
   // console.log(this.sliceCodes.map((letter, i) => `${i}: ${letter}`).join(' '));
    //this.sliceCodes.forEach((letter, i) => console.log(`${i}: ${letter}`));
 permuteGroup(this.sliceCodes, '+', this.getSliceIndexCycle(axis));
// console.log(`reoriented slices ${axis}`);
// console.log(this.sliceCodes.map((letter, i) => `${i}: ${letter}`).join(' '));
 //this.sliceCodes.forEach((letter, i) => console.log(`${i}: ${letter}`));
  }
  getAction(letter: string): RotationAction {
    let axis: Axis, orientation: Orientation, slice: number;
    let index = this.cubeCodes.indexOf(letter);


    if(index>=0) {
     // console.log(`input: ${index}`);
      let reorientedLetter = CUBE_ROTATION_CODES[index];
      orientation = index>2 ? '-' : '+';
      axis = reorientedLetter.toLowerCase() as Axis;
      // ignoring this for now
      // this.reorient(letter as Axis);
      // so, we set the axis to the first element of the cycle
      //console.log(`(cube) axis: ${axis}, orientation: ${orientation}`);
      return {axis, orientation};
    }
    index = this.sliceCodes.indexOf(letter);
    if(index>=0) {
      //console.log(`index: ${index}`);
      let reorientedLetter = SLICE_ROTATION_CODES[index];
      let reorientedIndex =  this.sliceCodes.indexOf(reorientedLetter);
      //console.log(`reoriented letter: ${reorientedLetter}`);
      //console.log(`reoriented index: ${reorientedIndex}`);

      slice = index%3-1;
      orientation =  index<9 ? '-' : '+';
      axis = CUBE_ROTATION_CODES[Math.floor((index%9)/3)+3] as Axis;

    //  console.log(`(slice) axis: ${axis}, ${slice}, orientation: ${orientation}`);
      return {axis, orientation, slice};
    }
   // console.log(`invalid letter code ${letter}`);
    return {};
  }
}
