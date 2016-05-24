import {Page, NavController} from 'ionic-angular';
import {NovelService} from '../../providers/novel-service/novel-service';
import {Events} from 'ionic-angular';
import {FavoriteDetailPage} from '../favorite-detail/favorite-detail';


@Page({
  templateUrl: 'build/pages/favorites/favorites.html',
  providers: [NovelService]
})

export class Favorites {
    
    items: any;
    pushPage: any;
    
    constructor(private NovelService: NovelService, private events: Events, private nav: NavController) {
        this.events.subscribe('fav:added', () => {
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
    
    goToDetail(item) {
        this.nav.push(FavoriteDetailPage, item.title);
    }
}
