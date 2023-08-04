import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { LocationWeatherComponent } from './location-weather/location-weather.component';

import { registerLocaleData } from "@angular/common";
import localeMX from "@angular/common/locales/es-MX";
import { WeatherService } from './weather/weather.service';

import { HttpClientModule } from "@angular/common/http";
import { MainComponent } from './main/main.component';

registerLocaleData(localeMX);

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    LocationWeatherComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
