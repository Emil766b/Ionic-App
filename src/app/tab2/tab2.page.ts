import { Component } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // Tomt array
  listData = [];

  constructor(private storageService: StorageService) {
    // Kalder data
    this.loadData();
  }
  // Hent data
  async loadData() {
    // Henter data ind i listData
    this.listData = await this.storageService.getData();
  }
  // Få data
  async getData() {
    // Loader det data der er i listData
    this.loadData();
  }
  // Rykker rundt på elementer
  Reorder(event) {
      // laver itemMove som er et event der tilader at rykke rundt på listen
      const itemMove = this.listData.splice(event.detail.from, 1)[0];
      // Log når noget er rykket rundt
      console.log(itemMove);
      // Køre event og splicer data
      this.listData.splice(event.detail.to, 0, itemMove);
      // Fortæller at rykke rundt event er færdig
      event.detail.complete();
  }
  
}
