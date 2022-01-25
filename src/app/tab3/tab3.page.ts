import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { api } from './apiobj';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  //latitude
  latitude: any = 0; 
  //longitude
  longitude: any = 0;
  // Api Url
  readonly url:string = "https://ghibliapi.herokuapp.com/films";
  // Api som et array
  private apis: api[] = [];

  constructor(private geolocation: Geolocation, private httpclient: HttpClient) { 
    
    // Få api fra get_api og subscribe til det
    this.get_api().subscribe((res) => {
      console.log(res);
      // apis array indholder response fra api
      this.apis = res;
    });
    
  }
  
  // Få api
  get_api() {
    // retunere api
    return this.httpclient.get<api[]>(this.url);
  }

  options = {
    // geolocation tid til timeout
    timeout: 10000, 
    // geolocation høj nøjagtighed
    enableHighAccuracy: true, 
    //  hvor gallem geolocation må være
    maximumAge: 3600
  };
  // geolocation
  getCurrentCoordinates() {
    // få geolocation og dens respons
    this.geolocation.getCurrentPosition().then((resp) => {
      // latitude response
      this.latitude = resp.coords.latitude;
      // Longitude resnonse
      this.longitude = resp.coords.longitude;
      // Fang fejl hvis der er nogen
     }).catch((error) => {
       // Log Error getting location hvis der er fejl
       console.log('Error getting location', error);
     });
     
  }
}
