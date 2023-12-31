export async function getPatcher(id: string, folder: string) {
  return this.db.loadJSON(`rnbo_devices/${folder}/${id}.export`);
}
export async function getAudioBuffer(
  buffer_src: string | AudioBuffer | ArrayBuffer
) {
  if (typeof buffer_src === 'string') {
    return this.db.loadAudio(this.webAudio.ctx, buffer_src);
  }
  return buffer_src;
}
export async function getBufferID(buffer_id: string | number) {
  if (typeof buffer_id === 'string') {
    return buffer_id;
  }
  return this.device.dataBufferDescriptions[buffer_id]?.id;
}
