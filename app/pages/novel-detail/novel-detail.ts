import {Page, NavController, NavParams} from 'ionic-angular';
import {NovelService} from '../../providers/novel-service/novel-service';
import {NovelChapterPage} from '../novel-chapter/novel-chapter';
// import {InAppBrowser} from 'ionic-angular';

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
  
  constructor(private nav: NavController, private params: NavParams, private novelservice:NovelService) {
    this.pushPage = NovelChapterPage;
    this.novel = {};
    this.data = this.params.get('data');
  }
  
  ngOnInit() {
    this.novelservice.getNovelDetail(this.data.page).then(data => {
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
    name = item.title.replace(/ /g, "_");
    cordova.InAppBrowser.open(`https://www.baka-tsuki.org/project/index.php?title=${name}`, "_system", '')
  }
  
  addFav(item) {
    alert(JSON.stringify(item));
  }
}