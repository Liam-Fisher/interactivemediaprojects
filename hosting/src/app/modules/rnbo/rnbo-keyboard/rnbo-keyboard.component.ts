import { Component, Host, HostListener, Input, computed, signal } from '@angular/core';
const pattern = ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white'];
  interface RectangleAttributes {
    "attr.x": number;
    /* "attr.y": number; */ //always 0
    "attr.width": number;
    "attr.height": number;
    "attr.fill": string;
}

  function getKeyParams(min: number, max: number)  {
  let rectangles: RectangleAttributes[] = [];
  let i = 0;
  let x = 0;
  let range = max - min;
  let last = pattern[max%14];
  if(last === 'black') {
    range++;
  }
  let stepWidth = range/100;
  while(i < range) {
      let keyIndex = (i+min)%12;
      let keyType = pattern[keyIndex];

  if(keyType === 'white') {
    if(last === 'black') {
      x += stepWidth;
    }
    stepWidth
  
  }
  else {

  }
    let keyWidth = this.width/this.numKeys();
    let blackKeyWidth = keyWidth * this.blackWhiteWidthRatio;
    let blackKeyHeight = this.height * this.blackWhiteHeightRatio;
    let whiteKeyHeight = this.height * this.heightWidthRatio;
    let blackKeyX = keyWidth * this.blackWhiteWidthRatio - blackKeyWidth / 2;
    let blackKeyY = this.height * (1 - this.blackWhiteHeightRatio);
    return {keyWidth, blackKeyWidth, blackKeyHeight, whiteKeyHeight, blackKeyX, blackKeyY};
  }
}

@Component({
  selector: 'app-rnbo-keyboard',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="width" [attr.height]="height" viewbox='0 0 1000 1000' [attr.fill]="bgcolor">
      <rect 
        *ngFor="let rect of rectangles(); let i = index" 
        [ngStyle]="getRectangleStyle(i, rect)"
        />
    </svg>
  `,
  styles: []
})
export class RnboKeyboardComponent {
  @Input() range = signal([36, 60]);
  @Input() blackWhiteHeightRatio = 0.6;
  @Input() blackWhiteWidthRatio = 0.5;
  @Input() heightWidthRatio = 0.25;
  @Input() bgcolor = 'grey';
  @Input() blackkeycolor = 'black';
  @Input() whitekeycolor = 'white';
  @Input() highlightcolor = 'yellow';
  @Input() width = 400;
  @Input() height = 100;

  // deal with these in the service
  //@Input() buttonmode = 'toggle'|'impulse'|'keypress'|'touch';
  //@Input() mode = 'monophonic'|'impulse';
  numKeys = computed(() => {  let [min, max] = this.range(); return max-min; });
  keyWidth = computed(() => this.width/this.numKeys());
  
  


  rectangles = computed(() => {
    let [min, max] = this.range();
    let keyVal = 'black';
    let i = 0;
    let rectangles: string[] = [];
    while(i++ < this.numKeys()) {
      let keyIndex = (rectangles.length+min)%12;
      keyVal = pattern[keyIndex];
      rectangles.push(keyVal);
    }
    if(keyVal==='black') {
      rectangles.push('white');
    }
    return rectangles;
  });
  /* 
@HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent) {} */
 /* 
  @HostListener('keydown', ['$event'])
  onPointerDown(event: PointerEvent) {

} */
  getRectangleStyle(i: number, rect: string) {
    return rect === 'white' ? this.getWhiteKeyStyle(i) : this.getBlackKeyStyle(i);
    }
    getWhiteKeyStyle(i: number) {
    return {
      'x': `${i * this.keyWidth}`,
      'width': `${this.keyWidth}`,
      'fill': this.whitekeycolor,
      'stroke': 'black',
      'stroke-width': '1px'
    }
    }
    getBlackKeyStyle(i: number) {
      return {
        'x': `${i * this.keyWidth + this.keyWidth * this.keyWidthRatio - this.keyWidth * this.blackKeyWidthRatio[0] / 2}`,
        'width': `${this.keyWidth * this.blackKeyWidthRatio}`,
        'fill': this.blackkeycolor,
        'stroke': 'black',
        'stroke-width': '1px',
        'y': `${this.height * (1 - this.blackKeyHeightRatio[0])}`,
        'height': `${this.height * this.blackKeyHeightRatio[0]}`
      }
    }
    get keyCount() {
      
    }
  
  getRectangleX(i: number) {
    let keyWidth = 
  }
}