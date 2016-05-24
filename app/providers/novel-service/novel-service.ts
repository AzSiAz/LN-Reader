import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {SqlManager} from '../sql-manager/sql-manager';

/*
  Generated class for the NovelService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class NovelService {
  	
	http: Http;
  
	constructor(http: Http) {
		this.http = http;
	}
	
	// getLnLang() {
	// 	return new Promise(resolve => {
	// 		this.http.get(`https://api.azsiaz.tech/list/types`)
	// 		.map(res => res.json())
	// 		.subscribe(data => {
	// 			resolve(data[0].language);
	// 		});
	// 	})
	// }
	
	getNews() {
		return new Promise(resolve => {
			this.http.get(`https://api.azsiaz.tech/news`)
			.map(res => res.json())
			.subscribe(data => {
				resolve(data);
			});
		})
	}

	addFavorite(json) {
		return SqlManager.setFavNovel(json);
	}
  
	getNovelDetail(title) {
		return new Promise(resolve => {
			return SqlManager.getCacheNovel(title).then(data => {
				if (typeof data === "object") {
					resolve(data);
				}
				else {
					this.http.get(`https://api.azsiaz.tech/title/query/?title=${title}`)
					.map(res => res.json())
					.subscribe(data => {
						SqlManager.setCacheNovel(data);
						resolve(data);
					});
				}
			});
		})
	}

	getNovelList(refresh = false) {
		return new Promise(resolve => {
			return SqlManager.getCacheNovelList(refresh).then(data => {
				if (typeof data === "object") {
					resolve(data);
				}
				else {
					this.http.get(`https://api.azsiaz.tech/ln/${data}`)
					.map(res => res.json())
					.subscribe(data => {
						SqlManager.setCacheNovelList(data, refresh);
						resolve(data.titles);
					})
				}
			});
		})
	}

	getFavList() {
		return SqlManager.getFavList();
	}
	
	getFavDetail(title) {
		return SqlManager.getFavNovel(title);
	}
	
	getChapter(chapter) {
		return new Promise(resolve => {
			this.http.get(`https://api.azsiaz.tech/chapter/query/?chapter=${chapter}`).map(res => res.text())
			.subscribe(data => {
				resolve(data);
			});
		})
	}
	
	removeFav(title) {
		return SqlManager.removeFavNovel(title);
	}
}

