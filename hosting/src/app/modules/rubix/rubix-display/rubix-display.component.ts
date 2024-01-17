import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { CubeletState } from 'src/app/pages/rubix/logic/cubeletState';
import { FaceletState } from 'src/app/pages/rubix/logic/faceletState';
import { RubixCubeletStateService } from 'src/app/services/rubix/rubix-cubelet-state/rubix-cubelet-state.service';
import { RubixFaceletStateService } from 'src/app/services/rubix/rubix-facelet-state/rubix-facelet-state.service';
import { RubixGameStateService } from 'src/app/services/rubix/rubix-game-state/rubix-game-state.service';
import { RubixPointerService } from 'src/app/services/rubix/rubix-pointer/rubix-pointer.service';
import { RubixRotationService } from 'src/app/services/rubix/rubix-rotation/rubix-rotation.service';
import { RubixSceneService } from 'src/app/services/rubix/rubix-scene/rubix-scene.service';
import { IRubix } from 'src/app/types/rubix';

@Component({
  selector: 'app-rubix-display',
  template: `
  <canvas #rubixdisplay></canvas>
  `,
  styleUrls: ['./rubix-display.component.scss']
})
export class RubixDisplayComponent implements OnInit {
    @ViewChild('rubixdisplay') display!: ElementRef<HTMLCanvasElement>;
    gameState!: IRubix['gameState'];
    rotationState!: IRubix['rotationState'];
    pointerState!: IRubix['pointerState'];
    graphicsState!: IRubix['graphicsState'];
    // bound event handlers
    onPointerDown!: (e: PointerEvent) => void;
    onPointerUp!: (e: PointerEvent) => void;
    onWindowResize!: () => void;
    constructor(public ngZone: NgZone, 
      public scene: RubixSceneService, 
      public game: RubixGameStateService,
      public rotation: RubixRotationService,
      public pointer: RubixPointerService,
      public cubelets: RubixCubeletStateService, 
      public facelets: RubixFaceletStateService) { }
      ngAfterViewInit() {
          this.addListeners();
          this.scene.init(this.display.nativeElement);
          this.render();
      }
      addListeners() {
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('resize', () => this.scene.resize());
            this.pointer.addListeners(this.display.nativeElement);
          });
        }
      render() {
          this.ngZone.runOutsideAngular(() => {
            const animateFn = () => {
              requestAnimationFrame(animateFn);
              this.scene.renderer.render(this.scene.scene, this.scene.camera);
              try {
                if(this.rotation.isRotating){
                  this.rotation.animateRotation();
                }
                else {
                  this.game.determineState();
                }
              }
              catch(e) {
                console.log(e);
                this.rotation.isCameraRotating = false;
                this.rotation.isCubeRotating = false;
                this.rotation.progress = 0
              }
            };
            animateFn();
          });
        }
}
