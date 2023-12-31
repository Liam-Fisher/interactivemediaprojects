import { Component, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';

@Component({
  selector: 'app-effect-select-ui',
  template: ` 
  <select (change)="onSelectionChange($event)">
    <option *ngFor="let option of (rnboService.presetNames|async)" [value]="option">{{ option }}</option>
</select>`,
  styleUrls: ['./effect-select-ui.component.css']
})
export class EffectSelectUiComponent {
  currentSelection = new BehaviorSubject<string>('robot');
  optionsList = new BehaviorSubject<string>('robot');
  @ViewChild('selectcontainer', { static: false }) selectcontainer!: ElementRef<HTMLDivElement>;
  constructor(public rnboService: RnboService) { }
  ngAfterViewInit() {
    const  id = 'main';
    this.rnboService.loadDevice({id, folder: 'voice-fx'}).then(() => {
      this.currentSelection.next(id);
      });
    }
    onSelectionChange(event: Event): void {
      const selectedOption = (event.target as HTMLSelectElement).value;
      //console.log('Selected preset:', selectedOption);
      this.rnboService.setDevicePreset(selectedOption);
    }
}
