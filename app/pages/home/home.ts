import {Page, Nav} from 'ionic-angular';
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
	
	constructor(private novelservice: NovelService, private nav: Nav) {
		this.pushPage = NovelDetailPage;
	}
	
	ngOnInit() {
  		this.novelservice.getNovelList(false).then(data => {
			this.items = data;
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
		this.novelservice.getNovelList(true).then(data => {
  			this.items = data;
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
}