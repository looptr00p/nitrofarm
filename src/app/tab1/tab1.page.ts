import { Component } from '@angular/core';
import { NavController, ModalController, AlertController  } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  userEmail: string;

  private static oneDay = 24 * 3600 * 1000;

  data1: any = [];
  updateOptions1: any;

  options = {
    title:{
      text: "Uso de fertilizante"
    },
    color: ['#3398DB'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Test',
        type: 'bar',
        barWidth: '60%',
        data: [390, 330, 200, 220, 180, 150, 160]
      }
    ]
  };

  options1 = {
    title: {
      text: 'Índice de nitrógeno en el cultivo'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        const date = new Date(params.name);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    series: [{
      name: 'Sumulation Data',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: this.data1
    }]
  };

  private now = new Date(2019, 1, 1);
  private value = Math.random() * 100;
  private randomDataInterval;

  constructor(    
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public alertController: AlertController
) {
    for (let i = 0; i < 200; i++) {
      this.data1.push(this.randomData());
    }
  }

  ionViewWillEnter() {
    this.randomDataInterval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data1.shift();
        this.data1.push(this.randomData());
      }

      this.updateOptions1 = {
        series: [{
          data: this.data1
        }]
      };
    }, 100);
  }

  ionViewWillLeave() {
    clearInterval(this.randomDataInterval);
  }

  ngOnInit(){
    
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }
  }

  private randomData(): object {
    this.now = new Date(+this.now + Tab1Page.oneDay);
    this.value = this.value + Math.random() * 25 - 12;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    };
  }

  async alertLogOut() {
    const alert = await this.alertController.create({
      header: 'Cierre de sesión',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Cerrar Sesión',
          cssClass: 'danger',

          handler: () => {
            this.authService.logoutUser()
            .then(res => {
              console.log(res);
              this.navCtrl.navigateBack('');
            })
            .catch(error => {
              console.log(error);
            })
          }
        }
      ]
    });

    await alert.present();
  };

  async alertConfig() {
    const alert = await this.alertController.create({
      header: 'Ajustes de la aplicación',
      message: 'Pronto agregaremos nuevas funcionalidades',
      buttons: ['OK']
    });

    await alert.present();
  };

}
