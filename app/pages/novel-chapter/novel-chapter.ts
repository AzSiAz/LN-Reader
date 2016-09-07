import {NovelService} from '../../providers/novel-service/novel-service';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {App, PopoverController, Content, NavParams, ToastController, Platform, Storage, LocalStorage} from 'ionic-angular';
import {PopoverChapterReader} from '../../components/Popover/PopoverChapterReader';
import {Loading} from '../../components/loading/loading';

@Component({
  templateUrl: 'build/pages/novel-chapter/novel-chapter.html',
  providers: [NovelService],
  directives: [Loading]
})

export class NovelChapterPage {

    @ViewChild(Content) content: Content;
    @ViewChild('popoverContent', {read: ElementRef}) contentref: ElementRef;
    @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;

    chapter: any;
    data: any;
    loading: boolean = true

    constructor(private popoverCtrl: PopoverController, private toastCtrl: ToastController, private params:NavParams, private novelservice:NovelService, private platform: Platform) {
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

    }
  
    ionViewLoaded() {
        if (this.data.linktype == "internal") {
            this.novelservice.getChapter(this.data.page).then(data => {
                this.loading = false;
                this.initWithParams();
                this.chapter = data;
                let top: number = parseInt(localStorage.getItem(this.data.title));
                this.content.scrollTo(0, top);
            })
        }
    }

    ionViewWillLeave() {
        localStorage.setItem(this.data.title, `${this.content.getScrollTop()}`);
    }

    initWithParams() {
        let text = document.getElementById("parser_text");
        let content = document.getElementById("parser_content");
        let color = JSON.parse(localStorage.getItem("color"));
        text.style.fontFamily = localStorage.getItem("font");
        text.style.fontSize = localStorage.getItem("size");
        content.style.backgroundColor = color.bg;
        content.style.color = color.fg;
    }

    presentPopover(ev) {
        let popover = this.popoverCtrl.create(PopoverChapterReader, {
            contentEle: this.contentref.nativeElement,
            textEle: this.text.nativeElement
        });

        popover.present({
            ev: ev
        });
    }
}