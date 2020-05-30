import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser
  }


  logout(): void {
    this.authService.logout();
  }

}
