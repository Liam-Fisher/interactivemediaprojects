import * as THREE from 'three';

export function animateRotation() {
    if (this.rotationGroup!==null) {
        if(this.rotationProgress === 0) {
            console.log(`rotating on axis: ${this.rotationVector.toArray().join(',')}`);
            console.log(`rotating by angle: ${this.rotationAngle}`);
        }
        this.rotationProgress++;
        this.rotationGroup.rotateOnWorldAxis(this.rotationVector, this.rotationAngle);
        if (this.rotationProgress >= this.rotationFrames) {
            let rotationGroupObjects = Array.from(this.rotationGroup.children) as THREE.Mesh[];
            rotationGroupObjects.forEach((cubelet: THREE.Mesh) => this.scene.add(cubelet));
            this.scene.remove(this.rotationGroup);
            this.rotationGroup = null;
            this.rotationProgress = 0;
            this.isRotating = false;
        }
    }
}