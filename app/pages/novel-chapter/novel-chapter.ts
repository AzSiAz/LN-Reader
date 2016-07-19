import {NovelService} from '../../providers/novel-service/novel-service';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {App, Popover, NavController, Content, NavParams, Toast} from 'ionic-angular';

@Component({
  template: `
    <ion-list radio-group [(ngModel)]="fontFamily" (ionChange)="changeFontFamily()" class="popover-page">
      <ion-row>
        <ion-col>
          <button (click)="changeFontSize('smaller')" ion-item detail-none class="text-button text-smaller">A</button>
        </ion-col>
        <ion-col>
          <button (click)="changeFontSize('larger')" ion-item detail-none class="text-button text-larger">A</button>
        </ion-col>
      </ion-row>
      <ion-row class="row-dots">
        <ion-col>
          <button (click)="changeBackground('white')" category="dot" class="dot-white" [class.selected]="background == 'white'"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('tan')" category="dot" class="dot-tan" [class.selected]="background == 'tan'"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('grey')" category="dot" class="dot-grey" [class.selected]="background == 'grey'"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('black')" category="dot" class="dot-black" [class.selected]="background == 'black'"></button>
        </ion-col>
      </ion-row>
      <ion-item class="text-athelas">
        <ion-label>Athelas</ion-label>
        <ion-radio value="Athelas"></ion-radio>
      </ion-item>
      <ion-item class="text-charter">
        <ion-label>Charter</ion-label>
        <ion-radio value="Charter"></ion-radio>
      </ion-item>
      <ion-item class="text-iowan">
        <ion-label>Iowan</ion-label>
        <ion-radio value="Iowan"></ion-radio>
      </ion-item>
      <ion-item class="text-palatino">
        <ion-label>Palatino</ion-label>
        <ion-radio value="Palatino"></ion-radio>
      </ion-item>
      <ion-item class="text-san-francisco">
        <ion-label>San Francisco</ion-label>
        <ion-radio value="San Francisco"></ion-radio>
      </ion-item>
      <ion-item class="text-seravek">
        <ion-label>Seravek</ion-label>
        <ion-radio value="Seravek"></ion-radio>
      </ion-item>
      <ion-item class="text-times-new-roman">
        <ion-label>Times New Roman</ion-label>
        <ion-radio value="Times New Roman"></ion-radio>
      </ion-item>
    </ion-list>
  `,
})
class PopoverPage {
  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;

  colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;

      this.background = this.getColorName(this.contentEle.style.backgroundColor);
      this.setFontFamily();
    }
  }

  getColorName(background) {
    let colorName = 'white';

    if (!background) return 'white';

    for(var key in this.colors) {
      if (this.colors[key].bg == background) {
        colorName = key;
      }
    }

    return colorName;
  }

  setFontFamily() {
    if (this.textEle.style.fontFamily) {
      this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");
    }
  }

  changeBackground(color) {
    this.background = color;
    this.contentEle.style.backgroundColor = this.colors[color].bg;
    this.textEle.style.color = this.colors[color].fg;
  }

  changeFontSize(direction) {
    this.textEle.style.fontSize = direction;
  }

  changeFontFamily() {
    if (this.fontFamily) this.textEle.style.fontFamily = this.fontFamily;
  }
}


@Component({
  templateUrl: 'build/pages/novel-chapter/novel-chapter.html',
  providers: [NovelService]
})

export class NovelChapterPage {

  @ViewChild(Content) content: Content;
  @ViewChild('popoverContent', {read: ElementRef}) contentref: ElementRef;
  @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;

  chapter: any;
  data: any;
  shownGroup: any;
  prev1: any
  prev2: any
  private scrollTop;
  private lastScrollTop = 0;
  public delta = 5;

  constructor(private nav: NavController, private params:NavParams, private novelservice:NovelService) {
      this.chapter = '';
      this.data = this.params.data;
  }

  ngAfterViewInit(){ 
      this.content.addScrollListener(this.myScroll);
  }

  myScroll(e) {

      this.scrollTop = e.target.scrollTop;

      if (Math.abs(this.lastScrollTop - this.scrollTop) >= this.delta) { 
        return
      }
      else {
        let elem = document.querySelector(".novel-chapter-page").firstElementChild;
        let hidden = elem.classList.contains("hiddennav");
        console.log('hasScrolled delta', Math.abs(this.lastScrollTop - this.scrollTop));

        console.log("current : " + this.scrollTop);
        console.log("prev : " + this.lastScrollTop);

        if (e.target.scrollTop > 60 && !hidden) {
          elem.classList.add('hiddennav');
        }
        else if (this.scrollTop < this.lastScrollTop) {
          console.log("1");
          elem.classList.remove('hiddennav');
        }
        else if (e.target.scrollTop < 60 && hidden) { 
          console.log("2");
          elem.classList.remove('hiddennav');
        }
        this.lastScrollTop = this.scrollTop;
      }
  }
  
  ionViewLoaded() {
        let toast = Toast.create({
			      message: `Loading ${this.data.title}`
		    });
        this.nav.present(toast);
        if (this.data.linktype == "internal") {
            this.novelservice.getChapter(this.data.page).then(data => {
                this.chapter = data;
                toast.dismiss();
            })
        }
    }

  presentPopover(ev) {
        let popover = Popover.create(PopoverPage, {
            contentEle: this.contentref.nativeElement,
            textEle: this.text.nativeElement
        });

        this.nav.present(popover, {
            ev: ev
        });
  }
}