import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

// Storage key som kan kaldes flere steder
const STORAGE_KEY = 'mylist';
export interface Item {
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { 
  }

  async init() {
    console.log('init');
    // Definere cordova sqlite database
    await this.storage.defineDriver(cordovaSQLiteDriver);
    // Opret database med ionic storage-angular v3
    await this.storage.create();
    console.log('done');
  }
  //Få data
  getData() {
    console.log('getData');
    // Retunere det data der er i storage key
    return this.storage.get(STORAGE_KEY) || [];
  }
  // Tilføj data
  async addData(item) {
    // Vent på at storrage key er modtaget før data er pushed videre
    // Ellers kom med et tomt array så den ikke retunere null og kommer med fejl
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    // Push data
    storedData.push(item);
    // Set data til storage key
    return this.storage.set(STORAGE_KEY, storedData);
  }
  // Fjern data
  async removeItem(index) {
    // vent på at storrage key er modtaget før data er pushed videre eller tomt array
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    // Splice data 
    storedData.splice(index, 1);
    // Set spliced data til storage key
    return this.storage.set(STORAGE_KEY, storedData);
  }
}
