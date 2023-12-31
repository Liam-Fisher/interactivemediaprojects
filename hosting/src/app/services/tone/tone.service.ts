import * as Tone from 'tone';
import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToneService {
  private _ctx!: Tone.BaseContext;
  isRunning = new BehaviorSubject(false);

  constructor() { }
  async getContext() {
    this._ctx ??= Tone.getContext();
    if(this._ctx.state !== 'running') {
      await Tone.start();
    }
    this.isRunning.next(this._ctx.state === 'running');
  }

}
