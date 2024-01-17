import { Axis, Swipe, FaceName, PermutationAddressMap } from "src/app/types/rubix";
import { Face } from "three";
//export const SWIPE_DIRECTIONS: Swipe[] = ['left', 'right', 'up', 'down', 'none'];
export const COLOR_PALETTE: number[] =[ 0xFFFFFF, 0xFFFF00,  0xFFA500, 0xFF0000, 0x00FF00, 0x0000FF, 0x000000 ];
export const RING_FACES: Record<Axis, FaceName[]> = {
    "x": ['front', 'bottom', 'back', 'top'],
    "y": ['left', 'front', 'right', 'back'],
    "z": ['top', 'right', 'bottom', 'left']
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


export const FACELET_ROTATION_GROUPS: Record<Axis, number[][][]> = {
    "x": [ // front, bottom, back, top
        [[0,3,6],[1,4,7],[2,5,8]], // 2 4 6
        [[2,5,8],[1,4,7],[0,3,6]],
        [[2,5,8],[1,4,7],[0,3,6]],
        [[0,3,6],[1,4,7],[2,5,8]]
    ],
    "y": [ // left, front, right, back
        [[0,1,2],[3,4,5],[6,7,8]],
        [[0,1,2],[3,4,5],[6,7,8]],
        [[2,5,8],[1,4,7],[0,3,6]],
        [[2,5,8],[1,4,7],[0,3,6]]
    ],
    "z": [ // top, right, bottom, left
        [[0,1,2],[3,4,5],[6,7,8]],
        [[2,5,8],[1,4,7],[0,3,6]],
        [[6,7,8],[3,4,5],[0,1,2]],
        [[2,5,8],[1,4,7],[0,3,6]]
    ]
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
};/* 
export const CUBELET_ROTATION_GROUPS: Record<Axis, number[][][]> = {
    "x": [
        {
            "diagonal":   [0, 6,  24, 18],
            "orthogonal": [3, 15, 21, 9 ],
            "fixed": [12]
        },
        {
            "diagonal":   [1, 7,  25, 19],
            "orthogonal": [4, 16, 22, 10],
            "fixed": [13]
        },
        {
            "diagonal":   [2, 8,  26, 20],
            "orthogonal": [5, 17, 23, 11],
            "fixed": [14]
        }
    ],
    "y": [
        {
            "diagonal":   [0, 18, 20, 2 ],
            "orthogonal": [1, 9,  19, 11],
            "fixed": [10]
        },
        {
            "diagonal":   [3, 21, 23, 5 ],
            "orthogonal": [4, 12, 22, 14],
            "fixed": [13]
        },
        {
            "diagonal":   [6, 24, 26, 8],
            "orthogonal": [7, 15, 25, 17],
            "fixed": [16]
        }
    ],
    "z": [
        {
            "diagonal":   [0,2,8,6],
            "orthogonal": [1,5,7,3],
            "fixed": [4]
        },
        {
            "diagonal":   [9,  11, 17, 15],
            "orthogonal": [10, 14, 16, 12],
            "fixed": [13]
        },
        {
            "diagonal":   [18, 20, 26, 24],
            "orthogonal": [19, 23, 25, 21],
            "fixed": [22]
        }
    ]


} */