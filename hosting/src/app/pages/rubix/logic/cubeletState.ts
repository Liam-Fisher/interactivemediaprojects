// cubelets are addressed by their position in the cube, from right to left, top to bottom, back to front
import { Axis, Orientation, Position } from "src/app/types/rubix";
import { CUBELET_NAMES, CUBELET, CUBELET_ROTATION_GROUPS } from "./data";
import { logCubeletState } from "../helpers/logging";


export class CubeletState {
    size = 3;
    axis = ['x', 'y', 'z'];
    names: string[] = [];
    constructor(size?: number){
      this.size = size ?? this.size;
      this.reset();
    }
    reset() {
      this.names = Array.from(CUBELET_NAMES);
    }
    printCubelets() {
      logCubeletState(this.names);
  }
  addressToPosition(address: number): Position {
    let iaddr= 26-address;
    return {
        x: (iaddr % 3) - 1,
        y: (Math.floor(iaddr / 3) % 3) - 1,
        z: Math.floor(iaddr / 9) - 1
    };
  }
    getPosition(name: string): Position {
      return this.addressToPosition(this.names.indexOf(name));
    }
    getAddressFromName(name: string): number {
      return this.names.indexOf(name);
    }
    rotate(axis: Axis, orientation: Orientation, slice: number): string[] {  
      let {diagonal, orthogonal, fixed} = CUBELET_ROTATION_GROUPS[axis][slice+1];
      return [this.names[fixed], ...this.permute(orientation, [diagonal, orthogonal])];
    }
    permute(orientation: Orientation, cycles: number[][]): string[] {
      let rotatedCubelets: string[] = [];
        for(let i = 0; i < cycles.length; i++) {
            let cycle = Array.from(cycles[i]); 
            if(orientation === '+') {
                cycle = cycle.reverse();
            }
            let temp = this.names[cycle[0]];
            for(let j = 0; j < cycle.length-1; j++) {
              //console.log(`moving ${this.names[cycle[j+1]]} to the position held by ${this.names[cycle[j]]}`);
                let newName = this.names[cycle[j+1]];
                this.names[cycle[j]] = newName;
                rotatedCubelets.push(newName);
            }
            //console.log(`moving ${temp} to the position held by ${this.names[cycle[cycle.length-1]]}`);
            this.names[cycle[cycle.length-1]] = temp;
            rotatedCubelets.push(temp);
        }
        return rotatedCubelets;
      }
}

