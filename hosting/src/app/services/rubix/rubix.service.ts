import { Injectable } from '@angular/core';
import { RubixSceneService } from './rubix-scene/rubix-scene.service';
import { RubixGameStateService } from './rubix-game-state/rubix-game-state.service';
import { RubixRotationService } from './rubix-rotation/rubix-rotation.service';
import { RubixPointerService } from './rubix-pointer/rubix-pointer.service';
import { RubixCubeletStateService } from './rubix-cubelet-state/rubix-cubelet-state.service';
import { RubixOrientationService } from './rubix-orientation/rubix-orientation.service';
import { RnboMessagingService } from '../rnbo/messages/rnbo-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class RubixService {
  // bound event handlers
  constructor( 
    public scene: RubixSceneService, 
    public game: RubixGameStateService,
    public rotation: RubixRotationService,
    public pointer: RubixPointerService, 
    public cubelets: RubixCubeletStateService, 
    public orientation: RubixOrientationService,
    public messaging: RnboMessagingService,
    ) { }
    afterViewInit(canvas: HTMLCanvasElement) {  
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
    connectDevice(device_id: string) {
      const faceColorsSubject = this.messaging.getProp(device_id, 'faceColors', 'subject'); 
      const moveInputSubject = this.messaging.getProp(device_id, 'moveInput', 'subject');

        this.rotation.faceColors.subscribe((colors: number[]) => {
          if(faceColorsSubject !== null) {
            console.log('faceColorsSubject', colors.join(' '));
            faceColorsSubject.next(colors.join(' '));
          }      
        });
        this.rotation.moveInput.subscribe((move: number[]) => {
          if(moveInputSubject !== null) {
            console.log('moveInputSubject', move.join(' '));
            moveInputSubject.next(move.join(' '));
          }
        });
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

