import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ThreeService } from 'src/app/services/three/three.service';
import { FaceData, FaceName, IRubix, IRubixParams, IRubixState } from 'src/app/types/rubix';
import { IThree } from 'src/app/types/threejs';
import * as rubixEvents from './helpers/init/listeners';
import { createCube } from './helpers/init/createCube';
import { rotate } from './helpers/rotation/main';
import { animateRotation } from './helpers/rotation/animate';
import { RubixCubeState } from './logic/rubix';

@Component({
  selector: 'app-rubix',
  template: `<div #rubixdisplay></div>
   <app-rubix-rotation-input 
   (sliceRotationAction)="performRotation($event)"
   (cubeRotationAction)="rotateCube($event)"
  ></app-rubix-rotation-input>`,
  styles: ['div {width: 500px; height: 500px; }']
})
export class RubixComponent implements OnInit, IRubix<RubixCubeState> {
  // THREE.js scene
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  raycaster!: THREE.Raycaster;
  // display
  
  displayHeight!: number;
  displayWidth!: number;
  onWindowResize = () => this.threeService.resize(this);
  @ViewChild('rubixdisplay') display!: ElementRef<HTMLDivElement>;
  // static game state
  
  params: IRubixParams = {
    zoom: 6,
    cubeletSize: 0.75,
    colorPalette: [ 0xFFFFFF, 0xFFFF00,  0xFFA500, 0xFF0000, 0x00FF00, 0x0000FF, 0x000000 ]
  }
  
  state = new RubixCubeState();
  cubeletAddresses: number[] = [];
  faceColors!: FaceData;
  cubeOrientation!: Map<number, FaceName>;
  //cubeData: Partial<CubeData> = {};
  
  // rotation animation
  rotationGroup: THREE.Group|null = null;
  rotationVector!: THREE.Vector3;
  isRotating: boolean = false;
  rotationProgress: number = 0; // from 0 to rotationFrames
  rotationFrames: number = 100;
  rotationAngle: number = 0;
  animations: (() => void)[] = [animateRotation.bind(this)];
  // events
  
  framesSincePointerDown!: number;
  positionAtPointerDown!: THREE.Vector2 | null;
  positionAtPointerUp!: THREE.Vector2 | null;
  isDragging: boolean = false;
  onPointerDown = rubixEvents.onPointerDown.bind(this);
  onPointerUp = rubixEvents.onPointerUp.bind(this);
  
  constructor(public threeService: ThreeService, public ngZone: NgZone) { 
    
  }
  rotateCube(event: string) {
    if(event === 'flip') {
      this.scene.rotateOnWorldAxis(this.threeService.rotateY, -Math.PI/4);
      this.scene.rotateOnWorldAxis(this.threeService.rotateX, Math.PI/2);
      this.scene.rotateOnWorldAxis(this.threeService.rotateY, Math.PI/4);
    }
    else {
      this.scene.rotateOnWorldAxis(this.threeService.rotateY, Math.PI/2);
    }
  }
  performRotation(event: [string, string, string]) {
    let [perspective, direction, slice] = event;
    console.log(`rotating with perspective: ${perspective},  direction: ${direction}, slice: ${slice}`);
    rotate.call(this);
  }
  printFaces(){
    console.log(`... ... ... ... ... ... ... `);
    for(let face in this.faceColors) {
      let colors= this.faceColors[face as FaceName];
      console.log(`${face}:           `);
      console.log(`${colors[0]}|${colors[1]}|${colors[2]}`);
      console.log(`${colors[3]}|${colors[4]}|${colors[5]}`);
      console.log(`${colors[6]}|${colors[7]}|${colors[8]}`);
    }
    console.log(`... ... ... ... ... ... ... `);
  }
  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    this.displayHeight = this.display.nativeElement.clientHeight;
    this.displayWidth = this.display.nativeElement.clientWidth;
    this.threeService.createScene(this);
    createCube.call(this);
    rubixEvents.addListeners(this);
    this.threeService.render(this);
  }
  ngOnDestroy() {
    rubixEvents.removeListeners(this);
  
  }
}
