
import * as THREE from 'three';
import { RubixSceneService } from "src/app/services/rubix/rubix-scene/rubix-scene.service";
import AxisGridHelper from "src/app/services/rubix/helpers/axisGridHelper";
import { createLights } from './three/lights';
import { addCubelets, addShell } from './three/cubelets';
import { addCameraSphere } from './three/camera';

export function createObjects({scene, camera, lights, cubeletSize, colorPalette, cameraDistance}: RubixSceneService, names: string[]) {
    addShell(scene, cubeletSize);
    addCameraSphere(scene, camera, cameraDistance);
    createLights(scene, lights);
    addCubelets(scene, names, cubeletSize, colorPalette);
}


