import { Axis, FaceName, Orientation, RotationAction, Swipe } from "src/app/types/rubix";

export function getCubeRotation(start: THREE.Vector2, end: THREE.Vector2): RotationAction {
    let orientation: Orientation, axis: Axis;
    let [x,y] = [end.x - start.x, end.y - start.y];
    if(Math.abs(y/x) > 0.25) {
        axis = ((x > 0) === (y > 0)) ? 'z' : 'x';
        orientation = y < 0 ? '+' : '-';
    }
    else {
        axis = 'y';
        orientation = x < 0 ? '+' : '-';
    }
    return { axis, orientation };
}
export function getSliceRotation(direction: Swipe, face: FaceName, [x,y,z]: [number,number,number]): RotationAction  {
    let axis: Axis, orientation: Orientation, slice: number;
    if(direction === 'up' || direction === 'down') {
        if(face === 'left') {
            [axis,orientation,slice] = ['z', direction === 'up' ?  '+' : '-', z];
        }
        else {
            [axis,orientation,slice] = ['x', direction === 'up' ?  '-' : '+', x];
        }
        return {axis, orientation, slice};
    }
    else if(direction === 'left' || direction === 'right') {
        if(face === 'top') {
            [axis,orientation,slice] = ['z', direction === 'left' ?  '-' : '+', z];
        }
        else {
            [axis,orientation,slice] = ['y', direction === 'left' ?  '-' : '+', y];
        }
        return {axis, orientation, slice};
    }
    else {
        return {};
    }
}