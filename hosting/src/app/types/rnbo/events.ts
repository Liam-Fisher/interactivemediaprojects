import * as RNBO from '@rnbo/js';

export type SyncEventName = 'message'|'midi'|'beattime'|'tempo'|'timesignature'|'transport';
export type eventData = number|((string | number | number[])[]);
export enum ListenableEventSubscribers {
    message = 'messageEvent',
    preset = 'presetTouchedEvent',
    parameter = 'parameterChangeEvent',
}
export type ListenableEventTypes = {
    message: RNBO.MessageEvent;
    preset: RNBO.PresetEvent;
    parameter: RNBO.Parameter;
};
export type ListenableEventName = keyof typeof ListenableEventSubscribers; 
export type ListenablEventHandler = RNBO.IEventListener<ListenableEventTypes[ListenableEventName]> & RNBO.IEventListener<void>;


export type SubscriptionTracker = {
    [Prop in keyof ListenableEventTypes]: RNBO.IEventSubscription[];
};
///export type MusicalTimeEventArgs<T extends MusicalTimeEventName> = ConstructorParameters<MusicalTimeEventClass<T>>;
//export type MusicalTimeEventInstance<T extends MusicalTimeEventName> = InstanceType<MusicalTimeEventClass<T>>;



