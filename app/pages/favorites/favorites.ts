import {Page} from 'ionic-angular';
import {NovelService} from '../../providers/novel-service/novel-service';

@Page({
  templateUrl: 'build/pages/favorites/favorites.html',
  providers: [NovelService]
})

export class Favorites {
    
    novelservice: NovelService;
    
    constructor(NovelService: NovelService) {
        this.novelservice = NovelService
    }
}
