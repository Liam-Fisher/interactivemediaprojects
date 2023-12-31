import { Injectable, inject } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
interface TTSResponse {
  translation: string;
  filename: string;
}
@Injectable({
  providedIn: 'root'
})
export class CloudFunctionsService {
  readonly functions: Required<Functions> = inject(Functions);
  readonly functionsUrl = 'https://helloworld-mwzx2tpw7a-uc.a.run.app';
  constructor() {}


  /* async getVoices() {
    const response = await fetch(this.functionsUrl);
    const voices = await response.json();
    //console.log(voices);
    return voices;
  } */
  async speak(text: string | null, lang: string | null) {
    if (text && lang) {
      const synthesizeSpeech = httpsCallable(this.functions, 'onCallTest');
      try {
        const result = await synthesizeSpeech({text,lang});
        let { translation, filename } = result.data as TTSResponse;
        //console.log(`translated text: ${translation}`);
        //console.log(`filename: ${filename}`);
        return filename;
      } catch (err) {
        //console.log(err);
      }
    }
    return '';
  }
}
