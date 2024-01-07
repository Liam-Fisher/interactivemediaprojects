// cubelets are addressed by their position in the cube, from right to left, top to bottom, back to front
import { permute, rotationCycle } from "./math";
import { Axis,Orientation, Rotation } from "./types";
interface Permutation {
    cycles: number[][];
    fixed: number[];
}


class RubixCubeletState {
    size = 3;
    axis = ['x', 'y', 'z'];
    cubelets: string[] = [];
    constructor(size?: number){
      this.size = size ?? this.size;
      this.reset();
    }
    reset() {
      this.cubelets = [
        "corner_B", "edge_I",   "corner_A", 
        "edge_K",   "center_U", "edge_J",
        "corner_D", "edge_L",   "corner_C",
    
        "edge_N",   "center_V", "edge_M", 
        "center_X", "middle",   "center_W",
        "edge_P",   "center_Y", "edge_O",
    
        "corner_F", "edge_Q",   "corner_E",
        "edge_S",   "center_Z", "edge_R",
        "corner_H", "edge_T",   "corner_G"
      ];
  }
    printCubelets() {
      console.log(`... ... ... printing cubelets ... ... ... ... `);
      for (let i = 0; i < this.size**2; i++) {
        let layer = Math.floor(i/this.size);
          if (i % this.size === 0) {
            console.log(`__________layer${layer}___________`);
          }
        console.log(`${this.cubelets.slice(i*this.size, i*this.size+this.size).join('|')}`);
      }
      console.log(`... ... ... ... ... ... ... ... ... ... ... ... `);
    }
    getScaling(axis: Axis) {
      return [axis==='z'?3:9, axis==='x'?3:1];
    }
    getOffset(axis: Axis, slice: number) {
      return (slice+1)*(axis==='z'?9:axis==='y'?3:1);
    }
    getCubeletAddresses(orientation: Orientation,offset: number, s: number[]): [number[], number[], number] {
      // different sizes would require splitting the cubelets into rings 
      let diagonal = rotationCycle(offset, orientation, s[0]*2, s[1]*2);
      let orthogonal = rotationCycle(offset+s[1], orientation, (s[0]-s[1]), (s[0]+s[1]));
      let fixed = s[0]+s[1]+offset; // for z 4, 13, 22 | for y 10, 13, 16 | for x 12, 13, 14
      return [diagonal, orthogonal, fixed];
    }
    rotate(axis3d: Axis, orientation: Orientation, slice: number) {
      let scale = this.getScaling(axis3d);
      let offset =  this.getOffset(axis3d, slice);
      console.log(`scale: ${scale}`);
      let [diagonal, orthogonal, fixed] = this.getCubeletAddresses(orientation,offset, scale);
      console.log(`diagonal addresses: ${diagonal}`);
      console.log(`orthogonal addresses: ${orthogonal}`);
      console.log(`fixed address: ${fixed}`);
      let cubeletNames: string[] = [];
      permute(this.cubelets,cubeletNames, [diagonal, orthogonal]);
      return [this.cubelets[fixed], ...cubeletNames];
    }
}

let state = new RubixCubeletState();

state.printCubelets();

const testRotations: Rotation[] = [
  { orientation: '+', axis3d: 'z', slice: -1 }
  
];

for (let test = 0; test < testRotations.length; test++) {
  let testRotation = testRotations[test];
  let { orientation, axis3d, slice } = testRotation;
  console.log(`test: ${test} ~~~~~~~~~~`);
  console.log(`rotating slice ${slice} on axis ${axis3d} with orientation: ${orientation}`);
  let cubeletNames = state.rotate(axis3d, orientation, slice);
  console.log(`rotated cubelets: ${cubeletNames.join('|')}`);
  
state.printCubelets();
} 