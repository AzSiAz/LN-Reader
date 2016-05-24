import {Page, NavController, Toast} from 'ionic-angular';
import {NovelService} from '../../providers/novel-service/novel-service';
import {NovelDetailPage} from '../novel-detail/novel-detail';

@Page({
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
	myInput: string;
	
	constructor(private novelservice: NovelService, private nav: NavController) {}
	
	onPageLoaded() {
		let toast = Toast.create({
			message: 'Loading List'
		});
		this.nav.present(toast);
  		this.novelservice.getNovelList(false).then(data => {
			this.items = data;
			toast.dismiss();
  		});
  	}
		
	// onCancel(event) {
	// 	console.log(event);
	// 	this.isHidden = true;
	// 	this.items = this.save;
	// 	this.save = {};
	// }
	
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
		let toast = Toast.create({
			message: 'Refreshing List'
		});
		this.nav.present(toast);
		this.novelservice.getNovelList(true).then(data => {
  			this.items = data;
			toast.dismiss();
			event.complete();
  		});
	}
	
	onInput(searchbar) {
		
		var q = searchbar.value;
		
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
	}
	
	goToDetail(item) {
		// this.params = item;
		// this.pushPage = NovelDetailPage;
		this.nav.push(NovelDetailPage, item);
	}
}