import { Injectable } from '@angular/core';
import { Axis, Colors, Orientation, PermutationAddressMap, Position } from "src/app/types/rubix";
import { CUBELET_NAMES, CUBELET_ROTATION_GROUPS } from '../helpers/data';
import { logCubeletState } from '../helpers/loggers';
import {  permuteGroup } from '../helpers/math';
import { addressToPosition } from '../helpers/converting';

type RotatedCubeletMap = Map<keyof PermutationAddressMap, string[]>;

@Injectable({
  providedIn: 'root'
})
export class RubixCubeletStateService {
  names: string[] = Array.from(CUBELET_NAMES);
  rotated: string[] = [];
  faceMap: Map<string, string> = new Map();
  faceColors: Pick<Colors<number[]>, 'front'|'right'|'top'> = {
    front: [],
    right: [],
    top: []
  };
  constructor(){ }
  reset(){
    this.faceColors.front = [];
    this.faceColors.right = [];
    this.faceColors.top = [];
    this.rotated = [];
    this.names = Array.from(CUBELET_NAMES);
  }
  printCubelets() {
    logCubeletState(this.names);
}
  getPosition(name: string): [number, number, number] {
    return addressToPosition(this.getAddress(name));
  }
  getAddress(name: string): number {
    return this.names.indexOf(name);
  }
  rotate(axis: Axis, orientation: Orientation, slice: number) {  
    logCubeletState(this.names);
    this.rotated = permuteGroup(this.names, orientation, CUBELET_ROTATION_GROUPS[axis][slice+1]).flat();
    logCubeletState(this.names);
  }
  rotateCube(axis: Axis, orientation: Orientation) {
    
    /* 
    let reverse:Orientation = orientation === '-' ? '+' : '-';
    logCubeletState(this.names);
    this.rotated = [
      permuteGroup(this.names, reverse, CUBELET_ROTATION_GROUPS[axis][0]),
      permuteGroup(this.names, reverse, CUBELET_ROTATION_GROUPS[axis][1]),
      permuteGroup(this.names, reverse, CUBELET_ROTATION_GROUPS[axis][2])
    ].flat(2);
    logCubeletState(this.names); */
  }
}

