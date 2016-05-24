import {Page, Nav, NavParams, Toast} from 'ionic-angular';
import {NovelService} from '../../providers/novel-service/novel-service';
import {NovelChapterPage} from '../novel-chapter/novel-chapter';
import {Events} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/novel-detail/novel-detail.html',
  providers: [NovelService]
})

export class NovelDetailPage {
  
  param: any;
  pushPage: any;
  novel: any;
  data: any;
  shownGroup: any;
  
  constructor(private nav: Nav, private params: NavParams, private novelservice:NovelService, private events: Events) {
    this.novel = {};
    this.data = this.params.data;
  }
  
  onPageLoaded() {
    this.init();
  }
  
  init() {
    let toast = Toast.create({
			message: `Loading ${this.data.title}`
		});
    this.nav.present(toast);
    this.novelservice.getNovelDetail(this.data.page).then(data => {
      this.novel = data;
      toast.dismiss();
    })
  }
  
  doRefresh(event) {
		this.novelservice.getNovelDetail(this.data.page, true).then(data => {
      this.novel = data;
			event.complete();
    });
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
  
  addFav() {
    let toast = Toast.create({
			message: `Adding ${this.data.title} to favorite`
		});
    this.nav.present(toast);
    this.novelservice.addFavorite(this.novel).then(a => {
      toast.dismiss();
      this.nav.present(
        Toast.create({
          message: `${this.data.title} added`,
          duration: 1000
        })
      );
      this.events.publish('fav:added'); 
    }, e => {
      toast.dismiss();
      this.nav.present(
          Toast.create({
            message: `${this.data.title} already added`,
            duration: 1000
          })
        );
    })
  }
  
  openChapter(item) {
    this.nav.push(NovelChapterPage, item);
  }
}