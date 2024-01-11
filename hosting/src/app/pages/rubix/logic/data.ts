import { Axis, PermutationAddressMap } from "src/app/types/rubix";

export const cubeletNames = [
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
export const faceNames = [
    'front',
    'back',
    'top',
    'bottom',
    'left',
    'right'
];
// ordered by rotation cycle,
export const faceletAddressObject: Record<string, Record<'x' | 'y' | 'z', number[][]>> = {
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
export const cubeletRotationAddresses: Record<Axis, PermutationAddressMap[]> = {
    "x": [
        {
            "diagonal":   [0, 6,  24, 18],
            "orthogonal": [3, 15, 21, 9 ],
            "fixed": 12
        },
        {
            "diagonal":   [1, 7,  25, 19],
            "orthogonal": [4, 16, 22, 10],
            "fixed": 13
        },
        {
            "diagonal":   [2, 8,  26, 20],
            "orthogonal": [5, 17, 23, 11],
            "fixed": 14
        }
    ],
    "y": [
        {
            "diagonal":   [0, 18, 20, 2 ],
            "orthogonal": [1, 9,  19, 11],
            "fixed": 10
        },
        {
            "diagonal":   [3, 21, 23, 5 ],
            "orthogonal": [4, 12, 22, 14],
            "fixed": 13
        },
        {
            "diagonal":   [6, 24, 26, 8],
            "orthogonal": [7, 15, 25, 17],
            "fixed": 16
        }
    ],
    "z": [
        {
            "diagonal":   [0,2,8,6],
            "orthogonal": [1,5,7,3],
            "fixed": 4
        },
        {
            "diagonal":   [9,  11, 17, 15],
            "orthogonal": [10, 14, 16, 12],
            "fixed": 13
        },
        {
            "diagonal":   [18, 20, 26, 24],
            "orthogonal": [19, 23, 25, 21],
            "fixed": 22
        }
    ]


}