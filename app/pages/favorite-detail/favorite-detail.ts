import {Nav, NavController, NavParams, ToastController} from 'ionic-angular';
import {Component} from '@angular/core';
import {NovelService} from '../../providers/novel-service/novel-service';
import {NovelChapterPage} from '../novel-chapter/novel-chapter';
import {Favorites} from '../favorites/favorites';
import {Events} from 'ionic-angular';

declare let cordova;

@Component({
  templateUrl: 'build/pages/favorite-detail/favorite-detail.html',
  providers: [NovelService]
})

export class FavoriteDetailPage {
  
  param: any;
  pushPage: any;
  novel: any;
  data: any;
  shownGroup: any;
  
  constructor(private navcontroller: NavController, private nav: Nav, private params: NavParams,
   private novelservice:NovelService, private events: Events, private toastCtrl: ToastController) {
    this.novel = {};
    this.data = this.params.data;
  }
  
  ionViewLoaded() {
    this.init();
  }
  
  doRefresh(event) {
		this.novelservice.getFavDetail(this.data, true).then(data => {
      this.novel = data;
			event.complete();
    });
  }
  
  init(refresh = false) {
    this.novelservice.getFavDetail(this.data, refresh).then(data => {
      this.novel = data;
    })
  }

  setClass(cover) {
    var css = null;
    if (cover !== undefined) {
      css = "item-thumbnail-left";
      return css;
    }
    else {
      css = "";
      return css;
    }
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }
  
  openInBrowser(item) {
    let name = item.replace(/ /g, "_");
    cordova.InAppBrowser.open(`https://www.baka-tsuki.org/project/index.php?title=${name}`, "_system", '');
  }
  
  openChapter(item) {
    this.nav.push(NovelChapterPage, item);
  }
  
  removeFav() {
    this.novelservice.removeFav(this.data).then(a => {
      let toast = this.toastCtrl.create({
        message: `${this.data} removed`,
        duration: 1000
      })
      toast.present();
      this.events.publish('fav:removed');
      this.navcontroller.popToRoot();
    })
  }
}