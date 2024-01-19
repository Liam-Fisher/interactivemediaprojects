import { Injectable } from '@angular/core';
import { RubixFaceletStateService } from '../rubix-facelet-state/rubix-facelet-state.service';
import { Colors, GameState, Orientation, RotationAction } from 'src/app/types/rubix';
import { randomAxis, randomSlice } from '../helpers/math';
import { RubixRotationService } from '../rubix-rotation/rubix-rotation.service';
import { RubixSceneService } from '../rubix-scene/rubix-scene.service';
import { RubixCubeletStateService } from '../rubix-cubelet-state/rubix-cubelet-state.service';

@Injectable({
  providedIn: 'root'
})
export class RubixGameStateService {
  readonly scrambleFrames = 4;
  readonly scrambleCount = 20;
  faceColors: Partial<Colors<number[]>> = {};
  state!: GameState;
  moveCount = 0;
  startTime = 0;
  completionTime: number|null = null;
  moves: RotationAction[] = [];
  constructor(public scene: RubixSceneService, public rotator: RubixRotationService, public cubelets: RubixCubeletStateService) { }

  restart() {
    [this.startTime, this.completionTime, this.moves] = [Date.now(), null, []];
    this.scramble();
  }
  scramble() {
    [this.state, this.moveCount] = ['scrambling', this.scrambleCount];
    let orientation: Orientation = '+';
    for(let i=0; i<this.scrambleCount; i++) {
      let axis = randomAxis();
      let slice = randomSlice();
      this.moves.push({axis, orientation,  slice});
    }
  }
  get timePlayed() {
    return Date.now() - this.startTime;
  }
  get isSolved() {
    for(let faceColors of Object.values(this.cubelets.faceColors)) {
      for(let color of faceColors) {
        if(color!==faceColors[0]) {
          return false;
        }
      }
    }
    return true;
  }
  determineState() {
    if(this.makeMove()) {
      if(this.state==='solved') {
        return;  // completion data (e.g. time played and movesMade) is kept until the game is reset
      }
      if(this.state==='scrambling') {
        return this.scramblingMove();
      }
      return this.solvingMove();
    }
  }
  scramblingMove() { 
    this.moveCount--;
    if(this.moveCount===0) {
      this.state = 'solving';
      this.startTime = Date.now();
    }
  }
  solvingMove() {
    this.moveCount++;
    if(this.isSolved) {
      this.state = 'solved';
      this.completionTime = this.timePlayed;
      }
      // this will be an event handler
  }
  makeMove() {
    let{axis, orientation, slice} = this.moves.shift()??{};
    if(axis && orientation) {
      console.log(`making move ${axis} ${orientation} ${slice}`);
      this.rotator.frames = this.state === 'scrambling' ?  this.scene.framesPerScrambleRotation : this.scene.framesPerRotation;
      this.rotator.initializeRotation(axis, orientation);
      if(slice !== undefined) {
       // this.facelets.rotate(axis, orientation, slice);
       
        this.rotator.initializeSliceRotation(axis, orientation, slice);
      }
      else {
        console.log(`making camera move ${axis} ${orientation}`);
        this.rotator.initializeCameraRotation(axis, orientation);
      }
      return true;
    }
    return false;
  }
}
