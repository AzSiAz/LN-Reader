import {Component, ViewChild, ElementRef} from '@angular/core';
import {App, Popover, Content, NavParams, Platform} from 'ionic-angular';


@Component({
  templateUrl: 'build/components/Popover/PopoverChapterReader.html',
})

export class PopoverChapterReader {

  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;
  default: any = {};
  size: number;

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