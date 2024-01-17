import { Injectable } from '@angular/core';
import { Axis, Orientation, PermutationAddressMap, Position } from "src/app/types/rubix";
import { CUBELET_NAMES, CUBELET_ROTATION_GROUPS } from '../helpers/data';
import { logCubeletState } from '../helpers/loggers';
import { addressToPosition, permute, permuteGroup } from '../helpers/math';

type RotatedCubeletMap = Map<keyof PermutationAddressMap, string[]>;

@Injectable({
  providedIn: 'root'
})
export class RubixCubeletStateService {
  readonly names: string[] = CUBELET_NAMES;
  rotated: string[] = [];
  constructor(){ }
  printCubelets() {
    logCubeletState(this.names);
}
  getPos(name: string): [number, number, number] {
    return addressToPosition(this.getAddr(name));
  }
  getAddr(name: string): number {
    return this.names.indexOf(name);
  }
  rotate(axis: Axis, orientation: Orientation, slice: number) {  
    this.rotated = permuteGroup(this.names, orientation, CUBELET_ROTATION_GROUPS[axis][slice+1]).flat();
  }
}

