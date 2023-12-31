import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';
import { StylingService } from 'src/app/services/styling.service';

@Component({
  selector: 'app-preset-select',
  templateUrl: './preset-select.component.html',
  styleUrls: ['./preset-select.component.css'],

})
export class PresetSelectComponent {
  readonly presets = [
    {
      "name": "normal",
      "emoji": "👩",
    },
    {
    "name": "robot",
    "emoji": "🤖",
  },
    {
      "name": "underwater",
      "emoji": "🌊",
    },
    {
      "name": "monster",
      "emoji": "👾"
    },
    {
      "name": "clown",
      "emoji": "🤡",
    },
    {
      "name": "fairy",
      "emoji": "🧚",
    },
  {
    "name": "squirrel",
    "emoji": "🐿️",
  },
  {
    "name": "alien",
    "emoji": "👽"
  },
];

  currentSelection = new BehaviorSubject<string>('robot');
  @ViewChild('selectcontainer', { static: false })
  selectcontainer!: ElementRef<HTMLDivElement>;
  constructor(public rnboService: RnboService, public styling: StylingService, private cdRef: ChangeDetectorRef) {}
  onPresetClick(preset: string): void {
    this.currentSelection.next(preset);
    console.log('Selected preset:', preset);
    this.rnboService.setDevicePreset(preset);
    this.cdRef.detectChanges();
  }
}
