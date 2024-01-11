import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rubix-rotation-input',
  templateUrl: './rubix-rotation-input.component.html',
  styleUrls: ['./rubix-rotation-input.component.scss']
})
export class RubixRotationInputComponent {

  rotationOptions = {
    "axis": ["x", "y", "z"],
    "orientation": ["+", "-"],
    "slice": ["-1", "0", "1"]
  }
  axis = "x";
  orientation = "+";
  slice = "0";
  
  @Output() cubeRotationAction: EventEmitter<string> = new EventEmitter();
  @Output() sliceRotationAction: EventEmitter<[string, string, number]> = new EventEmitter();
  constructor() { }
  onSubmit() {
    this.sliceRotationAction.emit([this.axis, this.orientation, +this.slice]);
  }

}
