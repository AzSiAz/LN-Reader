import {Page} from 'ionic-angular';
import {NovelService} from '../../providers/novel-service/novel-service';
import {Events} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/favorites/favorites.html',
  providers: [NovelService]
})

export class Favorites {
    
    items: any;
    pushPage: any;
    
    constructor(private NovelService: NovelService, private events: Events) {
        // this.pushPage = 
        this.events.subscribe('fav:added', (user) => {
            this.init();
        });
    }
    
    ngOnInit() {
        this.init();
    }
    
    init() {
        this.NovelService.getFavList().then(data => {
            this.items = data;
        })
    }
}
