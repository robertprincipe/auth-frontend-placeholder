import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../services/example.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TitleService } from 'src/app/shared/services/title.service';

@Component({
  selector: 'app-only-admin',
  templateUrl: './only-admin.component.html',
  styles: [
  ]
})
export class OnlyAdminComponent implements OnInit {
  user: any = {};

  constructor(private exampleService: ExampleService, private alertService: AlertService, private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle = 'Only for admin\'s';
    this.exampleService.onlyAdmin().subscribe((resp: any) => {
      this.user = resp.user;
    }, err => {
      this.alertService.toast(err.errors[0], 'error');
    });
  }

}
