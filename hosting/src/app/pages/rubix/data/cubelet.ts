import { ColumnName, CubeData, FaceName, Position, RowName } from "src/app/types/rubix";

export const defaultColorPalette = [ "#FFFFFF", '#00FFFF',  '#FFA500', "#FF0000", "#00FF00", '#0000FF' ];
//  
export const cubeRotationGenerators: Position<Record<string, [number, number]>> = {
    // distances between indices for corners, faces, and centers
    'x': {
        'corners': [0, 12], 
        'edges': [12, 6], 
        'centers': [12, 14]
    },
    'y': {
        'corners': [2, 18], 
        'edges': [10, 8], 
        'centers': [10,16]
    },
    'z': {
        'corners': [2, 6], 
        'edges': [4, 2], 
        'faces': [4,22]
    }
};
export const cubeletFaceAddressMap: number[][][] = [
    /* 0  */ [[0,0,0],[2,0,2],[5,2,0]], // corner:  front top left 
    /* 1  */ [[0,1,1],[2,1,2]], // edge:    front top 
    /* 2  */ [[0,2,2],[2,2,2],[4,2,0]], // corner:  front top right
    /* 3  */ [[0,0,1],[5,2,1]], // edge:    front left
    /* 4  */ [[0,1,1]], // center:  front 
    /* 5  */ [[0,2,1],[4,2,1]], // edge:    front right
    /* 6  */ [[0,0,2],[3,0,0],[5,2,2]], // corner:  front bottom left
    /* 7  */ [[0,1,2],[3,1,0]], // edge:    front bottom
    /* 8  */ [[0,2,2],[3,2,0],[4,2,2]], // corner:  front bottom right

    /* 9  */ [[2,0,1],[5,1,0]], // edge:    top left
    /* 10 */ [[2,1,1]], // center:  top
    /* 11 */ [[2,2,1],[4,1,0]], // edge:    top right
    /* 12 */ [[5,1,1]], // center:  left
    /* 13 */ [], // null: 
    /* 14 */ [[4,1,1]], // center:  right 
    /* 15 */ [[3,0,1],[5,1,2]], // edge:    bottom left
    /* 16 */ [[3,1,1]], // center:  bottom 
    /* 17 */ [[3,2,1],[4,1,2]], // edge:    bottom right

    /* 18 */ [[1,2,2],[2,0,0],[5,0,0]], // corner:  back top left 
    /* 19 */ [[1,1,2],[2,1,0]], // edge:    back top
    /* 20 */ [[1,0,2],[2,2,0],[4,0,0]], // corner:  back top right
    /* 21 */ [[1,2,1],[5,0,1]], // edge:    back left
    /* 22 */ [[1,1,1]], // center:  back 
    /* 23 */ [[1,0,1],[4,0,1]], // edge:    back right
    /* 24 */ [[1,2,0],[3,2,0],[5,0,2]], // corner:  back bottom left
    /* 25 */ [[1,1,0],[3,2,1]], // edge:    back bottom
    /* 26 */ [[1,0,0],[3,2,2],[4,0,2]] //  corner:  back bottom right
];
export const cubeletFaceMap2: [FaceName, RowName, ColumnName][][] = [
    [['front', 'top', 'left'], ['top', 'bottom', 'left'], ['left', 'top', 'right']], // corner:  front top left
    [['front', 'top', 'center'], ['top', 'bottom', 'center']], // edge:    front top
    [['front', 'top', 'right'], ['top', 'bottom', 'right'], ['right', 'top', 'left']], // corner:  front top right
    [['front', 'middle', 'left'], ['left', 'middle', 'right']], // edge:    front left
    [['front', 'middle', 'center']], // center:  front
    [['front', 'middle', 'right'], ['right', 'middle', 'left']], // edge:    front right
    [['front', 'bottom', 'left'], ['bottom', 'top', 'left'], ['left', 'bottom', 'right']], // corner:  front bottom left
    [['front', 'bottom', 'center'], ['bottom', 'top', 'center']], // edge:    front bottom
    [['front', 'bottom', 'right'], ['bottom', 'top', 'right'], ['right', 'bottom', 'left']], // corner:  front bottom right
    [['top', 'top', 'left'], ['left', 'bottom', 'left']], // edge:    top left
    [['top', 'top', 'center']], // center:  top
    [['top', 'top', 'right'], ['right', 'bottom', 'right']], // edge:    top right
    [['left', 'top', 'center']], // center:  left
    [], // null:
    [['right', 'top', 'center']], // center:  right
    [['bottom', 'top', 'left'], ['left', 'top', 'right']], // edge:    bottom left
    [['bottom', 'top', 'center']], // center:  bottom
    [['bottom', 'top', 'right'], ['right', 'top', 'left']], // edge:    bottom right
    [['back', 'top', 'left'], ['top', 'bottom', 'right'], ['left', 'top', 'right']], // corner:  back top left
    [['back', 'top', 'center'], ['top', 'bottom', 'center']], // edge:    back top
    [['back', 'top', 'right'], ['top', 'bottom', 'left'], ['right', 'top', 'left']], // corner:  back top right
    [['back', 'middle', 'left'], ['left', 'middle', 'right']], // edge:    back left
    [['back', 'middle', 'center']], // center:  back
    [['back', 'middle', 'right'], ['right', 'middle', 'left']], // edge:    back right
    [['back', 'bottom', 'left'], ['bottom', 'top', 'right'], ['left', 'bottom', 'right']], // corner:  back bottom left
    [['back', 'bottom', 'center'], ['bottom', 'top', 'center']], // edge:    back bottom
    [['back', 'bottom', 'right'], ['bottom', 'top', 'left'], ['right', 'bottom', 'left']] //  corner:  back bottom right
];


// There are 2 data structures that need to be kept in sync:
    // the first is the addresses of the cubelet objects in the scene
        // these have:
            // a static name which reflects their initial position, 
            // a dynamic position, which reflects to rotations applied
    // The second is the colors displayed on each face
        // these have:
            // a value from 0-5, which corresponds to a color in the color palette
            // they are nested by face, row, and column 



// the procedure for rotating a face is:
    // 1. get the intersected objects at pointer up and pointer down
    // 2. get the object names which have type CubeletName e.g. 'front_top_left' or null, if no object was intersected
    // 3a. get the current address of the cubelets with that name, 
    // OR if no objects were intersected
    // 3b. get the swipe vector (e.g. [1,0] for a swipe to the right)
    // 4a. 
    // OR if no objects were intersected
    // 4b. rotate the whole cube around an axis orthogonal to the swipe vector (cannot be clockwise or counterclockwise)
