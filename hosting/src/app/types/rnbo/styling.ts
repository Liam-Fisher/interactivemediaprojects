import * as RNBO from '@rnbo/js';
import { InportUIElements, NumberParameterUIElements } from '../nexusui/elements';

export type UIMeta = {
        rect: [number, number, number, number];
        hint: string;
        //  element?: 'dial'|'select' // keyof typeof NumberParameterUIElements;
}

export type Parameter = RNBO.Parameter & UIMeta;
export type UIInport = RNBO.IParameterDescription & UIMeta;