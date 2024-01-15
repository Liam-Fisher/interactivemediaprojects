import { Axis, IRubix, Orientation } from 'src/app/types/rubix';

export function setRotationNames(component: IRubix, axis: Axis, orientation: Orientation, slice: number): void {
    component.rotationState.names = rotateSlice(component,  axis, orientation, slice);
}

export function rotateSlice(component: IRubix, axis: Axis, orientation: Orientation, slice: number) {
  console.log(`rotating slice`);
  component.faceletState.rotate(axis, orientation, slice);
  return component.cubeletState.rotate(axis, orientation, slice);
}

export function rotateCube(component: IRubix, axis: Axis, orientation: Orientation) {
  let names: string[] = [];
  console.log('rotating whole cube');
  for (let i = -1; i <= 1; i++) {
    names.push(...rotateSlice(component, axis, orientation, i));
    if (i === 0) {
      names.shift(); // ignore the fixed cube, it should always be the middle one
    }
  } // add it back here
  names.unshift('middle');
  return names;
}