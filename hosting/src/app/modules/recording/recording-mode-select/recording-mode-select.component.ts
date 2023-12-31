import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recording-mode-select',
  templateUrl: './recording-mode-select.component.html',
  styleUrls: ['./recording-mode-select.component.scss']
})
export class RecordingModeSelectComponent {

  @Output() inputMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  changeInputMode(event: any) {
    const mode = event.target.checked;
    this.inputMode.emit(!mode);
  }
}
