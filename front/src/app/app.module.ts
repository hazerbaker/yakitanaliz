import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Vehicles } from '../pages/vehicles/vehicles';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BaseService } from '../_services/base.service';
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    Home,
    Vehicles
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Vehicles
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BaseService
  ]
})
export class AppModule {}
