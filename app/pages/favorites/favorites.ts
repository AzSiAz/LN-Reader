import {Component} from '@angular/core';
import {NovelService} from '../../providers/novel-service/novel-service';
import {Events, NavController} from 'ionic-angular';
import {FavoriteDetailPage} from '../favorite-detail/favorite-detail';


@Component({
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
        this.events.subscribe('fav:removed', () => {
            this.init();
        });
    }

    ionViewLoaded() {
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
