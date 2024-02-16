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
      width: min(100%, 1000px);
      aspect-ratio: 1/1; 
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
        this.reset();
        this.ngZone.runOutsideAngular(() => {
          this.rubix.addListeners(canvas);
          this.rubix.render();
        });
      }
      reset() {
        const canvas = this.display.nativeElement;
        this.rubix.init(canvas);
      }
}
