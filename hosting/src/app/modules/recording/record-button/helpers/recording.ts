export async function recordAudioInput() {
    try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.isRecordingActive.next(true);
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (ev: BlobEvent) => {
      if (ev.data.size > 0) {
        this.audioChunks.push(ev.data);
      }
    };
    
    this.mediaRecorder.onstop = () => {
          //console.log('recording stopped');
          this.recordedAudio = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioChunks = [];
          this.isRecordingActive.next(false);
        };
        this.mediaRecorder.start();
    setTimeout(() => {
          this.mediaRecorder?.stop();
          this.isRecordingActive.next(false);
        }, this.maxRecordingTime);
    }
    
    catch(error) {
        console.error('Error accessing the microphone:', error);
        this.isRecordingActive.next(false);
    }
}

