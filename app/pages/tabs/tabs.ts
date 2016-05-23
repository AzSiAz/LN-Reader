import {Page} from 'ionic-angular';
import {Favorites} from '../favorites/favorites';
import {Settings} from '../settings/settings';
import {Home} from '../home/home';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Home;
  tab2Root: any = Favorites;
  tab3Root: any = Settings;
}
