import {Page, NavController, NavParams} from 'ionic-angular';
import {NovelService} from '../../providers/novel-service/novel-service';

@Page({
  templateUrl: 'build/pages/novel-chapter/novel-chapter.html',
  providers: [NovelService]
})

export class NovelChapterPage {

  chapter: any;
  data: any;
  shownGroup: any;
  
    constructor(private nav: NavController, private params:NavParams, private novelservice:NovelService) {
        this.chapter = '';
        this.data = this.params.get('data');
        console.log(this.data);
    }
  
    ngOnInit() {
        if (this.data.linktype == "internal") {
            this.novelservice.getChapter(this.data.page).then(data => {
                this.chapter = data;
            })
        }
    }
}