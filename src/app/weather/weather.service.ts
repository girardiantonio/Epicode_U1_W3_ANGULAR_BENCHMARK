import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IWeatherData } from '../interfaces';

interface ICurrentWeatherData {
  weather: [{
    description: string;
    icon: string;
  }]
  main: {
    temp: number;
  }
  sys: {
    name: string;
  }
  dt: number;
  name: string;
}

interface ILocationWeatherData {
  weather: [{
    description: string;
    icon: string;
  }]
  main: {
    temp: number;
  }
  sys: {
    name: string;
  }
  dt: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeatherByCoordinates(lat: number, lon: number): Observable<IWeatherData> {
    return this.http.get<ICurrentWeatherData>(`${environment.baseURL}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${environment.appId}&units=metric`)
      .pipe(
        map(data => this.convertToWeather(data))
      );
  }
  
  getWeatherByLocation(city: string): Observable<IWeatherData> {
    return this.http.get<ILocationWeatherData>(`${environment.baseURL}api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.appId}&units=metric`)
      .pipe(
        map(data => this.convertToWeather(data))
      );
  }
  
  private convertToWeather(data: ICurrentWeatherData | ILocationWeatherData): IWeatherData {
    return {
      city: data.name,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      description: data.weather[0].description,
      temperature: data.main.temp,
      date: new Date(data.dt * 1000),
      lat: 0,
      lon: 0
    };
  }
}
