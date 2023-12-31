import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoiceFxComponent } from './pages/voice-fx/voice-fx.component';
import { RubixComponent } from './pages/rubix/rubix.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//import { RecordingModule } from './modules/recording/recording.module';
//import { RnboModule } from './modules/rnbo/rnbo.module';

// Firebase Components
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { RubixRotationInputComponent } from './pages/rubix-rotation-input/rubix-rotation-input.component';


@NgModule({
  declarations: [
    AppComponent,
    VoiceFxComponent,
    RubixComponent,
    RubixRotationInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
    // Firebase
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideFunctions(() => getFunctions()),
    //provideStorage(() => getStorage()),
    // Modules
    //RnboModule,
    //RecordingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
