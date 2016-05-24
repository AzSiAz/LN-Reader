import {Page, NavController} from 'ionic-angular';
import {SettingsNewsPage} from '../settings-news/settings-news';
import {NovelService} from '../../providers/novel-service/novel-service';
import {SqlManager} from '../../providers/sql-manager/sql-manager.ts';

@Page({
  templateUrl: 'build/pages/settings/settings.html',
  providers: [NovelService]
})

export class Settings {
  
  lang: any;
  
  constructor(private nav: NavController, private novelservice: NovelService) {}
  
  ngOnInit() {
    // this.novelservice.getLnLang().then(data => {
    //   this.lang = data;
    // })
  }
  
  langChange(event) {
    SqlManager.setLang(this.lang);
  }
  
  goToNews() {
    this.nav.push(SettingsNewsPage);
  }
}
