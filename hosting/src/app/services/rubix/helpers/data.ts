import { Axis, Swipe, FaceName, PermutationAddressMap, Orientation, RotationAction } from "src/app/types/rubix";
import { Face } from "three";
//export const SWIPE_DIRECTIONS: Swipe[] = ['left', 'right', 'up', 'down', 'none'];

export type CubeCode = Axis|'X'|'Y'|'Z';
export const COLOR_PALETTE: number[] =[ 0xFFFFFF, 0xFFFF00,  0xFFA500, 0xFF0000, 0x00FF00, 0x0000FF, 0x000000 ];
/* export const RING_FACES: Record<Axis, Record<Orientation,FaceName[]>> = {
    "x": {
        "+": ['front', 'bottom', 'back', 'top'],
        "-": ['front', 'top', 'back', 'bottom']
    },
    "y": {
        "+": ['left', 'front', 'right', 'back'],
        "-": ['left', 'back', 'right', 'front']
    },
    "z": {
        "+": ['top', 'right', 'bottom', 'left'],
        "-": ['top', 'left', 'bottom', 'right']
    }
}
export const SIDE_FACES: Record<Axis,[FaceName,undefined,FaceName]> = {
    "x": ['left', undefined, 'right'],
    "y": ['top', undefined, 'bottom'],
    "z": ['front', undefined, 'back']
} */

// each 
export type VisibleFace = Exclude<FaceName, 'back'|'left'|'bottom'>;

export const RING_FACES: Record<Axis, Record<Orientation,FaceName[]>> = {
    "x": {
        "+": ['front', 'bottom', 'back', 'top'],
        "-": ['front', 'top', 'back', 'bottom']
    },
    "y": {
        "+": ['left', 'front', 'right', 'back'],
        "-": ['left', 'back', 'right', 'front']
    },
    "z": {
        "+": ['top', 'right', 'bottom', 'left'],
        "-": ['top', 'left', 'bottom', 'right']
    }
}
export const SIDE_FACES: Record<Axis,[FaceName,undefined,FaceName]> = {
    "x": ['left', undefined, 'right'],
    "y": ['top', undefined, 'bottom'],
    "z": ['front', undefined, 'back']
}
export const CUBELET_NAMES = [
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
export const FACE_NAMES: FaceName[] = [
    'front',
    'back',
    'top',
    'bottom',
    'left',
    'right'
];
// ordered by rotation cycle,
/* export const FACELET_ROTATION_GROUPS: Record<string, Record<'x' | 'y' | 'z', number[][]>> = {
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
 */
// could structure this further by indexing repeated patterns

const FACELET_SLICE_GROUPS: number[][] = [[0,1,2], [0, 3, 6], [3,4,5], [1, 4, 7], [6,7,8], [2, 5, 8]];


export const FACELET_ROTATION_SLICES: Record<Axis, Record<FaceName, number[][]>> = {
    "x":  {
        "front":  [[0,3,6],[1,4,7],[2,5,8]],
        "bottom": [[2,5,8],[1,4,7],[0,3,6]],
        "back":   [[2,5,8],[1,4,7],[0,3,6]],
        "top":    [[0,3,6],[1,4,7],[2,5,8]],
        "left": [],
        "right": []
    },
    "y": {
        "left":   [[0,1,2],[3,4,5],[6,7,8]],
        "front":  [[0,1,2],[3,4,5],[6,7,8]],
        "right":  [[2,5,8],[1,4,7],[0,3,6]],
        "back":   [[2,5,8],[1,4,7],[0,3,6]],
        "top": [],
        "bottom": []
    },
    "z": {
        "top":    [[0,1,2],[3,4,5],[6,7,8]],
        "right":  [[2,5,8],[1,4,7],[0,3,6]],
        "bottom": [[6,7,8],[3,4,5],[0,1,2]],
        "left":   [[2,5,8],[1,4,7],[0,3,6]],
        "front": [],
        "back": []
    }
}
export const CUBELET_ROTATION_GROUPS: Record<Axis, number[][][]> = {
    "x": [
        [
            [0, 6,  24, 18],
            [3, 15, 21, 9 ],
            [12]
        ],
        [
            [1, 7,  25, 19],
            [4, 16, 22, 10],
            [13]
        ],
        [
            [2, 8,  26, 20],
            [5, 17, 23, 11],
            [14]
        ]
    ],
    "y": [
        [
            [0, 18, 20, 2 ],
            [1, 9,  19, 11],
            [10]
        ],
        [
            [3, 21, 23, 5 ],
            [4, 12, 22, 14],
            [13]
        ],
        [
            [6, 24, 26, 8],
            [7, 15, 25, 17],
            [16]
        ]
    ],
    "z": [
        [
            [0,2,8,6],
            [1,5,7,3],
            [4]
        ],
        [
            [9,  11, 17, 15],
            [10, 14, 16, 12],
            [13]
        ],
        [
            [18, 20, 26, 24],
            [19, 23, 25, 21],
            [22]
        
        ]
    ]
};
// only need to store the slice groups for cubelets of front, left, top
// front 0 1 2 3 4 5 6 7 8 
// left: 2 5 8 11 14 17 20 23 26 
// top 0 1 2 9 10 11 18 19 20
type t = Exclude<FaceName, 'back'>;
export const SLICE_AXIS_ORIENTATION: Record<Exclude<Swipe,'none'>, Record<'front'|'left'|'top',[Axis, Orientation]>> = {
    'up': {
        'front': ['x', '-'], 
        'left': ['z', '+'],
        'top': ['x', '-'] 
    },
    "down": {
        'front': ['x', '+'], 
        'left': ['z', '-'], 
        'top': ['x', '+'] 
    },
    "left": {
        'front': ['y', '-'], 
        'left': ['y', '-'], 
        'top': ['z', '-'] 
    },
    "right": {
        'front': ['y', '+'], 
        'left': ['y', '+'], 
        'top': ['z', '+'] 
    }
}

export const CUBE_AXIS_ORIENTATION: Record<Exclude<Swipe,'none'>, [Axis, Orientation]> = {
    'up': ['x', '-'],
    'down': ['x', '+'],
    'left': ['y', '-'],
    'right': ['y', '+']
}
// "R", "r", "L", "l", "M", "m", "U", "u", "E", "e", "D", "d",  "R", "r", "F", "f", "S", "s", "B", "b"
export const SLICE_ROTATION_CODES = [ "R", "M", "L", "U", "E", "D", "F", "S", "B",  "r", "m", "l", "u", "e", "d", "f", "s", "b"];
export const CUBE_ROTATION_CODES = ["X", "Y","Z", "x", "y", "z"];
// on an x rotation, X and x stay the same, 
// if it's positive: YzyZ else YZyz
// on a y rotation, Y and y stay the same
// if it's positive: XZxz else XzxZ
// x: [0] [3] [1,5,4,2] | [0] [3]  [1,2,4,5]
// y: [1] [4] [0,2,3,5] | [1] [4]  [0,5,3,2]
// z: [2] [5] [0,4,1,3] | [2] [5]  [0,3,1,4]
export const CUBE_REORIENTATION: Record<CubeCode, CubeCode[]> = {
    "X": ["Y","z","y","Z"],
    "Y": ["X","z","x","Z"], 
    "Z": ["X","y","x","Y"],
    "x": ["Y","Z","y","z"],
    "y": ["X","Z","x","z"],
    "z": ["X","Y","x","y"]
}/* 
"Y": ["X","Z","x","z"],
"y": ["X","z","x","Z"], *//* 
export const SLICE_REORIENTATION: Record<CubeCode, string[][]> = {
    "X": [["F", "U", "b", "d"], ["f", "u", "B", "D"], ["E", "s", "e", "S"]],

    "Y": [["F", "l", "b", "R"], ["f", "L", "B", "r"], ["M", "S", "m", "s"]],

    "Z": [["l", "U", "R", "b"], ["L", "u", "r", "B"], ["E", "M", "e", "m"]],

    "x": [["d", "b", "U", "F"], ["D", "B", "u", "f"], ["S", "e", "s", "E"]],

    "y": [["R", "b", "l", "F"], ["r", "B", "L", "f"], ["s", "m", "S", "M"]],

    "z": [["b","R", "U", "l"], ["B", "r", "u", "L"], ["m", "e", "M", "E"]]
} */

export const SLICE_REORIENTATION: Record<CubeCode, string[][]> = {
    
    "X": [["d", "b", "U", "F"], ["D", "B", "u", "f"], ["S", "e", "s", "E"]],
    "Y": [["F", "l", "b", "R"], ["f", "L", "B", "r"], ["M", "S", "m", "s"]],
/*     
    "Y": [["F", "b"], ["l", "R"], ["f", "B"], ["L", "r"], ["M", "S", "m", "s"]],
 */
    "Z": [["l", "U", "R", "b"], ["L", "u", "r", "B"], ["E", "M", "e", "m"]],
    "x": [["F", "U", "b", "d"], ["f", "u", "B", "D"], ["E", "s", "e", "S"]],
    "y": [["R", "b", "l", "F"], ["r", "B", "L", "f"], ["s", "m", "S", "M"]],
    /* 
    "y": [["R", "l"], ["b", "F"], ["r", "L"], ["B", "f"], ["s", "m", "S", "M"]], */
    "z": [["b","R", "U", "l"], ["B", "r", "u", "L"], ["m", "e", "M", "E"]]
}
/* L
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
export const SLICE_ROTATION_MAP: Record<string, RotationAction> = {


}

