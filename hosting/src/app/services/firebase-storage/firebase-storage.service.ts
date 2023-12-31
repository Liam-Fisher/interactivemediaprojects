import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {environment} from '../../../environments/environment';
import { Storage, ref,  uploadBytes, listAll,getDownloadURL, getBlob, getBytes, UploadTask, UploadResult } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  readonly storage: Required<Storage> = inject(Storage);
  readonly bucket: string = environment.firebase.storageBucket; 
  public uploading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public uploadProgress: BehaviorSubject<number> = new BehaviorSubject(-1);
  public uploadTask!: UploadTask;
  public storageChanged: boolean = true; 
  public storageNames: string[] = [];
  constructor() { }
// Firebase Cloud Storage
async listStorageNames(path: string): Promise<string[]> {
  const  results = await listAll(ref(this.storage, path));
  //console.log(`results: ${results.items}`);
  return results.items.map((ref) => ref.name.split('.')[0]);
}
getRef(path: string) {
  return ref(this.storage, `${this.bucket}/${path}`);
}
async getURL(path: string) {
  let url = await getDownloadURL(ref(this.storage, path));
  return url;
}
async loadBlob(path: string) {
  return getBlob(ref(this.storage, path));
}
async loadJSON(path: string) {
  return JSON.parse(await (await this.loadBlob(`${path}.json`)).text());
}
async loadPatcher(folder: string, id: string) {
  return this.loadJSON(`rnbo_devices/${folder}/${id}.export`);
}
async loadAudio(audioCtx: AudioContext, path: string): Promise<AudioBuffer> {
  //console.log(`audio from path ${path}`)
  let bytes = await getBytes(ref(this.storage, path));
  return audioCtx.decodeAudioData(bytes);
}
uploadFile(file: File, path: string): Promise<UploadResult> {
  const storageRef = ref(this.storage, path);
  return uploadBytes(storageRef, file);
  }


}
