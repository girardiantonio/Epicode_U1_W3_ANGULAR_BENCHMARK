import { Component } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { IWeatherData } from '../interfaces';

@Component({
  selector: 'app-location-weather',
  templateUrl: './location-weather.component.html',
  styleUrls: ['./location-weather.component.scss']
})
export class LocationWeatherComponent {
  current: IWeatherData = {
    city: '',
    date: new Date(),
    image: '',
    description: '',
    temperature: 0,
    lat: 0,
    lon: 0
  };
  cityInput: string = ''; // Input per la città inserita dall'utente

  constructor(private weather: WeatherService) { }

  // Funzione per effettuare la ricerca dei dati meteorologici in base alla città inserita dall'utente
  searchWeather() {
    this.weather.getWeatherByLocation(this.cityInput)
      .subscribe(
        (data) => {
          this.current = data;
          console.log(this.current);
        },
        (error: any) => {
          console.log('Si è verificato un errore:', error);
        },
        () => {
          console.log('Chiamata completata');
        }
      );
  }

  getFormattedDate(): string {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(this.current.date).toLocaleDateString('it-IT');
  }
}
