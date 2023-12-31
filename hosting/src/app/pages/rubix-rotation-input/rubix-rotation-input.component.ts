import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-rubix-rotation-input',
  templateUrl: './rubix-rotation-input.component.html',
  styleUrls: ['./rubix-rotation-input.component.scss']
})
export class RubixRotationInputComponent {

  rotationOptions = {
    "perspective": ["left", "right"],
    "direction": ["down", "up", "left", "right"],
    "verticalSlice": ["far", "middle", "near"],
    "horizontalSlice": ["top", "center", "bottom"]
  }
  perspective = "left";
  direction = "down";
  slice = "far";
  sliceOptions = new BehaviorSubject<string[]>(['left', 'down', 'far']);
  
  @Output() cubeRotationAction: EventEmitter<string> = new EventEmitter();
  @Output() sliceRotationAction: EventEmitter<[string, string, string]> = new EventEmitter();
  constructor() { }
  onPerspectiveChange(event: any) {
    this.perspective = event.target.value;
    console.log(`selected perspective: ${this.perspective}`);
  }
  onDirectionChange(event: any) {
    this.direction = event.target.value;
    console.log(`selected direction: ${this.direction}`);  
    this.sliceOptions.next(this.setSliceOptions());
  
  }
  onSliceChange(event: any) {
    this.slice = event.target.value;
    console.log(`selected slice: ${this.slice}`);
  }
  setSliceOptions(): string[] {
      if(this.direction === "up" || this.direction === "down") {
        return this.rotationOptions.verticalSlice;
      }
      else {
        return this.rotationOptions.horizontalSlice;
      }
    }
  onSubmit() {
    this.sliceRotationAction.emit([this.perspective, this.direction, this.slice]);
  }

}
