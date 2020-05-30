import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser
  }


  logout(): void {
    this.alertService.fire('Logout', 'Sure you want to go out', () => {this.authService.logout()});
  }

}
