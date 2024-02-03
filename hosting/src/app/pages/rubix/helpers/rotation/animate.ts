export function animateRotation() {
    if (this.isRotating) {
        if(this.rotationProgress === 0) {
            console.log(`rotating on axis: ${this.rotationVector.toArray().join(',')}`);
            console.log(`rotating by angle: ${this.rotationAngle}`);
        }
        this.rotationProgress++;
        this.rotationGroup.rotateOnWorldAxis(this.rotationVector, this.rotationAngle);
        if (this.rotationProgress >= this.rotationFrames) {
            this.rotationGroup.children.forEach((child: any) => this.scene.add(child));
            this.rotationProgress = 0;
            this.isRotating = false;
        }
    }
}