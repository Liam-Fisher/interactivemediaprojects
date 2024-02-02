import { Component, EventEmitter, Injector, Input, Output, effect, signal } from '@angular/core';
import { RnboDeviceService } from 'src/app/services/rnbo/rnbo-device.service';

@Component({
  selector: 'app-rubix-rnbo',
  template:`
  <p>{{this.path}}</p>
  <p>{{this.rnbo.device_id()}}</p>
  `,
  styleUrls: ['./rubix-rnbo.component.scss']
})
export class RubixRnboComponent {
    @Input() path = 'rubix';
    @Input() device_id = 'rubix_test';
    @Output() loaded= new EventEmitter<void>();
    constructor(public rnbo: RnboDeviceService, public injector: Injector) {}
    ngOnInit() { }
    ngAfterViewInit() {
      this.rnbo.load(this.path, this.device_id, this.injector).then(() => {
        this.loaded.emit();
      });
     }
}
