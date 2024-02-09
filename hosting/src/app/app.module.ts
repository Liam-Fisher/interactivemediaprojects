
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//import { RecordingModule } from './modules/recording/recording.module';
//import { RnboModule } from './modules/rnbo/rnbo.module';

// Firebase Components
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RubixRoutingModule } from './modules/rubix/rubix-routing.module';
import { RubixModule } from './modules/rubix/rubix.module';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    RubixRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RubixModule,
    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    // Modules
    //RnboModule,
    //RecordingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
