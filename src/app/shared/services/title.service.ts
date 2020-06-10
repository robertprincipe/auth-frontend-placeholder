import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private routeTitle: string;
  constructor (private router: Router, private title: Title) { }

  setTitleByRoute() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      map((event: ActivationEnd) => event.snapshot.data['title'])
    ).subscribe( (data: any) => {
      if (data) {
        this.setTitle = data;
      }
    });
  }

  set setTitle(title: string) {
    this.title.setTitle(title);
    this.routeTitle = title;
  }

  get getTitle() {
    return this.routeTitle;
  }

}
