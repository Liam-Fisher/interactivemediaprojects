// cubelets are addressed by their position in the cube, from right to left, top to bottom, back to front
import { permute, rotationCycle } from "./math";
import { Axis,Orientation, Rotation } from "./types";
interface Permutation {
    cycles: number[][];
    fixed: number[];
}
const cubeletAddressObject = {
    corner: {
        x: {
            '+': [0, 2, 8, 6],
            '-': [0, 6, 8, 2]
        },
        y: {
            '+': [0, 6, 18, 12],
            '-': [0, 12, 18, 6]
        },
        z: {
            '+': [0, 18, 20, 2],
            '-': [0, 2, 20, 18]
        }
    },
    edge: {
        x: {
            '+': [2, 8, 14, 12],
            '-': [2, 12, 14, 8]
        },
        y: {
            '+': [6, 8, 20, 18],
            '-': [6, 18, 20, 8]
        },
        z: {
            '+': [8, 14, 20, 12],
            '-': [8, 12, 20, 14]
        }
    },
    center: {
        x: {
            '+': [12, 14, 20, 18],
            '-': [12, 18, 20, 14]
        },
        y: {
            '+': [2, 8, 14, 12],
            '-': [2, 12, 14, 8]
        },
        z: {
            '+': [6, 8, 20, 18],
            '-': [6, 18, 20, 8]
        }
    }
};
export class CubeletState {
  size = 3;
  axis = ['x', 'y', 'z'];
  cubelets: string[] = [];
  constructor(size?: number){
    this.size = size ?? this.size;
    this.reset();
  }
  reset() {
    this.cubelets = [
      "corner_A", "edge_I",   "corner_B", 
      "edge_J",   "center_U", "edge_K",
      "corner_C", "edge_L",   "corner_D",
  
      "edge_M",   "center_V", "edge_N", 
      "center_W", "middle",   "center_X",
      "edge_O",   "center_Y", "edge_P",
  
      "corner_E", "edge_Q",   "corner_F",
      "edge_R",   "center_Z", "edge_S",
      "corner_G", "edge_T",   "corner_H"
    ];
}
rotationCycle(s: number, o: Orientation, g1: number, g2: number) {
  return [s, s+(o==='+'?g1:g2), s+g1+g2, s+(o==='+'?g2:g1)];
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
  getAddressFromName(name: string): number {
    return this.cubelets.indexOf(name);
  }
  getCubeletAddresses(orientation: Orientation,offset: number, s: number[]): [number[], number[], number] {
    // different sizes would require splitting the cubelets into rings 
    let diagonal = this.rotationCycle(offset, orientation, s[0]*2, s[1]*2);
    let orthogonal = this.rotationCycle(offset+s[1], orientation, (s[0]-s[1]), (s[0]+s[1]));
    let fixed = s[0]+s[1]+offset; // for z 4, 13, 22 | for y 10, 13, 16 | for x 12, 13, 14
    return [diagonal, orthogonal, fixed];
  }
  rotate(axis: Axis, orientation: Orientation, slice: number): string[] {
    let scale = this.getScaling(axis);
    let offset =  this.getOffset(axis, slice);
    console.log(`scale: ${scale}`);
    let [diagonal, orthogonal, fixed] = this.getCubeletAddresses(orientation,offset, scale);
    console.log(`diagonal addresses: ${diagonal}`);
    console.log(`orthogonal addresses: ${orthogonal}`);
    console.log(`fixed address: ${fixed}`);
    return [this.cubelets[fixed], ...this.permute([diagonal, orthogonal])];
  }
  permute(cycles: number[][]): string[] {
    let rotatedCubelets: string[] = [];
      for(let i = 0; i < cycles.length; i++) {
          let cycle = cycles[i].reverse();
          let temp = this.cubelets[cycle[0]];
          for(let j = 0; j < cycle.length-1; j++) {
            console.log(`swapping ${cycle[j]} with ${cycle[j+1]}`);
              let newName = this.cubelets[cycle[j+1]];
              this.cubelets[cycle[j]] = newName;
              rotatedCubelets.push(newName);
          }
          this.cubelets[cycle[cycle.length-1]] = temp;
          rotatedCubelets.push(temp);
      }
      return rotatedCubelets;
    }
}

let state = new CubeletState();

state.printCubelets();

const testRotations: Rotation[] = [
  { orientation: '+', axis3d: 'y', slice: 1 },
  { orientation: '+', axis3d: 'z', slice: -1 },
  { orientation: '+', axis3d: 'x', slice: 1 }
];
// rotated F|D|C|B instead of F|G|H|B

for (let test = 0; test < testRotations.length; test++) {
  let testRotation = testRotations[test];
  let { orientation, axis3d, slice } = testRotation;
  console.log(`test: ${test} ~~~~~~~~~~`);
  console.log(`rotating slice ${slice} on axis ${axis3d} with orientation: ${orientation}`);
  let cubeletNames = state.rotate(axis3d, orientation, slice);
  console.log(`rotated cubelets: ${cubeletNames.join('|')}`);
  
  state.printCubelets();
} 