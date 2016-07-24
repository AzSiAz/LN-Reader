import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SettingsNewsPage} from '../settings-news/settings-news';
import {NovelService} from '../../providers/novel-service/novel-service';
import {SqlManager} from '../../providers/sql-manager/sql-manager.ts';

@Component({
  templateUrl: 'build/pages/settings/settings.html',
  providers: [NovelService]
})

export class Settings {
  
  lang: any;
  check1: boolean = false;
  check2: boolean = false;
  check3: boolean = false

  constructor(private nav: NavController, private novelservice: NovelService) {}
  
  ionViewWillEnter() {
    let lang = SqlManager.getLang()
    if (typeof lang == 'string') {
      this.lang = lang;
      this.makeCheck(lang);
    }
    else {
      lang.then(data => {
        return data;
      }).then((data) => {
        this.lang = data;
        this.makeCheck(data);
      })
    }
  }
  
  makeCheck(lang) {
    switch (lang) {
        case "english":
          this.check1 = true;
          this.check2 = false;
          this.check3 = false;
          break;
        case "french":
          this.check1 = false;
          this.check2 = true;
          this.check3 = false;
          break;
        case "spanish" :
          this.check1 = false;
          this.check2 = false;
          this.check3 = true;
          break;
        default:
          this.check1 = true;
          this.check2 = false;
          this.check3 = false;
      }
  }

  langChange(event) {
    SqlManager.setLang(this.lang);
  }
  
  goToNews() {
    this.nav.push(SettingsNewsPage);
  }
}
