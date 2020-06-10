import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from './shared/services/title.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subs$: Subscription;
  constructor(private titleService: TitleService) { }
  ngOnInit(): void {
    this.subs$ = this.titleService.setTitleByRoute();
  }
  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

}
