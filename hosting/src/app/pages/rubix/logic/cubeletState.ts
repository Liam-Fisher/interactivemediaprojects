// cubelets are addressed by their position in the cube, from right to left, top to bottom, back to front
import { Axis, Axis3dName, Orientation, Position } from "src/app/types/rubix";
import { addressToPosition } from "../helpers/converting";



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
    getPosition(name: string): Position {
      return addressToPosition(this.cubelets.indexOf(name));
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
            let cycle = cycles[i];
            let temp = this.cubelets[cycle[0]];
            for(let j = 0; j < cycle.length-1; j++) {
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
