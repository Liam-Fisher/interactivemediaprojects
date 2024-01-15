

export function createBoopBuffer(ctx: AudioContext, frameCount: number = 2048) {
    const myArrayBuffer = ctx.createBuffer(1, frameCount, ctx.sampleRate);
    const nowBuffering = myArrayBuffer.getChannelData(0);
      for (let i = 0; i < frameCount; i++) {
        nowBuffering[i] = Math.sin(Math.PI * (i / frameCount)*55)*0.2;
      }
    return myArrayBuffer;
}

  
export function playBuffer<T extends AudioNode>(ctx: AudioContext, buf: AudioBuffer, tgt?: T) {
    let testSrc = ctx.createBufferSource();
    testSrc.buffer = buf;
    testSrc.connect(tgt ?? ctx.destination);
    testSrc.start();   console.log(`beginning buffer playback test`);
    testSrc.onended = () => console.log(`buffer playback test complete`);
}