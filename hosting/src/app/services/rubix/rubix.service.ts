import { EffectRef, Injectable } from '@angular/core';
import { RubixSceneService } from './rubix-scene/rubix-scene.service';
import { RubixGameStateService } from './rubix-game-state/rubix-game-state.service';
import { RubixRotationService } from './rubix-rotation/rubix-rotation.service';
import { RubixPointerService } from './rubix-pointer/rubix-pointer.service';
import { RubixCubeletStateService } from './rubix-cubelet-state/rubix-cubelet-state.service';
import { RubixOrientationService } from './rubix-orientation/rubix-orientation.service';

@Injectable({
  providedIn: 'root'
})
export class RubixService {
  deviceConnection: EffectRef|null = null;
  // bound event handlers
  constructor( 
    public scene: RubixSceneService, 
    public game: RubixGameStateService,
    public rotation: RubixRotationService,
    public pointer: RubixPointerService, 
    public cubelets: RubixCubeletStateService, 
    public orientation: RubixOrientationService,
    ) { }
    init(canvas: HTMLCanvasElement) {  
        this.scene.init(canvas, this.cubelets.names);
        this.orientation.reset();
    }
    addListeners(canvas: HTMLCanvasElement) {
          window.addEventListener('resize', () => this.scene.resize());
          canvas.addEventListener('pointerdown', this.pointer.onPointerDown.bind(this.pointer));
          canvas.addEventListener('pointermove', this.pointer.onPointerMove.bind(this.pointer));
          canvas.addEventListener('pointerup',this.pointer.onPointerUp.bind(this.pointer));
      }
     removeListeners(canvas: HTMLCanvasElement) {       
            window.removeEventListener('resize', () => this.scene.resize());
            canvas.removeEventListener('pointerdown', this.pointer.onPointerDown.bind(this.pointer));
            canvas.removeEventListener('pointermove', this.pointer.onPointerMove.bind(this.pointer));
            canvas.removeEventListener('pointerup', this.pointer.onPointerUp.bind(this.pointer));
    }
    rotationInput(letter: string) {
      for(let code of letter) {
        if(code===' ') {
          continue; // ignore spaces
        }
      let move = this.orientation.getAction(code);
      if(move.axis && move.orientation) {
        this.game.moves.push(move);
      }
      }
    }
    render() {
          const animateFn = () => {
            requestAnimationFrame(animateFn);
            this.scene.renderer.render(this.scene.scene, this.scene.camera);
            try {
              if(this.rotation.isCubeRotating) {
                this.rotation.animateRotation();
              }
              else {
                this.game.determineState();
              }
            }
            catch(e) {
              this.rotation.completeRotation();
              throw e;
            }
          };
          animateFn();
        };
        
}

