import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';

export const transitionAnimation = animation([
  style({
    transform: 'translate({{currentX}}, {{currentY}})'
  }),
  animate('{{ time }}')
]);
export const transitionAnimationX = animation([
    style({
      transform: 'translate({{targetX}}, {{currentY}})'
    }),
    animate('{{ Math.abs(currentX-targetX)*100 }}')
  ]);

  export const transitionAnimationY = animation([
    style({
      transform: 'translate({{currentX}}, {{currentY}})'
    }),
    animate('{{ Math.abs(currentY-targetY)*100 }}')
  ]);