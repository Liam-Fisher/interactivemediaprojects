import * as RNBO from '@rnbo/js';
import { isMIDIData, isMessageData, isTimeSignatureData } from './typeChecks';

type SyncEventName = 'message'|'midi'|'beattime'|'tempo'|'timesignature'|'transport';
type eventData = number|((string | number | number[])[]);

//function createErrorMessage()


export function emit_sync_event<T extends SyncEventName>(
  name: T,
  data: eventData,
  time: number = 0
): RNBO.Event {
  switch (name) {
    case 'message':
      if (!isMessageData(data)) {
        throw new Error(`
          message data: ${data} is not valid. 
          The first element must be a string (the inport tag), 
          and the rest must be numbers (the message payload)`
          );
      }
      return (new RNBO.MessageEvent(time, data[0], data[1]));

    case 'midi':
      if (!isMIDIData(data)) {
        throw new Error(`
          midi data: ${data} is not valid. 
          The first element must be a number (the midi port), 
          and the second must be and array of one to three numbers (the midi payload)`);
      }
      return (new RNBO.MIDIEvent(time, data[0], data[1]));

    case 'timesignature':
        if (!isTimeSignatureData(data)) {
          throw new Error(`
          timesignature data: ${data} is not valid. 
            The first element must be a number (the numerator),
            and the second must be a number (the denominator)`);
        }
      return (new RNBO.TimeSignatureEvent(time,...data));

    case 'transport':
        if ((data !== 1) && (data !== 0)) {
          throw new Error(`
          transport data: ${data} is not valid. 
          The first element must be a 1 or 0 (on or off))`);
        }
       return (new RNBO.TransportEvent(time, data));
       
    case 'beattime':
      if (typeof data !== 'number') {
        throw new Error(`
          beattime data: ${data} is not valid. 
          The first element must be a number (the beat time)`);
      }
      return (new RNBO.BeatTimeEvent(time, data));
      
    case 'tempo':
      if (typeof data !== 'number') {
        throw new Error(`
          tempo data: ${data} is not valid. 
          The first element must be a number (the tempo)`);
      }
      return (new RNBO.TempoEvent(time, data));

      default: 
        throw new Error(`unknown event type: ${name} with event ${data}`);
  }
}