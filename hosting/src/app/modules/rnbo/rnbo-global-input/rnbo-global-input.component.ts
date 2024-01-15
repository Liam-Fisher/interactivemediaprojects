import { Component } from '@angular/core';
import { RnboLoaderService } from 'src/app/services/rnbo/loader/rnbo-loader.service';

@Component({
  selector: 'app-rnbo-global-input',
  template: `
    `,
  styleUrls: ['./rnbo-global-input.component.scss']
})
export class RnboGlobalInputComponent {
  
  constructor(public loader: RnboLoaderService) {}


}
