import {Page, Nav, NavParams, Toast, NavController} from 'ionic-angular';
import {NovelService} from '../../providers/novel-service/novel-service';
import {NovelChapterPage} from '../novel-chapter/novel-chapter';
import {Favorites} from '../favorites/favorites';
import {Events} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/favorite-detail/favorite-detail.html',
  providers: [NovelService]
})

export class FavoriteDetailPage {
  
  param: any;
  pushPage: any;
  novel: any;
  data: any;
  shownGroup: any;
  
  constructor(private navcontroller: NavController, private nav: Nav, private params: NavParams, private novelservice:NovelService, private events: Events) {
    this.novel = {};
    this.data = this.params.data;
  }
  
  onPageLoaded() {
    this.init();
  }
  
  init() {
    let toast = Toast.create({
			message: `Loading ${this.data}`
		});
    this.nav.present(toast);
    this.novelservice.getFavDetail(this.data).then(data => {
      this.novel = data;
      toast.dismiss();
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
    name = item.title.replace(/ /g, "_");
    cordova.InAppBrowser.open(`https://www.baka-tsuki.org/project/index.php?title=${name}`, "_system", '')
  }
  
  openChapter(item) {
    this.nav.push(NovelChapterPage, item);
  }
  
  removeFav() {
    this.novelservice.removeFav(this.data).then(a => {
      this.nav.present(Toast.create({
        message: `${this.data} removed`,
        duration: 1000
      }));
      this.events.publish('fav:removed');
      this.navcontroller.popToRoot();
    })
  }
}