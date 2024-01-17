import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {environment} from '../../../environments/environment';
import { Storage, ref,  uploadBytes, listAll,getDownloadURL, getBlob, getBytes, UploadResult } from '@angular/fire/storage';
import { WebAudioService } from '../audio/web-audio.service';

// basically a wrapper for @angular/fire/storage, but with the bucket already set and the folder structure already defined

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  readonly storage: Required<Storage> = inject(Storage);
  readonly bucket: string = environment.firebase.storageBucket; 
  constructor() { }
// Firebase Cloud Storage
async listStorageFolders(path: string): Promise<string[]> {
  const  results = await listAll(ref(this.storage, path));
  //console.log('results', results);
  return results.prefixes.map((ref) => ref.name.split('.')[0]);
}
async listStorageFiles(path: string): Promise<string[]> {
  const  results = await listAll(ref(this.storage, path));
  //console.log('results', results);
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
  return this.loadJSON(`rnbo_patchers/${folder}/${id}.export`);
}
async loadAudio(audioCtx: AudioContext, path: string|null): Promise<AudioBuffer|null> {
  if(!path) return null;
  let bytes = await getBytes(ref(this.storage, path));
  return audioCtx.decodeAudioData(bytes);
}
uploadFile(file: File, path: string): Promise<UploadResult> {
  const storageRef = ref(this.storage, path);
  return uploadBytes(storageRef, file);
  }
async createFile(blob: Blob, filename: string, filetype: string): Promise<File> {
    let ext = filetype.split('/')[1];
    let file = new File([blob], `${filename}.${ext}`, {
      type: filetype,
    });
    return file;
  }


}
