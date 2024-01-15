import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { IRubix, RotationAction } from 'src/app/types/rubix';
import { initRubix, destroyRubix } from './init/main';
import { CubeletState } from './logic/cubeletState';
import { FaceletState } from './logic/faceletState';
import { rotateScene } from './helpers/sceneRotation';
import { render } from './render/main';
import { scrambleActions } from './init/scramble';

@Component({
  selector: 'app-rubix',
  template: `<div #rubixdisplay></div>
    <app-rubix-rotation-input
      (rotationActionEvent)="performRotation($event)"
    ></app-rubix-rotation-input>
    
    `,
  styles: ['div {width: 400px; height: 400px; }'],
})
export class RubixComponent implements OnInit, IRubix {
  // THREE.js scene
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  raycaster!: THREE.Raycaster;
  // display
  displayHeight!: number;
  displayWidth!: number;
  @ViewChild('rubixdisplay') display!: ElementRef<HTMLDivElement>;
  // state
  cubeletState = new CubeletState();
  faceletState = new FaceletState();
  gameState!: IRubix['gameState'];
  rotationState!: IRubix['rotationState'];
  pointerState!: IRubix['pointerState'];
  graphicsState!: IRubix['graphicsState'];
  // bound event handlers
  onPointerDown!: (e: PointerEvent) => void;
  onPointerUp!: (e: PointerEvent) => void;
  onWindowResize!: () => void;

  constructor(public ngZone: NgZone) {}

  rotateCube(event: string) {
    rotateScene(event, this.scene);
  }
  scrambleCube() { 
    this.rotationState.queue.push(...scrambleActions(this.gameState.scrambleCount));
  }
  performRotation(event: [string, string, number|undefined]) {
    let [axis, orientation, slice] = event;
    console.log(`enqueueing rotation | axis: ${axis}  orientation: ${orientation} slice: ${slice}`);
    this.rotationState.queue.push({ axis, orientation, slice } as RotationAction);
  }
  ngOnInit(): void {
    this.cubeletState.reset();
    this.faceletState.reset();
  }
  ngAfterViewInit() {
    initRubix(this);
    this.onWindowResize();
    this.scrambleCube();
    render(this);
  }
  ngOnDestroy() {
    destroyRubix(this);
  }
}
