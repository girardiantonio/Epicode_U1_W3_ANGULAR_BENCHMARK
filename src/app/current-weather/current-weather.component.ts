import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { IWeatherData } from '../interfaces';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  current: IWeatherData = {
    city: '',
    date: new Date(),
    image: '',
    description: '',
    temperature: 0,
    lat: 0,
    lon: 0
  };

  constructor(private weather: WeatherService) { }

  ngOnInit() {
    this.weather.getWeatherByCoordinates(41.234782, 14.810419)
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
