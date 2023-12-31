import * as Nexus from 'nexusui'
import { Injectable } from '@angular/core';
interface UIElementParams {
  id: string
  size: [number, number]
  color1: string
  color2: string
};

type UIElements = 'oscilliscope'|'spectroscope'

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }
}
