import {Component, ViewChild, ElementRef} from '@angular/core';
import {App, Popover, NavController, Content, NavParams, Toast, Platform, Storage, LocalStorage} from 'ionic-angular';


@Component({
  template: `
    <ion-list radio-group [(ngModel)]="fontFamily" (ionChange)="changeFontFamily()" class="popover-page">
      <ion-row>
        <ion-col>
          <button (click)="changeFontSize('small')" ion-item detail-none class="text-button text-smaller">A</button>
        </ion-col>
        <ion-col>
          <button (click)="changeFontSize('medium')" ion-item detail-none class="text-button text-medium">A</button>
        </ion-col>
        <ion-col>
          <button (click)="changeFontSize('large')" ion-item detail-none class="text-button text-larger">A</button>
        </ion-col>
      </ion-row>
      <ion-row class="row-dots">
        <ion-col>
          <button (click)="changeBackground('white')" category="dot" class="dot-white" [class.selected]="background == 'white'"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('tan')" category="dot" class="dot-tan" [class.selected]="background == 'tan'"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('grey')" category="dot" class="dot-grey" [class.selected]="background == 'grey'"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('black')" category="dot" class="dot-black" [class.selected]="background == 'black'"></button>
        </ion-col>
      </ion-row>
      <ion-item class="text-default">
        <ion-label>{{default.name}}</ion-label>
        <ion-radio value="{{default.value}}"></ion-radio>
      </ion-item>
      <ion-item class="text-athelas">
        <ion-label>Athelas</ion-label>
        <ion-radio value="Athelas"></ion-radio>
      </ion-item>
      <ion-item class="text-charter">
        <ion-label>Charter</ion-label>
        <ion-radio value="Charter"></ion-radio>
      </ion-item>
      <ion-item class="text-iowan">
        <ion-label>Iowan</ion-label>
        <ion-radio value="Iowan"></ion-radio>
      </ion-item>
      <ion-item class="text-palatino">
        <ion-label>Palatino</ion-label>
        <ion-radio value="Palatino"></ion-radio>
      </ion-item>
      <ion-item class="text-san-francisco">
        <ion-label>San Francisco</ion-label>
        <ion-radio value="San Francisco"></ion-radio>
      </ion-item>
      <ion-item class="text-seravek">
        <ion-label>Seravek</ion-label>
        <ion-radio value="Seravek"></ion-radio>
      </ion-item>
      <ion-item class="text-times-new-roman">
        <ion-label>Times New Roman</ion-label>
        <ion-radio value="Times New Roman"></ion-radio>
      </ion-item>
    </ion-list>
  `,
})
export class PopoverChapterReader {
  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;
  default: any = {};
  size: number;
  local: Storage;

  colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };

  constructor(private navParams: NavParams, private platform: Platform) {
    let val = (this.platform.is("ios")) ? "Helvetica Neue" : "Roboto";
    this.default.name = val;
    this.default.value = val;
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;

      this.background = this.getColorName(this.contentEle.style.backgroundColor);
      this.changeBackground(JSON.parse(localStorage.getItem("color")))
      this.setFontFamily();
      this.textEle.style.fontSize = localStorage.getItem("size");
    }
  }

  getColorName(background) {
    let colorName = 'white';

    if (!background) return 'white';

    for(var key in this.colors) {
      if (this.colors[key].bg == background) {
        colorName = key;
      }
    }
    return colorName;
  }

  setFontFamily() {
    if (this.textEle.style.fontFamily) {
      this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");
    }
  }

  changeBackground(color) {
    this.background = color;
    if (typeof color == "object") {
      this.contentEle.style.backgroundColor = color.bg;
      this.textEle.style.color = color.fg;
    }
    else {
      localStorage.setItem("color", JSON.stringify(this.colors[color]));
      this.contentEle.style.backgroundColor = this.colors[color].bg;
      this.textEle.style.color = this.colors[color].fg;
    }
  }

  changeFontSize(direction) {
    localStorage.setItem("size", direction);
    this.textEle.style.fontSize = direction;
  }

  changeFontFamily() {
    if(this.fontFamily) {
      this.textEle.style.fontFamily = this.fontFamily;
      localStorage.setItem("font", this.fontFamily);
    }
  }
}