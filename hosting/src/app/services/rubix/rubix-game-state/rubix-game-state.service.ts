import { Injectable } from '@angular/core';
import { RubixFaceletStateService } from '../rubix-facelet-state/rubix-facelet-state.service';
import { GameCompletionData, GameState, Orientation, RotationAction } from 'src/app/types/rubix';
import { randomAxis, randomSlice } from '../helpers/math';
import { RubixRotationService } from '../rubix-rotation/rubix-rotation.service';

@Injectable({
  providedIn: 'root'
})
export class RubixGameStateService {
  state: GameState = 'scrambling';
  readonly scrambleCount = 20;
  moveCount = 0;
  startTime = 0;
  moves: RotationAction[] = [];
  completionTime: number|null = null;
  completionData!: GameCompletionData;
  constructor(public rotator: RubixRotationService, public facelets: RubixFaceletStateService) { }

  reset() {
    [this.state, this.moveCount] = ['scrambling', 0];
    [this.startTime,this.completionTime] = [Date.now(), null];
    this.moves = [];
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
    for(let faceColors of Object.values(this.facelets.colors)) {
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
  }
  makeMove() {
    let{axis, orientation, slice} = this.moves.shift()??{};
    if(axis && orientation) {
      this.rotator.initializeRotation(axis, orientation);
      if(slice !== undefined) {
        this.facelets.rotate(axis, orientation, slice);
        this.rotator.initializeSliceRotation(axis, orientation, slice);
      }
      else {
        this.rotator.initializeCameraRotation(axis, orientation);
      }
      return true;
    }
    return false;
  }
}
