import { Component, OnInit } from '@angular/core';
import { AlertController  } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }


  async alertHistory() {
    const alert = await this.alertController.create({
      header: 'Detalle del historial',
      message: 'La pagina de detalle está en proceso, da una vuelta por el campo y vuelve.',
      buttons: ['OK']
    });

    await alert.present();
  };

}
