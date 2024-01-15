import { Component, EventEmitter, Output } from '@angular/core';
// axis x: X, F, S, B
// axis y: Y, U, E, D,
// axis z: Z, R, M, L
const rotationLetters = {
  "U": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "D": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "F": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "B": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "L": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "R": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "M": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "E": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "S": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "u": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "d": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "f": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "b": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "l": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "r": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "m": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "e": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "s": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "X": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "Y": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "Z": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "x": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "y": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  },
  "z": {
    "axis": 'x',
    "orientation": '+',
    "slice": -1
  }
};
@Component({
  selector: 'app-rubix-rotation-input',
  template: `
  <div class="ui-container" style="display: grid; grid-template-rows: repeat(3, 1fr); grid-template-columns: repeat(8, 1fr);">
  <div class="button-container" *ngFor="let name of rotationLetters">
    <button mat-icon-button color="primary" aria-label="Example icon button with a home icon" (click)="onClick(name)">
      {{name}}
    </button>
  </div>
</div>
  `,
  styles: [
    `

    `
  ]})
export class RubixRotationInputComponent {
  rotationLetters = ["X", "x", "F", "f", "S", "s", "B", "b", "Y", "y", "U", "u", "E", "e", "D", "d", "Z", "z", "L", "l", "M", "m", "R", "r"];
  rotationAction = {
    "axis": ["x", "y", "z"],
    "orientation": ["+", "-"],
    "slice": ["-1", "0", "1"]
  }
  axis = "x";
  orientation = "+";
  slice = "0";
  
  @Output() cubeRotationAction: EventEmitter<string> = new EventEmitter();
  @Output() rotationActionEvent: EventEmitter<[string, string, number|undefined]> = new EventEmitter();
  constructor() { }
  letterInput(letter: string) {
    let index = this.rotationLetters.indexOf(letter);
    let axis = this.rotationAction.axis[Math.floor(index / 8)];
    let orientation = this.rotationAction.orientation[index % 2];
    let sliceIndex = Math.floor(index/2)%4;
    let slice = sliceIndex ? +this.rotationAction.slice[sliceIndex-1] : undefined;
    this.rotationActionEvent.emit([axis, orientation, slice]);
  }
  onClick(event: string) {
    this.letterInput(event);
  }
  onSubmit(event: string) {
    
  }

}
