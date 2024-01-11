import { IRubix } from "src/app/types/rubix";
import { animateRotation } from "./animateRotation";

export function render(component: IRubix) {

    component.ngZone.runOutsideAngular(() => {
      const animateFn = () => {
        requestAnimationFrame(animateFn);
        component.renderer.render(component.scene, component.camera);

        try {
          if(component.gameState.isActive) {
            animateRotation(component);
          } 
          else {
            // render something else??
          }
          
        }
        catch(e) {
          console.log(e);
          component.rotationState.isRotating = false;
          component.rotationState.progress = 0
        }
      };
      animateFn();
    });
  }