import { Component,ViewChild,ElementRef, Output, EventEmitter } from '@angular/core';
import { StylingService } from 'src/app/services/styling.service';

@Component({
  selector: 'app-language-input',
  templateUrl: './language-input.component.html',
  styleUrls: ['./language-input.component.scss']
})
export class LanguageInputComponent {
  @ViewChild('languageMenu', { static: false }) languageInput!: ElementRef<HTMLSelectElement>;
  @Output() languageChange = new EventEmitter<string>();
    constructor(public styling: StylingService) {
        
    }
    ngAfterViewInit() {
      ////console.log(`language input initialized ${navigator.language}`);
      this.languageInput.nativeElement.value = navigator.language;
    }
    handleLanguageChange(evt: any) {
        const value = evt.target.value;
        this.languageChange.emit(value);
      
    }
}
