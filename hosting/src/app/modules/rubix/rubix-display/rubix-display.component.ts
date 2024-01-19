import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { RubixService } from 'src/app/services/rubix/rubix.service';

@Component({
  selector: 'app-rubix-display',
  template: `
  <canvas class='three-game-canvas' #rubixdisplay></canvas>
  `,
  styles: [
    `
    .three-game-canvas {
      width: 1000px;
      height: 1000px;
      position: absolute;
      top: 0;
      left: 0;  
    }
    `
  ]
})
export class RubixDisplayComponent {
    @ViewChild('rubixdisplay') display!: ElementRef<HTMLCanvasElement>;
    // bound event handlers
    onPointerDown!: (e: PointerEvent) => void;
    onPointerUp!: (e: PointerEvent) => void;
    onWindowResize!: () => void;
    constructor(public ngZone: NgZone, public rubix: RubixService) { }
      ngAfterViewInit() {
        const canvas = this.display.nativeElement;
        this.rubix.afterViewInit(canvas);
        this.ngZone.runOutsideAngular(() => {
          this.rubix.addListeners(canvas);
          this.rubix.render();
        });
      }
}
