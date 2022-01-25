import { Component, ViewChild } from '@angular/core';
import { StorageService} from '../services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // Tomt array
  listData = [];
  // Data fra input feltet
  input = '';

  constructor(private storageService: StorageService, public alertController: AlertController) {
    // Kalder data
    this.loadData();
  }
 // Hent data
  async loadData() {
    // Henter data ind i listData
    this.listData = await this.storageService.getData();
  }

  // Tilføj data
  async addData() {
    //Kører addData og tilføjer det der står i input feltet
    this.storageService.addData(this.input);
    
    // Reload data i loadData
    this.loadData();
  }
  // Fjern data
  async removeItem(index) {
    // Fjerner et data punkt ud fra index
    this.storageService.removeItem(index);
    // Splicer data
    this.listData.splice(index, 1);
  }
  // Tilføj push besked
  async addAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class' ,
      header: 'Vil du tilføje "'+this.input+'"',
      message: 'Vil du tilføje dette til listen og databasen?',
      buttons: [
        {
          text: 'Nej',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Annuller tilføj');
          }
        }, {
          text: 'Ja',
          handler: () => {
            //Kører addData og tilføjer det der står i input feltet
            this.addData()
          }
        }
      ]
    });
    await alert.present();
  }
    // Slet push besked
    async removeAlertConfirm(name: string, i: number) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Vil du slette "'+name+'"',
        message: 'Dette vil slette elementet fra listen og databasen',
        buttons: [
          {
            text: 'Annuller',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Annuller slet');
            }
          }, {
            text: 'Slet',
            cssClass: 'delete-button',
            handler: () => {
              this.removeItem(i);
            }
          }
        ]
      });
      await alert.present();
    }
}