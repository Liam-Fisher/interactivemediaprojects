import * as RNBO from '@rnbo/js';
import { SchedulableEvents } from 'src/app/types/rnboTypes';

export function patcher_info_logger(patcher_obj: RNBO.IPatcher) {
}
export function device_info_logger(device: RNBO.BaseDevice, patcher_obj: RNBO.IPatcher) {
    //console.log(`logging patcher object for rnbo device`);
    //console.log(patcher_obj);
  //console.log(
    `logging info for rnbo device of type ${device.type} and source type ${device.sourceType}`
  );
//console.log(device);
  //console.log('parameters: ');
  device.parametersById.forEach((param, id) => {
    //console.log(`id: ${id}`);
    //console.log(param);
  });

  //console.log('messages: ');
  device.messages.forEach((msg) => {
    //console.log(`tag: ${msg.tag}`);
    if ('meta' in msg) {
      //console.log(msg.meta);
    }
  });

  //console.log('buffers: ');
  device.dataBufferDescriptions.forEach((buf) => {
    //console.log(`id: ${buf.id}`);
    //console.log(`type: ${buf.type}`);
  });
  //console.log('audioNode: ');
  //console.log(device.node);
}

