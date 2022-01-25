import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // App.component er en af de første ting der køre i projektet.
  // Ved at kalde StorageService for den et forspring med at starte
  // Det gør at den ikke starter for tæt på getData i storage.service og laver fejl
  constructor(private storageService: StorageService) {
    this.storageService.init();
  }
}

if (typeof Worker !== 'undefined') {
  // Console log hvis Web Worker får data
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  console.log("Error in Web Worker")
}