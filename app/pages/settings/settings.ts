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
          break;
        case "french":
          this.check2 = true;
          break;
        case "spanish" :
          this.check3 = true;
          break;
        default:
          this.check1 = true;
      }
  }

  langChange(event) {
    SqlManager.setLang(this.lang);
  }
  
  goToNews() {
    this.nav.push(SettingsNewsPage);
  }
}
