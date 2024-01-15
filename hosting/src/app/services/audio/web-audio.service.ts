import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createBoopBuffer, playBuffer } from './helpers/buffers';
import { makeConnections, routeOut } from './helpers/routing';

// src_id, src_outlet, tgt_id, tgt_inlet
///type NodeConnection =  [number, number, number, number]

/*
type SourceNode =
  | OscillatorNode
  | AudioBufferSourceNode
  | MediaElementAudioSourceNode
  | MediaStreamAudioSourceNode;
type SinkNode =
  | AnalyserNode
  | AudioDestinationNode
  | MediaStreamAudioDestinationNode;
type FilterNode =
  | BiquadFilterNode
  | ConvolverNode
  | DelayNode
  | DynamicsCompressorNode
  | WaveShaperNode
  | IIRFilterNode
  | PannerNode;
*/

type connection = Record<string, [number?, number?]>;
interface ConnectionMap {
  sourceMap?: connection; // ID, output, input
  sinkMap?: connection;
}

@Injectable({
  providedIn: 'root',
})
export class WebAudioService {
  isAudioLoaded = new BehaviorSubject(false);
  _ctx!: AudioContext;
  nodes: Map<string, AudioNode> = new Map();
  recordings: Map<string, AudioBuffer> = new Map();
  isRecordingBufferLoaded = new BehaviorSubject(false);
  recordingDuration = 0;
  recordingBuffer!: AudioBuffer;
  recordedBuffers!: AudioBuffer[];
  
  // not implemented yet... audioGraph: Map<string, ConnectionMap> = new Map();
  constructor() {}
  async decodeAudioData(arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
    return this.ctx.decodeAudioData(arrayBuffer);
  }
  get ctx() {
    try {
    if(!this._ctx) {
      this._ctx = new AudioContext();
    }
    if(this._ctx?.state !== 'running') {
      this._ctx.resume();
    }
  }
  catch(err) {
    console.log(`error getting audio context`);
    console.log(err);
  }
    this.isAudioLoaded.next(true);
    return this._ctx;
  }
  testSound<T extends AudioNode>(tgt?: T) {
    let buf = createBoopBuffer(this.ctx);
    playBuffer(this.ctx, buf);
  }
  async encodeBlob(blob: Blob) {
    const arrayBuffer = await blob.arrayBuffer();
    this.recordingBuffer = await this.decodeAudioData(arrayBuffer);
    this.recordingDuration = this.recordingBuffer.duration;
    this.isRecordingBufferLoaded.next(true);
    return;
  }
  get bufferSource() {
    if(this.recordingBuffer) {
      let testSrc = this.ctx.createBufferSource();
      testSrc.buffer = this.recordingBuffer;
      testSrc.connect(this.ctx.destination);
      return testSrc;
    }
    return;
  }
  // add a function/optional arg to handle "true" insertion, i.e. disconnecting a previously connected in and out
  addNode<T extends AudioNode>(id: string, node: T, connections?: ConnectionMap) {
    try {
      this.nodes.set(id, node);
      if (!connections) {
        routeOut(this.ctx, node);
      }
      else {
          makeConnections(this.nodes, node, true, connections?.sourceMap);
          makeConnections(this.nodes, node, false, connections?.sinkMap);
      }
    } catch (e) {
      throw e;
    }
  }
}
