import { IRubix } from "src/app/types/rubix";
import { createScene } from "./createScene";
import { createObjects } from "./createObjects";
import { addListeners, removeListeners } from "./listeners";
import { setDefaultState } from "./defaultState";


export function initRubix(component: IRubix) {
    setDefaultState(component);
    createScene(component);
    createObjects(component);
    addListeners(component);
}
export function destroyRubix(component: IRubix) {
    removeListeners(component);
}
