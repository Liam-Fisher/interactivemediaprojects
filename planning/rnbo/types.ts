export type PresetParameterData = {value: number};
export interface BottomLevelPreset {
    [name: string]: PresetParameterData
}
export interface SubpatcherPreset {
    __sps: {
        [name: string]: BottomLevelPreset|BottomLevelPreset[]|SubpatcherPreset|SubpatcherPreset[]
    };
}

export type NestedPreset = (BottomLevelPreset&SubpatcherPreset)|SubpatcherPreset|BottomLevelPreset;

export type PolyPreset = {
    __sps: {
        poly: NestedPreset[]
    }
}
export interface TopLevelPreset  {
    name: string;
    preset: NestedPreset|PolyPreset;
}
export interface SubpatcherNode {
    name: string; // name of the subpatcher
    indices: number[]; // indices of the parameters at this subpatcher level
    unique_voices: number; // number of unique voices at this subpatcher level
    parallel_voices: number; // number of parallel voices at this subpatcher level
    children: SubpatcherNode[];
}

linear
in_back
in_out_back
out_back
in_bounce
in_out_bounce
out_bounce
in_circular
in_out_circular
out_circular
in_cubic
in_out_cubic
out_cubic
in_elastic
in_out_elastic
out_elastic
in_exponential
in_out_exponential
out_exponential
in_quadratic
in_out_quadratic
out_quadratic
in_quartic
in_out_quartic
out_quartic
in_quintic
in_out_quintic
out_quintic
in_sine
in_out_sine
out_sine