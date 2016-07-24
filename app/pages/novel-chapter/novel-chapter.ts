import {NovelService} from '../../providers/novel-service/novel-service';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {App, Popover, NavController, Content, NavParams, Toast, Platform, Storage, LocalStorage} from 'ionic-angular';
import {PopoverChapterReader} from '../../components/PopoverChapterReader'

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
  prev1: any;
  prev2: any;
  private scrollTop;
  private lastScrollTop = 0;
  public delta = 5;

  constructor(private nav: NavController, private params:NavParams, private novelservice:NovelService, private platform: Platform) {
      this.chapter = '';
      this.data = this.params.data;
      if (!localStorage.getItem("size") && !localStorage.getItem("color") && !localStorage.getItem("font")) {
        localStorage.setItem("size", "medium");
        localStorage.setItem("font", (this.platform.is("ios")) ? "Helvetica Neue" : "Roboto");
        localStorage.setItem("color", JSON.stringify(
          {
            'white': {
              'bg': 'rgb(255, 255, 255)',
              'fg': 'rgb(0, 0, 0)'
            }
          }
        ));
      }
  }

  ngAfterViewInit(){ 
      let text = document.getElementById("parser_text");
      let content = document.getElementById("parser_content");
      let color = JSON.parse(localStorage.getItem("color"));
      text.style.fontFamily = localStorage.getItem("font");
      text.style.fontSize = localStorage.getItem("size");
      content.style.backgroundColor = color.bg;
      content.style.color = color.fg;
  }
  
  ionViewLoaded() {
        let toast = Toast.create({
			      message: `Loading ${this.data.title}`,
            showCloseButton: true,
			      dismissOnPageChange: true
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
        let popover = Popover.create(PopoverChapterReader, {
            contentEle: this.contentref.nativeElement,
            textEle: this.text.nativeElement
        });

        this.nav.present(popover, {
            ev: ev
        });
  }
}