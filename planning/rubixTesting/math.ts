import { Axis, Orientation } from "./types";

export function transpose2d(target: any[]) {
    let size = Math.sqrt(target.length);
    if(size !== Math.floor(size)) {
        throw new Error('target array is not square');
    }
    for(let i = 0; i < size; i++) {
        for(let j = i+1; j < size; j++) {
            let temp = target[i*size+j];
            target[i*size+j] = target[j*size+i];
            target[j*size+i] = temp;
        }
    }
}
// 2 1 0 
// 5 4 3 
// 8 7 6
// 
// rings:
// 0 6 8 2 // 6, 2  // (3**1)*2-(3**0)*0, (3**1)*0+(3**0)*2
// 1 3 7 5 // 2, 4  // (3**1)*1-(3**0)*1, (3**1)*1+(3**0)*1

// 0  3  6
// 9  12 15
// 18 21 24
//
// rings:
// 0  18 24 6  // 18, 6  // (3**2)*2-(3**1)*0, (3**2)*0+(3**1)*2
// 3  9  21 15 // 6,  12 // (3**2)*1-(3**1)*1, (3**2)*1+(3**1)*1

// 3  2  1  0
// 7  6  5  4
// 11 10 9  8
// 15 14 13 12 
// 
// rings:
// 0  12 15 3  // 12, 3 // (4**1)*3-(4**0)*0, (4**1)*0+(4**0)*3

// 1  8  14 7  // 7,  6 // (4**1)*2-(4**0)*1, (4**1)*1+(4**0)*2
// 2  4  13 11 // 2,  9 // (4**1)*1-(4**0)*2, (4**1)*2+(4**0)*1

// 5  9  10 6  // 4,  1 // (4**1)*1-(4**0)*0, (4**1)*0+(4**0)*1

// x axis
// 0  4  8  12 // 
// 16 20 24 28 // 
// 32 36 40 44 //
// 48 52 56 60 //
//
// rings:
// 0  48 60 12 //  48, 12 //  (4**2)*3-(4**1)*0, (4**2)*0+(4**1)*3
// 4  32 56 28 //  28, 24 //  (4**2)*2-(4**1)*1, (4**2)*1+(4**1)*2
// 8  16 52 44 //  8,  36 //  (4**2)*1-(4**1)*2, (4**2)*2+(4**1)*1

// 20 24 40 36 //  4,  16 //  (4**2)*3-(4**1)*0, (4**2)*0+(4**1)*3

// 4  3  2  1  0
// 9  8  7  6  5
// 14 13 12 11 10
// 19 18 17 16 15
// 24 23 22 21 20
// 
// rings:
// 0  20 24 4  // 20, 4  // (5**1)*4-(5**0)*0, (5**1)*0+(5**0)*4
// 1  15 23 9  // 14, 8  // (5**1)*3-(5**0)*1, (5**1)*1+(5**0)*3
// 2  10 22 14 // 8,  12 // (5**1)*2-(5**0)*2, (5**1)*2+(5**0)*2
// 3  5  21 19 // 2,  16 // (5**1)*1-(5**0)*3, (5**1)*3+(5**0)*1

// 6  16 18 8 //  10, 2  // (5**1)*2-(5**0)*0, (5**1)*0+(5**0)*2
// 7  11 17 13 // 4,  6  // (5**1)*1-(5**0)*1, (5**1)*1+(5**0)*1

export function printMatrix(matrix: any[][], name: string = 'matrix') {
    console.log(`... ... ... printing ${name} ... ... ... ... `);
    for(let row of matrix) {
        console.log(`${row.join('|')}`);
    }
}
let test = ['a','b','c','d','e','f','g','h','i'];


export function permute<T = string>(target: T[], altered: T[], cycles: number[][]) {
    for(let i = 0; i < cycles.length; i++) {
        let cycle = cycles[i];
        let temp = target[cycle[0]];
        for(let j = 0; j < cycle.length-1; j++) {
            let newName = target[cycle[j+1]];
            target[cycle[j]] = newName;
            altered.push(newName);
        }
        target[cycle[cycle.length-1]] = temp;
        altered.push(temp);
    }
  }

export function rotationCycle(s: number, o: Orientation, g1: number, g2: number) {
    return [s, s+(o==='+'?g1:g2), s+g1+g2, s+(o==='+'?g2:g1)];
}



// front: 0, back: 1, top: 2, bottom: 3, left: 4, right: 5

// x axis, y axis, z axis
// x axis rotates front  => top => back => bottom
// 0, 2, 1, 3
// y axis rotates front, back, left, right
// 0, 1, 4, 5
// z axis rotates upper, lower, left, right 

// facelets are stored as [face][row][col]
// facelets are rotated by transposing the facelet matrix

// z axis rotation at slice -1 is a transpose on the front face
// z axis rotation at slice 1 is a transpose on the back face
// y axis rotation at slice -1 is a transpose on the top face
// y axis rotation at slice 1 is a transpose on the bottom face
// x axis rotation at slice 1 is a transpose on the right face
// x axis rotation at slice -1 is a transpose on the left face


// Front x -> y ^
  // 2  1  0
  // 5  4  3
  // 8  7  6
// Left z -> y ^
  // 2  1  0
  // 5  4  3
  // 8  7  6
// Top x -> z ^
  // 2  1  0
  // 5  4  3
  // 8  7  6
// Back x -> y ^
  // 6 7 8
  // 3 4 5
  // 0 1 2
// Bottom
  // 6 7 8
  // 3 4 5
  // 0 1 2
// Right y ^ z ->  
  // 6 7 8
  // 3 4 5
  // 0 1 2


  const faceletAddressObject: Record<string, Record<'x' | 'y' | 'z', number[][]>> = {
    "front": {
      "y": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "x": [[0, 3, 6], [1, 4, 7], [2, 5, 8]], "z": []
    },
    "left": {
      "y": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "z": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "x": []
    },
    "top": {
      "z": [[0, 1, 2], [3, 4, 5], [6, 7, 8]], "x": [[0, 3, 6], [1, 4, 7], [2, 5, 8]], "y": []
    },
    "back": {
      "y": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "x": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "z": []
    },
    "right": {
      "y": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "z": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "x": []
    },
    "bottom": {
      "z": [[6, 7, 8], [3, 4, 5], [0, 1, 2]], "x": [[2, 5, 8], [1, 4, 7], [0, 3, 6]], "y": []
    }
  }
  // x axis rotation at slice -1 with orientation + is a transpose on the left face
  // front:0:0 => top:0:0 => back:2:0 => bottom:2:0
  // front:1:0 => top:1:0 => back:1:0 => bottom:1:0
  // front:2:0 => top:2:0 => back:0:0 => bottom:0:0
    // so for x rotations,  back and bottom have reversed addressing
    // e.g. front[row][1+slice] => top[row][1+slice] => back[2-row][1+slice] => bottom[2-row][1+slice]

    // for y rotations,  back and right have reversed addressing
