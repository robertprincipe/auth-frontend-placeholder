import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../services/example.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-only-admin',
  templateUrl: './only-admin.component.html',
  styles: [
  ]
})
export class OnlyAdminComponent implements OnInit {
  user: any = {};

  constructor(private exampleService: ExampleService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.exampleService.onlyAdmin().subscribe((resp: any) => {
      this.user = resp.user;
    }, err => {
      this.alertService.toast(err.errors[0], 'error');
    });
  }

}
