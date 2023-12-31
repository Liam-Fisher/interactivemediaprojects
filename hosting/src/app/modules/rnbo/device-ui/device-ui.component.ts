import { Component } from '@angular/core';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';


@Component({
  selector: 'app-device-ui',
  templateUrl: './device-ui.component.html',
  styleUrls: ['./styles/container.css', './styles/panels.css', "./styles/elements.css"]
})
export class DeviceUiComponent {

constructor(public rnboService: RnboService) { }
ngOnInit() { 
  
}


ngAfterViewInit(): void {
 //console.log(`device ui after view init`);
  this.rnboService.createUIElements();
}

}
