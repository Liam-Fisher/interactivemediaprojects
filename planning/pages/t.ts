interface CubeletPermutation {
    diagonal: number[],
    orthogonal: number[],
    fixed: number
}
const faceAddressObject: Record<'x'|'y'|'z', FaceName[][]> = {
  "x": [['front', 'top', 'back', 'bottom'], ['right', 'left']],
  "y": [['front', 'right', 'back', 'left'], ['top', 'bottom']],
  "z": [['left', 'bottom', 'right', 'top'], ['front', 'back']]
};
const faceletAddressObject: Record<FaceName, Record<'x'|'y'|'z', number[][]>> = {
  "front": { "y":   [[0,1,2],[3,4,5],[6,7,8]], "x":   [[0,3,6],[1,4,7],[2,5,8]], "z": []
  },
  "left": { "y":    [[0,1,2],[3,4,5],[6,7,8]], "z":   [[2,5,8],[1,4,7],[0,3,6]], "x": []
  },
  "top": {  "z":    [[0,1,2],[3,4,5],[6,7,8]], "x":  [[0,3,6],[1,4,7],[2,5,8]], "y": []
  },
  "back": { "y":    [[6,7,8],[3,4,5],[0,1,2]], "x":   [[2,5,8],[1,4,7],[0,3,6]], "z": []
  },
  "right": {"y":    [[6,7,8],[3,4,5],[0,1,2]], "z":   [[2,5,8],[1,4,7],[0,3,6]], "x": []
  },
  "bottom": {"z":   [[6,7,8],[3,4,5],[0,1,2]], "x":   [[2,5,8],[1,4,7],[0,3,6]], "y": []
  } 
}
type FaceName = 'front'|'back'|'top'|'bottom'|'right'|'left';
interface Rotation {
  orientation?: boolean;
  axis3d?: 'x'|'y'|'z';
  face?: FaceName;
  axis2d?: 'horizontal'|'vertical';
  slice?: number;
}

function getCubeletGenArgs(slice: number, axis3d: 'x'|'y'|'z') {
  if(axis3d === 'x') return [slice, 3, 0];
  if(axis3d === 'z') return [slice*9, 1, 0];
  return [slice*3, 1, 7];
}
export class RubixCubeState  {
    debug = true;
    readonly faceNames = ['front','back','top','bottom','right','left'];
    readonly cubeletNames = [
      "corner_A", "edge_A", "corner_B", 
      "edge_B", "center_A", "edge_C",
      "corner_C", "edge_D", "corner_D",
    
      "edge_E", "center_B", "edge_F", 
      "center_C", "middle", "center_D",
      "edge_G", "center_E", "edge_H",
    
      "corner_E", "edge_I", "corner_F",
      "edge_J", "center_F", "edge_K",
      "corner_G", "edge_L", "corner_H"
    ];
    faceColors = Object.fromEntries(this.faceNames.map((name, i) => [name, (new Array(9)).fill(i)]));
    cubeletAddresses: Map<number, string> = new Map(this.cubeletNames.map((name, i) => [i, name]));
    constructor() {
        //this.faceColors = Object.fromEntries(this.faceNames.map((name, i) => [name, (new Array(9)).fill(i)]));
        //this.cubeletAddresses = new Map(this.cubeletNames.map((name, i) => [i, name]));
      }
    transposeFace(f: number[], o: boolean) {
      let map = f.map((_,i) => f.at((i%3+(i%3)*3)));
      return o ? map : map.reverse();
    }
    printCubelets() {
      console.log(`... ... ... printing cubelets ... ... ... ... `);
for(let i=0; i<27; i++) {
    if(i%9===0) {
      if(i===0) {
        console.log(`front layer`);
      }
      else if(i===9) {
        console.log(`middle layer`);
      }
      else {
        console.log(`back layer`);
      }
      console.log(`______________________`);
    }
    console.log(`${this.cubeletAddresses.get(i)}: ${i}`);
  } 
      console.log(`... ... ... ... ... ... ... ... ... ... ... ... `);
    }
    printFaces() {
      console.log(`... ... ... printing faces ... ... ... ... `);
      for(let face in this.faceColors) {
        let colors= this.faceColors[face as FaceName];
        console.log(`${face}:           `);
        console.log(`${colors[0]}|${colors[1]}|${colors[2]}`);
        console.log(`${colors[3]}|${colors[4]}|${colors[5]}`);
        console.log(`${colors[6]}|${colors[7]}|${colors[8]}`);
      }
      console.log(`... ... ... ...  ... ... ... ... ... ... `);
    }
    getCubeletAddresses(axis3d: 'x'|'y'|'z', orientation: boolean, slice: number): [number[], number[], number] {
      let [addr, inc1, inc2] = getCubeletGenArgs(slice, axis3d);
      
      let [diagonal, orthogonal, fixed] = [[] as number[],[] as number[], 0];
      let index = 0;
      while(index<9) {
        if(index === 4) {
           fixed = addr; // add address to permutation
        }
        else {
          if(+!fixed === index % 2){
            if(orientation) orthogonal.unshift(addr);
            else orthogonal.push(addr);
          }
          else {
            if(orientation) diagonal.unshift(addr);
            else diagonal.push(addr);
          }
          //(+!fixed === index % 2 ? orthogonal:diagonal).splice(orientation?0:index, 0, addr);
        }
        addr += (!inc2 || !(index % 3)) ? inc1 : inc2; // change increment
        index++;
      }
      return [diagonal, orthogonal, fixed];
    }  
    rotateSideFace(sides: FaceName[], orientation: boolean, slice: number) {
      if(slice) {
        let side = slice > 0 ? sides[0] : sides[1];
        if(this.debug) console.log(`rotating side face: ${side} with orientation ${orientation}`);
        this.faceColors[side] = this.transposeFace(this.faceColors[side], orientation);
      }
    }
    rotateCubelets(axis3d: 'x'|'y'|'z', orientation: boolean, slice: number): string[] {
      let [diagonal, orthogonal, fixed] = this.getCubeletAddresses(axis3d, orientation, slice);
      if(this.debug) console.log(`rotating cubelets: ${diagonal.join('|')}|${orthogonal.join('|')}|${fixed}`);

      let fixedName = this.cubeletAddresses.get(fixed) as string;
      let cubeletNames: string[] = [fixedName];
      let initialDiagonalName = this.cubeletAddresses.get(diagonal[0]) as string;
      let initialOrthogonalName = this.cubeletAddresses.get(orthogonal[0]) as string;
      for(let i = 1; i <= 4; i++) {
        let diagonalName = (i === 4) ? initialDiagonalName: this.cubeletAddresses.get(diagonal[i-1]) as string;
        let orthogonalName = (i === 4) ? initialOrthogonalName: this.cubeletAddresses.get(orthogonal[i]) as string;
        cubeletNames.push(diagonalName, orthogonalName);
        this.cubeletAddresses.set(diagonal[i-1], orthogonalName);
        this.cubeletAddresses.set(orthogonal[i-1], diagonalName);
      }
      return cubeletNames;
    }
    rotateSlice(faces: FaceName[][], axis3d: 'x'|'y'|'z', orientation: boolean, slice: number): string[] {
      if(this.debug) { 
        console.log(`initial face colors`);
        this.printFaces();
      }
      let [ring, sides] = faces;
      console.log(`ring rotation order: ${ring.join('=>')}`);
      if(orientation) {
        console.log(`reversing orientation`);
        ring.reverse();
        console.log(`ring rotation order: ${ring.join('=>')}`);
      }
      this.rotateSideFace(sides, orientation, slice);
      let facelets = ring.map(face =>  faceletAddressObject[face][axis3d][slice as number+1]);
      let intialColors: number[] = Array.from(this.faceColors[ring[0]]);

      for(let i = 1; i <= ring.length; i++) {
          let isLastFace = (i === ring.length);
          for(let j=0; j < 3; j++) {
            if(isLastFace) {
              console.log(`setting facelet ${facelets[i-1][j]} of face: ${ring[i-1]} to facelet ${facelets[0][j]} of face: ${ring[0]}`);
              this.faceColors[ring[i-1]][facelets[i-1][j]] = intialColors[facelets[0][j]];
            }
            else {
              console.log(`setting facelet ${facelets[i-1][j]} of face: ${ring[i-1]} to facelet ${facelets[0][j]} of face: ${ring[i]}`);
              this.faceColors[ring[i-1]][facelets[i-1][j]] = this.faceColors[ring[i]][facelets[i][j]];
            }
          }
      }
      if(this.debug)  {
        console.log(`new face colors`);
        this.printFaces();
      }
      return this.rotateCubelets(axis3d, orientation, slice);
    }
    rotateCube(faces: FaceName[][], axis3d: 'x'|'y'|'z', orientation: boolean): string[] {
      let cubeletNames: string[] = [];
      for(let i=-1; i<=1; i++) {
        cubeletNames.push(...this.rotateSlice(faces, axis3d, orientation, i));
      }
      return cubeletNames;
    }
    rotate(r: Rotation): string[] {
      let { orientation, axis3d, slice } = r;
      if (!axis3d || orientation === undefined) {
          return [];
      }
      let faces = faceAddressObject[axis3d];
      if (typeof slice !== 'number') {
        return this.rotateCube(faces, axis3d, orientation);
      }
      return this.rotateSlice(faces, axis3d, orientation, slice);
    }
}


const state = new RubixCubeState();

state.cubeletAddresses.forEach((name, i) => console.log(`${name}: ${i}`));





 const testRotations: Rotation[] = [
  { orientation: true, axis3d: 'x', slice: 0 },
  { orientation: false, axis3d: 'x', slice: 0 }
];

for(let test=0;test<testRotations.length;test++) {
  let testRotation = testRotations[test];
  console.log(`test: ${test} ~~~~~~~~~~`);
  console.log(`rotating slice ${testRotation.slice} on axis ${testRotation.axis3d} with orientation: ${testRotation.orientation}`);
  let cubeletNames = state.rotate(testRotation);
  console.log(`rotated cubelets: ${cubeletNames.join('|')}`);
} 