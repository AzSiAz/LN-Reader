import {Component, enableProdMode, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, Nav, NavController, App} from 'ionic-angular';

import {StatusBar, Deeplinks} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {SqlManager} from './providers/sql-manager/sql-manager';

import {NovelDetailPage} from './pages/novel-detail/novel-detail';
import {FavoriteDetailPage} from './pages/favorite-detail/favorite-detail';
import {Favorites} from './pages/favorites/favorites';


declare let window;

@Component({
	template: '<ion-nav [root]="rootPage"></ion-nav>',
})

export class MyApp {

	@ViewChild(Nav) navChild:NavController;

	rootPage: any;

	constructor(private platform: Platform) {
		platform.ready().then(() => {

			const notificationOpenedCallback = (jsonData) => console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData))

			if (platform.is('cordova')) {
				// Okay, so the platform is ready and our plugins are available.
				// Here you can do any higher level native things you might need.
				StatusBar.styleDefault();
				window.plugins.OneSignal.init("74412a7f-ad29-4df9-a230-3891d0012435", {
					googleProjectNumber: ""
				}, notificationOpenedCallback);

				// Show an alert box if a notification comes in when the user is in your app.
				window.plugins.OneSignal.enableInAppAlertNotification(true);
			}

			SqlManager.init().then(() => {
				this.rootPage = TabsPage;
				if (this.platform.is('cordova')) {
					// TODO Make deepLink need to ask baka-tsuki server owner
					// URL : https://github.com/driftyco/ionic-plugin-deeplinks
					// this.deepLinks();

					// TODO Make indexAppContent
					// URL : https://github.com/johanblomgren/cordova-plugin-indexappcontent
					// this.indexFavSpotlight();
				}
			})
		});
	}

	ngAfterViewInit() {

  	}

	private deepLinks() {
    	this.platform.ready().then(() => {
			
			Deeplinks.routeWithNavController(this.navChild, {
				'/project/:data': NovelDetailPage
			}).subscribe((match) => {
				console.log('Successfully routed', match);
			}, (nomatch) => {
				console.warn('Unmatched Route', nomatch);
			});
		})
	}

	private indexFavSpotlight() {
		
		window.plugins.indexAppContent.onItemPressed = (payload) => {
			// this.navChild.setPages([
			// 	{
			// 		page: Favorites,
			// 	},
			// 	{
			// 		page: FavoriteDetailPage,
			// 		params: payload.identifier
			// 	}
			// ])
			this.navChild.push(FavoriteDetailPage, payload.identifier);
		};

		window.plugins.indexAppContent.init();

		window.plugins.indexAppContent.setIndexingInterval(1, function() {
			console.log('Successfully set interval');
		}, function(error) {
			console.log(error)
		});

		window.plugins.indexAppContent.clearItemsForDomains(['tech.azsiaz.LNReader'], function() {
			console.log('Items removed');
		}, (error) => {
			console.log(error);
		});
		
		SqlManager.getFavSpotlightList().then((list) => {
			window.plugins.indexAppContent.setItems(list, function() {
				console.log('Successfully set items');
			}, function(error) {
				console.log(error);
			});
		});

	}

}

ionicBootstrap(MyApp, [], {});

enableProdMode();