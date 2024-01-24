import { Injectable, signal } from '@angular/core';

interface PianoKey {
  value: number;
} 

@Injectable({
  providedIn: 'root'
})
export class RnboKeyboardService {
  range = signal([36, 60]);
  constructor() { }
}
