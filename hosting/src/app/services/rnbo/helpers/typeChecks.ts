import { eventData } from "src/app/types/rnbo/events";

export function isMessageData(data: eventData): data is [string, ...number[]] {
    if (!Array.isArray(data)) {
      return false;
    }
    if (data.length < 2) {
      return false;
    }
    if (typeof data[0] !== 'string') {
      return false;
    }
    if (Array.isArray(data[1])) {
      if (!data[1].every((d) => typeof d === 'number')) {
        return false;
      }
    } else {
      if (typeof data[1] !== 'number') {
        return false;
      }
    }
    return true;
  }
  export function isMIDIData(
    data: eventData
  ): data is [number, [number] | [number, number] | [number, number, number]] {
  
    if (!Array.isArray(data)) {
      return false;
    }
    if (data.length < 2) {
      return false;
    }
    if (typeof data[0] !== 'number') {
      return false;
    }
    if (Array.isArray(data[1])) {
      if (!data[1].every((d) => typeof d === 'number')) {
        return false;
      }
      if (data[1].length > 3) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }
  export function isTimeSignatureData(data: eventData): data is [number, number] {
    if (!Array.isArray(data)) {
      return false;
    }
    if (data.length !== 2) {
      return false;
    }
    if (!data.every((d) => typeof d === 'number')) {
      return false;
    }
    return true;
  }