import { Axis, Orientation } from "src/app/types/rubix";

export function rotateScene(event: string, scene: THREE.Scene) {
    if(event === 'flip') {
        scene.rotateY(Math.PI/4);
        scene.rotateX(Math.PI/2);
        scene.rotateY(-Math.PI/4);
    }
    else {
        scene.rotateY(Math.PI/2);
    }
}