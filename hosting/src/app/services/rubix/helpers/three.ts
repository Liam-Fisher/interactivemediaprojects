
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { RubixSceneService } from "src/app/services/rubix/rubix-scene/rubix-scene.service";
import AxisGridHelper from "src/app/services/rubix/helpers/axisGridHelper";
import { createLights } from './three/lights';
import { addCubelets, addShell } from './three/cubelets';
import { addCameraSphere } from './three/camera';
const gui = new GUI();



export function createObjects({scene, camera, lights, cubeletSize, colorPalette, cameraDistance}: RubixSceneService, names: string[]) {
    addShell(scene, cubeletSize);
    addCameraSphere(scene, camera, cameraDistance, gui);
    createLights(scene, lights, gui);
    addCubelets(scene, names, cubeletSize, colorPalette);
}


