import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rnbo-transport-state',
  template: `
<div class="rnbo-transport-state">

</div>
`,
  styleUrls: ['./rnbo-transport-state.component.scss']
})
export class RnboTransportStateComponent {
  @Input() device_id!: string|null;
  element!: HTMLElement; 
  constructor() { }
  ngOnInit() { }
  ngAfterViewInit() { }
  ngOnChanges(simpleChanges: SimpleChanges) { 
    if(simpleChanges?.['device_id']) {
      console.log('device_id', simpleChanges.device_id);
    }
  }


}
