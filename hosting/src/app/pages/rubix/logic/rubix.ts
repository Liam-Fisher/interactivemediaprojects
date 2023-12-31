import { Axis3dName, FaceData, FaceName, IRubixState } from "src/app/types/rubix";
import { createFaceColors } from "./builders";
import * as data from './data';
export class RubixCubeState implements IRubixState {
    readonly cubeletNames = data.cubeletNames;
    faceColors: FaceData = Object.fromEntries(data.faceNames.map((name, i) => [name, (new Array(9)).fill(i)])) as FaceData;
    cubeletAddresses: Map<number, string> = new Map(data.cubeletNames.map((name, i) => [i, name]));
    constructor() {}
    
    getFaceAddresses(axis3d: Axis3dName, orientation: boolean): [FaceName, FaceName, FaceName, FaceName] {
        if (axis3d === 'x') {
            return orientation ? ['front', 'top', 'back', 'bottom'] : ['front', 'bottom', 'back', 'top'];
        }
        if (axis3d === 'y') {
            return orientation ? ['front', 'left', 'back', 'right'] : ['front', 'right', 'back', 'left'];
        }
        if (axis3d === 'z') {
            return orientation ? ['left', 'top', 'right', 'bottom'] : ['left', 'bottom', 'right', 'top'];
        }
        throw new Error(`invalid axis ${axis3d}`);
    }

}