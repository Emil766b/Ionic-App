import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage'
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    IonicStorageModule.forRoot({
      // Database
      name: "mydatebase",
      // Cordova sqlite server i native apps og indexedDB på web
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.LocalStorage]
    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
