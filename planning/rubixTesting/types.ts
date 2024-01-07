// the axis about which the facelets are rotated
export type Axis = 'x'|'y'|'z';
// the orientation of a rotation 
export type Orientation = '+'|'-';
// x+: upwards, y+: right, z+: clockwise
export type FaceName = 'front'|'back'|'top'|'bottom'|'right'|'left';
export interface Rotation {
    orientation: Orientation;
    axis3d: Axis;
    slice: number;
}
