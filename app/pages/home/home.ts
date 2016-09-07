import {Component} from '@angular/core';
import {NavController, ToastController, Events} from 'ionic-angular';
import {NovelService} from '../../providers/novel-service/novel-service';
import {NovelDetailPage} from '../novel-detail/novel-detail';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [NovelService]
})

export class Home {

	items: any;
	pushPage: any;
	params: any;
	isHidden: boolean = true;
	hideCancel: boolean = false;
	save: any;
	loading: boolean = true;
	myInput: string;

	constructor(private novelservice: NovelService, private nav: NavController, private toastCtrl: ToastController, private events: Events) {
		this.events.subscribe("settings:lang_change", () => {
			this.init(true);
		});
	}

	init(params: boolean = false) {
		this.novelservice.getNovelList(params).then(data => {
			this.items = data;
		});
	}

	ionViewLoaded() {
  		this.init();
	}

	hideSearch() {
		this.isHidden = !this.isHidden;
		if (this.isHidden == false) this.save = this.items;
		if (this.isHidden == true) {
			this.myInput = '';
			this.items = this.save;
			this.save = {};
		}
	}

	doRefresh(event) {
		this.novelservice.getNovelList(true).then(data => {
  			this.items = data;
			event.complete();
  		});
	}

	onInput(ev) {
		this.novelservice.getNovelList(false).then(data => {
			this.items = data;
			var q = ev.target.value;
			if (q.trim() == '') {
				this.items = this.save;
				return;
			}
			this.items = this.items.filter((v) => {
			if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
				return true;
			}
				return false;
			})
  		});
	}

	goToDetail(item) {
		this.nav.push(NovelDetailPage, item);
	}
}
