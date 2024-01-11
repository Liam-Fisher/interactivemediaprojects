import { Axis, Orientation, RotationAction } from "src/app/types/rubix";




export function scrambleActions(rotations: number) {
    let rotationStack: RotationAction[] = [];
    let orientation: Orientation = '+';
    for(let i=0; i<rotations; i++) {
        let axis = randomAxis();
        let slice = randomSlice();
        rotationStack.push({axis, orientation, slice});    
    }
    return rotationStack;
}

function randomAxis(): Axis {
    let axis = Math.floor(Math.random() * 3);
    return (axis===0 ? 'x' : axis===1 ? 'y' : 'z');
    
}
function randomSlice(): number {
    return Math.floor(Math.random() * 3) - 1;
}