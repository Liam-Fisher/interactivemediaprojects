import { Pipe, PipeTransform } from '@angular/core';
import { BaseDevice, ExternalDataInfo, IParameterDescription, IPatcher, IPatcherDescription, Parameter, createDevice } from '@rnbo/js';

type name = {name: string};
    // as of rnbo version 1.2.4 
// could include styling information for the layout of parameter UI elements
export type PresetMeta = any;
// more to come...
export type ParameterMeta = any;
export type PortMeta = any;



export type ParameterDescription = IParameterDescription&{meta: ParameterMeta}; 
export type PatcherMeta = name&IPatcherDescription['meta']&{preset: PresetMeta};
export type SignalMeta = any;
export type EventMeta = any;
export interface Channel {
    type: 'signal'|'event'|'midi';
}
export interface SignalChannel extends Channel {
    type: 'signal';
    index: number;
    tag: string;
    meta?: SignalMeta;
    comment?: string;
}
export interface EventChannel extends Channel {
    type: 'event';
    index: number;
    tag: string;
    meta?: EventMeta;
    comment?: string;
}

export interface ChannelData {
    inports: {meta: PortMeta, tag: string}[];
    outports: {meta: PortMeta, tag: string}[];
};
// numSignalOutParameters is always 0
// should include information for styling the device, e.g. which UI elements to show, as well an overview of the device itself, e.g. what it does


export interface BottomLevelPreset {[name: string]: {value: number}}
export interface HasSubpatchers<SPS> {
        __sps: {[name: string]: SPS|SPS[]};
}
export type NestedPreset = {[name: string]: {value: number}}&{[name: string]: {value: number}}[]&HasSubpatchers<NestedPreset>;

export interface TopLevelPreset  {
    name: string;
    preset: NestedPreset;
}

export type index = number;
export interface SubpatcherParameter {
    index: index;
    path: string;
}
export type SubpatcherNode = {
    name: string;
    parameters: number[]; // indices of the subpatcher parameters in the parameter 
    unique_voices: number;
    parallel_voices: number;
    children: SubpatcherNode[];
}
export type TaggedDataRef = ExternalDataInfo&{
    tag: 'buffer'|'buffer~'|'data';
    type: 'Float64MultiBuffer' | 'Float32MultiBuffer' | 'Float32Buffer' | 'Float64Buffer' ;
}
export type io = (SignalChannel[]|EventChannel[]|Channel[]);
interface PatcherDescription extends IPatcherDescription {
    meta: PatcherMeta;
    inlets: io;
    outlets: io;
    externalDataRefs: TaggedDataRef[];
    parameters: ParameterDescription[];
}
interface PatcherInput extends IPatcher {
    desc: PatcherDescription
    presets: TopLevelPreset[];
}

export interface NgxDevice extends BaseDevice {
  meta?: PatcherMeta
  presets?: TopLevelPreset[]
  /* subpatchers?: SubpatcherNode[] */
}

function addMetadataToDevice(device: NgxDevice, {desc, presets}: PatcherInput) {
    let {parameters,meta} = desc; 
    for(let param of parameters) {
      let id = param.paramId;
      let paramObj = device.parametersById.get(id) as Parameter|undefined;
      if(paramObj) {
        paramObj.meta = param.meta;
      }
    }
    device.presets = presets;
    device.meta = meta; 
    return device;
}
@Pipe({
  name: 'createDevice'
})
export class CreateDevicePipe implements PipeTransform {

  async transform(patcher: PatcherInput, context: AudioContext): Promise<NgxDevice> {
    const device = await createDevice({context, patcher}) as NgxDevice;
    return addMetadataToDevice(device, patcher);
  }

}
