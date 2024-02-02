import { Signal, WritableSignal } from "@angular/core";
import { BaseDevice, Parameter, IParameterDescription, IPreset, IPatcherDescription, Device } from "@rnbo/js";

type IndexedData<M extends any> = Signal<M[]>; // should be the return of a function like computed(() => [...(this.device()?.inports.map((p) => p.tag)??[])]);
type RnboObject<T> = WritableSignal<T|null>;
type RnboMap<T> = Signal<Map<string, T>|null>;

export type Meta<T> = {meta: T};
export type DeviceMetadata = any;
export type PresetMetadata = any;
export type ParameterMetadata = any;
export type PortMetadata = any;


export type ParameterDescription = IParameterDescription&Meta<ParameterMetadata>;
export type Preset = {
    name: string;
    preset: IPreset;
}
export type PatcherMetadata = DeviceMetadata&PresetMetadata;
export type PatcherDescription = Meta<PatcherMetadata>&{parameters: ParameterDescription[]};
export type Patcher = {desc: PatcherDescription}&{presets: Preset[]};
export type IDSignal = WritableSignal<string>;
export type Registry = Signal<string[]>; // DeviceIDs, BufferIDs, PortIDs, PresetIDs, ParameterIDs
export type StatusSignal = WritableSignal<'idle'|'loading'|'error'|'active'>;

export type WritableDevice = RnboObject<BaseDevice>;
export type WritablePatcher = RnboObject<PatcherMetadata&{parameters: ParameterDescription[]}&{presets: Preset[]}>;



export type PortInfo = RnboMap<PortMetadata>;
export type Port = Signal<PortMetadata>;
export type PortInput = WritableSignal<number[]>;
export type Payload = number[];
export type Msg = [string, Payload];
export type PortAccessor = WritableSignal<Msg>;

export type PortType = 'input'|'output';
export type MsgEffect = (Msg: Msg) => void;







export type SelectionSignal<T> = Signal<T>; // e.g. name

export type PresetObjMap = RnboMap<Preset>;

export type ParameterInfoMap = RnboMap<ParameterDescription>;
export type ParameterObjMap = RnboMap<Parameter>;
export type ParameterAccessor = WritableSignal<number>; 
// a more generic Subscribable type  

export type Unsubscribable = { unsubscribe: () => void }
export type Subscribable<T> = {
  subscribe: (subscriber: (val: T) => void) => Unsubscribable
} 