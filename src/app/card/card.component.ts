import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SegurancaService } from '../services/seguranca.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  data: any = {};
  @ViewChild('player') player?: ElementRef;
  playing: any = {};

  constructor(
    private feed: SegurancaService,
  ) { }

  ngOnInit() {
    this.feed.load()
      .subscribe({
        next: (feed) => {
          this.data = feed;
          console.log(feed);
        },
        error: (response) => {
          console.error(response);
        },
        complete: () => {
          console.log("complete");
        }
      })
  }

  play(item: any) {
    const element = this.player?.nativeElement;
    this.stop();
    element.src = item.enclosure.link;
    element.play();
    this.playing = item.enclosure;
  }

  stop() {
    const element = this.player?.nativeElement;
    element.pause();
    element.currentTime = 0;
    element.src = "";
    this.playing = {};
  }
}
