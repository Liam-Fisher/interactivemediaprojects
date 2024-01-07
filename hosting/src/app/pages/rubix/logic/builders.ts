import { Face, FaceData, FaceName } from "src/app/types/rubix";

export function createFaceColors(): FaceData {
    return {
        'front': (new Array(9)).fill(0),
        'back': (new Array(9)).fill(1),
        'left': (new Array(9)).fill(2),
        'right': (new Array(9)).fill(3),
        'top': (new Array(9)).fill(4),
        'bottom': (new Array(9)).fill(5)
    }
}
