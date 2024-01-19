import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SLICE_ROTATION_CODES } from 'src/app/services/rubix/helpers/data';
import { RubixService } from 'src/app/services/rubix/rubix.service';

// axis x: X, F, S, B
// axis y: Y, U, E, D,
// axis z: Z, R, M, L

 // reverse U
// swap X Y and Z
 @Component({
  selector: 'app-rubix-rotation-input',
  template: `
  <button mat-icon-button class="scramble-button" color="primary" aria-label="Example icon button with a home icon" (click)="restart()">
  restart
    </button>
  <div class="ui-container" style="display: grid; grid-template-rows: repeat(3, 1fr); grid-template-columns: repeat(6, 1fr);">
  <div class="button-container" *ngFor="let name of rotationLetters">
    <button mat-fab color="primary" aria-label="Example icon button with a home icon" (click)="onClick(name)">
      {{name}}
    </button>
  </div>
</div>
  `,
  styles: [
    `
    .scramble-button {
      position: absolute;
      top: 1000px;
      left: 0;
    }
    .ui-container {
      position: absolute;
      top: 1100px;
    }
    `
  ]})
export class RubixRotationInputComponent {
  rotationLetters = SLICE_ROTATION_CODES;
  rotationAction = {
    "axis": ["x", "y", "z"],
    "orientation": ["+", "-"],
    "slice": ["-1", "0", "1"]
  }
  axis = "x";
  orientation = "+";
  slice = "0";
  rotationCode = new FormControl<string|null>(null);
  @Output() cubeRotationAction: EventEmitter<string> = new EventEmitter();
  @Output() rotationActionEvent: EventEmitter<[string, string, number|undefined]> = new EventEmitter();
  constructor(public rubix: RubixService) { }
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(`key event: ${event.key}`);
    if (this.rotationLetters.includes(event.key)) {
      this.letterInput(event.key);
    }
  }
  letterInput(letter: string) {
    this.rubix.rotationInput(letter);
  }
  restart() {
    this.rubix.game.restart();
  }
  onClick(event: string) {
    this.letterInput(event);
  }
}