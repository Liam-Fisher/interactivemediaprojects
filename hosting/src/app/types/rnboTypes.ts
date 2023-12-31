// UI
export interface MessageForm {
  inport: string;
  payload: number | number[];
}
export interface Track {
  url: string;
  index: string | number;
}
export type connection = [number?, number?];
export interface ConnectionMap {
  sourceMap?: Record<string, connection>; // ID, output, input
  sinkMap?: Record<string, connection>;
}

export enum DeviceLifecycleEvents {
  load,
  start,
  stop,
  destroy
}

export type DeviceLifecycleEvent = `${keyof(typeof DeviceLifecycleEvents)}${'ing'|'ed'}`;
//Event Hub
export type EventData = [(string|number), ...number[]];
export interface EventTime {
  duration?: number,
  interval?: number,
  wait?: number
  // onset (absolute time)
  // wait (absolute time)
}

// protocol: 'in'|'at'|'every'|'every-until'|'now',
  
// in - send at a specific time: e.g. send a message in 1 second {onset}
// {onset}
// {onset, duration}
// {onset, duration, wait}
export interface ScheduleEvent<T extends keyof typeof SchedulableEvents> {
  eventType: T,
  eventData: EventData,
  deviceName?: string
}
// async types -  setBuffer, setPreset,


  export enum SchedulableEvents {
  transport,
  beattime,
  tempo,
  timesignature,
  message,
  midi,
  parameter,
}


// Type Helpers
interface SchedulableEventTypes {
  transport: boolean;
  beattime: number;
  tempo: number;
  timesignature: [number, number];
  message: [string, ...number[]];
  midi: [number, number, number, number?];
}


// {"hint":'a hint for inport frequency',"description":'a description for inport frequency',"effect":'the effects of inport frequency',"element":'Piano'}